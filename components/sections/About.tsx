"use client";

import { Hammer, Gem, Palette, Heart } from "lucide-react";
import { ABOUT_FEATURES, STATS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader, Reveal } from "@/components/ui/motion";

const iconMap = {
  hammer: Hammer,
  gem: Gem,
  palette: Palette,
  heart: Heart,
};

export default function About() {
  return (
    <section id="about" className="section-glow relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Story"
          title="Crafted With Devotion"
          subtitle="Over two decades of master craftsmanship — blending tradition, spirituality, and modern luxury design."
        />

        {/* Stats row */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <GlassCard className="p-6 text-center" glow="gold">
                <div className="font-display text-3xl font-light gold-gradient-text sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs tracking-wider text-white/45 uppercase">
                  {stat.label}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Story */}
        <Reveal>
          <GlassCard className="mb-16 p-8 sm:p-12" glow="purple">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="mb-4 font-display text-2xl font-light text-white sm:text-3xl">
                  The Art of{" "}
                  <span className="gold-gradient-text">Shreenath Aadi Art</span>
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  At Shreenath Aadi Art, we specialize in creating premium
                  handcrafted wooden and glass frames with stunning 3D, 4D and
                  5D artistic effects. With over 20+ years of experience,{" "}
                  <strong className="text-white/80">Sandeep Paliwal</strong>{" "}
                  brings tradition, creativity and modern design together to
                  create truly unique masterpieces.
                </p>
                <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                  We offer a wide range of customized artworks including gold
                  emboss paintings, Jain religious art, Shreenathji glass
                  frames, and personalized photo frames — each piece designed
                  with attention to detail for high quality, durability and a
                  premium finish.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <blockquote className="border-l-2 border-gold/50 pl-6">
                  <p className="font-display text-lg leading-relaxed text-white/70 italic sm:text-xl">
                    &ldquo;Your imagination is our only limit — from classic to
                    contemporary, simple to ornate, every frame tells a sacred
                    story.&rdquo;
                  </p>
                  <footer className="mt-4 text-sm text-gold">
                    — Sandeep Paliwal, Master Artisan
                  </footer>
                </blockquote>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Features */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Reveal key={feature.title} delay={i * 0.1}>
                <GlassCard className="group h-full p-6" glow="purple">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 transition-colors group-hover:border-gold/40 group-hover:bg-gold/10">
                    <Icon className="h-5 w-5 text-purple-300 transition-colors group-hover:text-gold" />
                  </div>
                  <h3 className="mb-2 font-display text-lg text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
