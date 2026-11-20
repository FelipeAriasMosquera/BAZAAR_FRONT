export interface PerfilUsuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  roles: string[];
  // Pendientes en el backend: llegan undefined hasta que los agreguen
  apellido?: string | null;
  fechaNacimiento?: string | null; // "1995-06-15"
  pais?: string | null;
  idioma?: string | null;
}

export interface ActualizarPerfilRequest {
  nombre: string;
  apellido: string | null;
  telefono: string | null;
  fechaNacimiento: string | null;
  pais: string | null;
  idioma: string | null;
}