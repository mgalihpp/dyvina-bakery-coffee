"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { adminButton, danger } from "./ui";

export function ConfirmDelete({
  title,
  description,
  label,
  onConfirm,
  pending,
  error,
  disabled,
  disabledReason,
}: {
  title: string;
  description: string;
  label: string;
  onConfirm: () => void;
  pending: boolean;
  error?: string;
  disabled?: boolean;
  disabledReason?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={disabled}
        aria-label={label}
        title={disabled ? disabledReason : label}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-[4px] hover:bg-[#9B3B2E]/10 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent",
          danger,
        )}
      >
        <Trash2Icon className="size-4.5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-none bg-cream text-ink ring-line">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading text-xl font-normal">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-ink-soft">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <p role="alert" className={cn("text-[13px]", danger)}>
            {error}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogPrimitive.Close className={adminButton("outline")}>
            Batal
          </AlertDialogPrimitive.Close>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={adminButton(
              "primary",
              "bg-[#9B3B2E] hover:bg-[#9B3B2E]/90",
            )}
          >
            {pending ? "Menghapus..." : "Hapus"}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
