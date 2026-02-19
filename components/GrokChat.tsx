"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
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

  if (!isOpen) return null;

  return (
    <div className="fixed right-8 bottom-8 w-96 h-[560px] glass rounded-3xl flex flex-col shadow-2xl neon-cyan z-50">
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
          <div>
            <div className="font-semibold">Grok AI</div>
            <div className="text-xs text-emerald-400">Online • Powered by xAI</div>
          </div>
        </div>
        <button onClick={onClose}><X size={20} /></button>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-cyan-500/20" : "glass"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-white/50">Grok is thinking...</div>}
      </div>

      <div className="p-5 border-t border-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about your positions..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400"
          />
          <button onClick={sendMessage} disabled={loading} className="bg-cyan-500 text-black p-3 rounded-2xl hover:bg-cyan-400 transition">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
