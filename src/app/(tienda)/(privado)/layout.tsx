//todas las páginas dentro de esta carpeta exigen sesión.
import { RequireAuth } from "@/features/auth/components/RequireAuth";

export default function PrivadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
