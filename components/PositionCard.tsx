import { ArrowRight, TrendingUp } from "lucide-react";

export default function PositionCard() {
  return (
    <div className="glass rounded-3xl p-6 card-hover border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <div className="w-9 h-9 bg-yellow-500 rounded-full border-2 border-nexus-surface flex items-center justify-center text-xs">ETH</div>
            <div className="w-9 h-9 bg-blue-500 rounded-full border-2 border-nexus-surface flex items-center justify-center text-xs">USDC</div>
          </div>
          <div>
            <div className="font-semibold">ETH/USDC • Uniswap V3</div>
            <div className="text-xs text-emerald-400">Base • Active</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-emerald-400 font-mono text-sm">+4.82%</div>
          <div className="text-xs text-white/50">24h fees</div>
        </div>
      </div>

      <div className="h-2 bg-white/10 rounded-full relative mb-6 overflow-hidden">
        <div className="absolute left-[20%] right-[35%] h-2 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-cyan-400 shadow-[0_0_12px_#67e8f9]" />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="text-white/50 text-xs">IL</div>
          <div className="font-mono text-emerald-400">-0.8%</div>
        </div>
        <div>
          <div className="text-white/50 text-xs">Fees</div>
          <div className="font-mono">1.24 ETH</div>
        </div>
        <div>
          <div className="text-white/50 text-xs">TVL</div>
          <div className="font-mono">$184k</div>
        </div>
      </div>

      <button className="mt-6 w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-sm font-medium transition-all active:scale-95">
        Manage Position <ArrowRight size={16} />
      </button>
    </div>
  );
}
