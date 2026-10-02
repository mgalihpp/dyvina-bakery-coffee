import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
}

const ctx = await auth.$context;

if (!(await ctx.internalAdapter.findUserByEmail(email))) {
  const user = await ctx.internalAdapter.createUser(
    { email, name: "Admin", emailVerified: true },
    { method: "admin" },
  );
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: await ctx.password.hash(password),
  });
  console.log(`Admin created: ${email}`);
} else {
  console.log(`Admin already exists: ${email}`);
}

await prisma.$disconnect();
