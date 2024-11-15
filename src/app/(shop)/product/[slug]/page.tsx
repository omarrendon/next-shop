export const revalidate = 604800; // 7 days

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: Params;
  parent: ResolvingMetadata;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title,
    description: product?.description ?? "",
    openGraph: {
      title: product?.title,
      description: product?.description ?? "",
      images: [`/products/${product?.images![1]}`],
    },
  };
}

export default async function ProductPage(props: { params: Params }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideshow */}
      <div className="cols-spna-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title as never}
          images={product.images as never}
          className="block md:hidden"
        />
        {/* desktop slideshow */}
        <ProductSlideshow
          title={product.title as never}
          images={product.images as never}
          className="hidden md:block"
        />
      </div>

      {/* detalles */}
      <div className="cols-spna-1 px-5 ">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className}  antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">$ {product.price}</p>

        {/* selector de talllas */}
        <SizeSelector
          selectedSize={product.sizes![0]}
          availableSizes={product.sizes as never}
        />
        {/* selector de cantidad */}
        <QuantitySelector quantity={2} />
        {/* Button */}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/* descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
