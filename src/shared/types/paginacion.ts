// Forma de la página que devuelve Spring (Page<T>)
export interface Pagina<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // página actual, empieza en 0
  size: number;
  first: boolean;
  last: boolean;
}