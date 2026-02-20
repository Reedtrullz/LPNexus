"use client";

import Link from "next/link";
import { Home, BarChart3, PlayCircle, Bell, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { address } = useAccount();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BarChart3, label: "Analytics", href: "#analytics" },
    { icon: PlayCircle, label: "Simulator", href: "/simulator" },
    { icon: Bell, label: "Alerts", href: "#alerts" },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed left-0 top-0 bottom-0 z-40 glass-surface border-r border-white/5 transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
    >
      <div className="p-4 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-lg gradient-text-static"
            >
              LP NEXUS
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button 
          onClick={() => setCollapsed(!collapsed)} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 hover:bg-white/5 rounded-lg"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </motion.button>
      </div>

      <div className="px-2.5 space-y-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition relative ${
                isActive(item.href) 
                  ? "text-white bg-white/5" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} className={isActive(item.href) ? "text-cyan-400" : ""} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive(item.href) && (
                <motion.div 
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-400 rounded-r-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {address && !collapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-5 left-3 right-3"
          >
            <div className="glass rounded-xl p-3 text-xs">
              <div className="text-white/40 mb-1">Connected</div>
              <div className="text-cyan-400 font-mono truncate">{address}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
