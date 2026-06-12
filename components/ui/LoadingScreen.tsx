"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 1. Logic simplify kiya (No setState inside effect loop issues)
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // 2. Deterministic logic (Koi Math.random() nahi, build pass ho jayega)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: (i * 13) % 100,
      top: (i * 17) % 100,
      duration: 2 + (i % 3),
      delay: (i % 5) * 0.4,
    }));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          aria-hidden="true"
        >
          {/* Deterministic Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute h-1 w-1 rounded-full bg-gold/60"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}

          {/* Rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-purple-500/20"
              style={{
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: ring * 0.3,
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center">
            <h1 className="font-display text-3xl font-light tracking-widest text-white sm:text-4xl">
              {BRAND.name}
            </h1>
            <p className="mt-3 text-sm tracking-[0.4em] text-white/40 uppercase">
              Premium Wooden Art
            </p>

            {/* Progress bar */}
            <div className="mx-auto mt-8 h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}