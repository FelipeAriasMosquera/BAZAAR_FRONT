export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string; // "Bearer"
}

export interface Usuario {
  email: string;
  roles: string[]; // en minúscula: "admin", "vendedor", "comprador"
}