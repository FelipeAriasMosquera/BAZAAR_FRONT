import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalido?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalido, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalido || undefined}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border bg-white pl-4 pr-10 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15",
          invalido ? "border-live" : "border-border",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder"
      />
    </div>
  );
});