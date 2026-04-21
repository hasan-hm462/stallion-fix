import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3 justify-center">
          {align === "center" && <span className="gold-divider" />}
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            {eyebrow}
          </span>
          {align === "center" && <span className="gold-divider" />}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground text-balance leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
