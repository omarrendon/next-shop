import { notFound, redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getpaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;
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
