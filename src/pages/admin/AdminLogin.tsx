import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast.error(err?.message ?? "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground p-6">
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="relative w-full max-w-md bg-background text-foreground rounded-md shadow-luxury p-8 md:p-10">
        <div className="text-center mb-8">
          <img src={logo} alt="Al Mazloum Stud" className="mx-auto h-20 w-auto mb-4" />
          <h1 className="font-display text-2xl">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Al Mazloum Stud</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9"
                placeholder="admin@example.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold-gradient text-primary-foreground hover:opacity-90 border-0 h-11"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>
        </form>
        <p className="mt-6 text-xs text-center text-muted-foreground">
          Admin accounts are managed in Firebase Console.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
