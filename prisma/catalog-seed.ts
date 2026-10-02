// Placeholder catalog taken from the Pencil design. Names, prices, and photos
// must be replaced with Dyvina's real data before production.
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const categories = [
  { name: "Roti", slug: "roti" },
  { name: "Bolu", slug: "bolu" },
  { name: "Cake", slug: "cake" },
  { name: "Cookies", slug: "cookies" },
  { name: "Coffee", slug: "coffee" },
  { name: "Non-Coffee", slug: "non-coffee" },
] as const;

type CategorySlug = (typeof categories)[number]["slug"];

// Newest first, so the first available entries are the ones featured on Home.
export const products: {
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
}[] = [
  {
    name: "Roti Pisang Cokelat Keju",
    slug: "roti-pisang-cokelat-keju",
    description:
      "Roti lembut berisi pisang, cokelat, dan keju. Manis, gurih, dan mengenyangkan.",
    category: "roti",
    price: 10000,
    image: photo("1590581753776-c32891593866"),
    isAvailable: true,
  },
  {
    name: "Ice Caramel Latte",
    slug: "ice-caramel-latte",
    description:
      "Espresso, susu segar, dan saus karamel dengan es. Manis, creamy, dan menyegarkan.",
    category: "coffee",
    price: 20000,
    image: photo("1711625479369-958a5ca33042"),
    isAvailable: true,
  },
  {
    name: "Bolu Pandan",
    slug: "bolu-pandan",
    description:
      "Bolu pandan yang lembut dan harum, cocok untuk teman minum teh atau kopi.",
    category: "bolu",
    price: 30000,
    image: photo("1589115582096-3650a6ed2484"),
    isAvailable: true,
  },
  {
    name: "Cookies Cokelat",
    slug: "cookies-cokelat",
    description:
      "Cookies renyah dengan potongan cokelat, dipanggang segar setiap hari.",
    category: "cookies",
    price: 10000,
    image: photo("1665154932019-065df78f2b27"),
    isAvailable: true,
  },
  {
    name: "Croissant Mentega",
    slug: "croissant-mentega",
    description:
      "Croissant berlapis dengan aroma mentega yang harum dan renyah di luar.",
    category: "roti",
    price: 15000,
    image: photo("1755880040255-c5bd488b96bd"),
    isAvailable: false,
  },
  {
    name: "Cappuccino",
    slug: "cappuccino",
    description:
      "Espresso dengan susu steamed dan busa lembut. Klasik dan seimbang.",
    category: "coffee",
    price: 20000,
    image: photo("1617076678363-99dd6eb5150b"),
    isAvailable: true,
  },
  {
    name: "Cheesecake",
    slug: "cheesecake",
    description:
      "Cheesecake creamy di atas dasar biskuit renyah dengan rasa keju yang lembut.",
    category: "cake",
    price: 30000,
    image: photo("1779608993337-fc83f391bbed"),
    isAvailable: true,
  },
  {
    name: "Es Teh Lemon",
    slug: "es-teh-lemon",
    description:
      "Teh dingin dengan perasan lemon segar. Ringan dan menyegarkan.",
    category: "non-coffee",
    price: 10000,
    image: photo("1561050933-2482aca2dd64"),
    isAvailable: true,
  },
];
