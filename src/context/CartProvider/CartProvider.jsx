import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "shoppingCart";

export function CartProvider({ children }) {

  const [notification, setNotification] = useState({});

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  };

const addToCart = (product, quantity = 1) => {
  updateCart(
    (() => {
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        return cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...cart, { ...product, quantity }];
    })(),
  );
};

  const removeFromCart = (productId) => {
    updateCart(cart.filter((item) => item.id !== productId));
  };

const updateQuantity = (id, quantity) => {
  const validQuantity = Math.min(99, Math.max(1, quantity));

  updateCart(
    cart.map((item) =>
      item.id === id ? { ...item, quantity: validQuantity } : item,
    ),
  );
};

  const clearCart = () => {
    updateCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const uniqueItemCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        notification,
        setNotification,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        uniqueItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
