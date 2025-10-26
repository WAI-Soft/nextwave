import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { testimonialService, Testimonial as TestimonialType } from "@/services/testimonialService";

const avatarColors = [
  "bg-gradient-to-br from-amber-400 to-amber-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-700",
  "bg-gradient-to-br from-pink-500 to-pink-700",
  "bg-gradient-to-br from-emerald-500 to-emerald-700",
  "bg-gradient-to-br from-orange-500 to-orange-700",
  "bg-gradient-to-br from-purple-500 to-purple-700"
];

export const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const [apiTestimonials, setApiTestimonials] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch testimonials from API
  useEffect(() => {
    testimonialService.getPublicTestimonials()
      .then(data => {
        setApiTestimonials(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to load testimonials:', error);
        setIsLoading(false);
      });
  }, []);

  // Use API testimonials if available, otherwise fallback to translations
  const testimonials = apiTestimonials.length > 0 
    ? apiTestimonials.map((testimonial, index) => {
        const displayName = isRTL && testimonial.name_ar ? testimonial.name_ar : testimonial.name;
        const displayRole = isRTL && testimonial.role_ar ? testimonial.role_ar : testimonial.role;
        const displayText = isRTL && testimonial.text_ar ? testimonial.text_ar : testimonial.text;
        const displayCompany = isRTL && testimonial.company_ar ? testimonial.company_ar : testimonial.company;
        
        return {
          name: displayName,
          role: displayCompany ? `${displayRole}, ${displayCompany}` : displayRole,
          text: displayText,
          rating: testimonial.rating,
          avatar: displayName.split(' ').map(n => n[0]).join(''),
          bgColor: avatarColors[index % avatarColors.length]
        };
      })
    : t.home.testimonials.clients.map((client, index) => ({
        ...client,
        rating: 5,
        avatar: client.name.split(' ').map(n => n[0]).join(''),
        bgColor: avatarColors[index]
      }));
  
  return (
    <section id="testimonials" className="py-20 bg-gradient-subtle" dir="ltr">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-din font-bold text-foreground mb-4">
            {t.home.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.home.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Horizontal Scroll */}
        <div className="relative overflow-hidden hover-pause-container">
          <div className="testimonials-scroll flex gap-6 animate-scroll-right">
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`first-${testimonial.name}`}
                className="flex-shrink-0 w-80 group"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-elegant transition-elegant border border-border/50 h-full">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full shadow-soft ring-2 ring-accent/20 group-hover:scale-110 transition-elegant flex items-center justify-center ${testimonial.bgColor}`}>
                        <span className="text-white font-din font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-card"></div>
                    </div>
                    <div>
                      <h4 className="font-din font-semibold text-foreground text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground mb-4 leading-relaxed font-din text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${testimonial.name}`}
                className="flex-shrink-0 w-80 group"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-elegant transition-elegant border border-border/50 h-full">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full shadow-soft ring-2 ring-accent/20 group-hover:scale-110 transition-elegant flex items-center justify-center ${testimonial.bgColor}`}>
                        <span className="text-white font-din font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-card"></div>
                    </div>
                    <div>
                      <h4 className="font-din font-semibold text-foreground text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground mb-4 leading-relaxed font-din text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="text-primary font-din font-semibold">
              {t.home.testimonials.trustedBy}
            </span>
            <Star className="w-5 h-5 fill-accent text-accent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-right {
            animation: scrollRight 30s linear infinite;
          }

          .hover-pause-container:hover .testimonials-scroll {
            animation-play-state: paused;
          }

          .testimonials-scroll {
            width: calc(320px * 12 + 24px * 11);
          }
      `}</style>
    </section>
  );
};


