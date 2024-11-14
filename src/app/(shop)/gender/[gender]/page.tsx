export const revalidate = 60;

import { redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getpaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

type Params = Promise<{ gender: string }>;
type SearchParams = Promise<{ page?: string }>;

export default async function GenderPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { gender } = await props.params;
  const { page } = await props.searchParams;
  const pageParams = page ? parseInt(page) : 1;

  const { products, totalPages } = await getpaginatedProductsWithImages({
    gender: gender as Gender,
    page: pageParams,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  // if (id === "kid") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
