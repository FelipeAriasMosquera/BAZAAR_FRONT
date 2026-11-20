import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShoppingBag } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";

// Estado vacío por ahora: cuando exista la API de órdenes, aquí va la última
export function UltimaCompraCard() {
  return (
    <Card className="rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-text">Tu última compra</h3>
        <Link href="/ordenes" className="text-primary">
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface text-text-placeholder">
          <ShoppingBag size={22} />
        </div>
        <p className="text-sm text-text-placeholder">Todavía no tienes compras.</p>
      </div>

      <Link
        href="/productos"
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary"
      >
        Explorar productos <ArrowRight size={12} />
      </Link>
    </Card>
  );
}