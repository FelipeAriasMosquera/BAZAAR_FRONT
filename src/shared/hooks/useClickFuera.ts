"use client";

import { useEffect, type RefObject } from "react";

// Cierra menús desplegables cuando se hace clic por fuera
export function useClickFuera(ref: RefObject<HTMLElement | null>, alClickFuera: () => void) {
  useEffect(() => {
    function manejar(evento: MouseEvent) {
      if (ref.current && !ref.current.contains(evento.target as Node)) alClickFuera();
    }
    document.addEventListener("mousedown", manejar);
    return () => document.removeEventListener("mousedown", manejar);
  }, [ref, alClickFuera]);
}