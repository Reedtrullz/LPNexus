"use client";

import { useState, useEffect, useCallback } from "react";
import { PricePathChart } from "@/components/charts/PricePathChart";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  runMonteCarlo,
  type SimulationParams,
} from "@/lib/calculations/monteCarloSimulator";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, RefreshCw } from "lucide-react";

interface PriceDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ILSimulatorProps {
  position?: {
    tickLower?: number;
    tickUpper?: number;
    liquidity?: string;
    token0?: { priceUSD?: number; symbol?: string };
    token1?: { priceUSD?: number; symbol?: string };
    feeTier?: number;
    historyPrices?: PriceDataPoint[];
  };
}

export function ILSimulator({ position }: ILSimulatorProps) {
  const tickLower = position?.tickLower ?? 0;
  const tickUpper = position?.tickUpper ?? 0;
  const liquidity = position?.liquidity ?? "0";
  const token0Price = position?.token0?.priceUSD ?? 0;
  const token1Price = position?.token1?.priceUSD ?? 0;
  const feeTier = position?.feeTier ?? 3000;
  
  const [rangeLower, setRangeLower] = useState(tickLower);
  const [rangeUpper, setRangeUpper] = useState(tickUpper);
  const [volatility, setVolatility] = useState(45);
  const [timeDays, setTimeDays] = useState(30);
  const [simCount, setSimCount] = useState(10000);
  const [result, setResult] = useState<ReturnType<typeof runMonteCarlo> | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runSimulation = useCallback(() => {
    setIsRunning(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 10, 90));
    }, 50);

    setTimeout(() => {
      const params: SimulationParams = {
        currentPrice0: token0Price,
        currentPrice1: token1Price,
        tickLower: rangeLower,
        tickUpper: rangeUpper,
        liquidity: BigInt(liquidity),
        volatility,
        timeDays,
        simulations: simCount,
        correlation: 0.65,
        feeTier: feeTier,
      };

      const simResult = runMonteCarlo(params);
      setResult(simResult);
      setProgress(100);

      setTimeout(() => {
        setIsRunning(false);
        clearInterval(progressInterval);
      }, 200);
    }, 100);
  }, [rangeLower, rangeUpper, volatility, timeDays, simCount, token0Price, token1Price, feeTier, liquidity]);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  const handleRangeChange = (type: "lower" | "upper", value: number) => {
    if (type === "lower") {
      setRangeLower(Math.min(value, rangeUpper - 100));
    } else {
      setRangeUpper(Math.max(value, rangeLower + 100));
    }
  };

  const tickToPriceDisplay = (tick: number) => {
    return Math.pow(1.0001, tick).toFixed(6);
  };

  const maxHistogram = result ? Math.max(...result.histogram) : 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <PricePathChart
          priceData={position?.historyPrices ?? []}
          rangeLower={rangeLower * 0.01}
          rangeUpper={rangeUpper * 0.01}
          currentPrice={position?.token1?.priceUSD ?? 0}
        />

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-zinc-400">Range Lower</span>
              <span className="text-sm text-violet-400 font-mono">
                {tickToPriceDisplay(rangeLower)}
              </span>
            </div>
            <Slider
              value={[rangeLower]}
              onValueChange={(v) => handleRangeChange("lower", v[0])}
              max={rangeUpper - 100}
              min={    tickLower - 2000}
              step={10}
            />
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-zinc-400">Range Upper</span>
              <span className="text-sm text-violet-400 font-mono">
                {tickToPriceDisplay(rangeUpper)}
              </span>
            </div>
            <Slider
              value={[rangeUpper]}
              onValueChange={(v) => handleRangeChange("upper", v[0])}
              max={tickUpper + 2000}
              min={rangeLower + 100}
              step={10}
            />
          </div>
        </div>

        <p className="text-xs text-zinc-500 mt-3 text-center">
          Drag sliders to adjust liquidity range (live simulation update)
        </p>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-zinc-400">Volatility (annual)</label>
                <span className="text-sm text-violet-400">{volatility}%</span>
              </div>
              <Slider
                value={[volatility]}
                onValueChange={(v) => setVolatility(v[0])}
                max={80}
                min={15}
                step={1}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-zinc-400">Time Horizon</label>
                <span className="text-sm text-violet-400">{timeDays} days</span>
              </div>
              <Slider
                value={[timeDays]}
                onValueChange={(v) => setTimeDays(v[0])}
                max={365}
                min={7}
                step={1}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-zinc-400">Simulations</label>
                <span className="text-sm text-violet-400">
                  {(simCount / 1000).toFixed(0)}k
                </span>
              </div>
              <Slider
                value={[simCount / 1000]}
                onValueChange={(v) => setSimCount(v[0] * 1000)}
                max={50}
                min={1}
                step={1}
              />
            </div>

            <Button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full py-6 text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Running {simCount.toLocaleString()} paths...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Re-run Simulations
                </>
              )}
            </Button>

            {isRunning && (
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="bg-emerald-950/30 border-emerald-500/30">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-emerald-400 mb-1">
                          Projected PNL vs HODL
                        </p>
                        <p className="text-5xl font-bold text-emerald-400">
                          {result.expectedPNL >= 0 ? "+" : "-"}
                          {Math.abs(result.expectedPNL).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <p className="text-xl text-emerald-400/80">
                          ({result.pnlVsHODL >= 0 ? "+" : ""}
                          {result.pnlVsHODL.toFixed(1)}%)
                        </p>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expected profit/loss vs holding tokens</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-zinc-400 mb-1">5th percentile</div>
                    <div className="text-xl text-red-400">
                      {result.percentile5 >= 0 ? "+" : "-"}
                      {Math.abs(result.percentile5).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-zinc-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-zinc-400 mb-1">95th percentile</div>
                    <div className="text-xl text-emerald-400">
                      {result.percentile95 >= 0 ? "+" : "-"}
                      {Math.abs(result.percentile95).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Probability of Profit</div>
                  <div
                    className={`text-3xl font-bold ${
                      result.probBeatHODL > 0.5 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {(result.probBeatHODL * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-violet-500/50">
                <CardContent className="p-6">
                  <p className="text-sm text-violet-400 mb-3">
                    AI Optimal Range Suggestion
                  </p>
                  <div className="text-2xl font-bold text-white">
                    tick {result.optimalRange.lower} – {result.optimalRange.upper}
                  </div>
                  <p className="text-emerald-400">
                    +{result.optimalRange.expectedAPR.toFixed(0)}% expected APR
                  </p>
                  <Button
                    className="mt-4 w-full"
                    variant="outline"
                    onClick={() => {
                      setRangeLower(result.optimalRange.lower);
                      setRangeUpper(result.optimalRange.upper);
                    }}
                  >
                    Apply to Simulator
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-6">
                  <p className="text-xs text-zinc-400 mb-4">
                    Profit Distribution ({simCount.toLocaleString()} paths)
                  </p>
                  <div className="flex items-end h-24 gap-px">
                    {result.histogram.map((count, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded transition-all duration-300 ${
                          i < 10 ? "bg-red-500/60" : "bg-emerald-500/60"
                        }`}
                        style={{
                          height: `${(count / maxHistogram) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 mt-2">
                    <span>Loss</span>
                    <span>Profit</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
