import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Facebook } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/site";

const Contact = () => {
  const { t } = useTranslation();

  const items = [
    { icon: Phone, label: t("contact.phone"), value: SITE.phone, href: `tel:${SITE.phone}` },
    { icon: Mail, label: t("contact.email"), value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: t("contact.address"), value: SITE.address },
  ];

  return (
    <>
      <PageBanner
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.text")}
      />

      <section className="luxury-container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border/60 rounded-md p-8 md:p-12 shadow-luxury text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              {t("common.contactWhatsapp")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t("contact.text")}
            </p>
            <WhatsAppButton
              size="lg"
              message={t("whatsapp.generalMessage")}
              label={t("common.contactWhatsapp")}
              className="h-13 px-8"
            />
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {items.map((it) => {
              const Inner = (
                <div className="bg-card border border-border/60 rounded-md p-6 hover:border-gold/50 hover:shadow-soft transition-luxury h-full">
                  <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center text-primary mb-4 shadow-gold">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1">{it.label}</p>
                  <p className="text-foreground font-medium">{it.value}</p>
                </div>
              );
              return it.href ? (
                <a key={it.label} href={it.href}>{Inner}</a>
              ) : (
                <div key={it.label}>{Inner}</div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-11 w-11 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
