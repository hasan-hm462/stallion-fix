import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HorseCard } from "@/components/HorseCard";
import { PageBanner } from "@/components/PageBanner";
import { fetchHorses } from "@/services/horses";
import type { Horse } from "@/types";
import farmRunning from "@/assets/farm-horses-running.jpg";

type SectionKey = "mares" | "bred" | "other";

const SECTIONS: SectionKey[] = ["mares", "bred", "other"];

const groupHorse = (h: Horse): SectionKey | null => {
  if (h.category === "mares") return "mares";
  if (h.category === "farm") {
    if (h.farmSubcategory === "mares") return "mares";
    if (h.farmSubcategory === "bred") return "bred";
    return "other";
  }
  return null;
};

export const FarmHorsesPage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<SectionKey | "all">("all");

  // Sync filter from URL query (?filter=mares|bred|other|all)
  useEffect(() => {
    const f = searchParams.get("filter");
    if (f === "mares" || f === "bred" || f === "other") {
      setActive(f);
    } else if (f === "all") {
      setActive("all");
    }
  }, [searchParams]);

  const setActiveAndUrl = (key: SectionKey | "all") => {
    setActive(key);
    const next = new URLSearchParams(searchParams);
    if (key === "all") next.delete("filter");
    else next.set("filter", key);
    setSearchParams(next, { replace: true });
  };

  const { data: horses = [], isLoading } = useQuery({
    queryKey: ["horses"],
    queryFn: fetchHorses,
  });

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (h: Horse) =>
      !q ||
      h.name.toLowerCase().includes(q) ||
      (h.nameAr ?? "").toLowerCase().includes(q) ||
      h.type.toLowerCase().includes(q);

    const buckets: Record<SectionKey, Horse[]> = { mares: [], bred: [], other: [] };
    horses.forEach((h) => {
      const sec = groupHorse(h);
      if (sec && matches(h)) buckets[sec].push(h);
    });
    SECTIONS.forEach((k) =>
      buckets[k].sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
    );
    return buckets;
  }, [horses, query]);

  const visibleSections = active === "all" ? SECTIONS : [active];
  const totalVisible = visibleSections.reduce((n, k) => n + grouped[k].length, 0);

  const chip = (key: SectionKey | "all", label: string, count?: number) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => setActiveAndUrl(key)}
        className={[
          "px-5 py-2 rounded-full border text-sm font-medium transition-luxury",
          isActive
            ? "bg-gold-gradient text-primary-foreground border-transparent shadow-soft"
            : "border-border/60 text-foreground/80 hover:text-gold hover:border-gold/40 bg-card/60",
        ].join(" ")}
      >
        {label}
        {typeof count === "number" && (
          <span className={["ms-2 text-xs", isActive ? "opacity-90" : "opacity-60"].join(" ")}>
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <PageBanner
        eyebrow={t("hero.eyebrow")}
        title={t("categories.farm.title")}
        subtitle={t("categories.farm.subtitle")}
        image={farmRunning}
      />

      <section className="luxury-container py-16 md:py-24">
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("filters.searchPlaceholder")}
              className="ltr:pl-11 rtl:pr-11 h-12 bg-card border-border/60 focus-visible:ring-gold/40"
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {chip(
            "all",
            t("filters.all"),
            SECTIONS.reduce((n, k) => n + grouped[k].length, 0)
          )}
          {SECTIONS.map((k) =>
            chip(k, t(`farm.sections.${k}.title`), grouped[k].length)
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-2xl">{t("common.loading")}</p>
          </div>
        ) : totalVisible === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-2xl">{t("common.empty")}</p>
          </div>
        ) : (
          <div className="space-y-20">
            {visibleSections.map((key) => {
              const items = grouped[key];
              if (items.length === 0) return null;
              return (
                <div key={key} id={`section-${key}`} className="scroll-mt-28">
                  <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                        {t("hero.eyebrow")}
                      </p>
                      <h2 className="font-display text-3xl md:text-4xl">
                        {t(`farm.sections.${key}.title`)}
                      </h2>
                      <p className="text-muted-foreground mt-2 max-w-xl">
                        {t(`farm.sections.${key}.subtitle`)}
                      </p>
                    </div>
                    <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent ms-6" />
                  </div>
                  <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((h, i) => (
                      <HorseCard key={h.id} horse={h} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};