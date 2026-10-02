import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <PageShell>
      <CheckoutForm />
    </PageShell>
  );
}
