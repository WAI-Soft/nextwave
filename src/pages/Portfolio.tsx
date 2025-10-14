import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Palette,
  Monitor,
  Camera,
  Megaphone,
  Star,
  Sparkles,
  Zap,
  Eye,
  Heart,
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { VideoBackground } from "../components/VideoBackground";
import { useLanguage } from "../contexts/LanguageContext";
import portfolioHero from "@/assets/portfolio-hero.jpg";

// Portfolio data
const portfolioItems = [
  {
    id: 1,
    category: "branding",
    name: "Luxury Brand Identity",
    description: "Complete brand identity design for premium lifestyle brand",
    image: "/src/assets/brand-identity.png",
    tags: ["Logo Design", "Brand Guidelines", "Color Palette"],
    client: "Luxe Living Co.",
    year: "2024",
  },
  {
    id: 2,
    category: "websites",
    name: "E-commerce Platform",
    description: "Modern responsive website with seamless user experience",
    image: "/src/assets/e-commerce-platform.png",
    tags: ["Web Design", "UX/UI", "E-commerce"],
    client: "Fashion Forward",
    year: "2024",
  },
  {
    id: 3,
    category: "advertising",
    name: "Digital Campaign",
    description: "Multi-platform advertising campaign with stunning visuals",
    image: "/src/assets/advertising-campaign.png",
    tags: ["Digital Ads", "Social Media", "Campaign"],
    client: "TechStart Inc.",
    year: "2023",
  },
  {
    id: 4,
    category: "logos",
    name: "Modern Logo Design",
    description: "Minimalist logo design for tech startup",
    image: "/src/assets/logo-design.png",
    tags: ["Logo", "Branding", "Identity"],
    client: "InnovateTech",
    year: "2024",
  },
  {
    id: 5,
    category: "photography",
    name: "Product Photography",
    description: "Professional product photography for e-commerce",
    image: "/src/assets/product-photography.png",
    tags: ["Photography", "Product", "Commercial"],
    client: "Artisan Goods",
    year: "2023",
  },
  {
    id: 6,
    category: "websites",
    name: "Mobile App Design",
    description: "Intuitive mobile application interface design",
    image: "/src/assets/mobile-app.png",
    tags: ["Mobile", "App Design", "UX/UI"],
    client: "HealthTech Solutions",
    year: "2024",
  },
];

const categories = [
  { id: "all", icon: Star },
  { id: "branding", icon: Palette },
  { id: "websites", icon: Monitor },
  { id: "advertising", icon: Megaphone },
  { id: "logos", icon: Sparkles },
  { id: "photography", icon: Camera },
];

const tickerItems = [
  { id: 1, image: "/photos/1.png", alt: "Portfolio Photo 1" },
  { id: 2, image: "/photos/2.png", alt: "Portfolio Photo 2" },
  { id: 3, image: "/photos/3.png", alt: "Portfolio Photo 3" },
  { id: 4, image: "/photos/4.png", alt: "Portfolio Photo 4" },
  { id: 5, image: "/photos/5.png", alt: "Portfolio Photo 5" },
  { id: 6, image: "/photos/6.png", alt: "Portfolio Photo 6" },
];

