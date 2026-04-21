import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "@/components/GalleryGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { fetchFestivals } from "@/services/festivals";

const FestivalDetails = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { data: festivals = [], isLoading } = useQuery({
    queryKey: ["festivals"],
    queryFn: fetchFestivals,
  });
  const festival = festivals.find((f) => f.slug === slug);

  if (isLoading) {
    return (
      <section className="luxury-container py-32 text-center">
        <h1 className="font-display text-2xl text-muted-foreground">{t("common.loading")}</h1>
      </section>
    );
  }

  if (!festival) {
    return (
      <section className="luxury-container py-32 text-center">
        <h1 className="font-display text-4xl mb-4">{t("festivals.notFound")}</h1>
        <Button asChild variant="outline">
          <Link to="/festivals">{t("common.backHome")}</Link>
        </Button>
      </section>
    );
  }

  const title = isAr && festival.titleAr ? festival.titleAr : festival.title;
  const desc = isAr && festival.descriptionAr ? festival.descriptionAr : festival.description;
  const date = new Date(festival.eventDate).toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden bg-primary">
        <img
          src={festival.images[0]}
          alt={festival.title}
          className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="luxury-container relative h-full flex flex-col justify-end pb-12 md:pb-16 text-primary-foreground">
          <Link
            to="/festivals"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold mb-4"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("nav.festivals")}
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-display text-4xl md:text-6xl text-balance leading-tight max-w-3xl">
              {title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-primary-foreground/85">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> {date}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {festival.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="luxury-container py-16 md:py-24 max-w-4xl">
        <p className="text-base md:text-lg text-foreground/85 leading-relaxed whitespace-pre-line">
          {desc}
        </p>

        {festival.videoUrl && (
          <div className="mt-12">
            <h2 className="font-display text-2xl mb-6">{t("common.video")}</h2>
            <div className="aspect-video rounded-md overflow-hidden bg-muted shadow-luxury">
              <video src={festival.videoUrl} controls playsInline className="h-full w-full" />
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-2xl mb-6">{t("common.gallery")}</h2>
          <GalleryGrid images={festival.images} />
        </div>

        <div className="mt-14 text-center">
          <WhatsAppButton
            size="lg"
            message={t("whatsapp.generalMessage")}
            label={t("common.contactWhatsapp")}
          />
        </div>
      </section>
    </>
  );
};

export default FestivalDetails;
