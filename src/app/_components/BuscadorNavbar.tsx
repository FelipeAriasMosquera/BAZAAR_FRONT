"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function BuscadorNavbar() {
  const router = useRouter();
  const [texto, setTexto] = useState("");

  function buscar(evento: React.FormEvent) {
    evento.preventDefault();
    const q = texto.trim();
    if (q) router.push(`/productos?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={buscar} className="relative flex-1">
      <Search
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-placeholder"
      />
      <input
        type="search"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar tecnología, moda, subastas y más..."
        className="h-10 w-full rounded-xl bg-surface pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-placeholder focus:bg-white focus:ring-4 focus:ring-primary/15"
      />
    </form>
  );
}