import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { fetchHorses, deleteHorse } from "@/services/horses";
import { HorseForm } from "@/components/admin/HorseForm";
import type { Horse } from "@/types";
import { toast } from "sonner";

const AdminHorses = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Horse | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setHorses(await fetchHorses());
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteHorse(deleteId);
      toast.success("Horse deleted");
      setDeleteId(null);
      load();
    } catch (e: any) {
      toast.error(e?.message ?? "Delete failed");
    }
  };

  if (creating || editing) {
    return (
      <AdminLayout>
        <HorseForm
          horse={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            load();
          }}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Catalog</p>
            <h1 className="font-display text-3xl md:text-4xl">Horses</h1>
            <p className="text-muted-foreground mt-2">{horses.length} entries</p>
          </div>
          <Button onClick={() => setCreating(true)} className="bg-gold-gradient text-primary-foreground border-0">
            <Plus className="h-4 w-4" /> Add Horse
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : horses.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No horses yet.</p>
            <Button onClick={() => setCreating(true)} variant="outline">
              <Plus className="h-4 w-4" /> Add your first horse
            </Button>
          </Card>
        ) : (
          <div className="grid gap-3">
            {horses.map((h) => (
              <Card key={h.id} className="p-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                  {h.mainImage && <img src={h.mainImage} alt={h.name} className="h-full w-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-display text-lg truncate">{h.name}</p>
                    {h.featured && <Star className="h-4 w-4 text-gold fill-gold" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">{h.category}</Badge>
                    <Badge variant="outline" className="text-xs">{h.gender}</Badge>
                    {h.type && <span className="text-xs text-muted-foreground">{h.type}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(h)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleteId(h.id)} className="hover:bg-destructive hover:text-destructive-foreground">
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
            <AlertDialogTitle>Delete this horse?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminHorses;
