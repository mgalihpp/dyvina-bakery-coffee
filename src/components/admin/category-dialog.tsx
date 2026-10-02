"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  type CategoryFormValues,
  categoryFormSchema,
} from "@/lib/admin-schemas";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { ConfirmDelete } from "./confirm-delete";
import { adminButton, danger, fieldClass, labelClass } from "./ui";

type Category = CategoryFormValues & { id: string };

function CategoryForm({
  category,
  onDone,
}: {
  category?: Category;
  onDone: () => void;
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const [slugEdited, setSlugEdited] = useState(Boolean(category));
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: category ?? { name: "", slug: "" },
  });

  const options = {
    onSuccess: () => {
      onDone();
      router.refresh();
    },
    onError: (error: { data?: { code?: string } | null }) => {
      if (error.data?.code === "CONFLICT") {
        setError("slug", { message: "Slug sudah dipakai kategori lain" });
      }
    },
  };
  const create = useMutation(
    trpc.admin.category.create.mutationOptions(options),
  );
  const update = useMutation(
    trpc.admin.category.update.mutationOptions(options),
  );
  const save = category ? update : create;

  return (
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={handleSubmit((values) =>
        category
          ? update.mutate({ id: category.id, ...values })
          : create.mutate(values),
      )}
    >
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Nama kategori</span>
        <input
          {...register("name", {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              if (!slugEdited) setValue("slug", slugify(event.target.value));
            },
          })}
          placeholder="Roti"
          aria-invalid={!!errors.name}
          className={cn(fieldClass, "h-11.5")}
        />
        {errors.name && (
          <span className={cn("text-[13px]", danger)}>
            {errors.name.message}
          </span>
        )}
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Slug</span>
        <input
          {...register("slug", { onChange: () => setSlugEdited(true) })}
          placeholder="roti"
          aria-invalid={!!errors.slug}
          className={cn(fieldClass, "h-11.5 bg-cream-dark")}
        />
        {errors.slug && (
          <span className={cn("text-[13px]", danger)}>
            {errors.slug.message}
          </span>
        )}
      </label>
      {save.error && save.error.data?.code !== "CONFLICT" && (
        <p role="alert" className={cn("text-[13px]", danger)}>
          {save.error.message}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <DialogClose className={adminButton("outline")}>Batal</DialogClose>
        <button
          type="submit"
          disabled={save.isPending}
          className={adminButton("primary")}
        >
          {save.isPending ? "Menyimpan..." : "Simpan Kategori"}
        </button>
      </div>
    </form>
  );
}

function CategoryDialog({
  category,
  trigger,
}: {
  category?: Category;
  trigger: React.ComponentProps<typeof DialogTrigger>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...trigger} />
      <DialogContent className="rounded-none bg-cream text-ink ring-line">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-normal">
            {category ? "Ubah Kategori" : "Tambah Kategori"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm category={category} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function AddCategoryButton() {
  return (
    <CategoryDialog
      trigger={{
        className: adminButton("primary"),
        children: "Tambah Kategori",
      }}
    />
  );
}

export function CategoryRowActions({
  category,
  productCount,
}: {
  category: Category;
  productCount: number;
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const remove = useMutation(
    trpc.admin.category.delete.mutationOptions({
      onSuccess: () => router.refresh(),
    }),
  );

  return (
    <div className="flex items-center gap-2">
      <CategoryDialog
        category={category}
        trigger={{
          "aria-label": `Ubah ${category.name}`,
          className:
            "inline-flex size-8 items-center justify-center rounded-[4px] text-ink-soft hover:bg-ink/5",
          children: <PencilIcon className="size-4.5" />,
        }}
      />
      <ConfirmDelete
        label={`Hapus ${category.name}`}
        title="Hapus kategori?"
        description={`Kategori ${category.name} akan dihapus.`}
        onConfirm={() => remove.mutate({ id: category.id })}
        pending={remove.isPending}
        error={remove.error?.message}
        disabled={productCount > 0}
        disabledReason="Kategori masih punya produk"
      />
    </div>
  );
}
