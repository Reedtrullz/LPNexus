"use client";

import Link from "next/link";
import { Home, BarChart3, PlayCircle, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { address } = useAccount();

  return (
    <div className={`fixed left-0 top-0 bottom-0 z-50 glass border-r border-white/10 transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>
      <div className="p-6 flex items-center justify-between">
        {!collapsed && <div className="font-bold text-2xl gradient-text">LP NEXUS</div>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-white/10 rounded-xl">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="px-3 space-y-2">
        {[
          { icon: Home, label: "Dashboard", href: "/" },
          { icon: BarChart3, label: "Analytics", href: "#analytics" },
          { icon: PlayCircle, label: "Simulator", href: "/simulator" },
          { icon: Bell, label: "Alerts", href: "#alerts" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 rounded-2xl text-sm font-medium transition"
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      {address && (
        <div className="absolute bottom-8 left-6 right-6">
          <div className="glass rounded-2xl p-4 text-xs">
            <div className="text-white/50 mb-1">Connected</div>
            <div className="font-mono text-cyan-400 truncate">{address}</div>
          </div>
        </div>
      )}
    </div>
  );
}
