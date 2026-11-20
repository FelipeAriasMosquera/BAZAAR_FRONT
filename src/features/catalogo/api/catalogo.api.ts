import { cliente } from "@/shared/api/cliente";
import type { Pagina } from "@/shared/types/paginacion";
import type { Categoria } from "../types/catalogo.types";

export async function obtenerCategorias() {
  // size alto para traer todas en el menú
  const { data } = await cliente.get<Pagina<Categoria>>("/api/categorias", {
    params: { size: 100 },
  });
  return data.content;
}