import { CuentaSidebar } from "@/features/usuarios";

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[230px_1fr]">
      <CuentaSidebar />
      <main className="min-w-0">{children}</main>
    </div>
  );
}