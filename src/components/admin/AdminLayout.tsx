import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Trophy, Settings, LogOut, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const navItems = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/horses", label: "Horses", icon: Sparkles },
  { to: "/admin/festivals", label: "Festivals", icon: Trophy },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-72 bg-primary text-primary-foreground flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-primary-foreground/10 flex items-center gap-3">
          <img src={logo} alt="" className="h-12 w-auto" />
          <div>
            <p className="font-display text-lg leading-tight">Al Mazloum</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Admin</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/60 mb-3 truncate">{user?.email}</p>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-gold"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-primary/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setOpen(true)} aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
          <p className="font-display">Admin</p>
          <span className="w-6" />
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};
