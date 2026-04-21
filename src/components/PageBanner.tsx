import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
}

export const PageBanner = ({ eyebrow, title, subtitle, image }: Props) => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {image && (
        <div className="absolute inset-0 opacity-30">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary" />
        </div>
      )}
      <div className="luxury-container relative py-24 md:py-32 lg:py-40 text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <div className="mb-4 flex items-center gap-3 justify-center">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                {eyebrow}
              </span>
              <span className="gold-divider" />
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-balance leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
