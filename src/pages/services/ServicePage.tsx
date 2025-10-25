import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
// Advertising PNGs
import advertisingCampaign from "@/assets/advertising-campaign.png";
import seasonalPromotion from "@/assets/seasonal-promotion.png";
import influencerCollaboration from "@/assets/influencer-collaboration.png";

// Branding PNGs
import brandIdentity from "@/assets/brand-identity.png";
import packagingDesign from "@/assets/packaging-design.png";
import logoDesign from "@/assets/logo-design.png";

// Web Design PNGs
import responsiveWebsite from "@/assets/responsive-website.png";
import ecommercePlatform from "@/assets/e-commerce-platform.png";
import mobileApp from "@/assets/mobile-app.png";

// Photography PNGs
import portraitSession from "@/assets/portrait-session.png";
import eventCoverage from "@/assets/event-coverage.png";
import productPhotography from "@/assets/product-photography.png";

type Project = {
  title: string;
  description: string;
  purpose: string;
  date: string;
  image: string;
};

const dataByService: Record<string, { title: string; projects: Project[] }> = {
  advertising: {
    title: "Advertising",
    projects: [
      {
        title: "Launch Campaign A",
        description: "Multi-channel campaign increasing brand awareness across social and display.",
        purpose: "Drive engagement and conversions",
        date: "2024-03-12",
        image: advertisingCampaign,
      },
      {
        title: "Seasonal Promo",
        description: "Targeted ads for seasonal product line with refined messaging.",
        purpose: "Boost sales during peak season",
        date: "2024-06-20",
        image: seasonalPromotion,
      },
      {
        title: "Influencer Collab",
        description: "Partnered content strategy amplifying reach and authenticity.",
        purpose: "Expand audience and trust",
        date: "2024-09-05",
        image: influencerCollaboration,
      },
    ],
  },
  branding: {
    title: "Branding",
    projects: [
      {
        title: "Identity Refresh",
        description: "Updated visual system and tone to align with growth vision.",
        purpose: "Modernize and clarify brand",
        date: "2024-02-10",
        image: brandIdentity,
      },
      {
        title: "Packaging Suite",
        description: "Elegant packaging concepts reinforcing premium perception.",
        purpose: "Elevate shelf presence",
        date: "2024-04-18",
        image: packagingDesign,
      },
      {
        title: "Brand Guidelines",
        description: "Comprehensive usage and voice guidelines for consistency.",
        purpose: "Unify brand execution",
        date: "2024-08-01",
        image: logoDesign,
      },
    ],
  },
  "website-design": {
    title: "Website Design",
    projects: [
      {
        title: "Responsive Redesign",
        description: "Optimized UX and performance with a graceful visual refresh.",
        purpose: "Improve engagement and conversion",
        date: "2024-01-22",
        image: responsiveWebsite,
      },
      {
        title: "E-commerce Build",
        description: "Streamlined shopping experience and checkout flow.",
        purpose: "Increase online sales",
        date: "2024-05-14",
        image: ecommercePlatform,
      },
      {
        title: "Portfolio Site",
        description: "Minimal showcase with refined motion and accessibility.",
        purpose: "Present work elegantly",
        date: "2024-07-30",
        image: mobileApp,
      },
    ],
  },
  "logo-design": {
    title: "Logo Design",
    projects: [
      {
        title: "Signature Mark",
        description: "Crafted bespoke symbol reflecting brand ethos.",
        purpose: "Anchor visual identity",
        date: "2024-02-28",
        image: logoDesign,
      },
      {
        title: "Monogram Set",
        description: "Versatile logotype variations for diverse contexts.",
        purpose: "Ensure flexible usage",
        date: "2024-06-03",
        image: brandIdentity,
      },
      {
        title: "Event Badge",
        description: "Limited edition mark for annual summit.",
        purpose: "Create memorability",
        date: "2024-09-19",
        image: packagingDesign,
      },
    ],
  },
  photography: {
    title: "Photography",
    projects: [
      {
        title: "Editorial Shoot",
        description: "On-location narrative capturing brand lifestyle.",
        purpose: "Tell visual stories",
        date: "2024-03-07",
        image: eventCoverage,
      },
      {
        title: "Product Set",
        description: "Studio lighting for crisp, inviting product showcases.",
        purpose: "Elevate product appeal",
        date: "2024-05-25",
        image: productPhotography,
      },
      {
        title: "Portrait Series",
        description: "Team portraits with warm, elegant tone.",
        purpose: "Humanize brand",
        date: "2024-08-12",
        image: portraitSession,
      },
    ],
  },
};

