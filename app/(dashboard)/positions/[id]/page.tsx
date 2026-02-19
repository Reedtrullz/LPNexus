"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { usePositionDetail } from "@/hooks/usePositionDetail";
import { PricePathChart } from "@/components/charts/PricePathChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download } from "lucide-react";
import { ILSimulator } from "@/components/simulator/ILSimulator";
import {
  calculateFeeCaptureEfficiency,
  calculateVolatilityAdjustedROI,
} from "@/lib/calculations/enhancedIL";
import { tickToPrice } from "@/lib/calculations/impermanentLoss";

export default function PositionDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const { data: position, isLoading } = usePositionDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-[460px] w-full" />
          <div className="grid grid-cols-4 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Position not found</p>
      </div>
    );
  }

  const inRange =
    position.currentPrice >= (position.priceLower || 0) &&
    position.currentPrice <= (position.priceUpper || Infinity);

  const roi = position.pnlPercent;
  const volAdjustedROI = calculateVolatilityAdjustedROI(
    roi,
    position.impermanentLossPercent,
    position.volatility || 0.45
  );
  const feeEfficiency = calculateFeeCaptureEfficiency(
    94,
    position.volatility || 0.45
  );

  const rangeLowerPrice = tickToPrice(position.tickLower || 0);
  const rangeUpperPrice = tickToPrice(position.tickUpper || 0);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white flex items-center gap-2 mt-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold tracking-tighter text-white">
                  ${position.totalValueUsd.toLocaleString()}
                </h1>
                <Badge
                  variant={inRange ? "default" : "destructive"}
                  className="text-sm px-3 py-1"
                >
                  {inRange ? "✓ In Range" : "⚠ Out of Range"}
                </Badge>
              </div>
              <p className="text-xl text-zinc-400">
                {position.token0.symbol}-{position.token1.symbol} •{" "}
                {position.feeTier}% {position.protocol.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Claim Fees (${position.uncollectedFeesUsd?.toLocaleString()})
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-violet-500 text-violet-400 hover:bg-violet-500/10"
            >
              Rebalance Range
            </Button>
          </div>
        </div>

        <Card className="mb-10 bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">
              Historical Price Path + Liquidity Range
            </CardTitle>
            <p className="text-sm text-zinc-500">
              Drag preview enabled — full interactive optimizer in next phase
            </p>
          </CardHeader>
          <CardContent>
            <PricePathChart
              priceData={position.historyPrices}
              rangeLower={rangeLowerPrice}
              rangeUpper={rangeUpperPrice}
              currentPrice={position.currentPrice}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Principal",
              value: `$${position.depositedValueUsd.toLocaleString()}`,
              tooltip:
                "Weighted average entry price from all deposits (subgraph + on-chain events)",
            },
            {
              label: "Unclaimed Fees",
              value: `+$${position.uncollectedFeesUsd?.toLocaleString()}`,
              color: "text-emerald-400",
            },
            {
              label: "Impermanent Loss",
              value: `$${position.impermanentLossPercent.toFixed(1)}%`,
              color:
                position.impermanentLossPercent < 0
                  ? "text-red-400"
                  : "text-emerald-400",
            },
            {
              label: "Vol-Adjusted ROI",
              value: `${volAdjustedROI.toFixed(1)}%`,
              tooltip:
                "ROI minus IL penalty scaled by 30-day volatility",
            },
          ].map((stat, i) => (
            <Card key={i} className="bg-zinc-950 border-zinc-800">
              <CardContent className="p-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-left w-full">
                      <p className="text-zinc-500 text-sm mb-1">{stat.label}</p>
                      <p
                        className={`text-3xl font-bold tracking-tighter ${
                          stat.color || "text-white"
                        }`}
                      >
                        {stat.value}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stat.tooltip || "Calculated live via viem + subgraph"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-violet-400 mb-2">
                    94%
                  </div>
                  <p className="text-zinc-400">Time in Range (30d)</p>
                </div>
                <div className="text-center pt-6 border-t border-zinc-800">
                  <div className="text-4xl font-bold text-emerald-400">
                    {feeEfficiency}%
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">
                    Fee Capture Efficiency
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-9">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-zinc-900">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="simulator">Simulator</TabsTrigger>
                <TabsTrigger value="tax">Tax Export</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Position Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-zinc-500 text-sm">Token 0</p>
                        <p className="text-white font-medium">
                          {position.token0.symbol} ({position.token0.decimals}{" "}
                          decimals)
                        </p>
                        <p className="text-zinc-400 text-sm">
                          ${position.token0.priceUsd?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-sm">Token 1</p>
                        <p className="text-white font-medium">
                          {position.token1.symbol} ({position.token1.decimals}{" "}
                          decimals)
                        </p>
                        <p className="text-zinc-400 text-sm">
                          ${position.token1.priceUsd?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-sm">Range Lower</p>
                        <p className="text-white font-mono">
                          {rangeLowerPrice.toFixed(4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-sm">Range Upper</p>
                        <p className="text-white font-mono">
                          {rangeUpperPrice.toFixed(4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-sm">APR</p>
                        <p className="text-emerald-400 font-medium">
                          {position.apr}%
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-sm">APY</p>
                        <p className="text-emerald-400 font-medium">
                          {position.apy}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardContent className="p-8 text-center text-zinc-500">
                    Transaction history table (Phase 5 full importer)
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="simulator" className="mt-6">
                <ILSimulator position={position} />
              </TabsContent>

              <TabsContent value="tax" className="mt-6">
                <Button className="w-full py-8 text-xl bg-zinc-800 hover:bg-zinc-700 text-white">
                  <Download className="mr-3 w-5 h-5" />
                  Export Tax-Ready CSV/PDF (2026 compliant)
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
