import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import { useLanguage } from "@/contexts/LanguageContext";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Globe, Camera, Megaphone, PenTool, ArrowDown } from "lucide-react";

// Import real professional photos
import serviceAds from "@/assets/service-ads.jpg";
import serviceBranding from "@/assets/service-branding.jpg";
import serviceWeb from "@/assets/service-web.jpg";
import serviceLogoDesign from "@/assets/service-branding.jpg"; // Using branding photo for logo design
import servicePhotography from "@/assets/service-photography.jpg";

// Import fallback image
import heroFallback from "@/assets/hero-bg.jpg";

const ServicesOverview = () => {
  const navigate = useNavigate();
  const { isRTL, t } = useLanguage();

  // ✅ هذه البيانات ستبقى ثابتة بالإنجليزي فقط
  const services = [
    {
      id: "advertising",
      title: "Advertising",
      description:
        "Strategic campaigns that capture attention and drive results through creative storytelling and targeted messaging.",
      icon: Megaphone,
      image: serviceAds,
      altText:
        "Real advertising and marketing workspace photo showing creative team collaboration and campaign development",
      features: [
        "Campaign Strategy",
        "Creative Development",
        "Media Planning",
        "Performance Analytics",
      ],
      slug: "advertising",
    },
    {
      id: "branding",
      title: "Branding",
      description:
        "Comprehensive brand identity development that creates lasting connections with your audience.",
      icon: Palette,
      image: serviceBranding,
      altText:
        "Professional branding design studio photo with real design tools, color materials, and creative workspace",
      features: [
        "Brand Strategy",
        "Visual Identity",
        "Brand Guidelines",
        "Brand Positioning",
      ],
      slug: "branding",
    },
    {
      id: "website-design",
      title: "Website Design",
      description:
        "Modern, responsive websites that deliver exceptional user experiences and drive conversions.",
      icon: Globe,
      image: serviceWeb,
      altText:
        "Real web development workspace photo showing laptops, code, and responsive design development",
      features: [
        "Responsive Design",
        "UX/UI Design",
        "Performance Optimization",
        "SEO Integration",
      ],
      slug: "website-design",
    },
    {
      id: "logo-design",
      title: "Logo Design",
      description:
        "Distinctive logos that embody your brand's essence and create memorable first impressions.",
      icon: PenTool,
      image: serviceLogoDesign,
      altText:
        "Professional logo design studio photo featuring real design tools, sketches, and branding materials",
      features: [
        "Concept Development",
        "Multiple Variations",
        "Brand Applications",
        "Usage Guidelines",
      ],
      slug: "logo-design",
    },
    {
      id: "photography",
      title: "Photography",
      description:
        "Professional photography services that capture your brand's story through compelling visual narratives.",
      icon: Camera,
      image: servicePhotography,
      altText:
        "Real professional photography studio photo with camera equipment, lighting setup, and editing workspace",
      features: [
        "Product Photography",
        "Event Coverage",
        "Portrait Sessions",
        "Commercial Shoots",
      ],
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
      <VideoBackground
        videoSrc="/videos/ServicesVideo.mp4"
        posterSrc={heroFallback}
        className="min-h-screen flex items-center justify-center"
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

      {/* Services Grid */}
      <section className="py-16" dir="ltr">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 animate-scale-in h-[580px] flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleServiceClick(service.slug)}
                >
                  <CardHeader className="p-0 flex-shrink-0">
                    <div className="relative overflow-hidden rounded-t-lg h-48">
                      <img
                        src={service.image}
                        alt={service.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-white font-din font-bold text-xl line-clamp-1">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-shrink-0">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6 flex-1">
                      <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                        Key Features
                      </h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full group/btn mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.slug);
                      }}
                    >
                      View Projects
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
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
