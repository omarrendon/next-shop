"use client";
import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const { addProductToCart } = useCartStore(state => state);

  const [sizes, setSizes] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!sizes) return;
    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      size: sizes,
      slug: product.slug,
      title: product.title,
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSizes(undefined);
  };

  return (
    <>
      {posted && !sizes && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}
      <SizeSelector
        onSizeSelected={size => setSizes(size)}
        selectedSize={sizes}
        availableSizes={product.sizes as never}
      />
      <QuantitySelector
        quantity={quantity}
        onSelectQuantity={value => setQuantity(value)}
      />
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
