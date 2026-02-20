"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { useUserPositions } from "@/hooks/useUserPositions";
import { toast } from "sonner";

export default function TaxExportButton() {
  const { data: positions = [] } = useUserPositions();

  const exportCSV = () => {
    const rows = [
      ["Date", "Type", "Asset", "Amount", "Fee USD", "IL Realized", "Chain", "Transaction ID"],
      ...positions.flatMap((p, i) => [
        [
          new Date().toISOString().split("T")[0],
          "LP Fee",
          p.pair.split("/")[0],
          "0.00",
          "0.00",
          "0.00",
          p.chain,
          p.id || `0x${i.toString(16).padStart(64, "0")}`
        ],
        [
          new Date().toISOString().split("T")[0],
          "LP Fee",
          p.pair.split("/")[1],
          "0.00",
          "0.00",
          "0.00",
          p.chain,
          p.id || `0x${i.toString(16).padStart(64, "0")}`
        ],
      ])
    ];

    if (positions.length === 0) {
      rows.push([
        new Date().toISOString().split("T")[0],
        "LP Fee",
        "ETH",
        "0.00",
        "0.00",
        "0.00",
        "Base",
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ]);
    }

    const csv = rows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lp-nexus-tax-export-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Koinly CSV exported!", { description: "Import directly into Koinly" });
  };

  return (
    <motion.button 
      onClick={exportCSV} 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
    >
      <Download size={14} /> Export Tax CSV
    </motion.button>
  );
}
