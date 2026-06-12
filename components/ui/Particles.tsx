"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ParticlesProps = {
  count?: number;
  className?: string;
};

export default function Particles({ count = 30, className = "" }: ParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: `${Math.random() * 4 + 3}s`,
        delay: `${Math.random() * 3}s`,
        isGold: Math.random() > 0.6,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle-dot absolute rounded-full ${p.isGold ? "bg-gold/40" : "bg-purple-400/30"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function HeroOrb() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 -left-32 h-[300px] w-[300px] rounded-full bg-purple-800/15 blur-[80px]"
        animate={{ x: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
