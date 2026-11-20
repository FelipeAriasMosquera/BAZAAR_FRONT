import { Camera } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import type { PerfilUsuario } from "../types/usuarios.types";
import { nombreCompleto } from "../lib/nombre";
import { AvatarUsuario } from "./AvatarUsuario";

export function PerfilEncabezado({ perfil }: { perfil: PerfilUsuario }) {
  const nombre = nombreCompleto(perfil);

  return (
    <Card className="flex items-center gap-5 rounded-2xl p-6">
      <div className="relative">
        <AvatarUsuario nombre={nombre} className="h-20 w-20 text-2xl" />
        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-primary text-white">
          <Camera size={14} />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-2xl font-bold capitalize text-text">{nombre}</h2>
        <p className="truncate text-sm text-text-placeholder">{perfil.email}</p>
      </div>

      {/* Se activa cuando el backend tenga subida de foto */}
      <button
        type="button"
        disabled
        title="Próximamente"
        className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-text disabled:cursor-not-allowed disabled:opacity-60"
      >
        Cambiar foto
      </button>
    </Card>
  );
}