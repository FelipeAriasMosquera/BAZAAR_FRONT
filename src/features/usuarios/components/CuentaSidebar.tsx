"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  CircleHelp,
  Heart,
  LogOut,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Card } from "@/shared/components/ui/Card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMiPerfil } from "../hooks/useMiPerfil";
import { nombreCompleto } from "../lib/nombre";
import { AvatarUsuario } from "./AvatarUsuario";

const enlacesCuenta = [
  { href: "/perfil", texto: "Mi perfil", icono: User },
  { href: "/ordenes", texto: "Mis compras", icono: ShoppingBag },
  { href: "/favoritos", texto: "Favoritos", icono: Heart },
  { href: "/direcciones", texto: "Direcciones", icono: MapPin },
  { href: "/seguridad", texto: "Seguridad", icono: ShieldCheck },
];

const estiloEnlace = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition";
const estiloTitulo = "px-3 text-[11px] font-semibold uppercase tracking-wider text-text-placeholder";

export function CuentaSidebar() {
  const pathname = usePathname();
  const { usuario, cerrarSesion } = useAuth();
  const { data: perfil } = useMiPerfil();

  return (
    <aside className="flex flex-col gap-6">
      {perfil && (
        <div className="flex items-center gap-3 px-1">
          <AvatarUsuario nombre={nombreCompleto(perfil)} className="h-10 w-10 text-sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold capitalize text-text">
              {nombreCompleto(perfil)}
            </p>
            <p className="truncate text-xs text-text-placeholder">{perfil.email}</p>
          </div>
        </div>
      )}

      <nav className="flex flex-col gap-1">
        <p className={estiloTitulo}>Mi cuenta</p>
        {enlacesCuenta.map(({ href, texto, icono: Icono }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              estiloEnlace,
              pathname.startsWith(href)
                ? "bg-primary/10 font-semibold text-primary"
                : "text-text hover:bg-surface",
            )}
          >
            <Icono size={18} />
            {texto}
          </Link>
        ))}
      </nav>

      {usuario?.roles.includes("vendedor") && (
        <div className="flex flex-col gap-1 border-t border-border pt-5">
          <p className={estiloTitulo}>Mi tienda</p>
          <Link href="/vendedor/productos" className={cn(estiloEnlace, "text-text hover:bg-surface")}>
            <Store size={18} />
            Panel de vendedor
          </Link>
        </div>
      )}

      <Card className="rounded-2xl p-4">
        <CircleHelp size={20} className="text-primary" />
        <p className="mt-3 text-sm font-semibold text-text">Estamos para ayudarte</p>
        <p className="mt-1 text-xs text-text-placeholder">
          Resuelve tus dudas en nuestro centro de ayuda.
        </p>
        <Link
          href="/ayuda"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
        >
          Ir al centro de ayuda <ArrowRight size={12} />
        </Link>
      </Card>

      <button
        type="button"
        onClick={cerrarSesion}
        className={cn(estiloEnlace, "text-text hover:bg-surface")}
      >
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </aside>
  );
}