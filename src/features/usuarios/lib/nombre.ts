import type { PerfilUsuario } from "../types/usuarios.types";

export function nombreCompleto(perfil: Pick<PerfilUsuario, "nombre" | "apellido">) {
  return [perfil.nombre, perfil.apellido].filter(Boolean).join(" ");
}

// "esneider" → "E", "alex garcía" → "AG"
export function iniciales(texto: string) {
  return texto
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}