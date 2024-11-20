import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    tax: number;
    total: number;
    summary: number;
    totalItemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductsQuantity: (product: CartProduct, quantity: number) => void;
  deleteProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      updateProductsQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const summary = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = summary * 0.15;
        const total = summary + tax;
        const totalItemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          tax,
          total,
          summary,
          totalItemsInCart,
        };
      },
      deleteProductToCart: product => {
        const { cart } = get();

        const deleteItem = cart.filter(
          item => item.id != product.id || item.size != product.size
        );
        set({ cart: deleteItem });
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // 1 resvisar si el producto existe con la talla seleccionada
        const productInCart = cart.some(
          item => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2 se que el producto existe por talla, se tiene que incrementar
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
      // skipHydration: true,
    }
  )
);
