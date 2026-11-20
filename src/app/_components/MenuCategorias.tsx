"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useClickFuera } from "@/shared/hooks/useClickFuera";
import { useCategorias } from "@/features/catalogo";

export function MenuCategorias() {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: categorias, isLoading, isError } = useCategorias();

  useClickFuera(ref, () => setAbierto(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-xl bg-surface px-4 text-sm font-semibold text-text transition hover:bg-border/50"
      >
        Categorías
        <ChevronDown size={16} className={cn("transition", abierto && "rotate-180")} />
      </button>

      {abierto && (
        <div className="absolute left-0 top-12 w-60 rounded-2xl border border-border bg-white p-2 shadow-lg">
          {isLoading && <p className="px-3 py-2 text-sm text-text-placeholder">Cargando...</p>}
          {isError && (
            <p className="px-3 py-2 text-sm text-text-placeholder">No se pudieron cargar.</p>
          )}
          {categorias?.map((c) => (
            <Link
              key={c.id}
              href={`/categorias/${c.id}`}
              onClick={() => setAbierto(false)}
              className="block rounded-xl px-3 py-2 text-sm text-text hover:bg-surface"
            >
              {c.nombre}
            </Link>
          ))}
          <div className="my-1 border-t border-border" />
          <Link
            href="/productos"
            onClick={() => setAbierto(false)}
            className="block rounded-xl px-3 py-2 text-sm font-semibold text-primary hover:bg-surface"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
}