import { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
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
}));
