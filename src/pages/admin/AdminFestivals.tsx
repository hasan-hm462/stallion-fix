import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Calendar, MapPin } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchFestivals, deleteFestival } from "@/services/festivals";
import { FestivalForm } from "@/components/admin/FestivalForm";
import type { Festival } from "@/types";
import { toast } from "sonner";

const AdminFestivals = () => {
  const [items, setItems] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Festival | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await fetchFestivals());
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFestival(deleteId);
      toast.success("Festival deleted");
      setDeleteId(null);
      load();
    } catch (e: any) {
      toast.error(e?.message ?? "Delete failed");
    }
  };

  if (creating || editing) {
    return (
      <AdminLayout>
        <FestivalForm
          festival={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); load(); }}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Events</p>
            <h1 className="font-display text-3xl md:text-4xl">Festivals</h1>
            <p className="text-muted-foreground mt-2">{items.length} entries</p>
          </div>
          <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-primary-foreground border-0">
            <Plus className="h-4 w-4" /> Add Festival
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-gold" /></div>
        ) : items.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No festivals yet.</p>
            <Button onClick={() => setCreating(true)} variant="outline">
              <Plus className="h-4 w-4" /> Add your first festival
            </Button>
          </Card>
        ) : (
          <div className="grid gap-3">
            {items.map((f) => (
              <Card key={f.id} className="p-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                  {f.images?.[0] && <img src={f.images[0]} alt={f.title} className="h-full w-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg truncate">{f.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{f.eventDate}</span>
                    {f.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{f.location}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(f)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleteId(f.id)} className="hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this festival?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminFestivals;
