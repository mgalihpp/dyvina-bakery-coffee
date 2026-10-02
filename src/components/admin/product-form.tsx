"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ImageIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  MAX_PRICE,
  type ProductFormValues,
  productFormSchema,
} from "@/lib/admin-schemas";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { switchClass } from "./product-actions";
import { adminButton, danger, fieldClass, labelClass } from "./ui";

const ACCEPTED_IMAGES = "image/jpeg,image/png,image/webp";

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: children is the wrapped input
    <label className={cn("flex flex-col gap-2", className)}>
      <span className={labelClass}>{label}</span>
      {children}
      {error && <span className={cn("text-[13px]", danger)}>{error}</span>}
    </label>
  );
}

export function ProductForm({
  product,
  categories,
}: {
  product?: ProductFormValues & { id: string };
  categories: { id: string; name: string }[];
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();
  const [slugEdited, setSlugEdited] = useState(Boolean(product));

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product ?? {
      name: "",
      slug: "",
      categoryId: "",
      description: "",
      image: null,
      isAvailable: true,
    },
  });
  const image = watch("image");

  const onSuccess = () => {
    router.push("/admin/products");
    router.refresh();
  };
  const onError = (error: { data?: { code?: string } | null }) => {
    if (error.data?.code === "CONFLICT") {
      setError("slug", { message: "Slug sudah dipakai produk lain" });
    }
  };
  const create = useMutation(
    trpc.admin.product.create.mutationOptions({ onSuccess, onError }),
  );
  const update = useMutation(
    trpc.admin.product.update.mutationOptions({ onSuccess, onError }),
  );
  const save = product ? update : create;

  async function upload(file: File) {
    setUploading(true);
    setUploadError(undefined);
    const body = new FormData();
    body.set("file", file);
    body.set("name", watch("name"));
    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const result: { url?: string; error?: string } = await response.json();
      if (!response.ok || !result.url) {
        setUploadError(result.error ?? "Foto gagal diunggah.");
        return;
      }
      setValue("image", result.url, { shouldDirty: true });
    } catch {
      setUploadError("Foto gagal diunggah. Periksa koneksi lalu coba lagi.");
    } finally {
      setUploading(false);
    }
  }

  const nameField = register("name", {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!slugEdited) {
        setValue("slug", slugify(event.target.value), {
          shouldValidate: Boolean(errors.slug),
        });
      }
    },
  });

  const saveError =
    save.error && save.error.data?.code !== "CONFLICT"
      ? save.error.message
      : undefined;

  return (
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={handleSubmit((values) =>
        product
          ? update.mutate({ id: product.id, ...values })
          : create.mutate(values),
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="flex flex-col gap-5 lg:flex-1">
          <Field label="Nama produk" error={errors.name?.message}>
            <input
              {...nameField}
              placeholder="Nama produk"
              aria-invalid={!!errors.name}
              className={cn(fieldClass, "h-11.5")}
            />
          </Field>
          <Field label="Slug" error={errors.slug?.message}>
            <input
              {...register("slug", { onChange: () => setSlugEdited(true) })}
              placeholder="nama-produk"
              aria-invalid={!!errors.slug}
              className={cn(fieldClass, "h-11.5 bg-cream-dark")}
            />
          </Field>
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-4">
            <Field
              label="Kategori"
              error={errors.categoryId?.message}
              className="sm:flex-1"
            >
              <select
                {...register("categoryId")}
                aria-invalid={!!errors.categoryId}
                className={cn(fieldClass, "h-11.5")}
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Harga (Rp)"
              error={errors.price?.message}
              className="sm:flex-1"
            >
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                inputMode="numeric"
                min={0}
                max={MAX_PRICE}
                step={1}
                placeholder="10000"
                aria-invalid={!!errors.price}
                className={cn(fieldClass, "h-11.5")}
              />
            </Field>
          </div>
          <Field label="Deskripsi" error={errors.description?.message}>
            <textarea
              {...register("description")}
              placeholder="Deskripsi singkat produk"
              aria-invalid={!!errors.description}
              className={cn(fieldClass, "h-27.5 resize-y py-3.5")}
            />
          </Field>
          <div className="flex items-center justify-between gap-4 border border-line px-4 py-3.5">
            <div className="flex flex-col gap-0.5">
              <span
                id="availability-label"
                className="text-sm font-semibold text-ink"
              >
                Tersedia untuk dipesan
              </span>
              <span className="text-xs text-ink-soft">
                Jika dimatikan, pelanggan tidak bisa memesan produk ini.
              </span>
            </div>
            <Controller
              control={control}
              name="isAvailable"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-labelledby="availability-label"
                  className={cn(
                    switchClass,
                    "h-6 w-11 [&_[data-slot=switch-thumb]]:size-5 [&_[data-slot=switch-thumb]]:data-checked:translate-x-4.5",
                  )}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:w-100">
          <span className={labelClass}>Foto produk</span>
          <div className="relative aspect-4/3 w-full bg-cream-dark lg:aspect-auto lg:h-75">
            {image ? (
              <Image
                src={image}
                alt="Foto produk"
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-ink-soft">
                <ImageIcon className="size-8" />
              </span>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept={ACCEPTED_IMAGES}
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) upload(file);
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
            className={adminButton("outline", "gap-2.5 rounded-none px-4 py-3")}
          >
            <UploadIcon className="size-4" />
            {uploading ? "Mengunggah..." : image ? "Ganti foto" : "Unggah foto"}
          </button>
          {image && (
            <button
              type="button"
              onClick={() => setValue("image", null, { shouldDirty: true })}
              className="self-start text-[13px] text-ink-soft underline"
            >
              Hapus foto
            </button>
          )}
          <p className="text-xs text-ink-soft">
            JPG, PNG, atau WebP, maksimal 4 MB.
          </p>
          {uploadError && (
            <p role="alert" className={cn("text-[13px]", danger)}>
              {uploadError}
            </p>
          )}
        </div>
      </div>
      {saveError && (
        <p role="alert" className={cn("text-[13px]", danger)}>
          {saveError}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href="/admin/products" className={adminButton("outline")}>
          Batal
        </Link>
        <button
          type="submit"
          disabled={save.isPending || uploading}
          className={adminButton("primary")}
        >
          {save.isPending ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </div>
    </form>
  );
}
