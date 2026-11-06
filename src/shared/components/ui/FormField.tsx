//(etiqueta + campo + mensaje de error)
interface FormFieldProps {
  id: string;
  etiqueta: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ id, etiqueta, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {etiqueta}
      </label>
      {children}
      {error && <p className="text-sm text-live">{error}</p>}
    </div>
  );
}