"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";

export default function GlobalSimulatorPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo className="h-8" />
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-12 text-center">
              <h1 className="text-3xl font-bold text-white mb-4">
                Global IL Simulator
              </h1>
              <p className="text-zinc-400 mb-6">
                Standalone simulator with custom token pairs coming in Phase 5 polish.
              </p>
              <p className="text-zinc-500">
                For now, use the per-position simulator for the full interactive experience with live data.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
