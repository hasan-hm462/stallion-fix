import { useEffect, useState, FormEvent } from "react";
import { Loader2, Save } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { fetchSettings, saveSettings, SiteSettings } from "@/services/settings";
import { toast } from "sonner";

const AdminSettings = () => {
  const [form, setForm] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setForm(await fetchSettings());
      } catch (e: any) {
        toast.error(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings(form);
      toast.success("Settings saved");
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Configuration</p>
            <h1 className="font-display text-3xl md:text-4xl">Site Settings</h1>
          </div>
          <Button type="submit" disabled={saving} className="bg-gold-gradient text-primary-foreground border-0">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>

        <Card className="p-6 space-y-5">
          <h2 className="font-display text-lg">Contact</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label>WhatsApp number</Label>
              <Input value={form.whatsappNumber ?? ""} onChange={(e) => set("whatsappNumber", e.target.value)} placeholder="+963XXXXXXXXX" className="mt-1.5" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={form.phoneNumber ?? ""} onChange={(e) => set("phoneNumber", e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Address</Label>
              <Input value={form.address ?? ""} onChange={(e) => set("address", e.target.value)} className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label>Map URL (Google Maps embed)</Label>
              <Input value={form.mapUrl ?? ""} onChange={(e) => set("mapUrl", e.target.value)} className="mt-1.5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-5">
          <h2 className="font-display text-lg">Hero & About</h2>
          <div>
            <Label>Hero title</Label>
            <Input value={form.heroTitle ?? ""} onChange={(e) => set("heroTitle", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Hero subtitle</Label>
            <Input value={form.heroSubtitle ?? ""} onChange={(e) => set("heroSubtitle", e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>About text</Label>
            <Textarea value={form.aboutText ?? ""} onChange={(e) => set("aboutText", e.target.value)} rows={5} className="mt-1.5" />
          </div>
        </Card>

        <Card className="p-6 space-y-5">
          <h2 className="font-display text-lg">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label>Instagram</Label>
              <Input value={form.socialInstagram ?? ""} onChange={(e) => set("socialInstagram", e.target.value)} placeholder="https://instagram.com/..." className="mt-1.5" />
            </div>
            <div>
              <Label>Facebook</Label>
              <Input value={form.socialFacebook ?? ""} onChange={(e) => set("socialFacebook", e.target.value)} placeholder="https://facebook.com/..." className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label>YouTube</Label>
              <Input value={form.socialYoutube ?? ""} onChange={(e) => set("socialYoutube", e.target.value)} placeholder="https://youtube.com/..." className="mt-1.5" />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="bg-gold-gradient text-primary-foreground border-0">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Settings
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminSettings;
