import { getpaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

export default async function Homepage() {
  const { products } = await getpaginatedProductsWithImages();
  console.log({ products });

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
