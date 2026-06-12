"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import {
  GALLERY_IMAGES,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "@/lib/constants";
import { Watermark } from "@/components/ui/Watermark";
import { SectionHeader, Reveal } from "@/components/ui/motion";
import Gallery3DShowcase from "./Gallery3D";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
    {}
  );

  const filteredImages = useMemo(
    () =>
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      const len = filteredImages.length;
      const next =
        direction === "next"
          ? (lightboxIndex + 1) % len
          : (lightboxIndex - 1 + len) % len;
      setLightboxIndex(next);
    },
    [lightboxIndex, filteredImages.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <section id="gallery" className="section-glow relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio"
          title="Art Gallery"
          subtitle="Explore our collection of handcrafted masterpieces — each frame a testament to premium wooden artistry."
        />

        {/* 3D Gallery Showcase */}
        <Reveal className="mb-20">
          <Gallery3DShowcase />
        </Reveal>

        {/* Category Filters */}
        <Reveal className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 sm:px-5 sm:text-sm ${
                  activeCategory === cat.id
                    ? "border border-gold/40 bg-gold/15 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "border border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredImages.map((image, index) => (
            <Reveal key={image.id} delay={(index % 4) * 0.05}>
              <motion.button
                className="masonry-item group relative w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] text-left"
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                aria-label={`View ${image.alt}`}
              >
                <div
                  className={`relative overflow-hidden transition-opacity duration-500 ${
                    loadedImages[image.id] ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    aspectRatio:
                      index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/5" : "1/1",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [image.id]: true }))
                    }
                  />

                  {/* Branded Watermark */}
                  <Watermark
                    size="md"
                    className="absolute right-2 bottom-2 z-10 sm:right-3 sm:bottom-3"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                    <div className="flex scale-75 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4 text-white" />
                      <span className="text-xs text-white">View</span>
                    </div>
                  </div>
                </div>

                {!loadedImages[image.id] && (
                  <div
                    className="absolute inset-0 animate-pulse rounded-xl bg-white/[0.04]"
                    style={{
                      aspectRatio:
                        index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/5" : "1/1",
                    }}
                  />
                )}
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-colors hover:bg-white/10 sm:top-6 sm:right-6"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-colors hover:bg-white/10 sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white transition-colors hover:bg-white/10 sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative mx-4 max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden rounded-xl border border-gold/20 shadow-[0_0_60px_rgba(124,58,237,0.3)]">
                <Image
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt}
                  width={1200}
                  height={900}
                  className="max-h-[80vh] w-auto object-contain"
                  priority
                />
                <Watermark
                  size="lg"
                  className="absolute right-4 bottom-4 z-10"
                />
              </div>
              <p className="mt-4 text-center text-sm text-white/50">
                {filteredImages[lightboxIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
