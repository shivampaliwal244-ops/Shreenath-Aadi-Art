"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black-deep"
          aria-hidden="true"
        >
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-3xl font-light tracking-widest sm:text-4xl">
                {BRAND.name.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className={i === 2 ? "gold-gradient-text" : "text-white"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="mt-3 text-sm tracking-[0.4em] text-white/40 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Premium Wooden Art
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mx-auto mt-8 h-px w-48 overflow-hidden bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
