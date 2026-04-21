import { useState, FormEvent } from "react";
import { ArrowLeft, Loader2, Save, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { createFestival, updateFestival } from "@/services/festivals";
import type { Festival } from "@/types";
import { translateToArabic } from "@/lib/translate";
import { toast } from "sonner";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface Props {
  festival: Festival | null;
  onClose: () => void;
  onSaved: () => void;
}

export const FestivalForm = ({ festival, onClose, onSaved }: Props) => {
  const [form, setForm] = useState<Omit<Festival, "id">>({
    title: festival?.title ?? "",
    titleAr: festival?.titleAr ?? "",
    slug: festival?.slug ?? "",
    description: festival?.description ?? "",
    descriptionAr: festival?.descriptionAr ?? "",
    eventDate: festival?.eventDate ?? new Date().toISOString().slice(0, 10),
    location: festival?.location ?? "",
    images: festival?.images ?? [],
    videoUrl: festival?.videoUrl ?? "",
    featured: festival?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState<null | "title" | "desc">(null);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const autoTranslate = async (
    field: "title" | "desc",
    value: string,
    arField: "titleAr" | "descriptionAr"
  ) => {
    if (!value.trim() || form[arField]) return;
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
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title) };
      if (festival) {
        await updateFestival(festival.id, payload);
        toast.success("Festival updated");
      } else {
        await createFestival(payload);
        toast.success("Festival created");
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
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{festival ? "Edit" : "New"}</p>
            <h1 className="font-display text-2xl md:text-3xl">{festival ? form.title || "Festival" : "Add Festival"}</h1>
          </div>
        </div>
        <Button type="submit" disabled={saving} className="bg-gold-gradient text-primary-foreground border-0">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </Button>
      </div>

      <Card className="p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label>Title (EN)*</Label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              onBlur={(e) => autoTranslate("title", e.target.value, "titleAr")}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label>Title (AR)</Label>
              {translating === "title" && (
                <span className="text-xs text-gold inline-flex items-center gap-1">
                  <Languages className="h-3 w-3 animate-pulse" /> Translating…
                </span>
              )}
            </div>
            <Input value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} dir="rtl" className="mt-1.5" />
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={form.location} onChange={(e) => set("location", e.target.value)} className="mt-1.5" />
          </div>
          <div className="md:col-span-2">
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated" className="mt-1.5" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Tip: type in English, then click outside the field — the Arabic version is generated automatically.
        </p>
        <div>
          <Label>Description (EN)</Label>
          <Textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            onBlur={(e) => autoTranslate("desc", e.target.value, "descriptionAr")}
            rows={4}
            className="mt-1.5"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label>Description (AR)</Label>
            {translating === "desc" && (
              <span className="text-xs text-gold inline-flex items-center gap-1">
                <Languages className="h-3 w-3 animate-pulse" /> Translating…
              </span>
            )}
          </div>
          <Textarea value={form.descriptionAr} onChange={(e) => set("descriptionAr", e.target.value)} rows={4} dir="rtl" className="mt-1.5" />
        </div>
      </Card>

      <Card className="p-6 space-y-5">
        <h2 className="font-display text-lg">Media</h2>
        <MediaUploader
          label="Gallery images"
          value={form.images}
          onChange={(v) => set("images", v)}
          folder="festivals"
          multiple
        />
        <MediaUploader
          label="Video"
          value={form.videoUrl ?? ""}
          onChange={(v) => set("videoUrl", v)}
          folder="festivals/videos"
          accept="video/*"
          isVideo
        />
      </Card>

      <Card className="p-6 flex items-center justify-between">
        <div>
          <Label>Featured</Label>
          <p className="text-xs text-muted-foreground">Highlight this festival.</p>
        </div>
        <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={saving} className="bg-gold-gradient text-primary-foreground border-0">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Festival
        </Button>
      </div>
    </form>
  );
};
