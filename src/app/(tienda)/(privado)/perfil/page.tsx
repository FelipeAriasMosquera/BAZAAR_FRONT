"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function PerfilPage() {
  const { usuario } = useAuth();

  return (
    <main className="mx-auto mt-10 max-w-md p-6">
      <h1 className="text-2xl font-semibold">Mi perfil</h1>
      <p className="mt-4">Correo: {usuario?.email}</p>
      <p>Roles: {usuario?.roles.join(", ")}</p>
    </main>
  );
}