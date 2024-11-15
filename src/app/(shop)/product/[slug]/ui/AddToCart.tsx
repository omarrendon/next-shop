"use client";
import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [sizes, setSizes] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!sizes) return;
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
