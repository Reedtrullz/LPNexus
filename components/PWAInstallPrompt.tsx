"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion } from "framer-motion";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 glass-floating rounded-2xl px-5 py-3.5 flex items-center gap-4 z-50 max-w-sm border border-cyan-500/20"
    >
      <div className="flex-1">
        <div className="font-medium text-sm">Install LP Nexus</div>
        <div className="text-xs text-white/50">Add to home screen for instant access</div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setShow(false)} 
          className="px-3 py-1.5 text-xs text-white/50 hover:text-white"
        >
          Later
        </button>
        <button 
          onClick={handleInstall} 
          className="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-cyan-400 transition-colors"
        >
          <Download size={12} /> Install
        </button>
      </div>
    </motion.div>
  );
}
