import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import { useLanguage } from "@/contexts/LanguageContext";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Palette,
  Globe,
  Camera,
  Megaphone,
  PenTool,
  ArrowDown,
} from "lucide-react";

// Import real professional photos
import serviceAds from "@/assets/service-ads.jpg";
import serviceBranding from "@/assets/service-branding.jpg";
import serviceWeb from "@/assets/service-web.jpg";
import serviceLogoDesign from "@/assets/service-branding.jpg"; // Using branding photo for logo design
import servicePhotography from "@/assets/service-photography.jpg";

// Import fallback image and video
import heroFallback from "@/assets/hero-bg.jpg";
import servicesVideo from "@/assets/videos/ServicesVideo.mp4";

const ServicesOverview = () => {
  const navigate = useNavigate();
  const { isRTL, t } = useLanguage();

  const services = [
    {
      id: "advertising",
      title: t.services.cards.advertising.title,
      description: t.services.cards.advertising.description,
      icon: Megaphone,
      image: serviceAds,
      altText:
        "Real advertising and marketing workspace photo showing creative team collaboration and campaign development",
      features: t.services.cards.advertising.features,
      slug: "advertising",
    },
    {
      id: "branding",
      title: t.services.cards.branding.title,
      description: t.services.cards.branding.description,
      icon: Palette,
      image: serviceBranding,
      altText:
        "Professional branding design studio photo with real design tools, color materials, and creative workspace",
      features: t.services.cards.branding.features,
      slug: "branding",
    },
    {
      id: "website-design",
      title: t.services.cards.websiteDesign.title,
      description: t.services.cards.websiteDesign.description,
      icon: Globe,
      image: serviceWeb,
      altText:
        "Real web development workspace photo showing laptops, code, and responsive design development",
      features: t.services.cards.websiteDesign.features,
      slug: "website-design",
    },
    {
      id: "logo-design",
      title: t.services.cards.logoDesign.title,
      description: t.services.cards.logoDesign.description,
      icon: PenTool,
      image: serviceLogoDesign,
      altText:
        "Professional logo design studio photo featuring real design tools, sketches, and branding materials",
      features: t.services.cards.logoDesign.features,
      slug: "logo-design",
    },
    {
      id: "photography",
      title: t.services.cards.photography.title,
      description: t.services.cards.photography.description,
      icon: Camera,
      image: servicePhotography,
      altText:
        "Real professional photography studio photo with camera equipment, lighting setup, and editing workspace",
      features: t.services.cards.photography.features,
      slug: "photography",
    },
  ];

  const handleServiceClick = (slug) => {
    navigate(`/services/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />

      {/* Hero Section */}
      {
        <VideoBackground
          videoSrc={servicesVideo}
          posterSrc={heroFallback}
          className="pt-20 pb-20 md:pt-24 md:pb-24 flex items-center justify-center"
          overlayOpacity={0.6}
        >
          <section className="container mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-din font-bold text-white drop-shadow-2xl mb-6 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                  {t.services.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-white mb-8 max-w-4xl mx-auto font-light drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_70%)]">
                  {t.services.hero.subtitle}
                </p>
                <div className="flex justify-center mt-12 animate-bounce">
                  <ArrowDown className="w-6 h-6 text-white drop-shadow-2xl [filter:_drop-shadow(2px_2px_4px_rgb(0_0_0_/_80%))]" />
                </div>
              </div>
            </div>
          </section>
        </VideoBackground>
      }

      {/* Services Grid */}
      <section className="py-16" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  dir={isRTL ? "rtl" : "ltr"} // keep this for text alignment
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 animate-scale-in h-auto"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleServiceClick(service.slug)}
                >
                  {/* === Header === */}
                  <CardHeader className="p-0 ">
                    <div className="relative w-full h-52 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div
                        className={`absolute bottom-4 ${
                          isRTL ? "right-4 flex-row-reverse" : "left-4"
                        } flex items-center gap-2`}
                      >
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3
                          className={`text-white font-din font-bold text-xl line-clamp-1 ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>

                  {/* === Content === */}
                  <CardContent className="p-6 flex !flex-col justify-between flex-1 !items-stretch !w-full">
                    {/* Description */}
                    <p
                      className={`text-muted-foreground mb-4 leading-relaxed line-clamp-3`}
                    >
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                        {t.services.detailPage.keyFeatures}
                      </h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className={`list-item list-inside list-disc marker:text-primary text-sm text-muted-foreground`}
                          >
                            <span className="">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto w-full flex justify-center">
                      <Button
                        className="w-full sm:w-[90%] flex items-center justify-center group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service.slug);
                        }}
                      >
                        {t.services.detailPage.viewProjects}
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isRTL
                              ? "mr-2 group-hover/btn:-translate-x-1"
                              : "ml-2 group-hover/btn:translate-x-1"
                          }`}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-din font-bold text-foreground mb-4 text-center">
            {t.services.cta.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
            {t.services.cta.subtitle}
          </p>
          <Button
            size="lg"
            className="px-8"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/#contact");
              }
            }}
          >
            {t.services.cta.button}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesOverview;