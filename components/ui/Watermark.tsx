import { BRAND } from "@/lib/constants";

type WatermarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Watermark({ size = "md", className = "" }: WatermarkProps) {
  const sizes = {
    sm: {
      brand: "text-[8px] sm:text-[9px]",
      detail: "text-[7px] sm:text-[8px]",
      gap: "gap-0",
    },
    md: {
      brand: "text-[9px] sm:text-[10px]",
      detail: "text-[8px] sm:text-[9px]",
      gap: "gap-0.5",
    },
    lg: {
      brand: "text-[10px] sm:text-xs",
      detail: "text-[9px] sm:text-[10px]",
      gap: "gap-0.5",
    },
  };

  const s = sizes[size];

  return (
    <div
      className={`pointer-events-none select-none text-right ${className}`}
      aria-hidden="true"
    >
      <div
        className={`inline-flex flex-col items-end ${s.gap} rounded-md border border-gold/20 bg-black/30 px-2 py-1.5 backdrop-blur-sm sm:px-2.5 sm:py-2`}
      >
        <span
          className={`font-display font-semibold tracking-wide text-gold ${s.brand}`}
          style={{ textShadow: "0 0 12px rgba(212,175,55,0.4)" }}
        >
          {BRAND.name}
        </span>
        <span className={`font-medium text-white/75 ${s.detail}`}>
          {BRAND.owner}
        </span>
        <span
          className={`font-medium tracking-wider text-gold/90 ${s.detail}`}
        >
          {BRAND.phone}
        </span>
      </div>
    </div>
  );
}
