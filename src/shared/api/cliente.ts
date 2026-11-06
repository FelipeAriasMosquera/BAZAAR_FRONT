import axios from "axios";

// El cliente no sabe de sesiones: la feature "auth" le dice cómo obtener el
// token y qué hacer cuando la sesión vence. Así shared no depende de features.
type Configuracion = {
  obtenerToken: () => string | null;
  alNoAutorizado: () => void;
};

let configuracion: Configuracion = {
  obtenerToken: () => null,
  alNoAutorizado: () => {},
};

export function configurarCliente(nueva: Configuracion) {
  configuracion = nueva;
}

export const cliente = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Antes de cada petición: agrega el token si existe
cliente.interceptors.request.use((peticion) => {
  const token = configuracion.obtenerToken();
  if (token) peticion.headers.Authorization = `Bearer ${token}`;
  return peticion;
});

// Después de cada respuesta: si el backend dice 401/403 y habíamos enviado
// token, la sesión ya no sirve.
cliente.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const huboToken = Boolean(error.config?.headers?.Authorization);
    const estado = error.response?.status;
    if (huboToken && (estado === 401 || estado === 403)) {
      configuracion.alNoAutorizado();
    }
    return Promise.reject(error);
  },
);
