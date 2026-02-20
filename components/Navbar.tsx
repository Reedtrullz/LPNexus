"use client";

import Link from "next/link";
import { Wallet, Menu, X, Sparkles } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AlertsPanel from "./AlertsPanel";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/simulator", label: "Simulator" },
    { href: "#analytics", label: "Analytics" },
    { href: "#alerts", label: "Alerts" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <div>
            <div className="font-bold text-xl tracking-tight gradient-text-static">LP NEXUS</div>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link 
                href={link.href} 
                className={`relative transition-colors py-1 ${isActive(link.href) ? "text-white" : "text-white/50 hover:text-white"}`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <AlertsPanel />
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ConnectButton />
          </motion.div>
          <motion.button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-4 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className={`text-base ${isActive(link.href) ? "text-white" : "text-white/60"}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
