import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, isRTL, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 150); // Small delay to allow moving to dropdown
    setDropdownTimeout(timeout);
  };

  const services = [
    { key: "advertising", name: t.navigation.servicesList.advertising, slug: "advertising" },
    { key: "branding", name: t.navigation.servicesList.branding, slug: "branding" },
    { key: "websiteDesign", name: t.navigation.servicesList.websiteDesign, slug: "website-design" },
    { key: "logoDesign", name: t.navigation.servicesList.logoDesign, slug: "logo-design" },
    { key: "photography", name: t.navigation.servicesList.photography, slug: "photography" },
  ];

  // Use explicit route slugs instead of deriving from localized names
  const toRoute = (slug: string) => `/services/${slug}`;

  // Helper function to check if a nav link is active
  const isLinkActive = (key: string) => {
    if (key === 'home') return location.pathname === '/';
    if (key === 'services') return location.pathname.startsWith('/services');
    if (key === 'portfolio') return location.pathname === '/portfolio';
    if (key === 'aboutUs') return location.pathname === '/about';
    if (key === 'contact') return location.pathname === '/contact';
    return false;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    } else {
      // If element doesn't exist (not on home page), navigate to home first
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      setIsMenuOpen(false);
    }
  };

  // Define navigation links in the order we want them to appear
  const navLinks = [
    { key: "home", label: t.navigation.home, action: () => scrollToSection("hero") },
    { key: "services", label: t.navigation.services, isDropdown: true },
    { key: "portfolio", label: t.navigation.portfolio, action: () => navigate("/portfolio") },
    { key: "aboutUs", label: t.navigation.aboutUs, action: () => navigate("/about") },
    { key: "contact", label: t.navigation.contact, action: () => navigate("/contact") },
  ];

  // For Arabic, reverse the order of the links
  const displayLinks = isRTL ? [...navLinks].reverse() : navLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-soft" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo in EN, Language Toggle in AR */}
          <div className={`flex items-center ${isRTL ? 'order-1' : 'order-1'}`}>
            {isRTL ? (
              // Arabic: Language Toggle on left
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center rounded-lg border-2 border-champagne-gold/30 overflow-hidden shadow-soft bg-deep-charcoal/10">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-champagne-gold/10 hover:bg-champagne-gold/20 transition-smooth text-warm-ivory hover:text-champagne-gold"
                  >
                    <Globe className="w-4 h-4 ml-2" />
                    <span className="font-din font-medium text-sm">
                      {language.toUpperCase()}
                    </span>
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
            ) : (
              // English: Logo on left
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:opacity-80 transition-smooth"
              >
                <img 
                  src="/src/assets/nextwave logo.png" 
                  alt="NextWave Logo" 
                  className="h-20 w-auto"
                />
              </button>
            )}
          </div>

          {/* Center Section - Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 order-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {displayLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div 
                    key={link.key}
                    className="relative"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      onClick={() => navigate('/services')}
                      className={`flex items-center gap-1 transition-smooth font-medium ${
                        isLinkActive(link.key) 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isServicesDropdownOpen && (
                      <div 
                        className={`absolute top-full mt-2 w-56 bg-popover border border-border shadow-elegant rounded-md py-1 animate-fade-in z-50 ${isRTL ? 'right-0' : 'left-0'}`}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        {services.map((service) => (
                          <button
                            key={service.key}
                            onClick={() => {
                              navigate(toRoute(service.slug));
                              setIsServicesDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2 cursor-pointer hover:bg-accent transition-smooth ${isRTL ? 'text-right' : 'text-left'}`}
                          >
                            {service.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <button
                  key={link.key}
                  onClick={link.action}
                  className={`transition-smooth font-medium ${
                    isLinkActive(link.key) 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Section - Language Toggle in EN, Logo in AR */}
          <div className={`flex items-center ${isRTL ? 'order-3' : 'order-3'}`}>
            {isRTL ? (
              // Arabic: Logo on right
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:opacity-80 transition-smooth"
              >
                <img 
                  src="/src/assets/nextwave logo.png" 
                  alt="NextWave Logo" 
                  className="h-20 w-auto"
                />
              </button>
            ) : (
              // English: Language Toggle on right
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center rounded-lg border-2 border-champagne-gold/30 overflow-hidden shadow-soft bg-deep-charcoal/10">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-champagne-gold/10 hover:bg-champagne-gold/20 transition-smooth text-warm-ivory hover:text-champagne-gold"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-din font-medium text-sm">
                      {language.toUpperCase()}
                    </span>
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {displayLinks.map((link) => {
                if (link.isDropdown) {
                  return (
                    <div key={link.key} className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          navigate("/services");
                          setIsMenuOpen(false);
                        }}
                        className={`${isRTL ? 'text-right' : 'text-left'} transition-smooth font-medium py-2 ${
                          isLinkActive(link.key) 
                            ? 'text-primary' 
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </button>
                      <div className={`${isRTL ? 'pr-4' : 'pl-4'} flex flex-col gap-2 border-l-2 border-champagne-gold/20`}>
                        {services.map((service) => (
                          <button
                            key={service.key}
                            onClick={() => {
                              navigate(toRoute(service.slug));
                              setIsMenuOpen(false);
                            }}
                            className={`${isRTL ? 'text-right' : 'text-left'} text-sm text-muted-foreground hover:text-primary transition-smooth py-1`}
                          >
                            {service.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <button
                    key={link.key}
                    onClick={link.action}
                    className={`${isRTL ? 'text-right' : 'text-left'} transition-smooth font-medium py-2 ${
                      isLinkActive(link.key) 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="flex items-center gap-2 pt-2 border-t border-champagne-gold/20">
                <Button 
                  variant="elegant" 
                  size="sm" 
                  onClick={toggleLanguage}
                  className="bg-champagne-gold/10 hover:bg-champagne-gold/20 text-warm-ivory hover:text-champagne-gold border-champagne-gold/30"
                >
                  <Globe className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {language.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};