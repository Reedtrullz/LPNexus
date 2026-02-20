"use client";

import Link from "next/link";
import { Home, BarChart3, PlayCircle, Bell, ChevronLeft, ChevronRight } from "lucide-react";
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
      className={`fixed left-0 top-0 bottom-0 z-50 glass-surface border-r border-white/10 transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
    >
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-2xl gradient-text"
            >
              LP NEXUS
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button 
          onClick={() => setCollapsed(!collapsed)} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-white/10 rounded-xl tap-target"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </motion.button>
      </div>

      <div className="px-3 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-medium transition relative ${
                isActive(item.href) 
                  ? "text-cyan-400 bg-cyan-400/10" 
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive(item.href) && (
                <motion.div 
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full"
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
            className="absolute bottom-8 left-6 right-6"
          >
            <div className="glass rounded-2xl p-4 text-xs">
              <div className="text-white/50 mb-1">Connected</div>
              <div className="font-mono text-cyan-400 truncate">{address}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
