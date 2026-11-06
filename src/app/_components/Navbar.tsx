//La carpeta con guion bajo (_components) es privada en Next y no crea ninguna URL.
"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Navbar() {
  const { usuario, cargando, cerrarSesion } = useAuth();

  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <Link href="/" className="font-semibold">
        Bazaar
      </Link>

      <nav className="flex items-center gap-4">
        {cargando ? null : usuario ? (
          <>
            <Link href="/perfil">Mi perfil</Link>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar sesión</Link>
            <Link href="/registro">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}