"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-3xl px-8 py-5 flex items-center gap-6 z-50 max-w-md shadow-2xl neon-cyan border border-cyan-400/30">
      <div className="flex-1">
        <div className="font-semibold text-lg">Install LP Nexus</div>
        <div className="text-sm text-white/70">Add to home screen for instant access • Works offline</div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setShow(false)} className="px-5 py-2 text-sm">Later</button>
        <button onClick={handleInstall} className="bg-cyan-500 text-black px-6 py-2 rounded-2xl font-semibold flex items-center gap-2">
          <Download size={18} /> Install
        </button>
      </div>
    </div>
  );
}
