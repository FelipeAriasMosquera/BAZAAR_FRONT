import axios from "axios";

// Convierte cualquier error en un mensaje legible para el usuario.
export function mensajeDeError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "No se pudo conectar con el servidor.";
    const datos = error.response.data;
    if (typeof datos?.message === "string") return datos.message;
    if (typeof datos?.error === "string") return datos.error;
    if (error.response.status === 401 || error.response.status === 403) {
      return "Credenciales incorrectas.";
    }
  }
  return "Ocurrió un error inesperado. Inténtalo de nuevo.";
}