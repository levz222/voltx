"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/app-data";
import { cn } from "@/lib/utils";

type HeroBannerProps = {
  onCta: (slideId: string) => void;
};

export function HeroBanner({ onCta }: HeroBannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative overflow-hidden border border-gunmetal bg-ash [clip-path:polygon(0_0,calc(100%-22px)_0,100%_22px,100%_100%,0_100%)]">
      <div
        className={cn(
          "absolute inset-0",
          slide.tone === "acid"
            ? "bg-[repeating-linear-gradient(-45deg,transparent_0_12px,color-mix(in_srgb,var(--acid)_16%,transparent)_12px_13px),radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--acid)_28%,transparent),transparent_42%),linear-gradient(120deg,var(--volcanic),var(--ash)_70%)]"
            : "bg-[repeating-linear-gradient(45deg,transparent_0_12px,color-mix(in_srgb,var(--mint)_16%,transparent)_12px_13px),radial-gradient(circle_at_88%_18%,color-mix(in_srgb,var(--mint)_30%,transparent),transparent_40%),linear-gradient(120deg,var(--ash),var(--volcanic)_72%)]"
        )}
      />
      <span className="absolute top-0 right-0 size-5 bg-acid [clip-path:polygon(100%_0,0_0,100%_100%)]" />
      <p className="pointer-events-none absolute top-4 right-8 hidden font-heading text-[7.5rem] leading-none font-extrabold text-offwhite/6 md:block">
        0{index + 1}
      </p>

      <div className="relative grid min-h-[220px] gap-6 p-6 md:min-h-[280px] md:grid-cols-[1fr_auto] md:items-end md:p-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium tracking-[0.42em] text-mint uppercase">
            {slide.kicker}
          </p>
          <h1 className="mt-2 font-heading text-6xl leading-[0.82] font-extrabold tracking-tight text-offwhite uppercase md:text-8xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-sm text-faded md:text-base">{slide.copy}</p>
          <Button type="button" onClick={onCta} className="mt-6 px-6">
            {slide.cta}
          </Button>
        </div>
        <div className="flex items-center gap-3 md:flex-col md:items-end">
          {HERO_SLIDES.map((item, slideIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show promo ${slideIndex + 1}`}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                "font-mono text-[11px] tracking-[0.2em] transition-colors",
                slideIndex === index
                  ? "text-acid"
                  : "text-faded hover:text-offwhite"
              )}
            >
              0{slideIndex + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
