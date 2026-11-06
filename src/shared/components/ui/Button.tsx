import { cn } from "@/shared/utils/cn";

type Variante = "primario" | "secundario" | "fantasma";
type Tamano = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  tamano?: Tamano;
  ancho?: "auto" | "completo";
  cargando?: boolean;
}

const estilosVariante: Record<Variante, string> = {
  primario: "bg-primary text-white hover:bg-primary-dark",
  secundario: "border border-border bg-white text-text hover:bg-surface",
  fantasma: "bg-transparent text-primary hover:bg-lavender-soft",
};

const estilosTamano: Record<Tamano, string> = {
  md: "h-10 px-4",
  lg: "h-12 px-6",
};

export function Button({
  variante = "primario",
  tamano = "md",
  ancho = "auto",
  cargando = false,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || cargando}
      aria-busy={cargando || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-60",
        estilosVariante[variante],
        estilosTamano[tamano],
        ancho === "completo" && "w-full",
        className,
      )}
      {...props}
    />
  );
}
