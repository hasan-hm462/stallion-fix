import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { Festival } from "@/types";

interface Props {
  festival: Festival;
  index?: number;
}

export const FestivalCard = ({ festival, index = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const title = isAr && festival.titleAr ? festival.titleAr : festival.title;

  const date = new Date(festival.eventDate).toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-md border border-border/60 shadow-soft hover:shadow-luxury transition-luxury"
    >
      <Link to={`/festivals/${festival.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={festival.images[0]}
            alt={festival.title}
            loading="lazy"
            className="h-full w-full object-cover transition-luxury duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-primary-foreground/90 mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gold" /> {date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold" /> {festival.location}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-primary-foreground">
              {title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-2 text-sm text-gold font-medium">
              {t("common.viewDetails")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
