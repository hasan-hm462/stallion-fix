import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { SiteLayout } from "@/components/SiteLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import "@/i18n";

import Home from "./pages/Home";
import FarmHorses from "./pages/FarmHorses";
import Stallions from "./pages/Stallions";
import Festivals from "./pages/Festivals";
import FestivalDetails from "./pages/FestivalDetails";
import About from "./pages/About";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import HorseDetails from "./pages/HorseDetails";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHorses from "./pages/admin/AdminHorses";
import AdminFestivals from "./pages/admin/AdminFestivals";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin (no SiteLayout) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/horses" element={<ProtectedRoute><AdminHorses /></ProtectedRoute>} />
              <Route path="/admin/festivals" element={<ProtectedRoute><AdminFestivals /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

              {/* Public (with SiteLayout) */}
              <Route
                path="*"
                element={
                  <SiteLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/farm-horses" element={<FarmHorses />} />
                      {/* Legacy redirects: mares & bred pages now live inside Farm Horses */}
                      <Route path="/mares" element={<FarmHorses />} />
                      <Route path="/bred-by-al-mazloum-stud" element={<FarmHorses />} />
                      <Route path="/stallions" element={<Stallions />} />
                      <Route path="/festivals" element={<Festivals />} />
                      <Route path="/festivals/:slug" element={<FestivalDetails />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/location" element={<Location />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/horses/:slug" element={<HorseDetails />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </SiteLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
