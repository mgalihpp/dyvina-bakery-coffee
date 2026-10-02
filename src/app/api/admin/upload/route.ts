import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/slug";

const MAX_BYTES = 4 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const fail = (status: number, error: string) =>
  Response.json({ error }, { status });

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return fail(401, "Sesi berakhir. Masuk lagi.");
  if (session.user.role !== "ADMIN") return fail(403, "Akses ditolak.");

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return fail(
      503,
      "Penyimpanan foto belum dikonfigurasi (BLOB_READ_WRITE_TOKEN kosong).",
    );
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return fail(400, "Pilih file foto.");

  const extension = EXTENSIONS[file.type];
  if (!extension) return fail(415, "Format foto harus JPG, PNG, atau WebP.");
  if (file.size > MAX_BYTES) return fail(413, "Ukuran foto maksimal 4 MB.");

  const name = form?.get("name");
  const base = (typeof name === "string" && slugify(name)) || "produk";
  const blob = await put(`products/${base}.${extension}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });
  return Response.json({ url: blob.url });
}
