import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type NavItem =
  | { to: string; key: string; submenu?: undefined }
  | { to: string; key: string; submenu: { to: string; key: string }[] };

const links: NavItem[] = [
  { to: "/", key: "home" },
  { to: "/stallions", key: "stallions" },
  {
    to: "/farm-horses",
    key: "farmHorses",
    submenu: [
      { to: "/farm-horses?filter=mares", key: "mares" },
      { to: "/farm-horses?filter=bred", key: "bred" },
      { to: "/farm-horses?filter=other", key: "other" },
    ],
  },
  { to: "/festivals", key: "festivals" },
  { to: "/about", key: "about" },
  { to: "/location", key: "location" },
  { to: "/contact", key: "contact" },
];

export const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-luxury",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="luxury-container">
        <div className={cn("flex items-center justify-between gap-2 md:gap-4 transition-all duration-500", scrolled ? "h-16 md:h-24" : "h-20 md:h-28")}>
          <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group min-w-0">
            <img
              src={logo}
              alt="Al Mazloum Stud"
              className={cn(
                "w-auto transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] shrink-0",
                scrolled ? "h-10 md:h-16" : "h-12 md:h-20"
              )}
              style={{ filter: "contrast(1.15) brightness(1.1) saturate(1.1)" }}
            />
            <div className="hidden md:flex flex-col leading-tight min-w-0">
              <span className="font-display text-lg md:text-xl text-foreground group-hover:text-gold transition-colors truncate">
                {t("brand.name")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                Stud
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {links.map((l) => {
              if (l.submenu) {
                return (
                  <div key={l.to} className="relative group">
                    <NavLink
                      to={l.to}
                      end={false}
                      className={({ isActive }) =>
                        cn(
                          "px-3 py-2 text-sm font-medium tracking-wide transition-colors relative inline-flex items-center gap-1",
                          isActive
                            ? "text-gold"
                            : "text-foreground/80 hover:text-foreground"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {t(`nav.${l.key}`)}
                          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                          {isActive && (
                            <motion.span
                              layoutId="nav-underline"
                              className="absolute -bottom-0.5 left-3 right-3 h-px bg-gold-gradient"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                    <div className="absolute top-full start-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="min-w-[240px] rounded-md border border-border/60 bg-background/95 backdrop-blur-xl shadow-luxury overflow-hidden">
                        {l.submenu.map((s) => (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="block px-4 py-3 text-sm text-foreground/85 hover:bg-gold/10 hover:text-gold transition-colors border-b border-border/40 last:border-b-0"
                          >
                            {t(`farm.sections.${s.key}.title`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 text-sm font-medium tracking-wide transition-colors relative",
                      isActive
                        ? "text-gold"
                        : "text-foreground/80 hover:text-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(`nav.${l.key}`)}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-3 right-3 h-px bg-gold-gradient"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden md:block">
              <WhatsAppButton
                message={t("whatsapp.generalMessage")}
                label={t("nav.whatsapp")}
                size="sm"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border/60"
          >
            <nav className="luxury-container py-6 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "block py-3 px-3 rounded-md font-display text-lg transition-colors border-b border-border/40",
                        isActive
                          ? "text-gold"
                          : "text-foreground hover:text-gold"
                      )
                    }
                  >
                    {t(`nav.${l.key}`)}
                  </NavLink>
                  {l.submenu && (
                    <div className="ps-5 pb-2 flex flex-col border-b border-border/40">
                      {l.submenu.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="py-2 px-2 text-sm text-foreground/80 hover:text-gold transition-colors"
                        >
                          — {t(`farm.sections.${s.key}.title`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="pt-4">
                <WhatsAppButton
                  message={t("whatsapp.generalMessage")}
                  label={t("common.contactWhatsapp")}
                  className="w-full"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
