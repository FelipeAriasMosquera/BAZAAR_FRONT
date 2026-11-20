import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";

// Estado vacío por ahora: cuando exista la API de direcciones, aquí va la principal
export function DireccionPrincipalCard() {
  return (
    <Card className="rounded-2xl p-5">
      <h3 className="flex items-center gap-2 font-bold text-text">
        <MapPin size={18} className="text-primary" />
        Tu dirección principal
      </h3>
      <p className="mt-3 text-sm text-text-placeholder">No tienes direcciones guardadas.</p>
      <Link
        href="/direcciones"
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary"
      >
        Agregar dirección <ArrowRight size={12} />
      </Link>
    </Card>
  );
}