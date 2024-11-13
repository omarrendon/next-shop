export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // si el total de paginas es 7 o menos se mostraran todas las pag sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la pagina actual se encuentra entre las primeras 3 paginas mostrar las primeras 3, puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Si la pagina actual se encuentra entre las ultimas 3 paginas mostrar las primeras 2, puntos suspensivos, las ultimas 3 paginas

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la pagina actual se encuentra en medio, mostrar la primer pagina , puntos suspensivos, la pag actual y vecinos
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, totalPages];
};
