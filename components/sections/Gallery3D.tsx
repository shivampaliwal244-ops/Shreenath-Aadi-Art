"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";
import { Watermark } from "@/components/ui/Watermark";

const SHOWCASE_IMAGES = GALLERY_IMAGES.slice(0, 8);

type Frame3DProps = {
  image: (typeof GALLERY_IMAGES)[0];
  index: number;
  total: number;
};

function Frame3D({ image, index, total }: Frame3DProps) {
  const angle = (index / total) * 360;
  const radius = 280;

  return (
    <motion.div
      className="gallery-3d-frame absolute"
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        left: "50%",
        top: "50%",
        marginLeft: "-80px",
        marginTop: "-110px",
        width: "160px",
        height: "220px",
      }}
      whileHover={{ scale: 1.08, z: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm border-4 border-gold/60 bg-black shadow-[0_0_40px_rgba(212,175,55,0.3),inset_0_0_20px_rgba(0,0,0,0.5)]">
        {/* Frame inner glow */}
        <div className="absolute inset-0 z-10 border border-gold/20" />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="160px"
          loading="lazy"
        />
        <Watermark size="sm" className="absolute right-1.5 bottom-1.5 z-20" />
      </div>
      {/* Frame depth shadow */}
      <div
        className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-sm bg-gold/20"
        style={{ transform: "translateZ(-8px)" }}
      />
    </motion.div>
  );
}

export default function Gallery3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotateY = useMotionValue(0);
  const springRotate = useSpring(rotateY, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      rotateY.set(x * 60);
    },
    [rotateY]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        rotateY.set(rotateY.get() + 0.3);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging, rotateY]);

  const floorOpacity = useTransform(springRotate, [-30, 0, 30], [0.3, 0.5, 0.3]);

  return (
    <div
      ref={containerRef}
      className="gallery-3d-scene relative mx-auto h-[480px] w-full max-w-4xl cursor-grab active:cursor-grabbing sm:h-[520px]"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-purple-600/20 blur-[80px]" />
      </div>

      <motion.div
        className="gallery-3d-room absolute inset-0 flex items-center justify-center"
        style={{ rotateY: springRotate }}
      >
        {/* Gallery room walls */}
        <div
          className="absolute rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent"
          style={{
            width: "560px",
            height: "360px",
            transform: "translateZ(-140px) rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Floor reflection */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-t from-purple-900/30 to-transparent"
          style={{
            width: "500px",
            height: "120px",
            transform: "rotateX(90deg) translateZ(-80px)",
            opacity: floorOpacity,
          }}
        />

        {/* 3D Frames carousel */}
        {SHOWCASE_IMAGES.map((image, i) => (
          <Frame3D
            key={image.id}
            image={image}
            index={i}
            total={SHOWCASE_IMAGES.length}
          />
        ))}
      </motion.div>

      {/* Drag hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/30 uppercase">
        Drag to explore · 3D Gallery
      </p>
    </div>
  );
}
