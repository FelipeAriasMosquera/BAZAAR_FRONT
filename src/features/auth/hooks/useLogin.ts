"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { useAuth } from "./useAuth";

export function useLogin() {
  const { iniciarSesion } = useAuth();
  return useMutation({
    mutationFn: login,
    onSuccess: (respuesta) => iniciarSesion(respuesta.token),
  });
}