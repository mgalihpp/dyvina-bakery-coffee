// Placeholder business data. Dyvina must confirm every value here before production.
export const site = {
  name: "Dyvina Bakery & Coffee",
  tagline: "Roti hangat dan kopi pilihan, dipanggang setiap pagi.",
  address: "Jl. Contoh No. 00, Kota",
  hours: "Setiap hari, 07.00 - 21.00",
  phone: "+62 8xx-xxxx-xxxx",
  whatsapp: "628000000000",
} as const;

export const absoluteUrl = (path: string) =>
  new URL(
    path,
    process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  ).toString();

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const photos = {
  hero: unsplash("1776267074159-6245a4ec670c"),
  about: unsplash("1723934603579-79ea92d0687b"),
  gallery: [
    {
      src: unsplash("1621868402792-a5c9fa6866a3"),
      alt: "Potongan kue di kafe",
    },
    { src: unsplash("1609073470762-cd7e5f7d3cd1"), alt: "Latte art kopi" },
    { src: unsplash("1771333268849-9412054ce030"), alt: "Interior toko roti" },
    { src: unsplash("1737700088848-0adfe5e3f5d1"), alt: "Nampan croissant" },
  ],
} as const;

export const aboutPhotos = {
  outlet: unsplash("1646461031198-71f724b652f2"),
  baker: unsplash("1669310970576-987fa5f65d5c"),
} as const;

export const galleryCategories = [
  "Cake",
  "Roti",
  "Minuman",
  "Outlet",
  "Suasana",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryItems: readonly {
  src: string;
  alt: string;
  category: GalleryCategory;
}[] = [
  {
    src: unsplash("1615200961543-53b870a70f0f"),
    alt: "Potongan kue di kafe",
    category: "Cake",
  },
  {
    src: unsplash("1630655860952-98fbbab1b9a3"),
    alt: "Latte art kopi",
    category: "Minuman",
  },
  {
    src: unsplash("1598390475281-9eb7782fb4cf"),
    alt: "Roti segar",
    category: "Roti",
  },
  {
    src: unsplash("1763120691972-e3e39ecbf9dc"),
    alt: "Etalase toko roti",
    category: "Outlet",
  },
  {
    src: unsplash("1773453363739-1130bd032bd2"),
    alt: "Nampan croissant",
    category: "Roti",
  },
  {
    src: unsplash("1646129474357-e2f4136d765f"),
    alt: "Toples cookies",
    category: "Roti",
  },
  {
    src: unsplash("1572451479139-6a308211d8be"),
    alt: "Cupcake",
    category: "Cake",
  },
  {
    src: unsplash("1648719616794-fa7405fa6da6"),
    alt: "Interior kedai kopi",
    category: "Suasana",
  },
  {
    src: unsplash("1770976875452-388fa3f333ed"),
    alt: "Interior toko roti",
    category: "Outlet",
  },
];

export const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Tentang" },
  { href: "/gallery", label: "Galeri" },
  { href: "/contact", label: "Kontak" },
] as const;
