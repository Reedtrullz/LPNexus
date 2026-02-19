"use client";

import { useQuery } from "@tanstack/react-query";
import { useWalletStore } from "@/store/walletStore";
import { fetchUniswapV3Positions } from "@/lib/api/subgraphs";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import type { Position, Token } from "@/types/index";
import {
  calculatePositionIL,
  estimateTimeInRange,
  calculatePositionValue,
} from "@/lib/calculations/impermanentLoss";

const MOCK_PRICES: Record<string, number> = {
  WETH: 3500,
  USDC: 1,
  USDT: 1,
  WBTC: 95000,
  ARB: 1.2,
  OP: 2.5,
  MATIC: 0.65,
  BNB: 720,
  AVAX: 42,
};

function getTokenPrice(symbol: string): number {
  return MOCK_PRICES[symbol] || 1;
}

export function usePositions() {
  const { connectedAddresses } = useWalletStore();
  const { address: evmAddr, isConnected: isEvmConnected } = useAccount();
  const { publicKey, connected: isSolanaConnected } = useWallet();

  const allAddresses = useMemo(() => {
    const addrs = [...connectedAddresses];
    if (evmAddr && isEvmConnected) {
      addrs.push({
        address: evmAddr,
        chain: "ethereum",
        type: "wallet",
      });
    }
    if (publicKey && isSolanaConnected) {
      addrs.push({
        address: publicKey.toBase58(),
        chain: "solana",
        type: "wallet",
      });
    }
    return addrs;
  }, [connectedAddresses, evmAddr, publicKey, isEvmConnected, isSolanaConnected]);

  const chains = ["ethereum", "arbitrum", "base", "optimism", "polygon"];

  const { data: rawPositions, isLoading } = useQuery({
    queryKey: ["positions", allAddresses],
    queryFn: async () => {
      const results: Array<{
        position: ReturnType<typeof fetchUniswapV3Positions> extends Promise<infer T> ? T : never;
        chain: string;
      }> = [];

      for (const { address, chain } of allAddresses) {
        if (chain === "solana") continue;

        for (const queryChain of chain === "ethereum" ? chains : [chain]) {
          const positions = await fetchUniswapV3Positions(address, queryChain);
          results.push({ position: positions, chain: queryChain });
        }
      }

      return results.flatMap((r) =>
        (r.position || []).map((p) => ({ ...p, chain: r.chain }))
      );
    },
    refetchInterval: 15000,
    enabled: allAddresses.length > 0,
  });

  const positions: Position[] = useMemo(() => {
    return (rawPositions || []).map((p: any) => {
      const token0: Token = {
        address: p.token0.id,
        chainId: 1,
        symbol: p.token0.symbol,
        name: p.token0.symbol,
        decimals: parseInt(p.token0.decimals),
        priceUsd: getTokenPrice(p.token0.symbol),
      };

      const token1: Token = {
        address: p.token1.id,
        chainId: 1,
        symbol: p.token1.symbol,
        name: p.token1.symbol,
        decimals: parseInt(p.token1.decimals),
        priceUsd: getTokenPrice(p.token1.symbol),
      };

      const liquidity = BigInt(p.liquidity || 0);
      const sqrtPriceCurrent = Math.sqrt(parseFloat(p.pool?.sqrtPrice || "1"));
      const currentTick = parseInt(p.pool?.tick || "0");
      const tickLower = parseInt(p.tickLower);
      const tickUpper = parseInt(p.tickUpper);

      const { totalUSD } = calculatePositionValue(
        liquidity,
        sqrtPriceCurrent,
        tickLower,
        tickUpper,
        token0.priceUsd,
        token1.priceUsd
      );

      const { ilUSD, ilPercent } = calculatePositionIL(
        liquidity,
        sqrtPriceCurrent,
        sqrtPriceCurrent * 0.98,
        token1.priceUsd
      );

      const timeInRange = estimateTimeInRange(tickLower, tickUpper, currentTick);

      const mockPrincipal = totalUSD * 0.85;
      const mockFees = totalUSD * 0.15;

      return {
        id: p.id,
        protocol: "uniswap-v3" as const,
        chainId: 1,
        owner: "",
        token0,
        token1,
        liquidity: p.liquidity,
        amount0: "0",
        amount1: "0",
        amount0Usd: totalUSD * 0.5,
        amount1Usd: totalUSD * 0.5,
        totalValueUsd: totalUSD,
        tickLower,
        tickUpper,
        priceLower: Math.pow(1.0001, tickLower),
        priceUpper: Math.pow(1.0001, tickUpper),
        currentPrice: Math.pow(1.0001, currentTick),
        fees0: "0",
        fees1: "0",
        feesUsd: mockFees,
        uncollectedFees0: "0",
        uncollectedFees1: "0",
        uncollectedFeesUsd: mockFees * 0.3,
        depositedAmount0: "0",
        depositedAmount1: "0",
        depositedValueUsd: mockPrincipal,
        pnlUsd: totalUSD - mockPrincipal,
        pnlPercent: ((totalUSD - mockPrincipal) / mockPrincipal) * 100,
        impermanentLossPercent: ilPercent,
        hodlValueUsd: mockPrincipal,
        status:
          currentTick >= tickLower && currentTick <= tickUpper
            ? "active"
            : "out-of-range",
        createdAt: Date.now(),
        lastUpdatedAt: Date.now(),
        poolAddress: "",
        feeTier: parseInt(p.feeTier) / 10000,
        apr: 15,
        apy: 16,
      };
    });
  }, [rawPositions]);

  return { positions, isLoading };
}
