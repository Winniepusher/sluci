
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, MapPin, Phone, Mail, Lock, Settings } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { siteConfig } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO & Metadata Management
  useEffect(() => {
    // Update Title
    document.title = siteConfig.homeTitle ? `Santa Lucia - ${siteConfig.homeTitle.split('\n')[0]}` : 'Santa Lucia Maccarese';
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', siteConfig.seoDescription);

    // Inject Custom Script (e.g., Beddy)
    const scriptId = 'custom-site-script';
    const existingScript = document.getElementById(scriptId);
    
    if (siteConfig.customHeadScript) {
        if (!existingScript) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.innerHTML = siteConfig.customHeadScript;
            document.body.appendChild(script);
        } else {
            if (existingScript.innerHTML !== siteConfig.customHeadScript) {
                existingScript.innerHTML = siteConfig.customHeadScript;
            }
        }
    }
  }, [siteConfig]);

  // Header Style Logic
  const headerClass = `fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/10 ${
    isScrolled || !isHome 
      ? 'bg-santa-base/95 backdrop-blur-sm text-santa-dark shadow-sm py-2' 
      : 'bg-transparent text-white py-6'
  }`;

  // --- LOGO LOGIC START ---
  const isDarkContext = isHome && !isScrolled;
  const logoSrc = (isDarkContext && siteConfig.logoWhiteUrl) ? siteConfig.logoWhiteUrl : siteConfig.logoUrl;
  
  // Base style
  let logoStyle: React.CSSProperties = {};

  if (siteConfig.logoHasWhiteBackground) {
      // WHITE BOX MODE
      if (isDarkContext) {
          // On Dark: Invert (White text, Black Box) + Screen (Remove Black Box)
          logoStyle = {
              filter: 'invert(1)',
              mixBlendMode: 'screen'
          };
      } else {
          // On Light: Multiply (Remove White Box)
          logoStyle = {
              mixBlendMode: 'multiply'
          };
      }
  } else if (siteConfig.enableLogoInversion) {
      // TRANSPARENT PNG MODE (Standard)
      // If Dark Context (Hero) AND not using a specific white logo file
      if (isDarkContext && !siteConfig.logoWhiteUrl) {
          // Simple Inversion: Black text -> White text. Transparency stays.
          logoStyle = {
              filter: 'brightness(0) invert(1)'
          };
      }
      // On Light Context: Normal (Black text on Light BG) -> No filter needed.
  }
  // --- LOGO LOGIC END ---


  // --- FOOTER LOGO LOGIC START ---
  const footerLogoSrc = siteConfig.logoWhiteUrl ? siteConfig.logoWhiteUrl : siteConfig.logoUrl;
  let footerLogoStyle: React.CSSProperties = {};

  if (siteConfig.logoHasWhiteBackground) {
      // Footer is always dark -> Treat like Dark Header
      footerLogoStyle = {
          filter: 'invert(1)',
          mixBlendMode: 'screen'
      };
  } else if (siteConfig.enableLogoInversion && !siteConfig.logoWhiteUrl) {
      // Footer is always dark -> Invert black text to white
      footerLogoStyle = {
          filter: 'brightness(0) invert(1)'
      };
  }
  // --- FOOTER LOGO LOGIC END ---


  const handleBookingClick = () => {
    if (siteConfig.bookingUrl) {
        window.open(siteConfig.bookingUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-santa-dark bg-santa-base">
      {/* Navigation */}
      <header className={headerClass}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="z-50">
             {/* Image Logo Implementation */}
             <img 
               src={logoSrc} 
               alt="Santa Lucia Maccarese" 
               className="h-14 md:h-20 w-auto transition-all duration-500 object-contain bg-transparent"
               style={logoStyle}
             />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-medium">
            <Link to="/section/camere" className="hover:text-santa-accent transition-colors">Camere</Link>
            <Link to="/section/ristorante" className="hover:text-santa-accent transition-colors">Ristorante</Link>
            <Link to="/section/esperienze" className="hover:text-santa-accent transition-colors">Esperienze</Link>
            <Link to="/section/etica" className="hover:text-santa-accent transition-colors">Chi Siamo</Link>
          </nav>
          
          <div className="hidden md:block">
            <button 
              onClick={handleBookingClick}
              className="bg-santa-accent text-white px-6 py-2 rounded-sm uppercase text-xs tracking-widest hover:bg-santa-dark transition-colors"
            >
              Prenota
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} className={isScrolled || !isHome ? 'text-santa-dark' : 'text-white'} /> : <Menu size={24} className={isScrolled || !isHome ? 'text-santa-dark' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-santa-base text-santa-dark z-40 transform transition-transform duration-300 ease-in-out flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-6 text-xl tracking-widest uppercase font-serif text-center max-h-[80vh] overflow-y-auto py-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/section/camere" onClick={() => setIsMobileMenuOpen(false)}>Camere</Link>
            <Link to="/section/ristorante" onClick={() => setIsMobileMenuOpen(false)}>Ristorante</Link>
            <Link to="/section/esperienze" onClick={() => setIsMobileMenuOpen(false)}>Esperienze</Link>
            <Link to="/section/etica" onClick={() => setIsMobileMenuOpen(false)}>Chi Siamo</Link>
            <Link to="/section/piscine" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-santa-olive">Piscine</Link>
            <Link to="/section/spa-wellness" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-santa-olive">Spa & Benessere</Link>
            
            {/* Admin Link in Mobile Menu */}
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 text-sm text-santa-olive flex items-center justify-center gap-2 border border-santa-olive/20 px-4 py-2 rounded-full bg-white">
               <Settings size={14} /> Gestione Sito (Admin)
            </Link>
          </nav>
          <button onClick={handleBookingClick} className="mt-4 bg-santa-accent text-white px-10 py-3 uppercase text-sm tracking-widest shrink-0">
            Prenota Ora
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-santa-dark text-santa-base py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
             {/* Footer Logo Logic */}
             <img 
                src={footerLogoSrc} 
                alt="Santa Lucia" 
                className="h-16 mb-6 bg-transparent object-contain" 
                style={footerLogoStyle}
             />
             <p className="text-santa-base/60 text-sm max-w-xs whitespace-pre-line">
               {siteConfig.footerText}
             </p>
          </div>

          {/* Contacts */}
          <div className="flex flex-col items-center md:items-start gap-4 text-sm tracking-wide text-santa-base/80">
            <h3 className="font-serif text-xl text-white mb-2">Contatti</h3>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-santa-accent" />
              <span>{siteConfig.contactAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-santa-accent" />
              <span>{siteConfig.contactPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-santa-accent" />
              <span>{siteConfig.contactEmail}</span>
            </div>
          </div>

          {/* Social & Action */}
          <div className="flex flex-col items-center md:items-end justify-between h-full">
            <div className="flex gap-6 mb-8">
              {siteConfig.socialInstagram && (
                  <a href={siteConfig.socialInstagram} target="_blank" rel="noopener noreferrer" className="hover:text-santa-accent transition-colors"><Instagram size={24} /></a>
              )}
              {siteConfig.socialFacebook && (
                  <a href={siteConfig.socialFacebook} target="_blank" rel="noopener noreferrer" className="hover:text-santa-accent transition-colors"><Facebook size={24} /></a>
              )}
            </div>
            
            {siteConfig.newsletterText && (
                <button className="border border-santa-accent text-santa-accent px-8 py-3 uppercase text-xs tracking-widest hover:bg-santa-accent hover:text-white transition-all">
                {siteConfig.newsletterText}
                </button>
            )}

            <div className="mt-8 md:mt-auto flex items-center gap-4 flex-col md:flex-row">
              <p className="text-xs text-santa-base/30">
                {siteConfig.copyrightText}
              </p>
              {/* Explicit Admin Link - Made more visible */}
              <Link to="/admin" className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider border-b border-transparent hover:border-white" title="Gestione Sito">
                <Lock size={12} /> Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Booking Button */}
      <div className={`fixed bottom-0 left-0 w-full p-4 bg-white shadow-[0_-5px_10px_rgba(0,0,0,0.05)] md:hidden z-40 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
          <button 
            onClick={handleBookingClick}
            className="w-full bg-santa-accent text-white py-4 rounded-sm uppercase font-medium tracking-widest"
          >
            Prenota il tuo soggiorno
          </button>
      </div>
      
      {/* Widget Container (For Beddy or similar if they operate via DOM injection) */}
      <div id="beddy-widget-container"></div>
    </div>
  );
};
