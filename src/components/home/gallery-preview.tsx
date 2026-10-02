import Image from "next/image";
import { ArrowLink, Eyebrow, gutter } from "@/components/site/section";
import { photos } from "@/lib/site";

export function GalleryPreview() {
  return (
    <section
      className={`${gutter} flex flex-col gap-4 pb-10 md:gap-6 md:pb-20`}
    >
      <div className="flex items-end justify-between">
        <Eyebrow>Galeri</Eyebrow>
        <div className="hidden md:block">
          <ArrowLink href="/gallery">Lihat galeri</ArrowLink>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4">
        {photos.gallery.map((photo, index) => (
          <li
            key={photo.src}
            className={`relative h-30 md:h-65 ${index === 3 ? "hidden md:block" : ""}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 25vw, 33vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
      <div className="md:hidden">
        <ArrowLink href="/gallery">Lihat galeri</ArrowLink>
      </div>
    </section>
  );
}
