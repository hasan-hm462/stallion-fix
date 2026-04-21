import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  title?: string;
  subtitle?: string;
}

interface Props {
  slides: Slide[];
  className?: string;
}

/**
 * Cinematic showcase grid — bento-style layout with deep overlays,
 * gold rule lines and editorial captions. Click to open in lightbox.
 */
export const CinemaShowcase = ({ slides, className }: Props) => {
  const [active, setActive] = useState<number | null>(null);

  const next = () =>
    setActive((i) => (i === null ? null : (i + 1) % slides.length));
  const prev = () =>
    setActive((i) =>
      i === null ? null : (i - 1 + slides.length) % slides.length
    );

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-3 md:gap-4 md:h-[640px]",
          className
        )}
      >
        {slides.map((slide, i) => {
          // Bento layout: first is hero (big), then a tall, then two squares
          const layout = [
            "md:col-span-3 md:row-span-2",
            "md:col-span-3 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-1 md:row-span-1",
          ][i % 4];

          return (
            <motion.button
              key={slide.src + i}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative overflow-hidden rounded-md bg-primary shadow-luxury",
                "aspect-[4/3] md:aspect-auto",
                layout
              )}
            >
              {/* Image with slow cinematic zoom */}
              <img
                src={slide.src}
                alt={slide.title ?? ""}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />

              {/* Cinematic gradient overlay — lighter so the image stays clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Gold inset border */}
              <div className="absolute inset-3 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700 rounded-sm" />

              {/* Editorial caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-left rtl:text-right text-primary-foreground">
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <span className="h-px w-8 bg-gold" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {slide.title && (
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    {slide.title}
                  </h3>
                )}
                {slide.subtitle && (
                  <p className="mt-1 text-xs md:text-sm text-primary-foreground/80 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {slide.subtitle}
                  </p>
                )}
              </div>

              {/* Letterbox film bars on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0 group-hover:h-4 bg-primary transition-all duration-500" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 group-hover:h-4 bg-primary transition-all duration-500" />
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
            }}
            className="absolute top-5 right-5 text-primary-foreground hover:text-gold transition-colors"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-foreground hover:text-gold transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-primary-foreground hover:text-gold transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
          <img
            src={slides[active].src}
            alt={slides[active].title ?? ""}
            className="max-h-[88vh] max-w-[94vw] object-contain rounded-md shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          />
          {slides[active].title && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-primary-foreground">
              <p className="font-display text-2xl">{slides[active].title}</p>
              {slides[active].subtitle && (
                <p className="text-sm text-primary-foreground/70 mt-1">
                  {slides[active].subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
