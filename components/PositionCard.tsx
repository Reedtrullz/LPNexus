"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePositionActions } from "@/hooks/usePositionActions";
import { toast } from "sonner";

interface PositionCardProps {
  id?: string;
  pair?: string;
  chain?: string;
  il?: number;
  fees?: string;
  tvl?: string;
  minPrice?: number;
  maxPrice?: number;
  chainId?: number;
}

export default function PositionCard({ 
  id, 
  pair = "ETH/USDC", 
  chain = "Base", 
  il = -0.8, 
  fees = "1.24", 
  tvl = "184k",
  minPrice,
  maxPrice,
  chainId
}: PositionCardProps) {
  const [showRebalance, setShowRebalance] = useState(false);
  const { harvestFees, rebalance, isConfirming, hash } = usePositionActions();
  
  const ilColor = il >= 0 ? "text-emerald-400" : "text-red-400";

  const handleHarvest = () => {
    if (!id) {
      toast.error("No position ID available");
      return;
    }
    harvestFees(id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="glass-elevated rounded-3xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="w-9 h-9 bg-yellow-500 rounded-full border-2 border-nexus-surface flex items-center justify-center text-xs"
            >
              {pair.split('/')[0]}
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="w-9 h-9 bg-blue-500 rounded-full border-2 border-nexus-surface flex items-center justify-center text-xs"
            >
              {pair.split('/')[1]}
            </motion.div>
          </div>
          <div>
            <motion.div 
              className="font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {pair} • Uniswap V3
            </motion.div>
            <motion.div 
              className="text-xs text-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {chain} • Active
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="text-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-emerald-400 font-mono text-sm animate-data-pop">+{fees}%</div>
          <div className="text-xs text-white/50">24h fees</div>
        </motion.div>
      </div>

      <div className="h-2 bg-white/10 rounded-full relative mb-6 overflow-hidden">
        <motion.div 
          className="absolute left-[20%] right-[35%] h-2 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-cyan-400 shadow-[0_0_12px_#67e8f9]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="text-white/50 text-xs">IL</div>
          <div className={`font-mono ${ilColor} animate-count-up`}>{il}%</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-white/50 text-xs">Fees</div>
          <div className="font-mono animate-count-up">{fees} ETH</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="text-white/50 text-xs">TVL</div>
          <div className="font-mono animate-count-up">${tvl}</div>
        </motion.div>
      </div>

      <div className="flex gap-3 mt-6">
        <motion.button
          onClick={handleHarvest}
          disabled={isConfirming}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400 font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isConfirming ? "Confirming..." : "Harvest Fees"}
        </motion.button>
        <motion.button
          onClick={() => setShowRebalance(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 rounded-2xl text-violet-400 font-medium text-sm"
        >
          Rebalance
        </motion.button>
      </div>

      {hash && (
        <motion.a 
          href={`https://${chainId === 8453 ? 'basescan.org' : chainId === 42161 ? 'arbiscan.io' : 'etherscan.io'}/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 w-full py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs text-white/50 hover:text-white/80 transition"
        >
          View last tx <ExternalLink size={12} />
        </motion.a>
      )}

      <AnimatePresence>
        {showRebalance && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-floating rounded-3xl p-8 w-full max-w-md"
            >
              <h3 className="text-2xl font-semibold mb-2">Rebalance {pair}</h3>
              <p className="text-white/50 text-sm mb-6">Adjust your price range to optimize for current market conditions.</p>
              
              <div className="space-y-4 mb-6">
                <motion.button 
                  onClick={() => { rebalance(id || "0", -200, 200); setShowRebalance(false); }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-left"
                >
                  <div className="font-medium text-cyan-400">Tight Range</div>
                  <div className="text-xs text-white/50">±2% from current price</div>
                </motion.button>
                <motion.button 
                  onClick={() => { rebalance(id || "0", -500, 500); setShowRebalance(false); }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-2xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-left"
                >
                  <div className="font-medium text-violet-400">Balanced Range</div>
                  <div className="text-xs text-white/50">±5% from current price</div>
                </motion.button>
                <motion.button 
                  onClick={() => { rebalance(id || "0", -1000, 1000); setShowRebalance(false); }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left"
                >
                  <div className="font-medium text-emerald-400">Wide Range</div>
                  <div className="text-xs text-white/50">±10% from current price</div>
                </motion.button>
              </div>
              
              <motion.button 
                onClick={() => setShowRebalance(false)} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
