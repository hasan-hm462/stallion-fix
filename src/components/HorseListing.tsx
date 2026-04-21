import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HorseCard } from "@/components/HorseCard";
import { PageBanner } from "@/components/PageBanner";
import { fetchHorses } from "@/services/horses";
import type { HorseCategory } from "@/types";

interface Props {
  category: HorseCategory;
  titleKey: string;
  subtitleKey: string;
  bannerImage?: string;
}

export const HorseListing = ({ category, titleKey, subtitleKey, bannerImage }: Props) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const { data: horses = [], isLoading } = useQuery({
    queryKey: ["horses"],
    queryFn: fetchHorses,
  });

  const filtered = useMemo(() => {
    return horses
      .filter((h) => h.category === category)
      .filter((h) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          h.name.toLowerCase().includes(q) ||
          (h.nameAr ?? "").toLowerCase().includes(q) ||
          h.type.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));
  }, [horses, category, query]);

  return (
    <>
      <PageBanner
        eyebrow={t("hero.eyebrow")}
        title={t(titleKey)}
        subtitle={t(subtitleKey)}
        image={bannerImage}
      />

      <section className="luxury-container py-16 md:py-24">
        <div className="mb-10 flex justify-center">
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

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-2xl">{t("common.loading")}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-2xl">{t("common.empty")}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h, i) => (
              <HorseCard key={h.id} horse={h} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
