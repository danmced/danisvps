/*
  Design Philosophy: 8-bit Retro Gaming Aesthetic
  - Tile-based grid layout mimicking game screens
  - Pixel-perfect heart sprites with frame-by-frame animation
  - Chunky pixel borders (4-8px) around all containers
  - Game-style interactions with immediate tactile feedback
*/

import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, setLocation] = useLocation();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Dani's Valentine Postal Service - Share Love with Pixel Art Letters";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Share heartfelt Valentine\'s Day letters with beautiful pixel art design. Write, send, and react to letters from Dani\'s Valentine Postal Service.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Game Level Style */}
      <section 
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/iwhA58Qfq2QIpJ7L4DTADe-img-1_1770667287000_na1fn_aGVyby1iYWNrZ3JvdW5kLW5ldw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94L2l3aEE1OFFmcTJRSXBKN0w0RFRBRGUtaW1nLTFfMTc3MDY2NzI4NzAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1a0xXNWxkdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZRraHZGvH9v3gwHfW3KDWpqK2DkLcNlCfPaQskiiTbveqBbUNA2ltehQV77ZO36z-m~10batO1JbOE5o6qghykZt5amfmZrSddWv5Dp6~ouR~JEDUl450QIiF4tHfFfivZ5kHbS5E-a1BPoho6zoPlHU~COJOzfYsZHj~9QmA0eOptV5Y4-l4bsZR2TaLueEz~QmC41AD2pQ8~alSN0baWd2XWo5mQ2Z4xyHhj1LaVxo-uJOeEBRaw7TqJILYaK8D1DhiSjnr3SYFfNsXmrEaLEXbu2CmFT4acqVNYHkmyS5nezezXtA135X30UN7LIQyIDv-aOMA1BGfNVuLcBIww__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >


        {/* Main content box */}
        <div className="relative z-10 text-center px-4">
          <div className="bg-card pixel-border-thick p-8 max-w-2xl mx-auto">            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground leading-relaxed flex-1">
                {t('home.title')}
              </h1>
              <LanguageSwitcher />
            </div>              <img 
            src="https://files.manuscdn.com/canvas/images/2026/02/14/e68d6fb8-11c7-467f-b1ff-40ce1ee68f82.png"
              alt="Cupid"
              className="w-24 h-24 mx-auto mb-8 pixel-pulse" style={{backgroundColor: '#ffffff'}}
            />
            
            <p className="text-sm sm:text-base mb-8 text-foreground leading-relaxed">
              {t('home.subtitle')}<br />
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className={`pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-8 py-6 transition-transform ${
                  hoveredButton === 'write' ? 'pixel-pressed' : ''
                }`}
                onMouseDown={() => setHoveredButton('write')}
                onMouseUp={() => setHoveredButton(null)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => setLocation('/write')}
              >
                {t('home.writeButton')}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className={`pixel-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground text-sm px-8 py-6 transition-transform ${
                  hoveredButton === 'view' ? 'pixel-pressed' : ''
                }`}
                onMouseDown={() => setHoveredButton('view')}
                onMouseUp={() => setHoveredButton(null)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => setLocation('/letters')}
              >
                {t('home.viewButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Tile-based Layout */}
      <section className="py-16 px-4 bg-muted">
        <div className="container">
          <h2 className="text-xl sm:text-2xl text-center mb-12 text-foreground">
            {t('home.howItWorks')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-card pixel-border p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary flex items-center justify-center text-3xl" style={{backgroundColor: '#ffffff'}}>
                ✏️
              </div>
              <h3 className="text-sm mb-3 text-foreground">{t('home.step1Title')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('home.step1Description')}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card pixel-border p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent flex items-center justify-center" style={{backgroundColor: '#ffffff'}}>
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/iwhA58Qfq2QIpJ7L4DTADe-img-3_1770667274000_na1fn_ZW52ZWxvcGUtaWNvbi1uZXc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94L2l3aEE1OFFmcTJRSXBKN0w0RFRBRGUtaW1nLTNfMTc3MDY2NzI3NDAwMF9uYTFmbl9aVzUyWld4dmNHVXRhV052YmkxdVpYYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WcQomG1LLz9k2CzbJ~T2eDZpbHl8OIcXELx4IzxoB5roZoolgvX9SQi0MZ3l5Ll9TyW1-EONWfcOsBEiz7P63e~KI5SQa4R6yf6WXrZLgP9oAbx2y3Wlrn5ThqQ9XKmiUm3zLzkM-avOussa-l~5VVJeOoYbcY-SS7vCHWTIiCFe4gwHUgaXFv0hdi4pYfjUqCrzEhKuGYyE8fRKTZn-4y4OG7t1o5akJoH7FlH7~UyV3ZthsNmXLhY~Hi~HIwx~INvNjUns85NFyPAfQ2b4BenWKr2XflVy0ge~cIlu7rfc8eM3VuCaO7~H6jITmzsrhczHHg5FHR7ikaRIxuzGZw__"
                  alt="Envelope"
                  className="w-12 h-12" style={{backgroundColor: '#ffffff'}}
                />
              </div>
              <h3 className="text-sm mb-3 text-foreground">{t('home.step2Title')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('home.step2Description')}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card pixel-border p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary flex items-center justify-center" style={{backgroundColor: '#ffffff'}}>
                <img 
                  src="https://files.manuscdn.com/canvas/images/2026/02/14/9f953d4e-a881-4861-860e-764831a4c6e9.png"
                  alt="Hearts"
                  className="w-12 h-12" style={{backgroundColor: '#ffffff'}}
                />
              </div>
              <h3 className="text-sm mb-3 text-foreground">{t('home.step3Title')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('home.step3Description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t-4 border-border">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground">
            {t('home.footer')} 💕 @danmced
          </p>
        </div>
      </footer>
    </div>
  );
}
