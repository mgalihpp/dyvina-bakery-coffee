"use client";

import {
  LayoutDashboardIcon,
  LogOutIcon,
  PackageIcon,
  ReceiptIcon,
  TagsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/products", label: "Produk", icon: PackageIcon },
  { href: "/admin/categories", label: "Kategori", icon: TagsIcon },
  { href: "/admin/orders", label: "Pesanan", icon: ReceiptIcon },
] as const;

const itemClass =
  "flex shrink-0 items-center gap-3 rounded-[4px] px-3 py-2.75 text-sm transition-colors";

function isActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await authClient.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex flex-col gap-3 bg-ink px-4 py-4 md:sticky md:top-0 md:h-dvh md:w-60 md:shrink-0 md:gap-1 md:py-7">
      <div className="flex items-center justify-between md:block">
        <Link
          href="/admin"
          className="flex flex-col gap-1 px-3 md:pb-7"
          aria-label="Dyvina Admin"
        >
          <span className="font-heading text-xl font-light tracking-[5px] text-cream md:text-2xl">
            DYVINA
          </span>
          <span className="text-[10px] font-semibold tracking-[3px] text-gold-muted">
            ADMIN
          </span>
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className={cn(itemClass, "text-sand hover:text-cream md:hidden")}
        >
          <LogOutIcon className="size-4.5" />
          Keluar
        </button>
      </div>
      <nav className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <ul className="flex gap-1 md:flex-col">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    itemClass,
                    "md:w-full",
                    active
                      ? "bg-brand font-semibold text-cream"
                      : "text-sand hover:bg-cream/5 hover:text-cream",
                  )}
                >
                  <Icon className="size-4.5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        type="button"
        onClick={signOut}
        disabled={signingOut}
        className={cn(
          itemClass,
          "mt-auto hidden w-full text-sand hover:text-cream md:flex",
        )}
      >
        <LogOutIcon className="size-4.5" />
        {signingOut ? "Keluar..." : "Keluar"}
      </button>
    </aside>
  );
}
