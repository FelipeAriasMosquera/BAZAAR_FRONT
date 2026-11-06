import { cn } from "@/shared/utils/cn";

type Variante = "claro" | "suave" | "oscuro";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variante?: Variante;
}

const estilosVariante: Record<Variante, string> = {
  claro: "border border-border bg-white",
  suave: "border border-border bg-surface",
  oscuro: "bg-linear-to-b from-primary-dark to-[#220f3f] text-text-lavender",
};

export function Card({ variante = "claro", className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-3xl", estilosVariante[variante], className)}
      {...props}
    />
  );
}
