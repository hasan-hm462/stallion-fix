import { useTranslation } from "react-i18next";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner } from "@/components/PageBanner";
import { SITE } from "@/lib/site";
import farmBarn from "@/assets/farm-barn-arch.jpg";

const Location = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageBanner
        eyebrow={t("location.eyebrow")}
        title={t("location.title")}
        subtitle={t("location.text")}
        image={farmBarn}
      />

      <section className="luxury-container py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <a
            href="https://maps.app.goo.gl/b44jssDxSBV4gt1G9"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-2 aspect-video rounded-md overflow-hidden border border-border/60 shadow-luxury bg-muted block group relative"
            aria-label={t("common.getDirections")}
          >
            <iframe
              src={SITE.mapUrl}
              title="Al Mazloum Stud — Map"
              className="h-full w-full pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent">
              <span className="bg-gold-gradient text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-md shadow-gold flex items-center gap-1.5">
                <Navigation className="h-3.5 w-3.5" />
                {t("common.getDirections")}
              </span>
            </span>
          </a>
          <div className="bg-card border border-border/60 rounded-md p-8 shadow-soft flex flex-col">
            <div className="mb-4 flex items-center gap-3">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                {t("contact.address")}
              </span>
            </div>
            <h3 className="font-display text-2xl text-foreground mb-3">{t("brand.name")}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6 flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gold mt-1 shrink-0" />
              <span>{SITE.address}</span>
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gold-gradient text-primary-foreground hover:opacity-90 shadow-gold border-0 mt-auto"
            >
              <a
                href="https://maps.app.goo.gl/b44jssDxSBV4gt1G9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" />
                {t("common.getDirections")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
