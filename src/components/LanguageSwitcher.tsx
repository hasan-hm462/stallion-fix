import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const next = i18n.language === "ar" ? "en" : "ar";
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => i18n.changeLanguage(next)}
      className="gap-2 text-foreground hover:text-gold hover:bg-accent/10 font-medium"
      aria-label="Change language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs uppercase tracking-wider">{next}</span>
    </Button>
  );
};
