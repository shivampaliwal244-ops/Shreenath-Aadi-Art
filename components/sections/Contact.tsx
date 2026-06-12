"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import {
  BRAND,
  WHATSAPP_URL,
  BUSINESS_HOURS,
  MAP_EMBED_URL,
} from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader, Reveal } from "@/components/ui/motion";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi ${BRAND.name}! I'm ${formData.name}.\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`;
    window.open(
      `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call Now",
      value: BRAND.phone,
      href: `tel:${BRAND.phoneRaw}`,
      color: "text-purple-400",
    },
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      value: "Chat with us instantly",
      href: WHATSAPP_URL,
      color: "text-[#25D366]",
      external: true,
    },
    {
      icon: Mail,
      title: "Email",
      value: BRAND.email,
      href: `mailto:${BRAND.email}?subject=Custom Frame Inquiry`,
      color: "text-gold",
    },
  ];

  return (
    <section id="contact" className="section-glow relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle={`Reach ${BRAND.owner} directly for custom frame consultations, pricing, and orders.`}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {contactCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 0.08}>
                  <motion.a
                    href={card.href}
                    {...(card.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    whileHover={{ y: -3 }}
                    className="glass-card flex items-center gap-4 rounded-2xl border border-white/[0.08] p-5 transition-shadow hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${card.color}`}
                    >
                      <card.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs tracking-wider text-white/40 uppercase">
                        {card.title}
                      </p>
                      <p className="truncate text-sm text-white/80">
                        {card.value}
                      </p>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>

            {/* Business hours */}
            <Reveal delay={0.2}>
              <GlassCard className="p-6" glow="gold">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold" />
                  <h3 className="font-display text-base text-white">
                    Business Hours
                  </h3>
                </div>
                <ul className="space-y-2">
                  {BUSINESS_HOURS.map((item) => (
                    <li
                      key={item.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-white/50">{item.day}</span>
                      <span className="text-white/75">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {/* Quick action buttons */}
            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                <Button href={`tel:${BRAND.phoneRaw}`} variant="gold">
                  <Phone className="h-4 w-4" />
                  One-Click Call
                </Button>
                <Button href={WHATSAPP_URL} variant="whatsapp" external>
                  <WhatsAppIcon />
                  WhatsApp Now
                </Button>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.3}>
              <GlassCard className="overflow-hidden p-0" glow="none">
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="text-sm text-white/70">
                    Rajasthan, India
                  </span>
                </div>
                <iframe
                  src={MAP_EMBED_URL}
                  title="Shreenath Aadi Art Location"
                  className="h-48 w-full border-0 sm:h-56"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </GlassCard>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={0.15}>
            <GlassCard className="p-8 sm:p-10" glow="purple">
              <h3 className="mb-2 font-display text-2xl text-white">
                Send an Inquiry
              </h3>
              <p className="mb-8 text-sm text-white/45">
                Tell us about your custom frame idea — we&apos;ll respond via
                WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/30 transition-colors outline-none focus:border-purple-500/50 focus:bg-white/[0.06]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/30 transition-colors outline-none focus:border-purple-500/50 focus:bg-white/[0.06]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/30 transition-colors outline-none focus:border-purple-500/50 focus:bg-white/[0.06]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Describe your custom frame idea — size, design, religious theme..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/30 transition-colors outline-none focus:border-purple-500/50 focus:bg-white/[0.06]"
                  />
                </div>

                <Button type="submit" variant="whatsapp" className="w-full">
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </Button>

                <p className="text-center text-xs text-white/30">
                  Or email us at{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-gold/70 hover:text-gold"
                  >
                    {BRAND.email}
                  </a>
                </p>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
