import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import nextwaveLogo from "@/assets/nextwave header.png";
import VideoBackground from "./VideoBackground";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t, isRTL } = useLanguage();
  
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Video Background - Behind everything */}
      <div className="absolute inset-0 z-0">
        <VideoBackground
          videoSrc="/videos/HomeVideo.mp4"
          posterSrc={heroImage}
          className="min-h-screen"
          overlayOpacity={0.6}
        />
      </div>
      
      {/* Hero Content - Above the video */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="w-full px-4">
          <div className="animate-fade-in w-full flex justify-center">
            {/* Reduced width blur container with smaller top margin */}
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl px-8 pt-1 pb-3 md:px-12 md:pt-2 md:pb-4 border border-white/10 w-full max-w-4xl mx-auto text-center">
              <div className="my-0 flex justify-center">
                <img 
                  src={nextwaveLogo} 
                  alt="NextWave Logo" 
                  className="h-32 md:h-48 lg:h-64 xl:h-72 w-auto max-w-full transition-elegant hover:scale-110 cursor-default drop-shadow-2xl"
                />
              </div>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light drop-shadow-lg text-center -mt-2">
                {t.home.hero.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={scrollToServices}
                  className="group shadow-xl"
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
                  className="shadow-xl"
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
  );
};
