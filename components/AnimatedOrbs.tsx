"use client";

import { motion } from "framer-motion";

export default function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-20 left-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
        animate={{
          x: [0, 180, -120],
          y: [0, -140, 100],
        }}
        transition={{ duration: 28, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-32 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px]"
        animate={{
          x: [0, -160, 140],
          y: [0, 110, -90],
        }}
        transition={{ duration: 32, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 18, repeat: Infinity }}
      />
    </div>
  );
}
