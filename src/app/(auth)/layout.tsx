import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CircleHelp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/">
            <Image
              src="/bazaar.png"
              alt="Bazaar"
              width={140}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-secondary hover:text-text"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Volver al inicio</span>
            </Link>
            <Link
              href="/ayuda"
              className="flex items-center gap-2 font-semibold text-primary"
            >
              <CircleHelp className="size-4" />
              <span className="hidden sm:inline">¿Necesitas ayuda?</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BAZAAR S.L. Todos los derechos reservados.</p>
          <nav className="flex gap-6">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos y condiciones</Link>
            <Link href="/ayuda">Centro de ayuda</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
