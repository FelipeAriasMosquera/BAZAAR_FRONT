"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { actualizarMiPerfil, obtenerMiPerfil } from "../api/usuarios.api";

const perfilKey = (email: string | undefined) => ["usuarios", "me", email] as const;

export function useMiPerfil() {
  const { usuario } = useAuth();
  return useQuery({
    queryKey: perfilKey(usuario?.email),
    queryFn: obtenerMiPerfil,
    enabled: !!usuario,
  });
}

export function useActualizarPerfil() {
  const { usuario } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: actualizarMiPerfil,
    onSuccess: (perfil) => queryClient.setQueryData(perfilKey(usuario?.email), perfil),
  });
}