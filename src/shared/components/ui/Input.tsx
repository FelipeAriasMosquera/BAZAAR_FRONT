import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalido?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalido, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalido || undefined}
      className={cn(
        "h-12 w-full rounded-xl border bg-white px-4 text-sm text-text outline-none transition placeholder:text-text-placeholder focus:border-primary focus:ring-4 focus:ring-primary/15",
        invalido ? "border-live" : "border-border",
        className,
      )}
      {...props}
    />
  );
});
