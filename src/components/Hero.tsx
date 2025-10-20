import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import nextwaveLogo from "@/assets/nextwave header.png";
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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!heroRef.current || !logoRef.current) return;
          
          const heroHeight = heroRef.current.offsetHeight;
          const scrolled = window.scrollY;
          const progress = Math.min(scrolled / heroHeight, 1);
          
          setScrollProgress(progress);
          
          // Logo animation similar to the reference site
          // Animation completes when reaching 30% of scroll
          const animationThreshold = 0.3;
          const logoProgress = Math.min(progress / animationThreshold, 1);
          
          // Smooth easing function for natural movement
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
          const easeProgress = easeOutCubic(logoProgress);
          
          // Calculate scale: from 1 to ~0.28 (to match nav logo size of h-20 = 80px)
          // Assuming hero logo is around 288px (h-72), scale factor is 80/288 ≈ 0.28
          const targetScale = 0.28;
          const scale = 1 - ((1 - targetScale) * easeProgress);
          
          // Calculate vertical movement
          // Move logo up to align with navigation bar (around 40px from top)
          const viewportHeight = window.innerHeight;
          const startY = 0;
          const targetY = -(viewportHeight / 2 - 60); // Move to top of screen
          const y = startY + (targetY * easeProgress);
          
          setLogoTransform({
            x: 0,
            y: y,
            scale: scale
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isRTL]);
  
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Video Background - Fixed and slides up behind nav */}
      <div 
        className="fixed inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollProgress * -100}vh, 0)`,
        }}
      >
        <VideoBackground
          videoSrc="/videos/HomeVideo.mp4"
          posterSrc={heroImage}
          className="h-screen"
          overlayOpacity={0.6}
        />
      </div>
      
      <div ref={heroRef} className="relative w-full h-screen overflow-hidden" style={{ paddingTop: '0' }}>
      
      {/* Hero Content - Above the video */}
      <div 
        className="relative z-10 w-full h-screen flex items-center justify-center will-change-transform"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 1.2),
          transform: `translate3d(0, ${scrollProgress * -50}px, 0)`,
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
                  className="h-32 md:h-48 lg:h-64 xl:h-72 w-auto max-w-full cursor-default drop-shadow-2xl will-change-transform"
                  style={{
                    transform: `translate3d(${logoTransform.x}px, ${logoTransform.y}px, 0) scale(${logoTransform.scale})`,
                    transformOrigin: 'center center'
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
    </>
  );
};
