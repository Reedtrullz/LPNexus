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
        <main className="min-h-screen bg-nexus-bg text-white overflow-hidden">
          <section className="hero-bg pt-32 pb-24 relative overflow-hidden">
            <AnimatedOrbs />
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest"
                >
                  🔥 LIVE ON 7 CHAINS • 60+ DEXes
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]"
                >
                  Your Liquidity.<br />
                  <span className="gradient-text">Finally Understood.</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-lg"
                >
                  Auto-discovers every LP position. Real-time IL, fees, AI insights, Monte-Carlo sims, tax exports.
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
                    className="px-8 py-4 rounded-2xl border border-white/20 hover:border-white/40 flex items-center gap-3 group transition-all"
                  >
                    Try Simulator (no wallet)
                    <ArrowRight className="group-hover:translate-x-1 transition" />
                  </motion.a>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-6 md:gap-8 text-sm pt-4"
                >
                  <div>✅ Privacy-first</div>
                  <div>✅ PWA ready</div>
                  <div>✅ Grok AI powered</div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative hidden md:block"
              >
                <div className="absolute -left-10 top-10 rotate-[-8deg] scale-90 opacity-50">
                  <PositionCard />
                </div>
                <div className="relative z-10">
                  <PositionCard />
                </div>
              </motion.div>
            </div>
          </section>

          <div className="border-b border-white/10 py-8 bg-black/30">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 md:gap-x-16 gap-y-4 opacity-75 text-xs md:text-sm tracking-widest">
              UNISWAP • RAYDIUM • AERODROME • CURVE • PANCAKE • ORCA • 60 MORE
            </div>
          </div>

          <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="text-nexus-cyan text-sm tracking-[3px] mb-3">BUILT FOR 2026 FARMERS</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Everything you need.<br />Nothing you don't.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Shield, color: "text-nexus-emerald", title: "Impermanent Loss Shield", desc: "Real-time IL tracking + Monte-Carlo 30-day forecasts." },
                { icon: Brain, color: "text-nexus-violet", title: "Grok AI Co-Pilot", desc: "\"Why is my position down 12%\" → instant answer + rebalance suggestion." },
                { icon: Zap, color: "text-nexus-cyan", title: "One-Click Harvest", desc: "Claim fees across 7 chains from a single dashboard." },
                { icon: Globe, color: "text-nexus-emerald", title: "Multi-Chain Native", desc: "ETH, Base, Arbitrum, Solana, Polygon, Blast, Berachain…" },
                { icon: BarChart3, color: "text-nexus-violet", title: "Beautiful Charts", desc: "Lightweight-charts + range visualization that actually makes sense." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard variant="elevated" className="h-full p-6">
                    {feature.icon && (
                      <feature.icon className={`w-12 h-12 ${feature.color} mb-6`} />
                    )}
                    <h3 className="text-xl md:text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <GlassCard variant="elevated" className="h-full p-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center mb-6">
                    📊
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">Tax Export Ready</h3>
                  <p className="text-white/70 text-sm">Koinly / ZenLedger CSV in one click. Zero headache.</p>
                </GlassCard>
              </motion.div>
            </div>
          </section>

          <section className="bg-black/40 py-16 md:py-24 border-t border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 md:12"
              >
                <div className="text-emerald-400 text-sm tracking-widest mb-2">SEE IT LIVE</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Your positions, finally beautiful</h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

          <section className="py-20 md:py-32 text-center">
            <div className="max-w-2xl mx-auto px-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 md:mb-8"
              >
                Stop guessing.<br />Start farming smarter.
              </motion.h2>
              <ConnectButton label="Connect Wallet & Get Started →" />
              <p className="text-white/50 text-sm mt-8">No KYC • No tracking • Your keys, your data</p>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 py-12 text-center text-xs text-white/40">
          © 2026 LP Nexus • Built with ❤️ for the best LP farmers on Earth
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
            className="flex flex-col sm:flex-row justify-between items-end mb-8 md:mb-12 gap-4"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
              >
                Welcome back, Farmer
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white/70 mt-1"
              >
                3 active positions • +$487 fees this week
              </motion.p>
            </div>
            <motion.button 
              onClick={() => setChatOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-elevated px-4 md:px-6 py-3 rounded-2xl flex items-center gap-3 tap-target"
            >
              Ask Grok AI
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {[
              { label: "Total Value", value: "$697k", change: "+4.2%" },
              { label: "Est. IL", value: "-1.1%", change: "neutral" },
              { label: "Fees 7d", value: "$2,184", change: "+18%" },
              { label: "Positions", value: positions.length > 0 ? positions.length.toString() : "3", change: "" },
            ].map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard variant="elevated" className="p-4 md:p-6">
                  <div className="text-white/50 text-xs md:text-sm">{kpi.label}</div>
                  <div className="text-2xl md:text-4xl font-mono font-semibold mt-1 md:mt-2">{kpi.value}</div>
                  {kpi.change && <div className="text-emerald-400 text-xs md:text-sm mt-1">{kpi.change}</div>}
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { label: "Total TVL", value: "$697,420" },
              { label: "Lifetime Fees", value: "$8,421", color: "text-emerald-400" },
              { label: "Unrealized IL", value: "-1.4%", color: "text-orange-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <GlassCard variant="surface" className="p-4 md:p-6">
                  <div className="text-white/50 text-sm">{stat.label}</div>
                  <div className={`text-2xl md:text-3xl font-mono font-bold mt-2 ${stat.color || ""}`}>{stat.value}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="text-xl md:text-2xl font-semibold">My Positions</div>
            <div className="flex gap-3 flex-wrap">
              <TaxExportButton />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-cyan-400 tap-target"
              >
                <Plus size={18} /> <span className="hidden sm:inline">New Position</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12 text-white/50">
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
              <div className="col-span-full text-center py-12 text-white/50">
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
