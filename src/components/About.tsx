import { Users, Award, Target } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export const About = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-din font-bold text-foreground mb-4">
            {t.home.about.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.home.about.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Team Photo */}
          <div className={`animate-scale-in ${isRTL ? 'md:order-2' : ''}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20 animate-pulse" />
              <div className="relative aspect-square rounded-full overflow-hidden border-8 border-accent shadow-elegant">
                <img
                  src={teamPhoto}
                  alt={t.home.about.teamPhotoAlt}
                  className="w-full h-full object-cover transition-elegant hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className={`space-y-6 animate-fade-in ${isRTL ? 'md:order-1' : ''}`}>
            <h3 className={`text-3xl font-din font-semibold text-foreground ${isRTL ? 'text-center' : 'text-left'}`}>
              {t.home.about.whoWeAre}
            </h3>
            <p className={`text-lg text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.home.about.description1}
            </p>
            <p className={`text-lg text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.home.about.description2}
            </p>

            <div className={`flex flex-wrap gap-20 pt-4 mr-24 ${isRTL ? 'justify-end' : ''}`}>
              <div className="text-center">
                <div className={`text-4xl font-din font-bold text-primary mb-1 ${isRTL ? 'mr-2' : ''}`}>
                  150+
                </div>
                <div className="text-sm text-muted-foreground">{t.home.about.stats.projectsCompleted}</div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-din font-bold text-primary mb-1 ${isRTL ? 'mr-2' : ''}`}>
                  50+
                </div>
                <div className="text-sm text-muted-foreground">{t.home.about.stats.happyClients}</div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-din font-bold text-primary mb-1 ${isRTL ? 'mr-2' : ''}`}>
                  12
                </div>
                <div className="text-sm text-muted-foreground">{t.home.about.stats.teamMembers}</div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
