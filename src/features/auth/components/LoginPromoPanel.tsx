import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";

export function LoginPromoPanel() {
  return (
    <Card
      variante="oscuro"
      className="hidden flex-col justify-between gap-8 p-8 lg:flex"
    >
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-lavender">
          <span className="size-1.5 rounded-full bg-live" />
          Compras y subastas, a tu manera
        </span>
        <h2 className="mt-6 font-display text-5xl font-extrabold leading-tight text-white">
          Descubre.
          <br />
          Puja. Gana.
        </h2>
        <p className="mt-4 max-w-sm text-text-lavender/80">
          Tus favoritos, las mejores ofertas y la emoción de una buena puja.
          Todo en un solo lugar.
        </p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black">
        <Image
          src="/image.png"
          alt="Mando, reloj inteligente y zapatillas"
          fill
          sizes="(min-width: 1024px) 40vw, 0px"
          priority
          className="object-cover"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-overlay-dark px-3 py-1.5 text-xs text-white">
          <Sparkles className="size-3.5" />
          Lo extraordinario está aquí
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-white/10">
          <ShieldCheck className="size-5 text-text-lavender" />
        </span>
        <div>
          <p className="font-semibold text-white">
            Tu confianza es lo primero.
          </p>
          <p className="text-sm text-text-lavender/70">
            Compra y participa con la protección de BAZAAR.
          </p>
        </div>
      </div>
    </Card>
  );
}
