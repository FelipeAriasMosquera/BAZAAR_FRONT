const CLAVE = "bazaar_token";

// Lista de "interesados" en saber cuándo cambia el token (React se apunta aquí)
const oyentes = new Set<() => void>();

function avisarCambio() {
  oyentes.forEach((avisar) => avisar());
}

export function suscribirse(avisar: () => void) {
  oyentes.add(avisar);
  window.addEventListener("storage", avisar); // también avisa si cambia en otra pestaña
  return () => {
    oyentes.delete(avisar);
    window.removeEventListener("storage", avisar);
  };
}

export function leerToken(): string | null {
  try {
    return localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

export function guardarToken(token: string) {
  try {
    localStorage.setItem(CLAVE, token);
  } catch {}
  avisarCambio();
}

export function borrarToken() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {}
  avisarCambio();
}