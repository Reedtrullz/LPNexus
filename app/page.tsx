"use client";

import Navbar from "@/components/Navbar";
import AnimatedOrbs from "@/components/AnimatedOrbs";
import GlassCard from "@/components/ui/GlassCard";
import PositionCard from "@/components/PositionCard";
import { ArrowRight, Shield, Brain, Zap, Globe, BarChart3 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-nexus-bg text-white overflow-hidden">
        <section className="hero-bg pt-32 pb-24 relative overflow-hidden">
          <AnimatedOrbs />
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest">
                🔥 LIVE ON 7 CHAINS • 60+ DEXes
              </div>

              <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none">
                Your Liquidity.<br />
                <span className="gradient-text">Finally Understood.</span>
              </h1>

              <p className="text-2xl text-white/70 max-w-lg">
                Auto-discovers every LP position. Real-time IL, fees, AI insights, Monte-Carlo sims, tax exports.
              </p>

              <div className="flex flex-wrap gap-4">
                <ConnectButton />
                <a
                  href="#simulator"
                  className="px-8 py-4 rounded-2xl border border-white/20 hover:border-white/40 flex items-center gap-3 group transition-all"
                >
                  Try Simulator (no wallet)
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </a>
              </div>

              <div className="flex gap-8 text-sm pt-4">
                <div>✅ Privacy-first</div>
                <div>✅ PWA ready</div>
                <div>✅ Grok AI powered</div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -left-10 top-10 rotate-[-8deg] scale-90">
                <PositionCard />
              </div>
              <div className="relative z-10">
                <PositionCard />
              </div>
            </div>
          </div>
        </section>

        <div className="border-b border-white/10 py-8 bg-black/30">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-6 opacity-75 text-sm tracking-widest">
            UNISWAP • RAYDIUM • AERODROME • CURVE • PANCAKE • ORCA • 60 MORE
          </div>
        </div>

        <section id="discover" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-nexus-cyan text-sm tracking-[3px] mb-3">BUILT FOR 2026 FARMERS</div>
            <h2 className="text-5xl font-bold tracking-tighter">Everything you need.<br />Nothing you don't.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <Shield className="w-12 h-12 text-nexus-emerald mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Impermanent Loss Shield</h3>
              <p className="text-white/70">Real-time IL tracking + Monte-Carlo 30-day forecasts.</p>
            </GlassCard>

            <GlassCard>
              <Brain className="w-12 h-12 text-nexus-violet mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Grok AI Co-Pilot</h3>
              <p className="text-white/70">"Why is my position down 12%" → instant answer + rebalance suggestion.</p>
            </GlassCard>

            <GlassCard>
              <Zap className="w-12 h-12 text-nexus-cyan mb-6" />
              <h3 className="text-2xl font-semibold mb-3">One-Click Harvest</h3>
              <p className="text-white/70">Claim fees across 7 chains from a single dashboard.</p>
            </GlassCard>

            <GlassCard>
              <Globe className="w-12 h-12 text-nexus-emerald mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Multi-Chain Native</h3>
              <p className="text-white/70">ETH, Base, Arbitrum, Solana, Polygon, Blast, Berachain…</p>
            </GlassCard>

            <GlassCard>
              <BarChart3 className="w-12 h-12 text-nexus-violet mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Beautiful Charts</h3>
              <p className="text-white/70">Lightweight-charts + range visualization that actually makes sense.</p>
            </GlassCard>

            <GlassCard>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center mb-6">
                📊
              </div>
              <h3 className="text-2xl font-semibold mb-3">Tax Export Ready</h3>
              <p className="text-white/70">Koinly / ZenLedger CSV in one click. Zero headache.</p>
            </GlassCard>
          </div>
        </section>

        <section className="bg-black/40 py-24 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="text-emerald-400 text-sm tracking-widest mb-2">SEE IT LIVE</div>
              <h2 className="text-5xl font-bold tracking-tighter">Your positions, finally beautiful</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <PositionCard />
              <PositionCard />
              <PositionCard />
            </div>
          </div>
        </section>

        <section className="py-32 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-6xl font-bold tracking-tighter mb-8">
              Stop guessing.<br />Start farming smarter.
            </h2>
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
