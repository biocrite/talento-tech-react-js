import { useLocalization, useCart } from "@context";
import { ShoppingCartQuantity } from "@components";

export const AddToCart = ({ product }) => {
  const { t } = useLocalization();

  const { cart, addToCart, setNotification } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  return cartItem ? (
    <ShoppingCartQuantity product={cartItem} />
  ) : (
    <button
      type="button"
      className="basic-button add-to-cart-button"
      onClick={() => {
        addToCart(product);
        setNotification({ type: "addedToCart", product: product });
      }}
    >
      {t("addToCart")}
    </button>
  );
};
