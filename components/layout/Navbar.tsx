"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { BRAND, NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav-scrolled" : "glass-nav"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="#home" className="group relative flex items-center gap-3">
            <motion.div
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-purple-900/40 to-gold/10"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-display text-sm font-bold gold-gradient-text">
                SA
              </span>
              <div className="absolute inset-0 rounded-xl bg-purple-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
            
            {/* Yahan se 'hidden sm:block' hata diya hai taaki mobile par bhi naam dikhe */}
            <div>
              <motion.span
                className="block font-display text-sm font-semibold tracking-wide text-white transition-colors group-hover:text-gold sm:text-base"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {BRAND.name}
              </motion.span>
              <span className="block text-[10px] tracking-widest text-white/40 uppercase">
                Premium Art
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-lg px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:text-white"
                >
                  {link.name}
                  <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-to-r from-purple-500 to-gold transition-transform duration-300 hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              href={`tel:${BRAND.phoneRaw}`}
              variant="ghost"
              className="!px-4 !py-2 text-xs"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">Call Now</span>
            </Button>
            <Button
              href={WHATSAPP_URL}
              variant="whatsapp"
              external
              className="!px-4 !py-2 text-xs"
            >
              <WhatsAppIcon />
              <span className="hidden lg:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm border-l border-white/10 bg-black-soft/95 backdrop-blur-2xl"
            >
              <div className="flex h-full flex-col px-6 pt-24 pb-8">
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-xl px-4 py-3.5 font-display text-xl text-white/80 transition-colors hover:bg-white/[0.05] hover:text-gold"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                  <Button
                    href={`tel:${BRAND.phoneRaw}`}
                    variant="gold"
                    className="w-full"
                  >
                    <Phone className="h-4 w-4" />
                    Call {BRAND.phone}
                  </Button>
                  <Button
                    href={WHATSAPP_URL}
                    variant="whatsapp"
                    external
                    className="w-full"
                  >
                    <WhatsAppIcon />
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}