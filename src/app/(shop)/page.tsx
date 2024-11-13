import { redirect } from "next/navigation";

import { getpaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Homepage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getpaginatedProductsWithImages({
      page,
    });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
