import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, Home, Briefcase, User, Phone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import nextwaveLogo from "@/assets/nextwave-header.png";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavLogo, setShowNavLogo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, isRTL, t } = useLanguage();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(scrollY / heroHeight, 1);

      setScrollProgress(progress);

      // Show navigation logo when it reaches 15% scroll
      setShowNavLogo(progress >= 0.15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render navigation on home page until it starts fading in at 5%
  if (isHomePage && scrollProgress < 0.05) {
    return null;
  }

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

  // Define navigation links split into left and right sections
  // In Arabic, swap Home and Portfolio positions
  const leftLinks = isRTL ? [
    { key: "portfolio", label: t.navigation.portfolio, action: () => navigate("/portfolio"), icon: Briefcase },
    { key: "services", label: t.navigation.services, isDropdown: true, icon: Settings },
    { key: "home", label: t.navigation.home, action: () => scrollToSection("hero"), icon: Home },
  ] : [
    { key: "home", label: t.navigation.home, action: () => scrollToSection("hero"), icon: Home },
    { key: "services", label: t.navigation.services, isDropdown: true, icon: Settings },
    { key: "portfolio", label: t.navigation.portfolio, action: () => navigate("/portfolio"), icon: Briefcase },
  ];

  // In Arabic, swap Contact and About Us positions
  const rightLinks = isRTL ? [
    { key: "contact", label: t.navigation.contact, action: () => navigate("/contact"), icon: Phone },
    { key: "aboutUs", label: t.navigation.aboutUs, action: () => navigate("/about"), icon: User },
  ] : [
    { key: "aboutUs", label: t.navigation.aboutUs, action: () => navigate("/about"), icon: User },
    { key: "contact", label: t.navigation.contact, action: () => navigate("/contact"), icon: Phone },
  ];

  // All links for mobile menu
  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <nav
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-soft transition-all duration-700 ease-in-out"
      style={{
        transform: isHomePage && scrollProgress < 0.2
          ? `translateY(-100%)`
          : 'translateY(0)',
        opacity: isHomePage
          ? Math.min(Math.max((scrollProgress - 0.05) / 0.15, 0), 1)
          : 1,
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Navigation Links */}
          <div className={`hidden md:flex items-center gap-16 flex-1 ${isRTL ? 'flex-row-reverse justify-start pr-12' : 'justify-start pr-12'}`}>
            {/* Language Toggle - show in Arabic on left side (first position) */}
            {isRTL && (
              <div className="flex items-center rounded-lg border-2 border-champagne-gold/30 overflow-hidden shadow-soft bg-pure-black/10">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-champagne-gold/10 hover:bg-champagne-gold/20 transition-smooth text-pure-white hover:text-champagne-gold"
                >
                  <Globe className="w-4 h-4 ml-2" />
                  <span className="font-din font-medium text-sm">
                    {language === 'en' ? 'EN' : 'AR'}
                  </span>
                </button>
              </div>
            )}

            {(isRTL ? rightLinks : leftLinks).map((link) => {
              if ('isDropdown' in link && link.isDropdown) {
                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      onClick={() => navigate('/services')}
                      className={`flex items-center gap-1 transition-smooth font-medium px-4 py-2 rounded-md border-2 ${isLinkActive(link.key)
                        ? 'text-primary border-primary'
                        : 'text-foreground border-border hover:text-primary hover:border-primary'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isServicesDropdownOpen && (
                      <div
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`absolute top-full mt-2 w-56 bg-popover border border-border shadow-elegant rounded-md py-1 animate-fade-in z-50 ${isRTL ? 'right-0' : 'left-0'} text-left`}
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
                            className={"w-full px-5 py-2 cursor-pointer hover:bg-accent transition-smooth text-left rounded-md"}
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
                  className={`transition-smooth font-medium px-4 py-2 rounded-md border-2 ${isLinkActive(link.key)
                    ? 'text-primary border-primary'
                    : 'text-foreground border-border hover:text-primary hover:border-primary'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => scrollToSection("hero")}
              className={`hover:opacity-80 transition-all duration-700 ease-out ${(showNavLogo || !isHomePage) ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
                }`}
            >
              <img
                src={nextwaveLogo}
                alt="NextWave Logo"
                className="h-20 w-auto"
              />
            </button>
          </div>

          {/* Right Section - Navigation Links (About Us, Contact) + Language Toggle */}
          <div className={`hidden md:flex items-center gap-16 flex-1 ${isRTL ? 'flex-row-reverse justify-end pl-12' : 'justify-end pl-12'}`}>
            {(isRTL ? leftLinks : rightLinks).map((link) => {
              if ('isDropdown' in link && link.isDropdown) {
                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      onClick={() => navigate('/services')}
                      className={`flex items-center gap-1 transition-smooth font-medium px-4 py-2 rounded-md border-2 ${isLinkActive(link.key)
                        ? 'text-primary border-primary'
                        : 'text-foreground border-border hover:text-primary hover:border-primary'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isServicesDropdownOpen && (
                      <div
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className={`absolute top-full mt-2 w-56 bg-popover border border-border shadow-elegant rounded-md py-1 animate-fade-in z-50 ${isRTL ? 'right-0' : 'left-0'} text-left`}
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
                            className={"w-full px-5 py-2 cursor-pointer hover:bg-accent transition-smooth text-left rounded-md"}
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
                  className={`transition-smooth font-medium px-4 py-2 rounded-md border-2 ${isLinkActive(link.key)
                    ? 'text-primary border-primary'
                    : 'text-foreground border-border hover:text-primary hover:border-primary'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Language Toggle - only show in English on right side */}
            {!isRTL && (
              <div className="flex items-center rounded-lg border-2 border-champagne-gold/30 overflow-hidden shadow-soft bg-pure-black/10">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-champagne-gold/10 hover:bg-champagne-gold/20 transition-smooth text-pure-white hover:text-champagne-gold"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="font-din font-medium text-sm">
                    {language === 'en' ? 'EN' : 'AR'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-1 animate-fade-in text-center" dir={isRTL ? "rtl" : "ltr"}>
            <div className="block">
              {allLinks.map((link) => {
                const IconComponent = link.icon;

                if ('isDropdown' in link && link.isDropdown) {
                  return (
                    <button
                      key={link.key}
                      onClick={() => {
                        navigate("/services");
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-center gap-2 w-full text-center transition-smooth font-medium py-3 mb-3 ${isLinkActive(link.key)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                        }`}
                    >
                      {!isRTL && <IconComponent className="w-4 h-4" />}
                      {link.label}
                      {isRTL && <IconComponent className="w-4 h-4" />}
                    </button>
                  );
                }

                return (
                  <button
                    key={link.key}
                    onClick={link.action}
                    className={`flex items-center justify-center gap-2 w-full text-center transition-smooth font-medium py-3 mb-3 ${isLinkActive(link.key)
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                      }`}
                  >
                    {!isRTL && <IconComponent className="w-4 h-4" />}
                    {link.label}
                    {isRTL && <IconComponent className="w-4 h-4" />}
                  </button>
                );
              })}

              <div className="block text-center pt-2 border-t border-champagne-gold/20">
                <Button
                  variant="elegant"
                  size="sm"
                  onClick={toggleLanguage}
                  className="bg-champagne-gold/10 hover:bg-champagne-gold/20 text-pure-white hover:text-champagne-gold border-champagne-gold/30"
                >
                  <Globe className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {language === 'en' ? 'EN' : 'AR'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


