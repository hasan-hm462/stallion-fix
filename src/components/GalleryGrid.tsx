import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  className?: string;
}

export const GalleryGrid = ({ images, className }: Props) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
          className
        )}
      >
        {images.map((src, i) => (
          <motion.button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "group relative overflow-hidden rounded-md bg-muted shadow-soft hover:shadow-luxury transition-luxury",
              i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
            )}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-luxury duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors" />
          </motion.button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 text-primary-foreground hover:text-gold transition-colors"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <img
            src={images[active]}
            alt=""
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-md shadow-luxury"
          />
        </div>
      )}
    </>
  );
};
