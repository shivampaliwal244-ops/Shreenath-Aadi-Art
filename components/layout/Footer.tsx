"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Clock,
} from "lucide-react";
import {
  BRAND,
  NAV_LINKS,
  SOCIAL_LINKS,
  WHATSAPP_URL,
  BUSINESS_HOURS,
} from "@/lib/constants";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialIconMap = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: WhatsAppIcon,
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.12),transparent_70%)]" />

      <div className="glass-nav relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-purple-900/40 to-gold/10">
                <span className="font-display text-base font-bold gold-gradient-text">
                  SA
                </span>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {BRAND.name}
                </p>
                <p className="text-xs text-white/40">by {BRAND.owner}</p>
              </div>
            </motion.div>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {BRAND.description}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon =
                  socialIconMap[social.icon as keyof typeof socialIconMap];
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:border-purple-500/40 hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-display text-sm font-semibold tracking-widest text-gold uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-display text-sm font-semibold tracking-widest text-gold uppercase">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-purple-400" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-purple-400" />
                  <span className="break-all">{BRAND.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Rajasthan, India
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-5 font-display text-sm font-semibold tracking-widest text-gold uppercase">
              Business Hours
            </h3>
            <ul className="space-y-3">
              {BUSINESS_HOURS.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="flex items-center gap-2 text-white/50">
                    <Clock className="h-3.5 w-3.5 text-gold/70" />
                    {item.day}
                  </span>
                  <span className="text-white/70">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()}{" "}
            <span className="text-white/60">{BRAND.owner}</span> ·{" "}
            {BRAND.name}. All Rights Reserved.
          </p>
          <p className="text-xs text-white/35">
            Crafted with devotion · Premium Wooden Art
          </p>
        </div>
      </div>
    </footer>
  );
}
