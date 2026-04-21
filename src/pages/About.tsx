import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Crown, Heart, Star } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { SectionTitle } from "@/components/SectionTitle";
import farmBarn from "@/assets/farm-barn-arch.jpg";
import farmInterior from "@/assets/farm-stable-interior.jpg";

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Crown, key: "heritage" },
    { icon: Star, key: "excellence" },
    { icon: Heart, key: "care" },
  ];

  return (
    <>
      <PageBanner
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        image={farmBarn}
      />

      <section className="luxury-container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-md overflow-hidden shadow-luxury"
          >
            <img src={farmInterior} alt="Inside our stables" className="h-full w-full object-cover" />
          </motion.div>
          <div className="space-y-6 text-base md:text-lg text-foreground/85 leading-relaxed">
            <p className="font-display text-2xl md:text-3xl text-foreground leading-snug">
              {t("about.p1")}
            </p>
            <p className="text-muted-foreground">{t("about.p2")}</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 md:py-24">
        <div className="luxury-container">
          <SectionTitle eyebrow="Our Values" title="What guides us" />
          <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center bg-card p-8 rounded-md border border-border/60 shadow-soft hover:shadow-luxury transition-luxury"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center text-primary mb-5 shadow-gold">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl mb-2 text-foreground">
                  {t(`about.values.${v.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`about.values.${v.key}.text`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
