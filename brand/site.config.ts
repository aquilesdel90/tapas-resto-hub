export type SiteConfig = {
  projectSlug: string;
  siteTitle: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;     // ej: /brands/template/logo.png
  favicon: string;  // ej: /brands/template/favicon.png
  heroImage: string;// ej: /brands/template/hero.jpg
  phone: string;
  whatsapp?: string;
  address: string;
  instagram?: string;
  facebook?: string;
  menuSections: Array<{ key: string; title: string }>;
};

export const site: SiteConfig = {
  projectSlug: "template",
  siteTitle: "Nombre del Restaurante",
  description: "Descripción corta del sitio.",
  primaryColor: "#C0392B",
  secondaryColor: "#1F2937",
  accentColor: "#F59E0B",
  logo: "/brands/template/logo.png",
  favicon: "/brands/template/favicon.png",
  heroImage: "/brands/template/hero.jpg",
  phone: "+54 9 11 1234-5678",
  address: "Dirección, Ciudad",
  instagram: "",
  facebook: "",
  menuSections: [{ key: "parrilla", title: "Parrilla" }]
};
