"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import {
  BRAND,
  STATS,
  WHATSAPP_INQUIRY,
  WHATSAPP_URL,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import Particles, { HeroOrb } from "@/components/ui/Particles";
import { staggerContainer, fadeUp } from "@/components/ui/motion";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-gradient relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <HeroOrb />
      <Particles count={25} />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-widest text-gold uppercase backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Handcrafted Art
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl leading-[1.1] font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block text-white">Sacred Art,</span>
            <span className="block text-white">Carved in</span>
            <span className="gold-gradient-text block purple-glow-text">
              Premium Wood
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg md:text-xl"
          >
            {BRAND.name} by {BRAND.owner} — crafting exquisite 3D, 4D & 5D
            wooden frames, Shreenathji art, Jain religious masterpieces, and
            bespoke custom designs with royal gold emboss finishing.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <Button href="#gallery" variant="primary">
              View Gallery
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#contact" variant="gold">
              Get Custom Frame
            </Button>
            <Button href={`tel:${BRAND.phoneRaw}`} variant="secondary">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button href={WHATSAPP_URL} variant="whatsapp" external>
              <WhatsAppIcon />
              WhatsApp
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-10 sm:grid-cols-4 sm:gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center sm:text-left"
              >
                <div className="font-display text-3xl font-light gold-gradient-text sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-wider text-white/40 uppercase sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-gold/60"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Hidden inquiry link for SEO */}
      <a href={WHATSAPP_INQUIRY} className="sr-only">
        WhatsApp inquiry for custom frames
      </a>
    </section>
  );
}
