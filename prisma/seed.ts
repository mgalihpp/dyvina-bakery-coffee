import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";
import {
  WHATSAPP_NUMBER_KEY,
  WHATSAPP_TEMPLATE_KEY,
} from "../src/lib/settings";
import { site } from "../src/lib/site";
import { DEFAULT_WHATSAPP_TEMPLATE } from "../src/lib/whatsapp";
import { categories, products } from "./catalog-seed";

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

const categoryIds = new Map<string, string>();
for (const category of categories) {
  const row = await prisma.category.upsert({
    where: { slug: category.slug },
    update: { name: category.name },
    create: category,
  });
  categoryIds.set(category.slug, row.id);
}

const now = Date.now();
for (const [index, { category, ...product }] of products.entries()) {
  const categoryId = categoryIds.get(category);
  if (!categoryId) throw new Error(`Unknown category: ${category}`);
  await prisma.product.upsert({
    where: { slug: product.slug },
    update: { ...product, categoryId },
    create: {
      ...product,
      categoryId,
      createdAt: new Date(now - index * 60_000),
    },
  });
}
console.log(
  `Catalog seeded: ${categories.length} categories, ${products.length} products`,
);

await prisma.setting.upsert({
  where: { key: WHATSAPP_NUMBER_KEY },
  update: {},
  create: { key: WHATSAPP_NUMBER_KEY, value: site.whatsapp },
});
await prisma.setting.upsert({
  where: { key: WHATSAPP_TEMPLATE_KEY },
  update: {},
  create: { key: WHATSAPP_TEMPLATE_KEY, value: DEFAULT_WHATSAPP_TEMPLATE },
});

await prisma.$disconnect();
