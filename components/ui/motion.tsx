"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: {
            ...(typeof fadeUp.visible === "object" &&
            fadeUp.visible !== null &&
            "transition" in fadeUp.visible
              ? fadeUp.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <Reveal className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {title.split(" ").map((word, i) => (
          <span key={i}>
            {i > 0 && " "}
            <span
              className={
                i === title.split(" ").length - 1
                  ? "gold-gradient-text"
                  : undefined
              }
            >
              {word}
            </span>
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </Reveal>
  );
}
