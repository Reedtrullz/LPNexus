"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GrokChat from "@/components/GrokChat";
import AnimatedOrbs from "@/components/AnimatedOrbs";
import GlassCard from "@/components/ui/GlassCard";
import PositionCard from "@/components/PositionCard";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import TaxExportButton from "@/components/TaxExportButton";
import { useUserPositions } from "@/hooks/useUserPositions";
import { ArrowRight, Plus, Shield, Brain, Zap, Globe, BarChart3 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { isConnected } = useAccount();
  const [chatOpen, setChatOpen] = useState(false);
  const { data: positions = [], isLoading } = useUserPositions();

  const mockPositions = [
    { pair: "ETH/USDC", chain: "Base", il: -0.8, fees: "1.24", tvl: "184k" },
    { pair: "SOL/RAY", chain: "Solana", il: 2.3, fees: "0.87", tvl: "92k" },
    { pair: "WBTC/ETH", chain: "Arbitrum", il: -1.4, fees: "3.12", tvl: "421k" },
  ];

  if (!isConnected) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-nexus-bg page-bg text-white overflow-hidden">
          <section className="hero-bg pt-32 pb-20 relative overflow-hidden">
            <AnimatedOrbs />
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE ON 7 CHAINS
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                >
                  Your Liquidity.<br />
                  <span className="gradient-text-static">Finally Understood.</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-white/60 max-w-lg leading-relaxed"
                >
                  Auto-discovers every LP position. Real-time IL tracking, fee harvesting, AI insights, and Monte-Carlo simulations.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <ConnectButton />
                  <motion.a
                    href="/simulator"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 flex items-center gap-2 transition-colors text-white/80 hover:text-white"
                  >
                    Try Simulator
                    <ArrowRight size={16} />
                  </motion.a>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-6 text-sm text-white/50 pt-2"
                >
                  <span className="flex items-center gap-2">
                    <Shield size={14} className="text-emerald-400" />
                    Privacy-first
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap size={14} className="text-cyan-400" />
                    PWA ready
                  </span>
                  <span className="flex items-center gap-2">
                    <Brain size={14} className="text-violet-400" />
                    Grok AI powered
                  </span>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative hidden md:block"
              >
                <div className="absolute -left-8 top-8 rotate-[-6deg] scale-95 opacity-40">
                  <PositionCard />
                </div>
                <div className="relative z-10">
                  <PositionCard />
                </div>
              </motion.div>
            </div>
          </section>

          <div className="border-y border-white/5 py-6 bg-black/20">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 md:gap-x-16 gap-y-3 text-xs md:text-sm tracking-widest text-white/40 font-medium">
              <span>UNISWAP</span>
              <span>RAYDIUM</span>
              <span>AERODROME</span>
              <span>CURVE</span>
              <span>PANCAKE</span>
              <span>ORCA</span>
              <span className="text-white/20">+ 60 MORE</span>
            </div>
          </div>

          <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="text-nexus-cyan text-xs font-medium tracking-[2px] mb-3">BUILT FOR 2026 FARMERS</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">Everything you need. Nothing you don't.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[
                { icon: Shield, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "Impermanent Loss Shield", desc: "Real-time IL tracking + Monte-Carlo 30-day forecasts." },
                { icon: Brain, color: "text-violet-400", bg: "bg-violet-500/10", title: "Grok AI Co-Pilot", desc: "Get instant answers about your positions and rebalancing suggestions." },
                { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10", title: "One-Click Harvest", desc: "Claim fees across 7 chains from a single dashboard." },
                { icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "Multi-Chain Native", desc: "ETH, Base, Arbitrum, Solana, Polygon, Blast, Berachain…" },
                { icon: BarChart3, color: "text-violet-400", bg: "bg-violet-500/10", title: "Beautiful Charts", desc: "Lightweight-charts + range visualization that actually makes sense." },
                { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10", title: "Tax Export Ready", desc: "Koinly / ZenLedger CSV in one click. Zero headache." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <GlassCard variant="elevated" className="h-full p-5">
                    <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-black/30 py-14 md:py-18 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <div className="text-emerald-400 text-xs font-medium tracking-[2px] mb-2">SEE IT LIVE</div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">Your positions, finally beautiful</h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <PositionCard />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <PositionCard />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <PositionCard />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 text-center">
            <div className="max-w-xl mx-auto px-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-5"
              >
                Stop guessing.<br />Start farming smarter.
              </motion.h2>
              <ConnectButton label="Connect Wallet & Get Started" />
              <p className="text-white/40 text-sm mt-6">No KYC • No tracking • Your keys, your data</p>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30">
          © 2026 LP Nexus • Built for DeFi farmers
        </footer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pl-0 md:pl-72 pt-20 md:pt-24 min-h-screen bg-nexus-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-3xl font-semibold tracking-tight"
              >
                Welcome back, Farmer
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white/50 mt-1 text-sm"
              >
                3 active positions • +$487 fees this week
              </motion.p>
            </div>
            <motion.button 
              onClick={() => setChatOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-elevated px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
            >
              <Brain size={16} className="text-violet-400" />
              Ask Grok AI
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[
              { label: "Total Value", value: "$697k", change: "+4.2%", positive: true },
              { label: "Est. IL", value: "-1.1%", change: "neutral", neutral: true },
              { label: "Fees 7d", value: "$2,184", change: "+18%", positive: true },
              { label: "Positions", value: positions.length > 0 ? positions.length.toString() : "3", change: "" },
            ].map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard variant="elevated" className="p-4">
                  <div className="text-white/40 text-xs font-medium">{kpi.label}</div>
                  <div className="text-xl md:text-2xl font-semibold mt-1">{kpi.value}</div>
                  {kpi.change && (
                    <div className={`text-xs mt-1 ${kpi.positive ? 'text-emerald-400' : kpi.neutral ? 'text-white/40' : ''}`}>
                      {kpi.change}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total TVL", value: "$697,420" },
              { label: "Lifetime Fees", value: "$8,421", color: "text-emerald-400" },
              { label: "Unrealized IL", value: "-1.4%", color: "text-orange-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <GlassCard variant="surface" className="p-4">
                  <div className="text-white/40 text-sm">{stat.label}</div>
                  <div className={`text-xl md:text-2xl font-semibold mt-1 ${stat.color || ""}`}>{stat.value}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h2 className="text-lg font-semibold">My Positions</h2>
            <div className="flex gap-3 flex-wrap">
              <TaxExportButton />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-cyan-400 text-sm font-medium"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Position</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              <div className="col-span-full text-center py-10 text-white/40">
                Scanning blockchain for your positions...
              </div>
            ) : positions.length > 0 ? (
              positions.map((pos, i) => (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <PositionCard
                    id={pos.id}
                    pair={pos.pair}
                    chain={pos.chain}
                    chainId={pos.chainId}
                    il={0}
                    fees={pos.feesOwed}
                    tvl={pos.liquidity}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-white/40">
                No active LP positions found yet
              </div>
            )}
          </div>
        </div>
      </div>

      <PWAInstallPrompt />
      <GrokChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
