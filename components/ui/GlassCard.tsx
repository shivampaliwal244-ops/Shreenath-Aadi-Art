"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "purple" | "gold" | "none";
};

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = "purple",
}: GlassCardProps) {
  const glowClass =
    glow === "gold"
      ? "hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
      : glow === "purple"
        ? "hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]"
        : "";

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${glowClass} ${hover ? "transition-shadow duration-500" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
