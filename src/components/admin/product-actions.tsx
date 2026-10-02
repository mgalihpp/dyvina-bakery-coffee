"use client";

import { useMutation } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { ConfirmDelete } from "./confirm-delete";
import { danger, success } from "./ui";

export const switchClass =
  "h-5 w-9 px-0.5 data-checked:bg-[#4F6B3A] data-unchecked:bg-line [&_[data-slot=switch-thumb]]:bg-white";

export function AvailabilitySwitch({
  id,
  name,
  isAvailable,
}: {
  id: string;
  name: string;
  isAvailable: boolean;
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const update = useMutation(
    trpc.admin.product.setAvailability.mutationOptions({
      onSettled: () => router.refresh(),
    }),
  );
  const checked = update.isPending
    ? (update.variables?.isAvailable ?? isAvailable)
    : isAvailable;

  return (
    <div className="flex items-center gap-2.5">
      <Switch
        checked={checked}
        disabled={update.isPending}
        onCheckedChange={(next) => update.mutate({ id, isAvailable: next })}
        aria-label={`Ketersediaan ${name}`}
        className={switchClass}
      />
      <span
        className={cn("text-[13px] font-semibold", checked ? success : danger)}
      >
        {checked ? "Tersedia" : "Habis"}
      </span>
      {update.isError && (
        <span role="alert" className={cn("text-xs", danger)}>
          Gagal
        </span>
      )}
    </div>
  );
}

export function ProductRowActions({ id, name }: { id: string; name: string }) {
  const trpc = useTRPC();
  const router = useRouter();
  const remove = useMutation(
    trpc.admin.product.delete.mutationOptions({
      onSuccess: () => router.refresh(),
    }),
  );

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${id}`}
        aria-label={`Ubah ${name}`}
        className="inline-flex size-8 items-center justify-center rounded-[4px] text-ink-soft hover:bg-ink/5"
      >
        <PencilIcon className="size-4.5" />
      </Link>
      <ConfirmDelete
        label={`Hapus ${name}`}
        title="Hapus produk?"
        description={`${name} akan dihapus dari katalog. Riwayat pesanan yang memuat produk ini tetap tersimpan.`}
        onConfirm={() => remove.mutate({ id })}
        pending={remove.isPending}
        error={remove.error?.message}
      />
    </div>
  );
}
