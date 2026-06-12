"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ParticlesProps = {
  count?: number;
  className?: string;
};

export default function Particles({ count = 30, className = "" }: ParticlesProps) {
  // Deterministic math logic (No Math.random() here)
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 13) % 100,
      y: (i * 17) % 100,
      size: (i % 3) + 1,
      duration: 3 + (i % 3),
      delay: (i % 5) * 0.2,
      isGold: i % 2 === 0,
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.isGold ? "bg-gold/40" : "bg-purple-400/30"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s infinite ${p.delay}s`,
          }}
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
    </div>
  );
}