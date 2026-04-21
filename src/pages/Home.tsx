import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SectionTitle } from "@/components/SectionTitle";
import { CategoryCard } from "@/components/CategoryCard";
import { HorseCard } from "@/components/HorseCard";
import { CinemaShowcase } from "@/components/CinemaShowcase";
import { fetchHorses } from "@/services/horses";

import logo from "@/assets/logo.png";
import heroImg from "@/assets/arabian-hero.jpg";
import catFarm from "@/assets/arabian-farm.jpg";

import catStallions from "@/assets/arabian-stallions.jpg";
import catFestivals from "@/assets/arabian-festivals.jpg";
import realStable from "@/assets/real-stable-interior.jpg";
import realFoals from "@/assets/real-foals-trio.jpg";
import realGreyShow from "@/assets/real-grey-show.jpg";
import realBay from "@/assets/real-bay-portrait.jpg";

// Aliases used in About + Location preview sections (real photography)
const farmInterior = realStable;
const farmRunning = realFoals;

const Home = () => {
  const { t } = useTranslation();
  const { data: horses = [] } = useQuery({
    queryKey: ["horses"],
    queryFn: fetchHorses,
  });
  const featured = horses.filter((h) => h.featured).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Al Mazloum Stud"
            className="h-full w-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
        </div>

        <div className="relative luxury-container text-center text-primary-foreground py-32">
          <motion.img
            src={logo}
            alt="Al Mazloum Stud Logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto h-44 md:h-64 lg:h-72 w-auto mb-8 drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            style={{ filter: "contrast(1.15) brightness(1.1) saturate(1.1)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 justify-center mb-5"
          >
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.35em] text-gold font-medium">
              {t("hero.eyebrow")}
            </span>
            <span className="gold-divider" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[1.05]"
          >
            {t("brand.name")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-lg md:text-2xl font-display italic text-gold-gradient text-balance max-w-2xl mx-auto"
          >
            {t("brand.tagline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-5 text-sm md:text-base text-primary-foreground/80 max-w-xl mx-auto leading-relaxed"
          >
            {t("hero.intro")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-gold-gradient text-primary-foreground hover:opacity-90 shadow-gold border-0 font-medium tracking-wide h-12 px-7"
            >
              <Link to="/farm-horses">
                {t("common.explore")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <WhatsAppButton
              variant="outline"
              size="lg"
              message={t("whatsapp.generalMessage")}
              label={t("common.contactWhatsapp")}
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-gold hover:border-gold h-12 px-7"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-xs uppercase tracking-[0.3em]"
        >
          Scroll
        </motion.div>
      </section>

      {/* GALLERY SHOWCASE — cinematic */}
      <section className="luxury-container py-20 md:py-28">
        <SectionTitle
          eyebrow={t("hero.eyebrow")}
          title={t("home.showcaseTitle")}
          subtitle={t("home.showcaseSubtitle")}
        />
        <div className="mt-14">
          <CinemaShowcase
            slides={[
              { src: realStable, title: "The Stables at Dusk", subtitle: "Where our horses rest in quiet luxury." },
              { src: realGreyShow, title: "Champion Presence", subtitle: "Refined lines, noble bearing." },
              { src: realFoals, title: "The Next Generation", subtitle: "Bred with patience and pride." },
              { src: realBay, title: "Soulful Gaze", subtitle: "A heritage written in every silhouette." },
            ]}
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-secondary/40 py-20 md:py-28 grain">
        <div className="luxury-container">
          <SectionTitle
            eyebrow="Discover"
            title={t("home.categoriesTitle")}
            subtitle={t("home.categoriesSubtitle")}
          />
          <div className="mt-14 grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <CategoryCard
              to="/farm-horses"
              image={catFarm}
              title={t("categories.farm.title")}
              subtitle={t("categories.farm.subtitle")}
              index={0}
            />
            <CategoryCard
              to="/stallions"
              image={catStallions}
              title={t("categories.stallions.title")}
              subtitle={t("categories.stallions.subtitle")}
              index={1}
            />
            <CategoryCard
              to="/festivals"
              image={catFestivals}
              title={t("categories.festivals.title")}
              subtitle={t("categories.festivals.subtitle")}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* FEATURED HORSES */}
      <section className="luxury-container py-20 md:py-28">
        <SectionTitle
          eyebrow="Selection"
          title={t("home.featuredTitle")}
          subtitle={t("home.featuredSubtitle")}
        />
        <div className="mt-14 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((h, i) => (
            <HorseCard key={h.id} horse={h} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold/50 text-foreground hover:bg-gold hover:text-primary-foreground"
          >
            <Link to="/farm-horses">
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={farmInterior} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="luxury-container relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                {t("about.eyebrow")}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-balance leading-tight">
              {t("home.aboutTitle")}
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed mb-8">
              {t("home.aboutText")}
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gold text-gold hover:bg-gold hover:text-primary"
            >
              <Link to="/about">
                {t("common.learnMore")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-md overflow-hidden shadow-luxury"
          >
            <img src={farmRunning} alt="Horses at the farm" className="h-full w-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-md" />
          </motion.div>
        </div>
      </section>

      {/* LOCATION PREVIEW */}
      <section className="luxury-container py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 aspect-video rounded-md overflow-hidden shadow-luxury bg-muted"
          >
            <img src={farmInterior} alt="Farm location" className="h-full w-full object-cover" />
          </motion.div>
          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-3">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                {t("location.eyebrow")}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-5 text-balance">
              {t("home.locationTitle")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              {t("home.locationText")}
            </p>
            <Button asChild size="lg" variant="outline" className="border-gold/50 hover:bg-gold hover:text-primary-foreground">
              <Link to="/location">
                <MapPin className="h-4 w-4" />
                {t("nav.location")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-primary text-primary-foreground py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
        <div className="luxury-container relative text-center max-w-2xl">
          <SectionTitle
            eyebrow={t("contact.eyebrow")}
            title={<span className="text-primary-foreground">{t("home.ctaTitle")}</span>}
            subtitle={
              <span className="text-primary-foreground/80">{t("home.ctaText")}</span>
            }
          />
          <div className="mt-10 flex justify-center">
            <WhatsAppButton
              size="lg"
              message={t("whatsapp.generalMessage")}
              label={t("common.contactWhatsapp")}
              className="h-13 px-8"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
