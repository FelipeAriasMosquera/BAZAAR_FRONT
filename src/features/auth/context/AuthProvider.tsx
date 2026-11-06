"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { configurarCliente } from "@/shared/api/cliente";
import {
  borrarToken,
  guardarToken,
  leerToken,
  suscribirse,
} from "../lib/token-storage";
import { usuarioDesdeToken } from "../lib/jwt";
import type { Usuario } from "../types/auth.types";

interface AuthContexto {
  usuario: Usuario | null;
  cargando: boolean; // true solo el instante inicial, antes de leer el navegador
  iniciarSesion: (token: string) => void;
  cerrarSesion: () => void;
}

export const AuthContext = createContext<AuthContexto | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // React lee el token del navegador y se actualiza solo cuando cambia.
  // En el servidor devuelve `undefined` (= "todavía no sé"), y en el navegador
  // devuelve el token real, o null si no hay.
  const token = useSyncExternalStore(suscribirse, leerToken, () => undefined);

  const cargando = token === undefined;

  // El usuario se calcula a partir del token (no se guarda aparte)
  const usuario = useMemo<Usuario | null>(
    () => (token ? usuarioDesdeToken(token) : null),
    [token],
  );

  const cerrarSesion = useCallback(() => {
    borrarToken();
    router.push("/login");
  }, [router]);

  // Le explicamos al cliente de API cómo obtener el token y qué hacer si vence
  useEffect(() => {
    configurarCliente({
      obtenerToken: leerToken,
      alNoAutorizado: cerrarSesion,
    });
  }, [cerrarSesion]);

  // Si el token guardado ya venció o está dañado, se limpia
  useEffect(() => {
    if (token && !usuario) borrarToken();
  }, [token, usuario]);

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, iniciarSesion: guardarToken, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}
