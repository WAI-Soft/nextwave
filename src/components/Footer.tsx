import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isRTL, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.footer.contactForm.successMessage);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    if (location.pathname === path && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-deep-charcoal via-deep-charcoal/95 to-deep-charcoal/90 dark:from-deep-charcoal dark:via-deep-charcoal/98 dark:to-deep-charcoal/95 text-warm-ivory py-16 border-t border-champagne-gold/20 shadow-luxury"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-3xl font-din font-bold">NextWave</h3>
            <p className="text-warm-ivory/80 leading-relaxed">
              {t.footer.description}
            </p>
<div className={`flex gap-4 ${isRTL ? 'ms-6' : 'me-6'}`}>
  <a
    href={t.footer.socialLinks.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-lg bg-champagne-gold/10 hover:bg-champagne-gold/20 hover:text-champagne-gold transition-smooth border border-champagne-gold/20 ${isRTL ? 'ml-20' : 'mr-2'}`}
    aria-label={t.footer.socialMedia.facebook}
  >
    <Facebook className="w-5 h-5" />
  </a>
  <a
    href={t.footer.socialLinks.twitter}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-lg bg-champagne-gold/10 hover:bg-champagne-gold/20 hover:text-champagne-gold transition-smooth border border-champagne-gold/20 ${isRTL ? 'ml-0' : 'mr-2'}`}
    aria-label={t.footer.socialMedia.twitter}
  >
    <Twitter className="w-5 h-5" />
  </a>
  <a
    href={t.footer.socialLinks.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-lg bg-champagne-gold/10 hover:bg-champagne-gold/20 hover:text-champagne-gold transition-smooth border border-champagne-gold/20 ${isRTL ? 'ml-0' : 'mr-2'}`}
    aria-label={t.footer.socialMedia.instagram}
  >
    <Instagram className="w-5 h-5" />
  </a>
  <a
    href={t.footer.socialLinks.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-lg bg-champagne-gold/10 hover:bg-champagne-gold/20 hover:text-champagne-gold transition-smooth border border-champagne-gold/20 ${isRTL ? 'ml-0' : 'mr-2'}`}
    aria-label={t.footer.socialMedia.linkedin}
  >
    <Linkedin className="w-5 h-5" />
  </a>
</div>


          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-xl font-din font-semibold mb-6 text-champagne-gold">
              {t.footer.quickLinks.title}
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-warm-ivory/80 hover:text-champagne-gold transition-colors duration-300"
                >
                  {t.footer.quickLinks.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="text-warm-ivory/80 hover:text-champagne-gold transition-colors duration-300"
                >
                  {t.footer.quickLinks.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/portfolio")}
                  className="text-warm-ivory/80 hover:text-champagne-gold transition-colors duration-300"
                >
                  {t.footer.quickLinks.portfolio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="text-warm-ivory/80 hover:text-champagne-gold transition-colors duration-300"
                >
                  {t.footer.quickLinks.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="text-warm-ivory/80 hover:text-champagne-gold transition-colors duration-300"
                >
                  {t.footer.quickLinks.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in">
            <h4 className="text-xl font-din font-semibold mb-6 text-champagne-gold">
              {t.footer.contactForm.title}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder={t.footer.contactForm.namePlaceholder}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-warm-ivory/10 border-champagne-gold/30 text-warm-ivory placeholder:text-warm-ivory/60 focus:border-champagne-gold"
              />
              <Input
                type="email"
                placeholder={t.footer.contactForm.emailPlaceholder}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-warm-ivory/10 border-champagne-gold/30 text-warm-ivory placeholder:text-warm-ivory/60 focus:border-champagne-gold"
              />
              <Textarea
                placeholder={t.footer.contactForm.messagePlaceholder}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="bg-warm-ivory/10 border-champagne-gold/30 text-warm-ivory placeholder:text-warm-ivory/60 focus:border-champagne-gold min-h-[100px]"
              />
              <Button
                type="submit"
                className="w-full bg-champagne-gold hover:bg-champagne-gold/90 text-deep-charcoal font-semibold transition-all duration-300 hover:shadow-luxury"
              >
                {t.footer.contactForm.sendButton}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-champagne-gold/20 text-center text-warm-ivory/60">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
