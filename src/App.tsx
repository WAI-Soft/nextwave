import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicePage from "./pages/services/ServicePage";
import ServicesOverview from "./pages/services/ServicesOverview";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import RouteLoader from "./components/RouteLoader";
import PageTransition from "./components/PageTransition";
import RouteMetadata from "./components/RouteMetadata";
import { BackToTop } from "./components/BackToTop";
import Preloader from "./components/Preloader";
import { useScrollRestoration } from "./hooks/use-scroll-restoration";
import { LanguageProvider } from "./contexts/LanguageContext";
import { preloadAllVideos } from "./lib/videoPreloader";
import { useEffect, useState } from "react";


const queryClient = new QueryClient();

// Layout wrapper component
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  useScrollRestoration();
  
  return (
    <>
      <RouteMetadata />
      <RouteLoader />
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Disable browser scroll restoration and ensure page starts at top
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll to top immediately on app mount
    window.scrollTo(0, 0);
    
    // Initialize video preloading
    preloadAllVideos();
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}
          <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesOverview />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
          <BackToTop />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
};

export default App;
