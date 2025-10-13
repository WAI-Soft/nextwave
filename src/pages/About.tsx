import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Award,
  Zap,
  TrendingUp,
  Globe,
  Star,
  ArrowDown
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import VideoBackground from '../components/VideoBackground';
import heroFallback from '../assets/hero-bg.jpg';
import { useLanguage } from '../contexts/LanguageContext';

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = ''
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [ref, isVisible] = useIntersectionObserver(0.5);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, hasStarted, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-accent">
      {count}
      {suffix}
    </div>
  );
};

const About = () => {
  const { isRTL, t } = useLanguage();
  const [introRef, introVisible] = useIntersectionObserver(0.3);
  const [statsRef, statsVisible] = useIntersectionObserver(0.3);
  const [goalsRef, goalsVisible] = useIntersectionObserver(0.3);

  const stats = [
    { label: t.about.impact.stats.projectsCompleted, value: 150, suffix: '+', icon: Target },
    { label: t.about.impact.stats.happyClients, value: 120, suffix: '+', icon: Users },
    { label: t.about.impact.stats.subscribers, value: 5000, suffix: '+', icon: Heart }
  ];

  const leftValues = [
    {
      title: t.about.values.leftValues.innovation.title,
      description: t.about.values.leftValues.innovation.description,
      icon: Lightbulb
    },
    {
      title: t.about.values.leftValues.excellence.title,
      description: t.about.values.leftValues.excellence.description,
      icon: Award
    },
    {
      title: t.about.values.leftValues.growth.title,
      description: t.about.values.leftValues.growth.description,
      icon: TrendingUp
    }
  ];

  const rightValues = [
    {
      title: t.about.values.rightValues.collaboration.title,
      description: t.about.values.rightValues.collaboration.description,
      icon: Users
    },
    {
      title: t.about.values.rightValues.impact.title,
      description: t.about.values.rightValues.impact.description,
      icon: Zap
    },
    {
      title: t.about.values.rightValues.globalVision.title,
      description: t.about.values.rightValues.globalVision.description,
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />

      {/* Hero Section */}
      <VideoBackground
        videoSrc="/videos/AboutVideo.mp4"
        posterSrc={heroFallback}
        className="h-screen flex items-center justify-center"
        overlayOpacity={0.6}
      >
        <section className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            {/* Text background for extra contrast */}
            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-12 md:p-16 lg:p-20 border border-white/20 shadow-2xl">
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-din font-bold text-white drop-shadow-2xl mb-6 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)] ${
                  isRTL ? 'text-right' : 'text-center'
                }`}
              >
                {t.about.hero.title}
              </h1>
              <p
                className={`text-lg md:text-xl text-white mb-8 max-w-4xl mx-auto font-light drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_70%)] text-center`}
              >
                {t.about.hero.subtitle}
              </p>

              {/* Animated scroll indicator */}
              <div className="flex justify-center mt-12 animate-bounce">
                <ArrowDown className="w-6 h-6 text-white drop-shadow-2xl [filter:_drop-shadow(2px_2px_4px_rgb(0_0_0_/_80%))]" />
              </div>
            </div>
          </div>
        </section>
      </VideoBackground>

      {/* Introduction Section */}
      <section className="py-20 mx-10">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={introRef}
            className={`transition-all duration-1000 ${
              introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                isRTL ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`space-y-8 ${isRTL ? 'lg:col-start-2' : ''}`}>
                <div>
                  <h2
                    className={`text-4xl font-din font-bold text-foreground mb-6 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t.about.story.title}
                  </h2>
                  <p
                    className={`text-lg text-muted-foreground leading-relaxed mb-6 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t.about.story.paragraph1}
                  </p>
                  <p
                    className={`text-lg text-muted-foreground leading-relaxed ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t.about.story.paragraph2}
                  </p>
                </div>
              </div>

              <div className={`space-y-8 ${isRTL ? 'lg:col-start-1' : ''}`}>
                <div className="bg-card p-8 rounded-2xl shadow-soft">
                  <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className={`text-2xl font-din font-bold text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.about.mission.title}
                    </h3>
                  </div>
                  <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.about.mission.description}
                  </p>
                </div>

                <div className="bg-card p-8 rounded-2xl shadow-soft">
                  <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className={`text-2xl font-din font-bold text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.about.vision.title}
                    </h3>
                  </div>
                  <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.about.vision.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={statsRef}
            className={`transition-all duration-1000 delay-300 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-din font-bold text-foreground mb-4 text-center">
                {t.about.impact.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                {t.about.impact.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/30">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    <p className="text-lg font-medium text-foreground mt-2">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section with Wavy Line */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={goalsRef}
            className={`transition-all duration-1000 delay-500 ${
              goalsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-din font-bold text-foreground mb-4 text-center">
                {t.about.values.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">
                {t.about.values.subtitle}
              </p>
            </div>

            <div className="relative">
              {/* Wavy Line SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg
                  width="100%"
                  height="200"
                  viewBox="0 0 1200 200"
                  className="animate-float"
                  style={{
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(330 26% 52%)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="hsl(38 61% 76%)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(330 26% 52%)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,100 Q300,50 600,100 T1200,100"
                    stroke="url(#waveGradient)"
                    strokeWidth="3"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                </svg>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 ${
                  isRTL ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Left Side Values */}
                <div className={`space-y-8 ${isRTL ? 'lg:col-start-2' : ''}`}>
                  {leftValues.map((value, index) => {
                    const IconComponent = value.icon;
                    return (
                      <div
                        key={index}
                        className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <h3 className={`text-xl font-din font-bold text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {value.title}
                            </h3>
                            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Side Values */}
                <div className={`space-y-8 ${isRTL ? 'lg:col-start-1' : ''}`}>
                  {rightValues.map((value, index) => {
                    const IconComponent = value.icon;
                    return (
                      <div
                        key={index}
                        className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className={`text-xl font-din font-bold text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {value.title}
                            </h3>
                            <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                              {value.description}
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
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        /* RTL specific styles */
        [dir="rtl"] {
          text-align: right;
        }
        
        [dir="rtl"] .text-left {
          text-align: right;
        }
        
        [dir="rtl"] .text-right {
          text-align: left;
        }
        
        /* Ensure proper spacing for RTL */
        [dir="rtl"] .space-y-8 > * + * {
          margin-top: 2rem;
        }
        
        /* Fix grid flow for RTL */
        [dir="rtl"] .lg\\:grid-flow-col-dense {
          grid-auto-flow: column dense;
        }
      `}</style>
    </div>
  );
};

export default About;