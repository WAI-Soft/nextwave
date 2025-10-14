import { useState, useEffect } from "react";
import { Camera, Palette, Globe, Megaphone, Sparkles } from "lucide-react";
import CameraMockup from "./CameraMockup";
import { useLanguage } from "@/contexts/LanguageContext";
// Using real professional photos
import serviceAdvertising from '../assets/service-ads.jpg';
import serviceBranding from '../assets/service-branding.jpg';
import serviceWebsite from '../assets/service-web.jpg';
import serviceLogoDesign from '../assets/service-branding.jpg'; // Using branding photo for logo design
import servicePhotography from '../assets/service-photography.jpg';

export const Services = () => {
  const { t, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      icon: Megaphone,
      title: t.home.services.advertising.title,
      description: t.home.services.advertising.description,
      image: serviceAdvertising,
      altText: t.home.services.advertising.altText,
    },
    {
      icon: Palette,
      title: t.home.services.branding.title,
      description: t.home.services.branding.description,
      image: serviceBranding,
      altText: t.home.services.branding.altText,
    },
    {
      icon: Globe,
      title: t.home.services.websiteDesign.title,
      description: t.home.services.websiteDesign.description,
      image: serviceWebsite,
      altText: t.home.services.websiteDesign.altText,
    },
    {
      icon: Sparkles,
      title: t.home.services.logoDesign.title,
      description: t.home.services.logoDesign.description,
      image: serviceLogoDesign,
      altText: t.home.services.logoDesign.altText,
    },
    {
      icon: Camera,
      title: t.home.services.photography.title,
      description: t.home.services.photography.description,
      image: servicePhotography,
      altText: t.home.services.photography.altText,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activeService = services[activeIndex];
  const Icon = activeService.icon;

  return (
    <section id="services" className="py-20 bg-gradient-subtle" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className={`mb-16 animate-fade-in ${isRTL ? 'text-center' : 'text-center'}`}>
          <h2 className="text-4xl md:text-5xl font-din font-bold text-foreground mb-4">
            {t.home.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.home.services.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Camera Mockup Side */}
          <div className="relative animate-scale-in order-2 lg:order-1">
            <div className="relative">
                <CameraMockup
                  image={activeService.image}
                  alt={activeService.altText}
                  className="transform transition-all duration-700 hover:scale-105 hover:rotate-1"
                />
              
              {/* Camera Flash Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-8 left-8 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-80"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-60"></div>
              </div>
              
              {/* Floating Camera Info */}
              <div className={`absolute -top-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm ${isRTL ? '-left-4' : '-right-4'}`}>
                {activeService.title.toUpperCase()}
              </div>
            </div>

            {/* Enhanced service indicators with camera theme */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary text-primary-foreground shadow-lg scale-110"
                        : "bg-white/20 text-white/70 hover:bg-white/30 hover:text-white"
                    }`}
                    aria-label={`View ${service.title} service`}
                    title={service.title}
                  >
                    <ServiceIcon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Side */}
          <div className={`space-y-6 lg:space-y-8 order-1 lg:order-2 ${isRTL ? 'ml-2' : 'mr-2'}`}>
            <div className="animate-fade-in">
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}>
                {isRTL ? (
                  <>
                    <h3 className={`text-3xl font-din font-semibold text-foreground`}>
                      {activeService.title}
                    </h3>
                    <div className="p-4 rounded-xl bg-primary/10 text-primary shadow-soft">
                      <Icon className="w-8 h-8" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl bg-primary/10 text-primary shadow-soft">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className={`text-3xl font-din font-semibold text-foreground`}>
                      {activeService.title}
                    </h3>
                  </>
                )}
              </div>

              <p className={`text-lg text-muted-foreground leading-relaxed mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                {activeService.description}
              </p>
            </div>

            {/* Service List */}
            <div className="space-y-3">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <button
                    key={service.title}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full p-4 rounded-lg transition-elegant ${
                      index === activeIndex
                        ? "bg-primary text-primary-foreground shadow-elegant"
                        : "bg-card hover:bg-accent/50 border border-border"
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}>
                      {isRTL ? (
                        <>
                          <span className="font-medium">{service.title}</span>
                          <ServiceIcon className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          <ServiceIcon className="w-5 h-5" />
                          <span className="font-medium">{service.title}</span>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>



          </div>
        </div>
      </div>
    </section>
  );
};