const Portfolio = () => {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  // ✅ Modal JSX extracted so it can be rendered via React Portal
  const modal = selectedItem ? (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
      onClick={() => setSelectedItem(null)}
    >
      <div
        className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors text-xl font-light"
          >
            ×
          </button>

          {/* Horizontal Layout - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Left Side - Large Project Image */}
            <div className="relative overflow-hidden">
              <img
                src={selectedItem.image}
                alt={t.portfolio.projects[selectedItem.id - 1].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Right Side - Project Details */}
            <div className="p-8 lg:p-12 bg-gradient-subtle overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-din font-bold text-foreground mb-4">
                    {t.portfolio.projects[selectedItem.id - 1].name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.portfolio.projects[selectedItem.id - 1].description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                      {t.portfolio.modal.purpose}
                    </h4>
                    <p className="text-foreground font-medium">
                      {t.portfolio.modal.purposeText}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                        {t.portfolio.modal.client}
                      </h4>
                      <p className="text-foreground font-medium">
                        {t.portfolio.projects[selectedItem.id - 1].client}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                        {t.portfolio.modal.date}
                      </h4>
                      <p className="text-foreground font-medium">
                        {t.portfolio.projects[selectedItem.id - 1].year}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    {t.portfolio.modal.projectTags}
                  </h4>
                  <div
                    className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : "justify-start"
                      }`}
                  >
                    {t.portfolio.projects[selectedItem.id - 1].tags.map(
                      (tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div
                  className={`flex gap-4 pt-4 ${isRTL ? "justify-start" : "justify-end"
                    }`}
                >
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-soft"
                  >
                    {t.portfolio.modal.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <VideoBackground
        videoSrc="/videos/PortfolioVideo.mp4"
        posterSrc={portfolioHero}
        overlayOpacity={0.6}
        className="h-screen flex items-center justify-center"
      >
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in text-center">
            {isRTL ? (
              t.portfolio.hero.title
            ) : (
              <>
                Our{" "}
                <span className="text-accent">
                  {t.portfolio.hero.titleAccent}
                </span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-delay text-center">
            {t.portfolio.hero.subtitle}
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-in-delay-2">
            <Eye className="w-6 h-6 text-accent" />
            <span className="text-lg">{t.portfolio.hero.exploreText}</span>
            <Heart className="w-6 h-6 text-accent" />
          </div>
        </div>
      </VideoBackground>

      {/* Scrolling Ticker */}
      <section
        className="bg-gradient-to-br from-white via-white/90 to-white/70 py-6 overflow-hidden border-y border-border/10"
        dir="ltr"
      >
        <div className="ticker-container">
          <div className="ticker-scroll items-center gap-8 animate-scroll-left">
            {tickerItems
              .concat(tickerItems)
              .concat(tickerItems)
              .map((item, index) => (
                <div
                  key={`ticker-${index}`}
                  className="flex items-center gap-8 whitespace-nowrap flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-accent/30 shadow-lg">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 image-crisp"
                    />
                  </div>
                  <Zap className="w-5 h-5 text-primary/70 flex-shrink-0" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const categoryName =
                t.portfolio.filters[
                category.id as keyof typeof t.portfolio.filters
                ];
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                    ? "bg-gradient-primary text-accent shadow-elegant"
                    : "bg-card hover:bg-card/80 text-foreground hover:shadow-soft border border-border/50"
                    }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {categoryName}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => {
              const translatedProject = t.portfolio.projects[item.id - 1];
              return (
                <div
                  key={item.id}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 h-[400px] flex flex-col"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="relative overflow-hidden h-64 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={translatedProject.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2">
                          {translatedProject.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="p-6 flex-1 flex flex-col justify-between"
                      dir="ltr"
                    >
                      <div className="flex-1">
                        {/* Project Title */}
                        <h3
                          className={`text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${isRTL
                            ? "leading-loose font-arabic whitespace-nowrap overflow-hidden text-ellipsis"
                            : "leading-tight"
                            }`}
                        >
                          {translatedProject.name}
                        </h3>

                        {/* Project Description */}
                        <p
                          className={`text-sm text-muted-foreground mb-4 ${isRTL
                            ? "whitespace-nowrap overflow-hidden text-ellipsis"
                            : ""
                            }`}
                        >
                          {translatedProject.description}
                        </p>
                      </div>

                      {/* Client and Year - At the bottom */}



                      {/* <div
  className={`mt-auto pt-4 border-t border-accent/20`}
>
  <div className="flex items-center gap-6">
    <div className="flex-1 text-left">
      <p className="text-[10px] font-medium text-accent uppercase mb-1.5">
        {t.portfolio.modal.client}
      </p>
      <p className="font-bold text-foreground text-sm leading-tight">
        {translatedProject.client}
      </p>
    </div>

    <div className="w-px h-10 bg-gradient-to-b from-transparent via-accent/30 to-transparent"></div>

    <div className="flex-1 text-right">
      <p className="text-[10px] font-medium text-accent uppercase mb-1.5">
        {t.portfolio.modal.date}
      </p>
      <p className="font-bold text-foreground text-sm leading-tight">
        {translatedProject.year}
      </p>
    </div>
  </div>
</div> */}



                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* ✅ Render modal via Portal */}
      {selectedItem && ReactDOM.createPortal(modal, document.body)}

      {/* Custom Styles */}
      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-scroll-left {
          animation: scrollLeft 20s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s both;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }

        .ticker-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .ticker-scroll {
          display: inline-flex;
          width: max-content;
          will-change: transform;
        }

        .image-crisp {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* Enhanced Arabic typography */
        .font-arabic {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          letter-spacing: 0;
          word-spacing: normal;
        }

        /* Better text justification for Arabic */
        .text-justify {
          text-align: justify;
          text-justify: inter-word;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
