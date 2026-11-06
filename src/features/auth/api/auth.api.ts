import { cliente } from "@/shared/api/cliente";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export const login = (datos: LoginRequest) =>
  cliente.post<LoginResponse>("/api/usuarios/login", datos).then((r) => r.data);