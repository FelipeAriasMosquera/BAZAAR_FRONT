"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { mensajeDeError } from "@/shared/api/errores";
import { loginSchema, type LoginFormulario } from "../schemas/auth.schemas";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const router = useRouter();
  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormulario>({ resolver: zodResolver(loginSchema) });

  const enviar = (datos: LoginFormulario) => {
    mutate(datos, { onSuccess: () => router.push("/") });
  };

  return (
    <form
      onSubmit={handleSubmit(enviar)}
      className="mx-auto mt-16 flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6"
    >
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

      <label className="flex flex-col gap-1">
        Correo
        <input
          type="email"
          autoComplete="email"
          className="rounded border px-3 py-2"
          {...register("email")}
        />
        {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
      </label>

      <label className="flex flex-col gap-1">
        Contraseña
        <input
          type="password"
          autoComplete="current-password"
          className="rounded border px-3 py-2"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-sm text-red-600">{errors.password.message}</span>
        )}
      </label>

      {error && <p className="text-sm text-red-600">{mensajeDeError(error)}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}