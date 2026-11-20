"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutDashboard, LogOut, ShoppingBag, Store, User } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useClickFuera } from "@/shared/hooks/useClickFuera";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AvatarUsuario, nombreCompleto, useMiPerfil } from "@/features/usuarios";

const estiloOpcion =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-text hover:bg-surface";

export function MenuUsuario() {
  const { usuario, cargando, cerrarSesion } = useAuth();
  const { data: perfil } = useMiPerfil();
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickFuera(ref, () => setAbierto(false));

  if (cargando) return <div className="h-9 w-28" />; // espacio reservado, evita saltos

   if (!usuario) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-text transition hover:bg-surface"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/registro"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  const nombre = perfil ? nombreCompleto(perfil) : usuario.email;
  const primerNombre = perfil?.nombre.split(" ")[0] ?? "";
  const cerrar = () => setAbierto(false);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-surface"
      >
        <AvatarUsuario nombre={nombre} className="h-9 w-9 text-sm" />
        <span className="hidden text-sm font-semibold capitalize text-text sm:inline">
          Hola{primerNombre && `, ${primerNombre}`}
        </span>
        <ChevronDown size={16} className={cn("text-text transition", abierto && "rotate-180")} />
      </button>

      {abierto && (
        <div className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-white p-2 shadow-lg">
          <div className="border-b border-border px-3 pb-3 pt-2">
            <p className="truncate text-sm font-semibold capitalize text-text">{nombre}</p>
            <p className="truncate text-xs text-text-placeholder">{usuario.email}</p>
          </div>

          <div className="py-1">
            <Link href="/perfil" onClick={cerrar} className={estiloOpcion}>
              <User size={16} /> Mi perfil
            </Link>
            <Link href="/ordenes" onClick={cerrar} className={estiloOpcion}>
              <ShoppingBag size={16} /> Mis compras
            </Link>
            {usuario.roles.includes("vendedor") && (
              <Link href="/vendedor/productos" onClick={cerrar} className={estiloOpcion}>
                <Store size={16} /> Panel de vendedor
              </Link>
            )}
            {usuario.roles.includes("admin") && (
              <Link href="/admin" onClick={cerrar} className={estiloOpcion}>
                <LayoutDashboard size={16} /> Panel de administración
              </Link>
            )}
          </div>

          <div className="border-t border-border pt-1">
            <button type="button" onClick={cerrarSesion} className={estiloOpcion}>
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}