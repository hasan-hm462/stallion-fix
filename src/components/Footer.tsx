import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/site";

export const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { to: "/farm-horses", key: "farmHorses" },
    { to: "/bred-by-al-mazloum-stud", key: "bred" },
    { to: "/stallions", key: "stallions" },
    { to: "/festivals", key: "festivals" },
    { to: "/about", key: "about" },
    { to: "/contact", key: "contact" },
  ];

  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-60" />
      <div className="luxury-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Al Mazloum Stud" className="h-14 w-auto" />
              <div className="leading-tight">
                <div className="font-display text-xl">{t("brand.name")}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Stud</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              {t("footer.brandText")}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-gold">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2.5 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-primary-foreground/80 hover:text-gold transition-colors"
                  >
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-gold">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-gold">{t("nav.whatsapp")}</h4>
            <p className="text-sm text-primary-foreground/70 mb-4 leading-relaxed">
              {t("home.ctaText")}
            </p>
            <WhatsAppButton
              message={t("whatsapp.generalMessage")}
              label={t("common.contactWhatsapp")}
            />
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/80 hover:text-gold hover:border-gold transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}</p>
          <p className="font-display text-gold tracking-wider">Heritage · Passion · Excellence</p>
        </div>
      </div>
    </footer>
  );
};
