"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

export default function GrokChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your Grok AI co-pilot. Ask me about any position, IL forecast, or rebalancing idea." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/grok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      toast.error("Grok is taking a break — try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed right-8 bottom-8 w-96 h-[560px] glass-floating rounded-3xl flex flex-col shadow-2xl z-50"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" 
              />
              <div>
                <div className="font-semibold">Grok AI</div>
                <div className="text-xs text-emerald-400">Online • Powered by xAI</div>
              </div>
            </div>
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex ${m.role === "user" ? "justify-end" : ""}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-cyan-500/20" : "glass-surface"}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/50"
              >
                Grok is thinking...
              </motion.div>
            )}
          </div>

          <div className="p-5 border-t border-white/10">
            <div className="flex gap-2">
              <motion.input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about your positions..."
                whileFocus={{ borderColor: "rgba(103, 232, 249, 0.5)" }}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <motion.button 
                onClick={sendMessage} 
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 text-black p-3 rounded-2xl hover:bg-cyan-400 transition-colors"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
