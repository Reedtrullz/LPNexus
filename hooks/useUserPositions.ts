"use client";

import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { mainnet, base, arbitrum } from "wagmi/chains";

export type UserPosition = {
  id: string;
  pair: string;
  chain: string;
  chainId: number;
  token0: string;
  token1: string;
  minPrice: number;
  maxPrice: number;
  currentPrice: number;
  liquidity: string;
  feesOwed: string;
  tickLower: number;
  tickUpper: number;
};

const SUBGRAPH_URLS: Record<number, string> = {
  [mainnet.id]: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  [base.id]: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-base",
  [arbitrum.id]: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-arbitrum-one",
};

const CHAIN_NAMES: Record<number, string> = {
  [mainnet.id]: "Ethereum",
  [base.id]: "Base",
  [arbitrum.id]: "Arbitrum",
};

export function useUserPositions() {
  const { address, chainId } = useAccount();

  return useQuery({
    queryKey: ["user-positions", address, chainId],
    enabled: !!address,
    refetchInterval: 30000,
    queryFn: async (): Promise<UserPosition[]> => {
      if (!address) return [];

      const currentChainId = chainId || mainnet.id;
      const subgraphUrl = SUBGRAPH_URLS[currentChainId];

      if (!subgraphUrl) {
        console.warn("No subgraph available for chain:", currentChainId);
        return [];
      }

      const query = `
        query Positions($owner: String!) {
          positions(
            where: { owner: $owner, liquidity_gt: "0" }
            first: 20
            orderBy: liquidity
            orderDirection: desc
          ) {
            id
            tickLower
            tickUpper
            liquidity
            pool {
              token0Price
              token1Price
              tick
            }
            token0 {
              symbol
              id
            }
            token1 {
              symbol
              id
            }
          }
        }
      `;

      try {
        const res = await fetch(subgraphUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: { owner: address.toLowerCase() },
          }),
        });

        const json = await res.json();
        const positions = json.data?.positions || [];

        return positions.map((p: any) => {
          const currentPrice = parseFloat(p.pool.token0Price) || 1;
          const tickLower = parseInt(p.tickLower);
          const tickUpper = parseInt(p.tickUpper);

          const minPrice = currentPrice * Math.pow(1.0001, tickLower);
          const maxPrice = currentPrice * Math.pow(1.0001, tickUpper);

          return {
            id: p.id,
            pair: `${p.token0.symbol}/${p.token1.symbol}`,
            chain: CHAIN_NAMES[currentChainId] || "Unknown",
            chainId: currentChainId,
            token0: p.token0.id,
            token1: p.token1.id,
            minPrice,
            maxPrice,
            currentPrice,
            liquidity: p.liquidity,
            feesOwed: "0",
            tickLower,
            tickUpper,
          };
        });
      } catch (error) {
        console.error("Failed to fetch positions:", error);
        return [];
      }
    },
  });
}
