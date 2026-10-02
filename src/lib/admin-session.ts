import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "./auth";

export const getAdminSession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.role === "ADMIN" ? session : null;
});

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
