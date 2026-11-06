"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock } from "lucide-react";
import { mensajeDeError } from "@/shared/api/errores";
import { Button } from "@/shared/components/ui/Button";
import { FormField } from "@/shared/components/ui/FormField";
import { Input } from "@/shared/components/ui/Input";
import { InputPassword } from "@/shared/components/ui/InputPassword";
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
    <div className="w-full max-w-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Tu cuenta Bazaar
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-text">
        ¡Qué bueno verte!
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Inicia sesión y sigue descubriendo lo que te gusta.
      </p>

      <form
        onSubmit={handleSubmit(enviar)}
        noValidate
        className="mt-8 flex flex-col gap-5"
      >
        <FormField
          id="email"
          etiqueta="Correo electrónico"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            invalido={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField
          id="password"
          etiqueta="Contraseña"
          error={errors.password?.message}
        >
          <InputPassword
            id="password"
            autoComplete="current-password"
            placeholder="Introduce tu contraseña"
            invalido={!!errors.password}
            {...register("password")}
          />
        </FormField>

        <div className="flex items-center justify-between text-sm">
          {/* Recuérdame todavía no hace nada: la sesión siempre se guarda */}
          <label className="flex items-center gap-2 text-text-secondary">
            <input
              type="checkbox"
              className="size-4 rounded border-border accent-primary"
            />
            Recuérdame
          </label>
          <Link
            href="/recuperar-contrasena"
            className="font-semibold text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-soft px-4 py-3 text-sm text-live"
          >
            {mensajeDeError(error)}
          </p>
        )}

        <Button type="submit" tamano="lg" ancho="completo" cargando={isPending}>
          {isPending ? (
            "Entrando..."
          ) : (
            <>
              Iniciar sesión
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-text-muted">
        <span className="h-px flex-1 bg-border" />
        Nuevo en Bazaar
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="rounded-xl bg-lavender-soft/50 px-4 py-4 text-center text-sm text-text-secondary">
        ¿Es tu primera vez aquí?{" "}
        <Link
          href="/registro"
          className="font-semibold text-primary hover:underline"
        >
          Crea tu cuenta
        </Link>
      </p>

      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
        <Lock className="size-3" />
        Tus datos, siempre protegidos.
      </p>
    </div>
  );
}
