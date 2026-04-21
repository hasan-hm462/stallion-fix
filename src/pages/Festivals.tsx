import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { PageBanner } from "@/components/PageBanner";
import { FestivalCard } from "@/components/FestivalCard";
import { fetchFestivals } from "@/services/festivals";
import festivalShow from "@/assets/festival-show.jpg";

const Festivals = () => {
  const { t } = useTranslation();
  const { data: festivals = [], isLoading } = useQuery({
    queryKey: ["festivals"],
    queryFn: fetchFestivals,
  });
  return (
    <>
      <PageBanner
        eyebrow={t("hero.eyebrow")}
        title={t("festivals.pageTitle")}
        subtitle={t("festivals.pageSubtitle")}
        image={festivalShow}
      />
      <section className="luxury-container py-16 md:py-24">
        {isLoading ? (
          <p className="text-center font-display text-2xl text-muted-foreground py-20">
            {t("common.loading")}
          </p>
        ) : festivals.length === 0 ? (
          <p className="text-center font-display text-2xl text-muted-foreground py-20">
            {t("common.empty")}
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {festivals.map((f, i) => (
              <FestivalCard key={f.id} festival={f} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Festivals;
