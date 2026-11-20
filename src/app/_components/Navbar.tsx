import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { MenuCategorias } from "./MenuCategorias";
import { BuscadorNavbar } from "./BuscadorNavbar";
import { MenuUsuario } from "./MenuUsuario";

const estiloIcono = "rounded-full p-2 text-text transition hover:bg-surface";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-white">
            B
          </span>
          <span className="text-xl font-extrabold tracking-tight text-text">BAZAAR</span>
        </Link>

        <div className="mx-auto hidden max-w-2xl flex-1 items-center gap-3 md:flex">
          <MenuCategorias />
          <BuscadorNavbar />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link href="/favoritos" aria-label="Favoritos" className={estiloIcono}>
            <Heart size={20} />
          </Link>
          <Link href="/carrito" aria-label="Carrito" className={`relative ${estiloIcono}`}>
            <ShoppingCart size={20} />
            {/* Contador: cuando exista features/carrito */}
          </Link>
          <div className="mx-3 h-8 w-px bg-border" />
          <MenuUsuario />
        </div>
      </div>
    </header>
  );
}