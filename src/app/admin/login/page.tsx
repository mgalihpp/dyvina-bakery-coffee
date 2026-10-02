import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/admin-session";
import { photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masuk Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-cream md:flex-row">
      <div className="relative flex h-48 flex-col justify-end gap-3 p-6 md:h-auto md:w-1/2 md:p-14">
        <Image
          src={photos.adminLogin}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/20 to-ink/93" />
        <p className="relative font-heading text-4xl font-light tracking-[8px] text-cream md:text-[56px]">
          DYVINA
        </p>
        <p className="relative text-xs font-semibold tracking-[3px] text-gold">
          BAKERY &amp; COFFEE / ADMIN
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <LoginForm />
      </div>
    </div>
  );
}
