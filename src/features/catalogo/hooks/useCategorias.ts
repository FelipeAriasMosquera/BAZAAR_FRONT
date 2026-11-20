"use client";

import { useQuery } from "@tanstack/react-query";
import { obtenerCategorias } from "../api/catalogo.api";

export function useCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: obtenerCategorias,
    staleTime: 5 * 60 * 1000, // las categorías casi no cambian
  });
}