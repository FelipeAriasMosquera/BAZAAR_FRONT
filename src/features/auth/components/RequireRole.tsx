//exige un rol concreto
"use client";

import { useAuth } from "../hooks/useAuth";

export function RequireRole({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const { usuario } = useAuth();

  if (!usuario?.roles.includes(role)) {
    return <p className="p-6">No tienes permiso para ver esta página.</p>;
  }
  return <>{children}</>;
}
