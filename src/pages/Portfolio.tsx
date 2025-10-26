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
import { useProjects, Project } from "../contexts/ProjectContext";
import portfolioHero from "@/assets/portfolio-hero.jpg";
import portfolioVideo from "@/assets/videos/PortfolioVideo.mp4";

// Import project images
import brandIdentityImg from "@/assets/brand-identity.png";
import ecommercePlatformImg from "@/assets/e-commerce-platform.png";
import advertisingCampaignImg from "@/assets/advertising-campaign.png";
import logoDesignImg from "@/assets/logo-design.png";
import productPhotographyImg from "@/assets/product-photography.png";
import mobileAppImg from "@/assets/mobile-app.png";

// Define a type for fallback portfolio items
interface FallbackPortfolioItem {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  client: string;
  year: number;
  purpose: string;
}

// Union type for portfolio items
type PortfolioItem = Project | FallbackPortfolioItem;



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
  const { projects, isLoading } = useProjects();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Map project IDs to images
  const projectImages: { [key: number]: string } = {
    1: brandIdentityImg,
    2: ecommercePlatformImg,
    3: advertisingCampaignImg,
    4: logoDesignImg,
    5: productPhotographyImg,
    6: mobileAppImg
  };

  // Map project IDs to categories
  const projectCategories: { [key: number]: string } = {
    1: "branding",
    2: "websites",
    3: "advertising",
    4: "logos",
    5: "photography",
    6: "websites"
  };

  // Fallback portfolio data using translations
  const fallbackPortfolioItems: FallbackPortfolioItem[] = t.portfolio.projects.map((project: { id: number; name: string; description: string; tags: string[]; client: string; year: string; purpose: string }) => ({
    id: `fallback-${project.id}`,
    category: projectCategories[project.id] || "branding",
    name: project.name,
    description: project.description,
    image: projectImages[project.id] || brandIdentityImg,
    tags: project.tags,
    client: project.client,
    year: parseInt(project.year),
    purpose: project.purpose
  }));

  // Use API data if available, otherwise fallback to translated data
  const portfolioItems = projects.length > 0 ? projects : fallbackPortfolioItems;

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => {
          // Handle both fallback items (with category) and project context items (with projectType)
          const itemCategory = 'category' in item ? item.category : item.projectType;
          return itemCategory === activeCategory;
        });

  // Debug logging to help track changes
  console.log('Portfolio Debug:', {
    totalProjects: projects.length,
    publishedProjects: projects.filter(project => project.status === 'published').length,
    portfolioItems: portfolioItems.length,
    activeCategory,
    filteredItemsCount: filteredItems.length
  });

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
            className="absolute top-6 right-6 z-10 w-14 h-14 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors text-4xl font-light"
          >
            ×
          </button>

          {/* Horizontal Layout - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Left Side - Large Project Image */}
            <div className="relative overflow-hidden">
              <img
                src={'coverImage' in selectedItem ? (selectedItem as Project).coverImage : (selectedItem as FallbackPortfolioItem).image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Right Side - Project Details */}
            <div className="p-8 lg:p-12 bg-gradient-subtle overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-din font-bold text-foreground mb-4">
                    {isRTL && 'nameAr' in selectedItem && selectedItem.nameAr 
                      ? selectedItem.nameAr 
                      : selectedItem.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {isRTL && 'descriptionAr' in selectedItem && selectedItem.descriptionAr 
                      ? selectedItem.descriptionAr 
                      : selectedItem.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                      {t.portfolio.modal.purpose}
                    </h4>
                    <p className="text-foreground font-medium">
                      {selectedItem.purpose}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                        {t.portfolio.modal.client}
                      </h4>
                      <p className="text-foreground font-medium">
                        {'clientName' in selectedItem ? (selectedItem as Project).clientName : (selectedItem as FallbackPortfolioItem).client}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                        {t.portfolio.modal.date}
                      </h4>
                      <p className="text-foreground font-medium">
                        {selectedItem.year}
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
                    {selectedItem.tags.map(
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
        videoSrc={portfolioVideo}
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
            {(isRTL ? [...categories].reverse() : categories).map((category) => {
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
                    : "bg-card hover:bg-champagne-gold/20 hover:text-champagne-gold text-foreground hover:shadow-soft border border-border/50 hover:border-champagne-gold/50"
                    }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {categoryName}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-champagne-gold/30 border-t-champagne-gold rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-pure-white/70">Loading projects...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] h-[400px] flex flex-col"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="relative overflow-hidden h-64 flex-shrink-0">
                      <img
                        src={'coverImage' in item ? (item as Project).coverImage : (item as FallbackPortfolioItem).image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
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
                          {isRTL && 'nameAr' in item && (item as Project).nameAr 
                            ? (item as Project).nameAr 
                            : item.name}
                        </h3>

                        {/* Project Description */}
                        <p
                          className={`text-sm text-muted-foreground mb-4 ${isRTL
                            ? "whitespace-nowrap overflow-hidden text-ellipsis"
                            : ""
                            }`}
                        >
                          {isRTL && 'descriptionAr' in item && (item as Project).descriptionAr 
                            ? (item as Project).descriptionAr 
                            : item.description}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          )}
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
