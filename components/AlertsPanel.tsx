"use client";

import { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";

type Alert = {
  id: string;
  type: "warning" | "success";
  message: string;
  time: string;
};

const useAlertsStore = create<{
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "time">) => void;
}>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        { ...alert, id: Date.now().toString(), time: new Date().toLocaleTimeString() },
        ...state.alerts,
      ].slice(0, 5),
    })),
}));

export default function AlertsPanel() {
  const [open, setOpen] = useState(false);
  const { alerts, addAlert } = useAlertsStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      addAlert({ type: "warning", message: "ETH/USDC position 18% out of range" });
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-2xl hover:bg-white/10 transition tap-target"
      >
        <Bell size={22} />
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-8 top-24 w-96 glass-floating rounded-3xl p-6 z-50 max-h-[70vh] overflow-y-auto"
          >
            <div className="flex justify-between mb-6">
              <div className="font-semibold text-xl">Alerts</div>
              <motion.button 
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {alerts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/50 text-center py-12"
              >
                All clear – no alerts
              </motion.div>
            ) : (
              <div className="space-y-3">
                {alerts.map((a, index) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-surface p-5 rounded-2xl flex gap-4"
                  >
                    {a.type === "warning" ? (
                      <AlertTriangle className="text-orange-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <TrendingUp className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium">{a.message}</div>
                      <div className="text-xs text-white/50 mt-1">{a.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
