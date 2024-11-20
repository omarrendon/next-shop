"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const CardSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const cart = useCartStore(state => state.cart);
  const getSummaryInformation = useCartStore(
    state => state.getSummaryInformation
  );
  const { summary, tax, total, totalItemsInCart } = getSummaryInformation();

  // console.log( cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // useEffect(() => {
  //   if (totalItemsInCart === 0 && loaded === true) {
  //     redirect("/empty");
  //   }
  // }, [totalItemsInCart, loaded]);

  if (!loaded) return <p>Cargando ...</p>;

  return (
    <>
      <div className="grid  grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {" "}
          {totalItemsInCart === 1
            ? "1 articulo"
            : `${totalItemsInCart} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(summary)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
    </>
  );
};
