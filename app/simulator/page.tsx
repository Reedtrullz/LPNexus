"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/ui/GlassCard";
import { ArrowRight, Play, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

const mockData = [
  { day: "0", fees: 0, il: 0 },
  { day: "7", fees: 42, il: -0.8 },
  { day: "14", fees: 91, il: -1.4 },
  { day: "21", fees: 138, il: -2.1 },
  { day: "30", fees: 184, il: -2.9 },
];

export default function Simulator() {
  const [pair] = useState("ETH / USDC");
  const [minPrice, setMinPrice] = useState(2800);
  const [maxPrice, setMaxPrice] = useState(4200);
  const [currentPrice] = useState(3450);
  const [volatility, setVolatility] = useState(45);

  const rangeWidth = ((maxPrice - minPrice) / (maxPrice * 1.5)) * 100;
  const currentPos = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;

  const estFees = ((maxPrice - minPrice) / 800).toFixed(1);
  const estIL = (Math.pow((currentPrice / ((minPrice + maxPrice) / 2) - 1), 2) * -12).toFixed(1);

  const runMonteCarlo = () => {
    const runs = 1000;
    let totalFees = 0;
    let totalIL = 0;

    for (let i = 0; i < runs; i++) {
      const drift = 0.0005;
      const dt = 30 / 365;
      const simPrice = currentPrice * Math.exp((drift - 0.5 * Math.pow(volatility/100, 2)) * dt + (volatility/100) * Math.sqrt(dt) * (Math.random() * 2 - 1));

      const avgPrice = (minPrice + maxPrice) / 2;
      const il = -2 * (1 - Math.sqrt(simPrice / avgPrice)) * 100;
      totalIL += il;
      totalFees += (maxPrice - minPrice) / 1200 * (Math.random() + 0.8);
    }

    const avgFees = (totalFees / runs).toFixed(1);
    const avgIL = (totalIL / runs).toFixed(1);

    toast.success(`Monte-Carlo complete (${runs} paths)`, {
      description: `30-day: +$${avgFees} fees | ${avgIL}% IL (vol ${volatility}%)`,
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-nexus-bg pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-10">
            <div className="inline text-cyan-400 text-xs font-medium tracking-[2px]">POWERED BY GROK AI</div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">LP Simulator</h1>
            <p className="text-white/50 mt-2">See exactly what your range will earn</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <GlassCard>
                <div className="flex justify-between items-center mb-5">
                  <div className="font-medium text-sm">ETH / USDC • Uniswap V3</div>
                  <div className="text-emerald-400 text-xs">Base</div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-white/50">Min Price</span>
                      <span className="font-mono">${minPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="5000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-white/50">Max Price</span>
                      <span className="font-mono">${maxPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="5000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-white/50">Market Volatility</span>
                      <span className="font-mono">{volatility}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      value={volatility}
                      onChange={(e) => setVolatility(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="text-white/40 text-xs mb-1">Current market price</div>
                    <div className="text-2xl font-mono font-semibold">${currentPrice}</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="text-center">
                <button
                  onClick={runMonteCarlo}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition"
                >
                  <Play size={16} />
                  Run Monte-Carlo Simulation
                </button>
                <p className="text-xs text-white/40 mt-3">30-day projection • 1,000 paths</p>
              </GlassCard>
            </div>

            <div className="lg:col-span-3">
              <GlassCard className="p-6">
                <div className="text-center mb-8">
                  <div className="text-emerald-400 font-mono text-4xl font-semibold tracking-tight">
                    +${estFees} fees
                  </div>
                  <div className="text-white/40 text-sm">30-day estimate</div>
                </div>

                <div className="relative h-4 bg-white/10 rounded-full mb-10 overflow-hidden">
                  <div
                    className="absolute h-4 bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 rounded-full"
                    style={{ left: `${Math.max(0, currentPos - rangeWidth / 2)}%`, width: `${rangeWidth}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-cyan-400 shadow-[0_0_15px_#67e8f9]"
                    style={{ left: `${currentPos}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-white/40 text-xs">Est. IL</div>
                    <div className="text-lg font-medium text-orange-400">{estIL}%</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">APY</div>
                    <div className="text-lg font-medium">18.4%</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">TVL in range</div>
                    <div className="text-lg font-medium">$1.24M</div>
                  </div>
                </div>

                <div className="mt-8 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData}>
                      <defs>
                        <linearGradient id="fees" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#67e8f9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#ffffff30" fontSize={10} />
                      <YAxis stroke="#ffffff30" fontSize={10} />
                      <Tooltip contentStyle={{ background: "#0f1117", border: "none", borderRadius: "8px", fontSize: "12px" }} />
                      <Area type="natural" dataKey="fees" stroke="#67e8f9" strokeWidth={2} fill="url(#fees)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
