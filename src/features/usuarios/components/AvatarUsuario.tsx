import { cn } from "@/shared/utils/cn";
import { iniciales } from "../lib/nombre";

interface AvatarUsuarioProps {
  nombre: string;
  className?: string;
}

// Iniciales mientras el backend no tenga foto de perfil
export function AvatarUsuario({ nombre, className }: AvatarUsuarioProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary",
        className,
      )}
    >
      {iniciales(nombre)}
    </div>
  );
}