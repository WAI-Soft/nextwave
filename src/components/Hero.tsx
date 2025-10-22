import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import nextwaveLogo from "@/assets/nextwave header.png";
import homeVideo from "@/assets/videos/HomeVideo.mp4";
import VideoBackground from "./VideoBackground";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const { t, isRTL } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoTransform, setLogoTransform] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const updateTransform = () => {
      if (!heroRef.current || !logoRef.current) return;

      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / heroHeight, 1);

      setScrollProgress(progress);

      // Logo animation with extended threshold for ultra-smooth movement
      const animationThreshold = 0.6;
      const logoProgress = Math.min(progress / animationThreshold, 1);

      // Buttery smooth easing - ease-out-expo
      const easeOutExpo = (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };
      
      const easeProgress = easeOutExpo(logoProgress);

      // Calculate scale: from 1 to ~0.28 (to match nav logo size of h-20 = 80px)
      const targetScale = 0.28;
      const scale = 1 - ((1 - targetScale) * easeProgress);

      // Calculate vertical movement with smoother curve
      const viewportHeight = window.innerHeight;
      const startY = 0;
      const targetY = -(viewportHeight / 2 - 60);
      const y = startY + (targetY * easeProgress);

      setLogoTransform({
        x: 0,
        y: y,
        scale: scale
      });

      lastScrollY = scrolled;
    };

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(updateTransform);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransform(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isRTL]);

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section - Fixed in place */}
      <div ref={heroRef} className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        {/* Video Background - Moves up on scroll */}
        <div
          className="absolute inset-0 w-full h-screen will-change-transform"
          style={{
            transform: `translate3d(0, ${scrollProgress * -100}vh, 0)`,
            backfaceVisibility: 'hidden',
            perspective: 1000
          }}
        >
          <VideoBackground
            videoSrc={homeVideo}
            posterSrc={heroImage}
            className="h-screen"
            overlayOpacity={0.6}
          />
        </div>

        {/* Hero Content - Stays fixed, only fades out */}
        <div
          className="absolute inset-0 z-10 w-full h-screen flex items-center justify-center will-change-transform"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 1.2),
          }}
        >
          <div className="w-full px-4">
            <div className="animate-fade-in w-full flex justify-center">
              {/* Reduced width blur container with smaller top margin */}
              <div className="bg-black/20 backdrop-blur-sm rounded-3xl px-8 pt-1 pb-3 md:px-12 md:pt-2 md:pb-4 border border-white/10 w-full max-w-4xl mx-auto text-center">
                <div className="my-0 flex justify-center">
                  <img
                    ref={logoRef}
                    src={nextwaveLogo}
                    alt="NextWave Logo"
                    className="h-32 md:h-48 lg:h-64 xl:h-72 w-auto max-w-full cursor-default drop-shadow-2xl"
                    style={{
                      transform: `translate3d(${logoTransform.x}px, ${logoTransform.y}px, 0) scale(${logoTransform.scale})`,
                      transformOrigin: 'center center',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      perspective: 1000,
                      WebkitFontSmoothing: 'antialiased'
                    }}
                  />
                </div>

                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light drop-shadow-lg text-center -mt-2">
                  {t.home.hero.tagline}
                </p>

                <div className={`flex-col lg:flex-row justify-center items-stretch lg:items-center gap-3 lg:gap-4 w-full max-w-md lg:max-w-none mx-auto ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={scrollToServices}
                    className="group m-3 shadow-xl w-full lg:w-auto"
                  >
                    {t.home.hero.exploreServices}
                  </Button>
                  <Button
                    variant="elegant"
                    size="lg"
                    onClick={() => {
                      const element = document.getElementById("contact");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="shadow-xl m-3 w-full lg:w-auto"
                  >
                    {t.home.hero.getInTouch}
                  </Button>
                </div>

                {/* Animated scroll indicator */}
                <div className="flex justify-center mt-12 animate-bounce">
                  <ArrowDown className="w-6 h-6 text-white/80 drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div className="h-screen"></div>
    </>
  );
};
