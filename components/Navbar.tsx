"use client";

import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <div>
            <div className="font-bold text-2xl tracking-tighter gradient-text">LP NEXUS</div>
            <div className="text-[10px] text-white/50 -mt-1">2026</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className={`transition-colors ${isActive("/") ? "text-nexus-cyan" : "hover:text-nexus-cyan"}`}>Home</Link>
          <Link href="/simulator" className={`transition-colors ${isActive("/simulator") ? "text-nexus-cyan" : "hover:text-nexus-cyan"}`}>Simulator</Link>
          <Link href="#analytics" className="hover:text-nexus-cyan transition-colors">Analytics</Link>
          <Link href="#alerts" className="hover:text-nexus-cyan transition-colors">Alerts</Link>
        </div>

        <div className="flex items-center gap-4">
          <ConnectButton />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 p-6 flex flex-col gap-6 text-center">
          <Link href="/" className="text-lg">Home</Link>
          <Link href="/simulator" className="text-lg">Simulator</Link>
          <Link href="#analytics" className="text-lg">Analytics</Link>
          <Link href="#alerts" className="text-lg">Alerts</Link>
        </div>
      )}
    </nav>
  );
}
