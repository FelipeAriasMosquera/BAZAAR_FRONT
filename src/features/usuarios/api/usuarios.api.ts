import { cliente } from "@/shared/api/cliente";
import type { ActualizarPerfilRequest, PerfilUsuario } from "../types/usuarios.types";

// Usar el mismo prefijo que tenga el login en auth.api.ts
// (si allá dice "/api/usuarios/login", aquí va "/api/usuarios/me")
export async function obtenerMiPerfil() {
const { data } = await cliente.get<PerfilUsuario>("/api/usuarios/me");  
return data;
}

export async function actualizarMiPerfil(datos: ActualizarPerfilRequest) {
const { data } = await cliente.put<PerfilUsuario>("/api/usuarios/me", datos);  
return data;
}