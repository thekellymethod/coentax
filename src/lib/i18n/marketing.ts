import type { Locale } from "@/lib/i18n/locale";

export type NavLink = { href: string; label: string };

export type MarketingCopy = {
  htmlLang: Locale;
  nav: NavLink[];
  header: {
    startReturnShort: string;
    startReturnLongBeforeYear: string;
    startReturnLongAfterYear: string;
  };
  mobileMenuTitle: string;
  mobileMenuClose: string;
  mobileOpenMenu: string;
  localeSwitcherLabel: string;
  localeEnglish: string;
  localeAfrikaans: string;
  topBar: {
    statusLine: string;
    switchToEnglish: string;
    switchToAfrikaans: string;
  };
  home: {
    heroTitle: string;
    heroDescription: string;
    heroTrust: [string, string, string];
    heroPrimaryCtaBefore: string;
    heroPrimaryCtaAfter: string;
    heroSecondaryServices: string;
    heroSecondaryContact: string;
    servicesTitle: string;
    servicesSubtitle: string;
    services: { title: string; text: string }[];
    howTitle: string;
    howSubtitle: string;
    steps: { title: string; text: string }[];
    trustTitle: string;
    trustLead: string;
    trustBullets: [string, string, string];
    ctaTitleBefore: string;
    ctaTitleAfter: string;
    ctaSubtitle: string;
    ctaButtonBefore: string;
    ctaButtonAfter: string;
  };
  footer: {
    blurb: string;
    contact: string;
    explore: string;
    legal: string;
    about: string;
    faq: string;
    startReturn: string;
    adminPreview: string;
    privacy: string;
    terms: string;
    rightsReserved: string;
  };
};

