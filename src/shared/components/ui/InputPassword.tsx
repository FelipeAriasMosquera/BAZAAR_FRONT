"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "./Input";

export const InputPassword = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(function InputPassword(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        className="pr-28"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-4 flex items-center gap-2 text-sm text-text-secondary hover:text-text"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        {visible ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
});
