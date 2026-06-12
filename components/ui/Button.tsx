"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp" | "gold";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] border border-purple-400/30",
  secondary:
    "bg-white/[0.05] text-white border border-white/15 hover:bg-white/[0.1] hover:border-white/25 backdrop-blur-sm",
  ghost:
    "bg-transparent text-white/80 hover:text-white hover:bg-white/[0.05] border border-transparent",
  whatsapp:
    "bg-[#25D366] text-white shadow-[0_0_30px_rgba(37,211,102,0.35)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] border border-[#25D366]/50",
  gold: "bg-gradient-to-r from-gold-dark to-gold text-black font-semibold shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] border border-gold/40",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
  type = "button",
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        {...motionProps}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClass}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
