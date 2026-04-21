import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Sparkles, Trophy, Crown, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ horses: 0, festivals: 0, stallions: 0, bred: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [hSnap, fSnap] = await Promise.all([
          getCountFromServer(collection(db, "horses")),
          getCountFromServer(collection(db, "festivals")),
        ]);
        // We don't have category-filtered counts cheap on web sdk without queries; rough total:
        setStats({
          horses: hSnap.data().count,
          festivals: fSnap.data().count,
          stallions: 0,
          bred: 0,
        });
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    { label: "Total Horses", value: stats.horses, icon: Sparkles, to: "/admin/horses", color: "text-gold" },
    { label: "Festivals", value: stats.festivals, icon: Trophy, to: "/admin/festivals", color: "text-gold" },
    { label: "Featured", value: "—", icon: Crown, to: "/admin/horses", color: "text-gold" },
    { label: "Media", value: "—", icon: ImageIcon, to: "/admin/horses", color: "text-gold" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Overview</p>
          <h1 className="font-display text-3xl md:text-4xl">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Manage your stud's content from here.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map((c) => (
            <Link key={c.label} to={c.to}>
              <Card className="p-5 hover:shadow-luxury transition-shadow group">
                <div className="flex items-start justify-between mb-3">
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl font-display">{loading ? "…" : c.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{c.label}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/admin/horses">
            <Card className="p-6 hover:shadow-luxury transition-shadow">
              <Sparkles className="h-6 w-6 text-gold mb-3" />
              <h3 className="font-display text-xl mb-1">Manage Horses</h3>
              <p className="text-sm text-muted-foreground">Add, edit, and organize your farm horses, bred horses, and stallions.</p>
            </Card>
          </Link>
          <Link to="/admin/festivals">
            <Card className="p-6 hover:shadow-luxury transition-shadow">
              <Trophy className="h-6 w-6 text-gold mb-3" />
              <h3 className="font-display text-xl mb-1">Manage Festivals</h3>
              <p className="text-sm text-muted-foreground">Document events, shows, and proud moments of the stud.</p>
            </Card>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
