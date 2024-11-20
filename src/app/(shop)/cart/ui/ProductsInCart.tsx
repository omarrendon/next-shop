"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const {
    cart: productsInCart,
    updateProductsQuantity,
    deleteProductToCart,
  } = useCartStore(state => state);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando ...</p>;
  }

  return (
    <>
      {productsInCart.map(product => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Link
            className="hover:underline cursor-pointer"
            href={`product/${product.slug}`}
          >
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              alt={product.title}
              className="mr-5 rounded"
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </Link>
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`product/${product.slug}`}
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onSelectQuantity={quantity =>
                updateProductsQuantity(product, quantity)
              }
            />
            <button
              onClick={() => deleteProductToCart(product)}
              className="underline mt-3"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
