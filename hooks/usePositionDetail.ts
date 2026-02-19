"use client";

import { useQuery } from "@tanstack/react-query";
import type { Position, Token } from "@/types/index";

interface PriceDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface EnrichedPosition extends Position {
  historyPrices: PriceDataPoint[];
  deposits: Array<{
    amount0: bigint;
    amount1: bigint;
    timestamp: number;
  }>;
  volatility: number;
}

function generateMockPriceData(days: number = 30): PriceDataPoint[] {
  const data: PriceDataPoint[] = [];
  let basePrice = 3400;

  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 86400000);
    const time = date.toISOString().split("T")[0];

    const volatility = 0.02;
    const change = (Math.random() - 0.5) * 2 * volatility;
    const open = basePrice;
    const close = basePrice * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);

    data.push({ time, open, high, low, close });
    basePrice = close;
  }

  return data;
}

export function usePositionDetail(id: string) {
  return useQuery<EnrichedPosition>({
    queryKey: ["position", id],
    queryFn: async () => {
      const mockPosition: EnrichedPosition = {
        id,
        protocol: "uniswap-v3",
        chainId: 42161,
        owner: "0x...",
        token0: {
          address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
          chainId: 42161,
          symbol: "WBTC",
          name: "Wrapped Bitcoin",
          decimals: 8,
          priceUsd: 84291,
        },
        token1: {
          address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
          chainId: 42161,
          symbol: "WETH",
          name: "Wrapped Ether",
          decimals: 18,
          priceUsd: 3420,
        },
        liquidity: "124812481248",
        amount0: "100000000",
        amount1: "5000000000000000000",
        amount0Usd: 84291,
        amount1Usd: 17100,
        totalValueUsd: 184291,
        tickLower: 184200,
        tickUpper: 192400,
        priceLower: 184200 * 0.01,
        priceUpper: 192400 * 0.01,
        currentPrice: 3420,
        fees0: "500000",
        fees1: "200000000000000000",
        feesUsd: 42183,
        uncollectedFees0: "500000",
        uncollectedFees1: "200000000000000000",
        uncollectedFeesUsd: 42183,
        depositedAmount0: "80000000",
        depositedAmount1: "4000000000000000000",
        depositedValueUsd: 142000,
        pnlUsd: 42291,
        pnlPercent: 29.8,
        impermanentLossPercent: -5.8,
        hodlValueUsd: 150291,
        status: "active",
        createdAt: Date.now() - 86400000 * 30,
        lastUpdatedAt: Date.now(),
        poolAddress: "0x...",
        feeTier: 0.05,
        apr: 45,
        apy: 56,
        historyPrices: generateMockPriceData(30),
        deposits: [],
        volatility: 0.45,
      };

      return mockPosition;
    },
    refetchInterval: 12000,
    enabled: !!id,
  });
}
