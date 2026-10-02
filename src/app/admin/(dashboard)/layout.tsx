import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { requireAdmin } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin Dyvina" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-cream md:flex-row">
      <AdminSidebar />
      <main className="flex min-w-0 flex-1 flex-col gap-6 px-4 py-6 md:px-10 md:py-8">
        {children}
      </main>
    </div>
  );
}
