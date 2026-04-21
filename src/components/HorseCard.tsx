import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { Horse } from "@/types";

interface Props {
  horse: Horse;
  index?: number;
}

export const HorseCard = ({ horse, index = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const name = isAr && horse.nameAr ? horse.nameAr : horse.name;
  const desc =
    isAr && horse.shortDescriptionAr ? horse.shortDescriptionAr : horse.shortDescription;

  const inquiry = t("horse.inquiryMessage", { name: horse.name });

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-md bg-card border border-border/60 shadow-soft hover:shadow-luxury transition-luxury"
    >
      <Link to={`/horses/${horse.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-primary">
          <img
            src={horse.mainImage}
            alt={horse.name}
            loading="lazy"
            className="h-full w-full object-contain transition-luxury duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-70" />
          <div className="absolute top-3 ltr:left-3 rtl:right-3">
            <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-border">
              {horse.type}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 md:p-6">
        <Link to={`/horses/${horse.slug}`}>
          <h3 className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">
            {name}
          </h3>
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
          {t(`horse.${horse.gender}`)}
        </p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {desc}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm" className="border-foreground/20 hover:border-gold hover:text-gold">
            <Link to={`/horses/${horse.slug}`}>
              <Eye className="h-3.5 w-3.5" />
              <span>{t("common.viewDetails")}</span>
            </Link>
          </Button>
          <WhatsAppButton message={inquiry} label={t("common.inquireWhatsapp")} size="sm" />
        </div>
      </div>
    </motion.article>
  );
};