const en: MarketingCopy = {
  htmlLang: "en",
  nav: [
    { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/start-tax-return", label: "Start return" },
    { href: "/#contact", label: "Contact" },
  ],
  header: {
    startReturnShort: "Start",
    startReturnLongBeforeYear: "Start",
    startReturnLongAfterYear: "return",
  },
  mobileMenuTitle: "Menu",
  mobileMenuClose: "Close menu",
  mobileOpenMenu: "Open menu",
  localeSwitcherLabel: "Language",
  localeEnglish: "English",
  localeAfrikaans: "Afrikaans",
  topBar: {
    statusLine:
      "You are viewing the English version. The site is written primarily in Afrikaans.",
    switchToEnglish: "View in English",
    switchToAfrikaans: "Back to Afrikaans (default)",
  },
  home: {
    heroTitle: "Professional help with your South African tax return",
    heroDescription:
      "Fast, secure assistance for income tax returns and ongoing compliance. Submit your details and documents online in minutes.",
    heroTrust: [
      "Secure online intake & uploads",
      "SA tax focus — not generic offshore advice",
      "Clear next steps after we review your info",
    ],
    heroPrimaryCtaBefore: "Start your",
    heroPrimaryCtaAfter: "tax return",
    heroSecondaryServices: "View services",
    heroSecondaryContact: "Contact us",
    servicesTitle: "What we help with",
    servicesSubtitle:
      "Focused support for individuals — without overwhelming detail.",
    services: [
      {
        title: "Individual income tax returns",
        text: "Preparation and review of your ITR12 and supporting schedules.",
      },
      {
        title: "Tax compliance assistance",
        text: "Stay on track with SARS requirements and filing obligations.",
      },
      {
        title: "Tax submission support",
        text: "Guidance through eFiling and resolving submission issues.",
      },
      {
        title: "Document review & processing",
        text: "We review IRP5s, certificates, and expense proofs you upload.",
      },
    ],
    howTitle: "How it works",
    howSubtitle:
      "A straightforward process so you know exactly what happens next.",
    steps: [
      {
        title: "Complete the form",
        text: "Tell us how we can help and share your contact details.",
      },
      {
        title: "Upload supporting documents",
        text: "IRP5s, medical aid, RA certificates, and other docs — securely.",
      },
      {
        title: "We review and process",
        text: "Our team assesses your information and prepares next actions.",
      },
      {
        title: "You receive next steps",
        text: "We contact you with a clear plan and any follow-up required.",
      },
    ],
    trustTitle: "Why clients trust us",
    trustLead:
      "We focus on South African income tax — from annual returns to ongoing compliance. Your documents are handled securely, and we only use your information to deliver the tax assistance you requested.",
    trustBullets: [
      "Secure upload and storage of tax documents",
      "South African tax assistance — not generic offshore advice",
      "Clear communication on timelines and next steps",
    ],
    ctaTitleBefore: "Ready to get your",
    ctaTitleAfter: "return moving?",
    ctaSubtitle:
      "Start the intake — it only takes a few minutes. We will reach out after we review your submission.",
    ctaButtonBefore: "Start your",
    ctaButtonAfter: "tax return",
  },
  footer: {
    blurb:
      "South African income tax returns and compliance support. Secure handling of your documents and information.",
    contact: "Contact",
    explore: "Explore",
    legal: "Legal",
    about: "About",
    faq: "FAQ",
    startReturn: "Start tax return",
    adminPreview: "Admin portal (preview)",
    privacy: "Privacy",
    terms: "Terms & legal",
    rightsReserved: "All rights reserved.",
  },
};

const af: MarketingCopy = {
  ...en,
  htmlLang: "af",
  nav: [
    { href: "/#services", label: "Dienste" },
    { href: "/#how-it-works", label: "Hoe dit werk" },
    { href: "/about", label: "Oor ons" },
    { href: "/faq", label: "Gereelde vrae" },
    { href: "/start-tax-return", label: "Begin aangifte" },
    { href: "/#contact", label: "Kontak" },
  ],
  header: {
    startReturnShort: "Begin",
    startReturnLongBeforeYear: "Begin",
    startReturnLongAfterYear: "aangifte",
  },
  mobileMenuTitle: "Kieslys",
  mobileMenuClose: "Maak kieslys toe",
  mobileOpenMenu: "Maak kieslys oop",
  localeSwitcherLabel: "Taal",
  localeEnglish: "Engels",
  localeAfrikaans: "Afrikaans",
  topBar: {
    statusLine:
      "Hierdie webwerf is hoofsaaklik in Afrikaans. Skakel na Engels indien jy dit verkies.",
    switchToEnglish: "Vertoon in Engels",
    switchToAfrikaans: "Keer na Afrikaans (verstek)",
  },
  home: {
    heroTitle:
      "Professionele hulp met jou Suid-Afrikaanse inkomstebelastingaangifte",
    heroDescription:
      "Kry vinnige, veilige bystand met jou ITR12, nakoming en indiening by SARS. Voltooi die aanlynvorm en laai jou dokumente in net ’n paar minute op.",
    heroTrust: [
      "Veilige aanlynvorm en dokumentoplaai",
      "Suid-Afrikaanse fokus — nie generiese buitelandse advies nie",
      "Duidelike volgende stappe sodra ons jou inligting nagesien het",
    ],
    heroPrimaryCtaBefore: "Begin jou",
    heroPrimaryCtaAfter: "belastingaangifte",
    heroSecondaryServices: "Bekyk dienste",
    heroSecondaryContact: "Kontak ons",
    servicesTitle: "Waarmee ons help",
    servicesSubtitle:
      "Gerigte ondersteuning vir individue — duidelik en sonder onnodige jargon.",
    services: [
      {
        title: "Individuele inkomstebelastingaangiftes",
        text: "Voorbereiding en hersiening van jou ITR12 en ondersteunende bylae.",
      },
      {
        title: "Bystand met belastingnakoming",
        text: "Bly op koers met SARS se vereistes en indienverpligtinge.",
      },
      {
        title: "Bystand met indiening",
        text: "Leiding met eFiling en die oplos van kwessies rondom indiening.",
      },
      {
        title: "Hersiening & verwerking van dokumente",
        text: "Ons hersien IRP5's, sertifikate en bewys van uitgawes wat jy oplaai.",
      },
    ],
    howTitle: "Hoe dit werk",
    howSubtitle:
      "’n Stap-vir-stap proses sodat jy altyd weet wat volgende gebeur.",
    steps: [
      {
        title: "Voltooi die vorm",
        text: "Vertel ons hoe ons kan help en deel jou kontakbesonderhede.",
      },
      {
        title: "Laai ondersteunende dokumente op",
        text: "IRP5's, mediese fonds, RA-sertifikate en ander dokumente — veilig.",
      },
      {
        title: "Ons hersien en verwerk",
        text: "Ons span beoordeel jou vorm en dokumente en berei die volgende stappe voor.",
      },
      {
        title: "Jy kry volgende stappe",
        text: "Ons kontak jou met 'n duidelike plan en enige opvolg wat nodig is.",
      },
    ],
    trustTitle: "Hoekom kliënte ons vertrou",
    trustLead:
      "Ons fokus op Suid-Afrikaanse inkomstebelasting — van jaarlikse aangiftes tot voortdurende nakoming. Jou dokumente word veilig hanteer, en ons gebruik jou inligting slegs vir die belastingbystand wat jy versoek het.",
    trustBullets: [
      "Veilige oplaai en berging van belastingdokumente",
      "Suid-Afrikaanse belastingbystand — nie generiese buitelandse advies nie",
      "Duidelike kommunikasie oor tydsraamwerke en volgende stappe",
    ],
    ctaTitleBefore: "Gereed om jou",
    ctaTitleAfter: "aangifte aan die gang te kry?",
    ctaSubtitle:
      "Begin met die vorm — dit neem net ’n paar minute. Ons reageer sodra ons jou indiening nagesien het.",
    ctaButtonBefore: "Begin jou",
    ctaButtonAfter: "belastingaangifte",
  },
  footer: {
    blurb:
      "Suid-Afrikaanse inkomstebelastingaangiftes en nakomingondersteuning. Veilige hantering van jou dokumente en inligting.",
    contact: "Kontak",
    explore: "Verken",
    legal: "Regs",
    about: "Oor ons",
    faq: "Gereelde vrae",
    startReturn: "Begin belastingaangifte",
    adminPreview: "Admin-portaal (voorskou)",
    privacy: "Privaatheid",
    terms: "Bepalings & regs",
    rightsReserved: "Alle regte voorbehou.",
  },
};

export function getMarketingCopy(locale: Locale): MarketingCopy {
  return locale === "en" ? en : af;
}
