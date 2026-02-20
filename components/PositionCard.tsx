"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp, ExternalLink, MoreHorizontal } from "lucide-react";
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
  
  const ilColor = il >= 0 ? "text-emerald-400" : "text-orange-400";

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
      className="glass-elevated rounded-2xl p-5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <motion.div 
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-nexus-surface flex items-center justify-center text-xs font-medium"
            >
              {pair.split('/')[0]}
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="w-8 h-8 bg-blue-500 rounded-full border-2 border-nexus-surface flex items-center justify-center text-xs font-medium"
            >
              {pair.split('/')[1]}
            </motion.div>
          </div>
          <div>
            <div className="font-semibold text-sm">{pair}</div>
            <div className="text-xs text-emerald-400">{chain}</div>
          </div>
        </div>
        <motion.button 
          className="p-1.5 rounded-lg hover:bg-white/5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MoreHorizontal size={16} className="text-white/40" />
        </motion.button>
      </div>

      <div className="h-1.5 bg-white/10 rounded-full relative mb-5 overflow-hidden">
        <motion.div 
          className="absolute left-[20%] right-[35%] h-1.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-cyan-400 shadow-[0_0_10px_#67e8f9]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-white/40 text-xs">IL</div>
          <div className={`font-medium ${ilColor}`}>{il}%</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="text-white/40 text-xs">Fees</div>
          <div className="font-medium">{fees} ETH</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-white/40 text-xs">TVL</div>
          <div className="font-medium">${tvl}</div>
        </motion.div>
      </div>

      <div className="flex gap-2 mt-4">
        <motion.button
          onClick={handleHarvest}
          disabled={isConfirming}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <TrendingUp size={14} />
          {isConfirming ? "Confirming..." : "Harvest"}
        </motion.button>
        <motion.button
          onClick={() => setShowRebalance(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-xl text-violet-400 text-sm font-medium"
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
          className="mt-3 py-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition"
        >
          View tx <ExternalLink size={10} />
        </motion.a>
      )}

      <AnimatePresence>
        {showRebalance && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-floating rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold mb-1">Rebalance {pair}</h3>
              <p className="text-white/40 text-sm mb-5">Adjust your price range to optimize for current market conditions.</p>
              
              <div className="space-y-2.5 mb-5">
                <motion.button 
                  onClick={() => { rebalance(id || "0", -200, 200); setShowRebalance(false); }}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-left"
                >
                  <div className="font-medium text-cyan-400 text-sm">Tight Range</div>
                  <div className="text-white/40 text-xs">±2% from current price</div>
                </motion.button>
                <motion.button 
                  onClick={() => { rebalance(id || "0", -500, 500); setShowRebalance(false); }}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 px-4 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-left"
                >
                  <div className="font-medium text-violet-400 text-sm">Balanced Range</div>
                  <div className="text-white/40 text-xs">±5% from current price</div>
                </motion.button>
                <motion.button 
                  onClick={() => { rebalance(id || "0", -1000, 1000); setShowRebalance(false); }}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-left"
                >
                  <div className="font-medium text-emerald-400 text-sm">Wide Range</div>
                  <div className="text-white/40 text-xs">±10% from current price</div>
                </motion.button>
              </div>
              
              <motion.button 
                onClick={() => setShowRebalance(false)} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:text-white"
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
