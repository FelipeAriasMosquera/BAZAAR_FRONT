import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function TarjetaSeguridad() {
  return (
    <div className="flex gap-3 rounded-2xl bg-primary/5 p-5">
      <ShieldCheck size={20} className="shrink-0 text-primary" />
      <div>
        <p className="text-sm font-bold text-text">Tu cuenta, protegida</p>
        <p className="mt-1 text-xs text-text-placeholder">
          Gestiona tu contraseña y los accesos a tu cuenta.
        </p>
        <Link
          href="/seguridad"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
        >
          Revisar seguridad <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}