import { jwtDecode } from "jwt-decode";
import type { Usuario } from "../types/auth.types";

interface Claims {
  sub: string;
  rol?: string;
  roles?: string[];
  exp: number;
}

// Devuelve el usuario, o null si el token es inválido o ya venció.
export function usuarioDesdeToken(token: string): Usuario | null {
  try {
    const claims = jwtDecode<Claims>(token);
    if (claims.exp * 1000 <= Date.now()) return null;
    const crudos = claims.roles ?? (claims.rol ? [claims.rol] : []);
    return { email: claims.sub, roles: crudos.map((r) => r.toLowerCase()) };
  } catch {
    return null;
  }
}