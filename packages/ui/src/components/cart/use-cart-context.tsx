import { createContext, ReactNode, useContext, useState } from 'react';
import { Cart } from '.';
import { useLocalStorage } from '../../hooks';
import { Product } from '../product-overview/types';
import { AppProps } from 'next/app';

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: Product[];
};

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}
export function CartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<Product[]>(
    'shopping-cart',
    []
  );

  const cartQuantity =
    cartItems &&
    cartItems.reduce((quantity, item) => Number(item.quantity) + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(product: Product) {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === product.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...product, quantity: 1 }];
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, quantity: Number(item.quantity) - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Product[])
    );
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}

      <Cart
        isOpen={isOpen}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
      />
    </CartContext.Provider>
  );
}
