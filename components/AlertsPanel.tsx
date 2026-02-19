"use client";

import { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, TrendingUp } from "lucide-react";
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
      <button
        onClick={() => setOpen(!open)}
        className="relative p-3 rounded-2xl hover:bg-white/10 transition"
      >
        <Bell size={22} />
        {alerts.length > 0 && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="fixed right-8 top-24 w-96 glass rounded-3xl p-6 z-50 max-h-[70vh] overflow-y-auto neon-cyan">
          <div className="flex justify-between mb-6">
            <div className="font-semibold text-xl">Alerts</div>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {alerts.length === 0 ? (
            <div className="text-white/50 text-center py-12">All clear – no alerts</div>
          ) : (
            alerts.map((a) => (
              <div key={a.id} className="glass p-5 rounded-2xl mb-4 flex gap-4">
                {a.type === "warning" ? (
                  <AlertTriangle className="text-orange-400 mt-0.5" />
                ) : (
                  <TrendingUp className="text-emerald-400 mt-0.5" />
                )}
                <div>
                  <div className="font-medium">{a.message}</div>
                  <div className="text-xs text-white/50 mt-1">{a.time}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
