"use client";

import Link from "next/link";
import { Position } from "@/types/index";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PositionCardProps {
  position: Position;
}

export function PositionCard({ position }: PositionCardProps) {
  const inRange =
    position.status === "active" ||
    (position.currentPrice >= (position.priceLower || 0) &&
      position.currentPrice <= (position.priceUpper || Infinity));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Link href={`/positions/${position.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          className="bg-zinc-950/80 border-zinc-800 hover:border-violet-500/50 overflow-hidden cursor-pointer h-full"
        >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold">
                  {position.protocol.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-xl text-white">
                    {position.token0.symbol}-{position.token1.symbol}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {position.protocol.toUpperCase()} • {position.feeTier}%
                  </p>
                </div>
              </div>
            </div>
            <Badge
              variant={inRange ? "default" : "destructive"}
              className="text-xs"
            >
              {inRange ? "✓ In Range" : "⚠ Out of Range"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold tracking-tighter text-white">
                {formatCurrency(position.totalValueUsd)}
              </p>
              <p className="text-sm text-zinc-400">Current Value</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <p className="text-emerald-400 font-medium">
                        +{formatCurrency(position.uncollectedFeesUsd || 0)}
                      </p>
                      <p className="text-zinc-500">Fees (unclaimed)</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Calculated via position manager</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <p
                  className={`font-medium ${
                    position.impermanentLossPercent >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {position.impermanentLossPercent.toFixed(1)}%
                </p>
                <p className="text-zinc-500">IL</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-zinc-400">
                  {position.apr?.toFixed(0)}% APR
                </span>
              </div>
              <button className="text-xs text-violet-400 hover:underline">
                View Detail →
              </button>
            </div>
          </div>
        </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
