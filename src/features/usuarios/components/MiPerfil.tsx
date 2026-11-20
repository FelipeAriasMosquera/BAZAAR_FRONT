"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { UltimaCompraCard } from "@/features/ordenes";
import { DireccionPrincipalCard } from "@/features/direcciones";
import { useMiPerfil } from "../hooks/useMiPerfil";
import { PerfilEncabezado } from "./PerfilEncabezado";
import { DatosPersonalesForm } from "./DatosPersonalesForm";
import { TarjetaSeguridad } from "./TarjetaSeguridad";

export function MiPerfil() {
  const { data: perfil, isLoading, isError } = useMiPerfil();

  if (isLoading) return <p className="text-text-placeholder">Cargando...</p>;
  if (isError || !perfil) return <p className="text-live">No se pudo cargar tu perfil.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <nav className="flex items-center gap-2 text-xs">
          <Link href="/" className="text-text-placeholder hover:text-text">
            Inicio
          </Link>
          <ChevronRight size={12} className="text-text-placeholder" />
          <span className="text-primary">Mi cuenta</span>
        </nav>
        <h1 className="mt-4 text-4xl font-extrabold text-text">Tu espacio, a tu manera.</h1>
        <p className="mt-2 text-sm text-text-placeholder">
          Gestiona tus datos y ten a mano todo lo que te gusta de BAZAAR.
        </p>
      </div>

      <PerfilEncabezado perfil={perfil} />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <DatosPersonalesForm perfil={perfil} />
        <div className="flex flex-col gap-4">
          <UltimaCompraCard />
          <DireccionPrincipalCard />
          <TarjetaSeguridad />
        </div>
      </div>
    </div>
  );
}