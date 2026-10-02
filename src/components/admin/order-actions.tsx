"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { OrderStatus } from "@/generated/prisma/client";
import { type OrderAction, orderActions } from "@/lib/order-status";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { adminButton, danger } from "./ui";

export function OrderActions({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const setStatus = useMutation(
    trpc.admin.order.setStatus.mutationOptions({
      onSettled: () => router.refresh(),
    }),
  );
  const actions = orderActions(status);
  if (actions.length === 0) return null;

  const pendingTo = setStatus.isPending ? setStatus.variables?.to : undefined;
  const run = (action: OrderAction) => setStatus.mutate({ id, to: action.to });

  return (
    <div className="flex flex-col gap-3">
      {actions.map((action) =>
        action.tone === "danger" ? (
          <AlertDialog key={action.to}>
            <AlertDialogTrigger
              disabled={setStatus.isPending}
              className={adminButton("danger", "w-full")}
            >
              {action.label}
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-none bg-cream text-ink ring-line">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading text-xl font-normal">
                  {action.label}?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-ink-soft">
                  Status akhir tidak bisa diubah lagi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogPrimitive.Close className={adminButton("outline")}>
                  Kembali
                </AlertDialogPrimitive.Close>
                <AlertDialogPrimitive.Close
                  onClick={() => run(action)}
                  className={adminButton(
                    "primary",
                    "bg-[#9B3B2E] hover:bg-[#9B3B2E]/90",
                  )}
                >
                  {action.label}
                </AlertDialogPrimitive.Close>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <button
            key={action.to}
            type="button"
            disabled={setStatus.isPending}
            onClick={() => run(action)}
            className={adminButton("primary", "w-full")}
          >
            {pendingTo === action.to ? "Menyimpan..." : action.label}
          </button>
        ),
      )}
      {setStatus.isError && (
        <p role="alert" className={cn("text-[13px]", danger)}>
          {setStatus.error.message}
        </p>
      )}
    </div>
  );
}