const ServicePage = () => {
  const { slug } = useParams();
  const [selected, setSelected] = useState<Project | null>(null);
  const { isRTL, t, language } = useLanguage();

  const service = useMemo(() => {
    if (!slug) return null;
    return dataByService[slug];
  }, [slug]);

  // Helper to localize service title via navigation translations
  const localizedServiceTitle = useMemo(() => {
    if (!slug) return service?.title ?? "Services";
    switch (slug) {
      case "advertising":
        return t.navigation.servicesList.advertising;
      case "branding":
        return t.navigation.servicesList.branding;
      case "website-design":
        return t.navigation.servicesList.websiteDesign;
      case "logo-design":
        return t.navigation.servicesList.logoDesign;
      case "photography":
        return t.navigation.servicesList.photography;
      default:
        return service?.title ?? "Services";
    }
  }, [slug, service, t.navigation.servicesList]);

  return (
    <div className="min-h-screen bg-gradient-subtle" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />

      <section className="container mx-auto px-4 pt-8 pb-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-din font-bold text-foreground">
            {localizedServiceTitle}
          </h1>
          <p className="mt-3 text-muted-foreground">{t.services.detailPage.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(service?.projects ?? []).map((p) => {
            // General mapping of project titles -> translation keys per service
            const projectKeyMap: Record<string, Record<string, string>> = {
              advertising: {
                "Launch Campaign A": "launchCampaignA",
                "Seasonal Promo": "seasonalPromo",
                "Influencer Collab": "influencerCollab",
              },
              branding: {
                "Identity Refresh": "identityRefresh",
                "Packaging Suite": "packagingSuite",
                "Brand Guidelines": "brandGuidelines",
              },
              "website-design": {
                "Responsive Redesign": "responsiveRedesign",
                "E-commerce Build": "ecommerceBuild",
                "Portfolio Site": "portfolioSite",
              },
              "logo-design": {
                "Signature Mark": "signatureMark",
                "Monogram Set": "monogramSet",
                "Event Badge": "eventBadge",
              },
              photography: {
                "Editorial Shoot": "editorialShoot",
                "Product Set": "productSet",
                "Portrait Series": "portraitSeries",
              },
            };

            const getProjectTitle = (title: string) => {
              if (!slug) return title;
              const key = projectKeyMap[slug]?.[title];
              if (!key) return title;

              // Map route slug to translation group key names
              const groupKeyBySlug: Record<string, string> = {
                advertising: "advertising",
                branding: "branding",
                "website-design": "websiteDesign",
                "logo-design": "logoDesign",
                photography: "photography",
              };
              const groupKey = groupKeyBySlug[slug];
              const localized = (t.services.detailPage.projectNames as Record<string, Record<string, string>>)?.[groupKey]?.[key];
              return localized ?? title;
            };
            const localizedTitle = getProjectTitle(p.title);
            return (
            <Dialog key={p.title}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer transition-elegant hover:shadow-elegant" dir={isRTL ? 'rtl' : 'ltr'} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <CardHeader style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    <CardTitle className="text-xl font-din ml-28" style={{ textAlign: isRTL ? 'right' : 'left' }}>{localizedTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AspectRatio ratio={16 / 10} className="overflow-hidden rounded-md border">
                      <img
                        src={p.image}
                        alt={localizedTitle}
                        className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-5xl p-0 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-x-8">
                  {/* Left: Details - Text starts from right border in Arabic */}
                  <div className={`p-8 bg-gradient-to-br from-background via-background/95 to-muted/20`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    <DialogHeader className="space-y-4" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                      <div className="flex items-center gap-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                        <div className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                        <div>
                          <DialogTitle className="text-3xl font-din font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                            {localizedTitle}
                          </DialogTitle>
                          <DialogDescription className="mt-1">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              {localizedServiceTitle}
                            </span>
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    
                    <div className="mt-8 space-y-6">
                      <div className="group">
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row justify-end' : ''}`}>
                          {isRTL && <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.services.detailPage.descriptionLabel}</span>}
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {!isRTL && <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.services.detailPage.descriptionLabel}</span>}
                        </div>
                        <p className={`text-muted-foreground leading-relaxed ${isRTL ? '' : 'pl-4 border-l-2 border-muted/30'} group-hover:border-primary/30 transition-colors`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                          {(() => {
                            const groupKeyBySlug: Record<string, string> = {
                              advertising: "advertising",
                              branding: "branding",
                              "website-design": "websiteDesign",
                              "logo-design": "logoDesign",
                              photography: "photography",
                            };
                            const key = slug ? projectKeyMap[slug]?.[p.title] : undefined;
                            const groupKey = slug ? groupKeyBySlug[slug] : undefined;
                            const localizedDesc = key && groupKey ? (t.services.detailPage.projectDescriptions as Record<string, Record<string, string>>)?.[groupKey]?.[key] : undefined;
                            return localizedDesc ?? p.description;
                          })()}
                        </p>
                      </div>
                       
                      <div className="group">
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row justify-end' : ''}`}>
                          {isRTL && <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.services.detailPage.purposeLabel}</span>}
                          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                          {!isRTL && <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.services.detailPage.purposeLabel}</span>}
                        </div>
                        <p className={`text-muted-foreground leading-relaxed ${isRTL ? '' : 'pl-4 border-l-2 border-muted/30'} group-hover:border-accent/30 transition-colors`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                          {(() => {
                            const groupKeyBySlug: Record<string, string> = {
                              advertising: "advertising",
                              branding: "branding",
                              "website-design": "websiteDesign",
                              "logo-design": "logoDesign",
                              photography: "photography",
                            };
                            const key = slug ? projectKeyMap[slug]?.[p.title] : undefined;
                            const groupKey = slug ? groupKeyBySlug[slug] : undefined;
                            const localizedPurpose = key && groupKey ? (t.services.detailPage.projectPurposes as Record<string, Record<string, string>>)?.[groupKey]?.[key] : undefined;
                            return localizedPurpose ?? p.purpose;
                          })()}
                        </p>
                      </div>
                       
                      <div className="group">
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row justify-end' : ''}`}>
                          {isRTL && <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.services.detailPage.dateLabel}</span>}
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                          {!isRTL && <span className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.services.detailPage.dateLabel}</span>}
                        </div>
                        <p className={`text-muted-foreground leading-relaxed ${isRTL ? '' : 'pl-4 border-l-2 border-muted/30'} group-hover:border-primary/20 transition-colors font-mono`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                          {new Date(p.date).toLocaleDateString(language === 'ar' ? 'ar' : 'en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`mt-8 pt-6 border-t border-muted/20 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2 text-xs text-muted-foreground ${isRTL ? 'flex-row justify-end' : ''}`}>
                        {isRTL && <span>{t.services.detailPage.showcaseNote}</span>}
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                        {!isRTL && <span>{t.services.detailPage.showcaseNote}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Center Divider with NextWave logo */}
                  <div className="hidden md:flex items-center justify-center px-8">
                    <div className="relative h-full">
                      <Separator orientation="vertical" className="h-full" />
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-background border border-border rounded-full px-4 py-2 shadow-soft">
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-din font-bold">
                          NextWave
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Large image */}
                  <div className="bg-card p-6 border-l md:border-l-0 md:border-t flex items-center justify-center">
                    <AspectRatio ratio={16 / 10} className="overflow-hidden rounded-md border">
                      <img src={p.image} alt={localizedTitle} className="h-full w-full object-cover" />
                    </AspectRatio>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );})}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;