"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { adminButton, danger, fieldClass, labelClass } from "./ui";

const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(1, "Isi kata sandi"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function signIn(values: LoginValues) {
    setError(undefined);
    const result = await authClient.signIn.email(values);
    if (result.error) {
      setError(
        result.error.status === 401
          ? "Email atau kata sandi salah."
          : "Gagal masuk. Coba lagi sebentar lagi.",
      );
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(signIn)}
      className="flex w-full max-w-95 flex-col gap-5"
    >
      <p className="text-xs font-semibold tracking-[3px] text-brand">MASUK</p>
      <h1 className="font-heading text-[30px] text-ink md:text-[34px]">
        Masuk ke dashboard
      </h1>
      <p className="text-sm text-ink-soft">Hanya untuk admin Dyvina.</p>
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Email</span>
        <input
          {...register("email")}
          type="email"
          autoComplete="username"
          placeholder="admin@contoh.com"
          aria-invalid={!!errors.email}
          className={cn(fieldClass, "h-12")}
        />
        {errors.email && (
          <span className={cn("text-[13px]", danger)}>
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Kata sandi</span>
        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          placeholder="********"
          aria-invalid={!!errors.password}
          className={cn(fieldClass, "h-12")}
        />
        {errors.password && (
          <span className={cn("text-[13px]", danger)}>
            {errors.password.message}
          </span>
        )}
      </label>
      {error && (
        <p role="alert" className={cn("text-[13px]", danger)}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className={adminButton("primary", "w-full")}
      >
        {isSubmitting ? "Masuk..." : "Masuk"}
      </button>
    </form>
  );
}
