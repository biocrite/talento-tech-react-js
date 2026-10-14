import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "shoppingCart";

export function CartProvider({ children }) {
  const [notification, setNotification] = useState({});

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity }];
    });
    setNotification({ type: "addedToCart", product: product });
  };

  const removeFromCart = (product, removedQuantity) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== product.id),
    );
    setNotification({ type: "removedFromCart", product, removedQuantity });
  };

  const updateQuantity = (id, quantity) => {
    const validQuantity = Math.min(99, Math.max(1, quantity));

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: validQuantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const uniqueItemCount = cart.length;

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
