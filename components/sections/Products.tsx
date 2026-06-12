"use client";

import {
  Layers,
  Box,
  Sparkles,
  Crown,
  Gem,
  Image,
  Palette,
  MessageCircle,
} from "lucide-react";
import { PRODUCTS, WHATSAPP_INQUIRY, BRAND } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader, Reveal } from "@/components/ui/motion";

const iconMap = {
  layers: Layers,
  box: Box,
  sparkles: Sparkles,
  crown: Crown,
  gem: Gem,
  image: Image,
  palette: Palette,
};

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Products() {
  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Collection"
          title="Premium Products"
          subtitle="From sacred Shreenathji art to ultra-premium 5D frames — each piece is a masterpiece of wooden artistry."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product, i) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap];
            const whatsappMsg = `${WHATSAPP_INQUIRY.split("?text=")[0]}?text=${encodeURIComponent(
              `Hello! I'm interested in ${product.title} from ${BRAND.name}.`
            )}`;

            return (
              <Reveal key={product.id} delay={i * 0.07}>
                <GlassCard className="group flex h-full flex-col overflow-hidden" glow="gold">
                  {/* Top accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 to-purple-900/20 transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>

                    <h3 className="mb-2 font-display text-xl text-white">
                      {product.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                      {product.description}
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        href="#contact"
                        variant="secondary"
                        className="flex-1 !px-4 !py-2.5 text-xs"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Inquire
                      </Button>
                      <Button
                        href={whatsappMsg}
                        variant="whatsapp"
                        external
                        className="flex-1 !px-4 !py-2.5 text-xs"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
