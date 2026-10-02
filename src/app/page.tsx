import type { Metadata } from "next";
import { Suspense } from "react";
import { About } from "@/components/home/about";
import { Categories } from "@/components/home/categories";
import { Cta } from "@/components/home/cta";
import {
  FeaturedProducts,
  FeaturedProductsSkeleton,
} from "@/components/home/featured-products";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { Hero, LabelRow } from "@/components/home/hero";
import { Location } from "@/components/home/location";
import { WhyDyvina } from "@/components/home/why-dyvina";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { photos, site } from "@/lib/site";

const description =
  "Roti, kue, dan kopi segar dari Dyvina Bakery & Coffee. Pilih menu favorit Anda dan pesan lewat WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Roti Segar & Kopi Pilihan` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description,
    url: "/",
    images: [{ url: photos.hero, alt: site.name }],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LabelRow />
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        <About />
        <Suspense>
          <Categories />
        </Suspense>
        <WhyDyvina />
        <GalleryPreview />
        <Location />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
