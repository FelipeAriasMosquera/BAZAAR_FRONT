"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleCheck, Lock } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { FormField } from "@/shared/components/ui/FormField";
import { perfilSchema, type PerfilFormValues } from "../schemas/perfilSchema";
import { useActualizarPerfil } from "../hooks/useMiPerfil";
import type { PerfilUsuario } from "../types/usuarios.types";

const paises = [
  { valor: "CO", texto: "Colombia" },
  { valor: "MX", texto: "México" },
  { valor: "AR", texto: "Argentina" },
  { valor: "PE", texto: "Perú" },
  { valor: "CL", texto: "Chile" },
  { valor: "EC", texto: "Ecuador" },
  { valor: "ES", texto: "España" },
  { valor: "US", texto: "Estados Unidos" },
];

const idiomas = [
  { valor: "es", texto: "Español" },
  { valor: "en", texto: "Inglés" },
];

const aFormulario = (p: PerfilUsuario): PerfilFormValues => ({
  nombre: p.nombre,
  apellido: p.apellido ?? "",
  telefono: p.telefono ?? "",
  fechaNacimiento: p.fechaNacimiento ?? "",
  pais: p.pais ?? "CO",
  idioma: p.idioma ?? "es",
});

const vacioANull = (valor: string) => valor || null;

export function DatosPersonalesForm({ perfil }: { perfil: PerfilUsuario }) {
  const actualizar = useActualizarPerfil();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PerfilFormValues>({
    resolver: zodResolver(perfilSchema),
    defaultValues: aFormulario(perfil),
  });

  const onSubmit = (v: PerfilFormValues) =>
    actualizar.mutate(
      {
        nombre: v.nombre,
        apellido: vacioANull(v.apellido),
        telefono: vacioANull(v.telefono),
        fechaNacimiento: vacioANull(v.fechaNacimiento),
        pais: vacioANull(v.pais),
        idioma: vacioANull(v.idioma),
      },
      { onSuccess: (nuevo) => reset(aFormulario(nuevo)) },
    );

  return (
    <Card className="rounded-2xl p-6">
      <h3 className="text-lg font-bold text-text">Datos personales</h3>
      <p className="mb-6 text-sm text-text-placeholder">Mantén tu información actualizada.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
        <FormField id="nombre" etiqueta="Nombre" error={errors.nombre?.message}>
          <Input id="nombre" invalido={!!errors.nombre} {...register("nombre")} />
        </FormField>

        <FormField id="apellido" etiqueta="Apellidos" error={errors.apellido?.message}>
          <Input id="apellido" invalido={!!errors.apellido} {...register("apellido")} />
        </FormField>

        <div className="sm:col-span-2">
          <FormField id="email" etiqueta="Correo electrónico">
            <div className="relative">
              <Input id="email" value={perfil.email} disabled className="pr-11" />
              <CircleCheck
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder"
              />
            </div>
          </FormField>
          <p className="mt-2 text-xs text-text-placeholder">
            Este correo se usa para tus compras y notificaciones.
          </p>
        </div>

        <FormField id="telefono" etiqueta="Teléfono" error={errors.telefono?.message}>
          <Input id="telefono" invalido={!!errors.telefono} {...register("telefono")} />
        </FormField>

        <FormField id="fechaNacimiento" etiqueta="Fecha de nacimiento">
          <Input id="fechaNacimiento" type="date" {...register("fechaNacimiento")} />
        </FormField>

        <FormField id="pais" etiqueta="País">
          <Select id="pais" {...register("pais")}>
            {paises.map((p) => (
              <option key={p.valor} value={p.valor}>
                {p.texto}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField id="idioma" etiqueta="Idioma">
          <Select id="idioma" {...register("idioma")}>
            {idiomas.map((i) => (
              <option key={i.valor} value={i.valor}>
                {i.texto}
              </option>
            ))}
          </Select>
        </FormField>

        <p className="flex items-center gap-2 text-xs text-text-placeholder sm:col-span-2">
          <Lock size={14} /> Tus datos son privados. Nunca los mostraremos en tu perfil público.
        </p>

        {actualizar.isError && (
          <p className="text-sm text-live sm:col-span-2">No se pudieron guardar los cambios.</p>
        )}

        <div className="flex items-center justify-between border-t border-border pt-5 sm:col-span-2">
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isDirty}
            className="text-sm text-text disabled:opacity-50"
          >
            Cancelar
          </button>
          <Button type="submit" disabled={!isDirty || actualizar.isPending}>
            <Check size={16} />
            {actualizar.isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Card>
  );
}