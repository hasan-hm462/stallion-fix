import { useState, FormEvent } from "react";
import { ArrowLeft, Loader2, Save, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { createHorse, updateHorse } from "@/services/horses";
import type { Horse, HorseCategory, FarmSubcategory } from "@/types";
import { translateToArabic } from "@/lib/translate";
import { toast } from "sonner";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface Props {
  horse: Horse | null;
  onClose: () => void;
  onSaved: () => void;
}

export const HorseForm = ({ horse, onClose, onSaved }: Props) => {
  const [form, setForm] = useState<Omit<Horse, "id">>({
    name: horse?.name ?? "",
    nameAr: horse?.nameAr ?? "",
    slug: horse?.slug ?? "",
    category: horse?.category ?? "farm",
    farmSubcategory: horse?.farmSubcategory ?? "other",
    type: horse?.type ?? "Arabian",
    gender: horse?.gender ?? "male",
    shortDescription: horse?.shortDescription ?? "",
    shortDescriptionAr: horse?.shortDescriptionAr ?? "",
    fullDescription: horse?.fullDescription ?? "",
    fullDescriptionAr: horse?.fullDescriptionAr ?? "",
    mainImage: horse?.mainImage ?? "",
    galleryImages: horse?.galleryImages ?? [],
    videoUrl: horse?.videoUrl ?? "",
    motherName: horse?.motherName ?? "",
    fatherName: horse?.fatherName ?? "",
    birthYear: horse?.birthYear,
    color: horse?.color ?? "",
    featured: horse?.featured ?? false,
    displayOrder: horse?.displayOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState<null | "short" | "full">(null);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const autoTranslate = async (
    field: "short" | "full",
    value: string,
    arField: "shortDescriptionAr" | "fullDescriptionAr"
  ) => {
    if (!value.trim() || form[arField]) return; // don't overwrite manual text
    setTranslating(field);
    try {
      const ar = await translateToArabic(value);
      if (ar) set(arField, ar);
    } finally {
      setTranslating(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mainImage) {
      toast.error("Name and main image are required");
      return;
    }
    setSaving(true);
    try {
      const raw: Record<string, any> = {
        ...form,
        slug: form.slug || slugify(form.name),
      };
      if (form.category === "farm") {
        raw.farmSubcategory = form.farmSubcategory ?? "other";
      } else {
        delete raw.farmSubcategory;
      }
      // Strip undefined values — Firestore rejects them
      const payload = Object.fromEntries(
        Object.entries(raw).filter(([, v]) => v !== undefined)
      ) as Omit<Horse, "id">;
      if (horse) {
        await updateHorse(horse.id, payload);
        toast.success("Horse updated");
      } else {
        await createHorse(payload);
        toast.success("Horse created");
      }
      onSaved();
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{horse ? "Edit" : "New"}</p>
            <h1 className="font-display text-2xl md:text-3xl">{horse ? form.name || "Horse" : "Add Horse"}</h1>
          </div>
        </div>
        <Button type="submit" disabled={saving} className="bg-gold-gradient text-primary-foreground border-0">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </Button>
      </div>

      <Card className="p-6 space-y-5">
        <h2 className="font-display text-lg">Basic Info</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label>Name (EN)*</Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} required className="mt-1.5" />
          </div>
          <div>
            <Label>Name (AR)</Label>
            <Input value={form.nameAr} onChange={(e) => set("nameAr", e.target.value)} dir="rtl" className="mt-1.5" />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated" className="mt-1.5" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v as HorseCategory)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="farm">Farm Horses</SelectItem>
                <SelectItem value="stallions">Stallions</SelectItem>
              </SelectContent>
            </Select>
            {form.category === "farm" && (
              <p className="text-xs text-muted-foreground mt-1.5">
                Pick a farm section below to control where this horse appears.
              </p>
            )}
          </div>
          {form.category === "farm" && (
            <div>
              <Label>Farm section</Label>
              <Select
                value={form.farmSubcategory ?? "other"}
                onValueChange={(v) => set("farmSubcategory", v as FarmSubcategory)}
              >
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mares">Mazloum Mares</SelectItem>
                  <SelectItem value="bred">Bred by Al Mazloum Stud</SelectItem>
                  <SelectItem value="other">Other farm horses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label>Gender</Label>
            <Select value={form.gender} onValueChange={(v) => set("gender", v as Horse["gender"])}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="foal">Foal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Breed / Type</Label>
            <Input value={form.type} onChange={(e) => set("type", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Color</Label>
            <Input value={form.color} onChange={(e) => set("color", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Birth Year</Label>
            <Input
              type="number"
              value={form.birthYear ?? ""}
              onChange={(e) => set("birthYear", e.target.value ? Number(e.target.value) : undefined)}
              className="mt-1.5"
            />
          </div>
          {form.category === "farm" && form.farmSubcategory === "bred" && (
            <>
              <div>
                <Label>Mother</Label>
                <Input value={form.motherName} onChange={(e) => set("motherName", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Father</Label>
                <Input value={form.fatherName} onChange={(e) => set("fatherName", e.target.value)} className="mt-1.5" />
              </div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6 space-y-5">
        <h2 className="font-display text-lg">Descriptions</h2>
        <p className="text-xs text-muted-foreground -mt-2">
          Tip: type in English, then click outside the field — the Arabic version is generated automatically.
        </p>
        <div>
          <Label>Short description (EN)</Label>
          <Textarea
            value={form.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
            onBlur={(e) => autoTranslate("short", e.target.value, "shortDescriptionAr")}
            rows={2}
            className="mt-1.5"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label>Short description (AR)</Label>
            {translating === "short" && (
              <span className="text-xs text-gold inline-flex items-center gap-1">
                <Languages className="h-3 w-3 animate-pulse" /> Translating…
              </span>
            )}
          </div>
          <Textarea
            value={form.shortDescriptionAr}
            onChange={(e) => set("shortDescriptionAr", e.target.value)}
            rows={2}
            dir="rtl"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>Full description (EN)</Label>
          <Textarea
            value={form.fullDescription}
            onChange={(e) => set("fullDescription", e.target.value)}
            onBlur={(e) => autoTranslate("full", e.target.value, "fullDescriptionAr")}
            rows={5}
            className="mt-1.5"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label>Full description (AR)</Label>
            {translating === "full" && (
              <span className="text-xs text-gold inline-flex items-center gap-1">
                <Languages className="h-3 w-3 animate-pulse" /> Translating…
              </span>
            )}
          </div>
          <Textarea
            value={form.fullDescriptionAr}
            onChange={(e) => set("fullDescriptionAr", e.target.value)}
            rows={5}
            dir="rtl"
            className="mt-1.5"
          />
        </div>
      </Card>

      <Card className="p-6 space-y-5">
        <h2 className="font-display text-lg">Media</h2>
        <MediaUploader
          label="Main image*"
          value={form.mainImage}
          onChange={(v) => set("mainImage", v)}
          folder="horses"
        />
        <MediaUploader
          label="Gallery images"
          value={form.galleryImages ?? []}
          onChange={(v) => set("galleryImages", v)}
          folder="horses"
          multiple
        />
        <MediaUploader
          label="Video"
          value={form.videoUrl ?? ""}
          onChange={(v) => set("videoUrl", v)}
          folder="horses/videos"
          accept="video/*"
          isVideo
        />
      </Card>

      <Card className="p-6 space-y-5">
        <h2 className="font-display text-lg">Display</h2>
        <div className="flex items-center justify-between">
          <div>
            <Label>Featured on homepage</Label>
            <p className="text-xs text-muted-foreground">Show in the featured horses section.</p>
          </div>
          <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
        </div>
        <div>
          <Label>Display order</Label>
          <Input
            type="number"
            value={form.displayOrder ?? 0}
            onChange={(e) => set("displayOrder", Number(e.target.value))}
            className="mt-1.5 max-w-xs"
          />
          <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first.</p>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={saving} className="bg-gold-gradient text-primary-foreground border-0">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Horse
        </Button>
      </div>
    </form>
  );
};
