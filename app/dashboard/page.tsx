"use client";

import { usePositions } from "@/hooks/usePositions";
import { PositionCard } from "@/components/positions/PositionCard";
import { useWalletStore } from "@/store/walletStore";
import { Skeleton } from "@/components/ui/skeleton";
import { WalletMultiSelector } from "@/components/wallet/WalletMultiSelector";
import { Logo } from "@/components/common/Logo";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { positions, isLoading } = usePositions();
  const { connectedAddresses } = useWalletStore();

  const totalValue = positions.reduce((sum, p) => sum + p.totalValueUsd, 0);
  const totalFees = positions.reduce(
    (sum, p) => sum + (p.uncollectedFeesUsd || 0),
    0
  );
  const avgIl =
    positions.length > 0
      ? positions.reduce((sum, p) => sum + p.impermanentLossPercent, 0) /
        positions.length
      : 0;

  if (connectedAddresses.length === 0 && positions.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Logo className="mx-auto h-16 mb-8" />
          <h2 className="text-4xl font-bold mb-4 text-white">
            No positions yet
          </h2>
          <p className="text-zinc-400 mb-8">
            Connect wallets or watch addresses to discover LPs
          </p>
          <WalletMultiSelector />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo className="h-8" />
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-zinc-500">Portfolio Value</p>
              <p className="text-xl font-bold text-white">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <WalletMultiSelector />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <p className="text-zinc-500 text-sm mb-1">Total LP Value</p>
                <p className="text-2xl font-bold text-white">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <p className="text-zinc-500 text-sm mb-1">Unclaimed Fees</p>
                <p className="text-2xl font-bold text-emerald-400">
                  +${totalFees.toLocaleString()}
                </p>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <p className="text-zinc-500 text-sm mb-1">Avg IL</p>
                <p
                  className={`text-2xl font-bold ${
                    avgIl >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {avgIl.toFixed(2)}%
                </p>
              </div>
              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                <p className="text-zinc-500 text-sm mb-1">Active Positions</p>
                <p className="text-2xl font-bold text-white">
                  {positions.length}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl bg-zinc-900" />
              ))
            ) : positions.length > 0 ? (
              positions.map((position) => (
                <PositionCard key={position.id} position={position} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-zinc-500">
                  No positions found. Add a watch address or connect a wallet
                  with LP positions.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
