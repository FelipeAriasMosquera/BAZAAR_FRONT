import { z } from "zod";

export const perfilSchema = z.object({
  nombre: z.string().trim().min(2, "Mínimo 2 caracteres").max(50),
  apellido: z.string().trim().max(80),
  telefono: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ]{7,20}$/, "Teléfono no válido")
    .or(z.literal("")),
  fechaNacimiento: z.string(),
  pais: z.string(),
  idioma: z.string(),
});

export type PerfilFormValues = z.infer<typeof perfilSchema>;