import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HorseCard } from "@/components/HorseCard";
import { SectionTitle } from "@/components/SectionTitle";
import { fetchHorses } from "@/services/horses";

const HorseDetails = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { data: horses = [], isLoading } = useQuery({
    queryKey: ["horses"],
    queryFn: fetchHorses,
  });
  const horse = horses.find((h) => h.slug === slug);

  if (isLoading) {
    return (
      <section className="luxury-container py-32 text-center">
        <h1 className="font-display text-2xl text-muted-foreground">{t("common.loading")}</h1>
      </section>
    );
  }

  if (!horse) {
    return (
      <section className="luxury-container py-32 text-center">
        <h1 className="font-display text-4xl mb-4">{t("horse.notFound")}</h1>
        <Button asChild variant="outline">
          <Link to="/farm-horses">{t("common.backHome")}</Link>
        </Button>
      </section>
    );
  }

  const name = isAr && horse.nameAr ? horse.nameAr : horse.name;
  const desc = isAr && horse.fullDescriptionAr ? horse.fullDescriptionAr : horse.fullDescription;
  const inquiry = t("horse.inquiryMessage", { name: horse.name });
  const related = horses.filter((h) => h.id !== horse.id && h.category === horse.category).slice(0, 3);

  const facts = [
    { label: t("horse.breed"), value: horse.type },
    { label: t("horse.gender"), value: t(`horse.${horse.gender}`) },
    horse.color && { label: t("horse.color"), value: horse.color },
    horse.birthYear && { label: t("horse.birthYear"), value: String(horse.birthYear) },
    horse.motherName && { label: t("horse.mother"), value: horse.motherName },
    horse.fatherName && { label: t("horse.father"), value: horse.fatherName },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-primary">
        <img
          src={horse.mainImage}
          alt={horse.name}
          className="absolute inset-0 h-full w-full object-contain animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="luxury-container relative h-full flex flex-col justify-end pb-12 md:pb-20 text-primary-foreground">
          <Link
            to={`/${horse.category === "mares" ? "mares" : horse.category === "stallions" ? "stallions" : "farm-horses"}`}
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("common.backHome")}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold mb-3 block">
              {horse.type} · {t(`horse.${horse.gender}`)}
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[1.05]">
              {name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="luxury-container py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl mb-4 text-foreground">
              {t("horse.description")}
            </h2>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed whitespace-pre-line">
              {desc}
            </p>

            {horse.galleryImages && horse.galleryImages.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl mb-6 text-foreground">{t("common.gallery")}</h2>
                <GalleryGrid images={horse.galleryImages} />
              </div>
            )}

            {horse.videoUrl && (
              <div className="mt-12">
                <h2 className="font-display text-2xl mb-6 text-foreground">{t("common.video")}</h2>
                <div className="aspect-video rounded-md overflow-hidden bg-muted shadow-luxury">
                  <video src={horse.videoUrl} controls className="h-full w-full" />
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-card border border-border/60 rounded-md p-6 md:p-8 shadow-luxury">
              <dl className="space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-3 last:border-0">
                    <dt className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                      {f.label}
                    </dt>
                    <dd className="text-sm md:text-base text-foreground font-medium text-right rtl:text-left">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <WhatsAppButton
                  message={inquiry}
                  label={t("common.inquireWhatsapp")}
                  className="w-full h-12"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-secondary/40 py-20 md:py-24">
          <div className="luxury-container">
            <SectionTitle eyebrow="Selection" title={t("common.relatedHorses")} />
            <div className="mt-12 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((h, i) => (
                <HorseCard key={h.id} horse={h} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HorseDetails;
