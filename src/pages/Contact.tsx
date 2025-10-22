import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  User,
  MessageSquare
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import VideoBackground from '../components/VideoBackground';
import heroFallback from '../assets/hero-bg.jpg';
import contactVideo from '../assets/videos/ContactVideo.mp4';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isRTL, t } = useLanguage();
  const contactFormRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleViewOurWork = () => {
    navigate('/portfolio');
  };

  const handleStartProject = () => {
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.contactInfo.address.title,
      details: t.contact.contactInfo.address.detail,
      color: 'text-primary'
    },
    {
      icon: Phone,
      title: t.contact.contactInfo.phone.title,
      details: t.contact.contactInfo.phone.detail,
      color: 'text-accent'
    },
    {
      icon: Mail,
      title: t.contact.contactInfo.email.title,
      details: t.contact.contactInfo.email.detail,
      color: 'text-primary'
    },
    {
      icon: Clock,
      title: t.contact.contactInfo.hours.title,
      details: t.contact.contactInfo.hours.detail,
      color: 'text-accent'
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = '1234567890'; 
    const message = t.contact.whatsapp.message;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      {/* Hero Section */}
      <VideoBackground
        videoSrc={contactVideo}
        posterSrc={heroFallback}
        className="pt-20 pb-32 md:pt-28 md:pb-40"
        overlayOpacity={0.6}
      >
        <section className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-din font-bold text-white drop-shadow-2xl mb-6 leading-tight [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
            {t.contact.hero.title} <span className="text-accent drop-shadow-2xl">{t.contact.hero.accentedTitle}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_70%)]">
            {t.contact.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button 
              onClick={handleStartProject}
              className="px-8 py-4 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-full hover:from-accent/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t.contact.hero.startProjectBtn}
            </button>
            <button 
              onClick={handleViewOurWork}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {t.contact.hero.viewWorkBtn}
            </button>
          </div>
        </section>
      </VideoBackground>

      {/* Main Contact Section */}
      <section ref={contactFormRef} className="py-20 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            
            {/* Contact Form - Left Side */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-elegant relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-card/90 via-primary/5 to-accent/5 rounded-3xl"></div>
                
                <div className="relative">
                  {/* 📬 Title + Icon */}
<div className={`flex items-center gap-3 mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
  <div
    className={`w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center 
      ${isRTL ? 'order-2' : 'order-1'}`}
  >
    <Mail className="w-6 h-6 text-primary-foreground" />
  </div>

  <h2
    className={`text-3xl font-din font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent 
      ${isRTL ? 'order-1' : 'order-2'}`}
  >
    {t.contact.form.title}
  </h2>
</div>


                  <p className="text-muted-foreground mb-8">
                    {t.contact.form.description}
                  </p>

                  {/* 📝 Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-semibold">
                          <User className={`w-4 h-4 inline text-primary ${isRTL ? 'ml-2 mr-1' : 'mr-2'}`} />
                          {t.contact.form.nameLabel}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t.contact.form.namePlaceholder}
                          required
                          className="bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-muted-foreground shadow-sm rounded-xl py-4"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-semibold">
                          <Mail className={`w-4 h-4 inline text-primary ${isRTL ? 'ml-2 mr-1' : 'mr-2'}`} />
                          {t.contact.form.emailLabel}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t.contact.form.emailPlaceholder}
                          required
                          className="bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-muted-foreground shadow-sm rounded-xl py-4"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground font-semibold">
                        <MessageSquare className={`w-4 h-4 inline text-primary ${isRTL ? 'ml-2 mr-1' : 'mr-2'}`} />
                        {t.contact.form.subjectLabel}
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t.contact.form.subjectPlaceholder}
                        required
                        className="bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-muted-foreground shadow-sm rounded-xl py-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-semibold">
                        <MessageCircle className={`w-4 h-4 inline text-primary ${isRTL ? 'ml-2 mr-1' : 'mr-2'}`} />
                        {t.contact.form.messageLabel}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t.contact.form.messagePlaceholder}
                        rows={8}
                        required
                        className="bg-background/70 border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none placeholder-muted-foreground shadow-sm rounded-xl py-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground font-bold py-4 px-6 rounded-xl hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-primary/25"
                    >
                      {isSubmitting ? (
                        <>
                          <div className={`w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin ${isRTL ? 'ml-2 mr-1' : 'mr-2'}`} />
                          {t.contact.form.submittingBtn}
                        </>
                      ) : (
                        <>
                          <Send className={`w-4 h-4 ${isRTL ? 'ml-2 mr-1' : 'mr-2'}`} />
                          {t.contact.form.submitBtn}
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Map and Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 relative">
                <div className="absolute inset-0 bg-gradient-subtle rounded-3xl"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3:0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1647834539122!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px] relative z-10"
                  title="NextWave Office Location"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 p-4 transition-all duration-300 hover:shadow-lg hover:bg-card/90"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 ${info.color} group-hover:bg-primary/20 transition-colors duration-300`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-foreground text-sm mb-1 truncate">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground text-xs leading-relaxed whitespace-pre-line">
                            {info.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-2xl hover:shadow-3xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden"
          aria-label="Contact us on WhatsApp"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          <MessageCircle className="w-7 h-7 relative z-10" />
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-card/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 shadow-lg border border-border whitespace-nowrap">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              {t.contact.whatsapp.tooltip}
            </span>
            <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
          </div>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
