export const revalidate = 60;

import { redirect } from "next/navigation";

import { getpaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

type SearchParams = Promise<{ page?: string }>;

export default async function Homepage(props: { searchParams: SearchParams }) {
  const { page } = await props.searchParams;
  const pageParams = page ? parseInt(page) : 1;

  const { products, totalPages } = await getpaginatedProductsWithImages({
    page: pageParams,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
