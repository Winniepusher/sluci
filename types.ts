
export type SectionType = 'standard' | 'menu' | 'rooms' | 'packages';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  allergens?: string[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface RoomItem {
  name: string;
  description: string;
  priceRange: string;
  features: string[];
  imageUrl: string;
  images?: string[]; // Multiple images for carousel
  bookingUrl?: string; // Specific booking URL for this room (Beddy)
}

export interface SubSection {
  id: string;
  title: string;
  type: SectionType;
  content?: string[]; // For standard text
  menu?: MenuSection[]; // For restaurant/wine
  rooms?: RoomItem[]; // For rooms
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string[];
  imageUrl: string;
  iconName: 'Bed' | 'Package' | 'Sparkles' | 'Utensils' | 'Wine' | 'Martini' | 'Sprout' | 'HeartHandshake' | 'ShoppingBag' | 'Calendar' | 'MapPin';
  details?: string[];
  subSections?: SubSection[]; // New: allowing tabs/nested content
}

export interface SiteConfig {
  logoUrl: string;
  logoWhiteUrl?: string; // New: Optional specific white logo for dark backgrounds
  enableLogoInversion: boolean; // Control CSS filters on logo as fallback
  logoHasWhiteBackground: boolean; // NEW: Special mode for logos with white backgrounds (mix-blend-mode)
  
  homeHeroUrl: string;
  homeCtaUrl: string;
  homeTitle: string;
  homeEyebrow: string;
  homeHeroText: string; // NEW: Editable Hero Description
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  
  // New fields for Homepage Text Control
  homePhilosophyTitle: string;
  homePhilosophyText: string;
  homeCtaTitle: string;
  homeCtaText: string;
  homeCtaButtonLabel: string;

  // New fields for Full Control
  bookingUrl: string; // Link for the "Prenota" button
  seoDescription: string; // Meta description for Google
  customHeadScript: string; // For Beddy Widget or Analytics
  adminPassword: string; // To allow password change
  footerText: string; // Editable footer blurb
  
  // Footer & Socials
  socialInstagram: string;
  socialFacebook: string;
  newsletterText: string;
  copyrightText: string;
}

export interface NavItem {
  label: string;
  path: string;
}
