import { ctaClass } from "@/components/site/cta-link";
import type { OrderStatus } from "@/generated/prisma/client";
import { ORDER_STATUS_LABEL } from "@/lib/order-status";
import { cn } from "@/lib/utils";

export const danger = "text-[#9B3B2E]";
export const success = "text-[#4F6B3A]";

export function adminButton(
  variant: "primary" | "outline" | "danger",
  className?: string,
) {
  return variant === "danger"
    ? ctaClass(
        "outline",
        cn(
          "rounded-none border-[#9B3B2E] py-3.25 text-[#9B3B2E] hover:bg-[#9B3B2E]/5",
          className,
        ),
      )
    : ctaClass(variant, cn("rounded-[4px]", className));
}

export const fieldClass =
  "w-full border border-line bg-[#FBF9F4] px-3.5 text-sm text-ink outline-none placeholder:text-[#8F897D] focus:border-brand aria-invalid:border-[#9B3B2E]";

export const labelClass =
  "text-[11px] font-semibold tracking-[1.5px] text-ink-soft uppercase";

export function PageTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-heading text-[28px] text-ink md:text-[34px]">
        {title}
      </h1>
      {children}
    </header>
  );
}

export function TableFrame({
  minWidth,
  children,
}: {
  minWidth: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-auto border border-line">
      <table className={cn("w-full text-left text-sm text-ink", minWidth)}>
        {children}
      </table>
    </div>
  );
}

export function Th({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        labelClass,
        "bg-cream-dark px-2 py-3 first:pl-5 last:pr-5",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "border-t border-line px-2 py-4 first:pl-5 last:pr-5",
        className,
      )}
      {...props}
    />
  );
}

const badgeTone: Record<OrderStatus, string> = {
  PENDING: "bg-[#F3E7CC] text-[#9A6A1F]",
  PROCESSING: "bg-[#DDEAF2] text-[#2F5D7A]",
  COMPLETED: "bg-[#E4EBD9] text-[#4F6B3A]",
  CANCELLED: "bg-[#F1DAD5] text-[#9B3B2E]",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px]",
        badgeTone[status],
      )}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function EmptyRow({
  colSpan,
  children,
}: {
  colSpan: number;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <Td colSpan={colSpan} className="py-12 text-center text-ink-soft">
        {children}
      </Td>
    </tr>
  );
}
