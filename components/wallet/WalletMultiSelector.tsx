"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Wallet, X } from "lucide-react";

export function WalletMultiSelector() {
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const { publicKey: solanaPublicKey, connected: isSolanaConnected } = useWallet();
  const [showOptions, setShowOptions] = useState(false);

  const hasConnectedWallet = isEvmConnected || isSolanaConnected;

  return (
    <div className="relative">
      {!hasConnectedWallet ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowOptions(true)}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet
          <ChevronDown className="w-4 h-4 opacity-60" />
        </motion.button>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {isEvmConnected && (
            <ConnectButton
              showBalance={false}
              accountStatus="address"
              chainStatus="icon"
            />
          )}
          {isSolanaConnected && (
            <WalletMultiButton className="!bg-gradient-to-r !from-violet-600 !to-fuchsia-600 !rounded-full !px-6 !py-3 !font-semibold !shadow-lg !shadow-violet-500/25" />
          )}
        </div>
      )}

      <AnimatePresence>
        {showOptions && !hasConnectedWallet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 z-50 shadow-2xl"
            >
              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-semibold mb-4 text-center">
                Connect Your Wallet
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-zinc-800/50 rounded-xl">
                  <p className="text-sm text-zinc-400 mb-3">EVM Chains</p>
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button
                        onClick={() => {
                          openConnectModal();
                          setShowOptions(false);
                        }}
                        className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="flex -space-x-2">
                          <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">
                            E
                          </span>
                          <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">
                            A
                          </span>
                        </span>
                        Ethereum & L2s
                      </button>
                    )}
                  </ConnectButton.Custom>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-xl">
                  <p className="text-sm text-zinc-400 mb-3">Solana</p>
                  <WalletMultiButton className="!w-full !py-3 !px-4 !bg-zinc-800 hover:!bg-zinc-700 !rounded-lg !font-medium !flex !items-center !justify-center !gap-2" />
                </div>
              </div>

              <p className="mt-4 text-xs text-zinc-500 text-center">
                By connecting, you agree to our Terms of Service
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
