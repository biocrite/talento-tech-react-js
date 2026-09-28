import { useLocalization, useCart } from "@context";
import { Link } from "@link";
import "./ShoppingCartQuantity.css";

export const ShoppingCartQuantity = ({ product, showViewCart = true }) => {
  const { t } = useLocalization();
  const { updateQuantity, removeFromCart, setNotification } = useCart();

  return (
    <div className="shopping-cart-quantity">
      <h3>{t("quantity")}</h3>

      <div className="shopping-cart-quantity-controls">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={product.quantity === 1}
          onClick={() => updateQuantity(product.id, product.quantity - 1)}
        >
          −
        </button>

        <input
          type="number"
          min="1"
          max="99"
          value={product.quantity}
          onChange={(event) =>
            updateQuantity(product.id, Number(event.target.value))
          }
          aria-label={t("quantity")}
        />

        <button
          type="button"
          aria-label="Increase quantity"
          disabled={product.quantity === 99}
          onClick={() => updateQuantity(product.id, product.quantity + 1)}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="shopping-cart-remove"
        onClick={() => {
          let removedQuantity = product.quantity;
          console.log("First", removedQuantity);
          removeFromCart(product.id);
          console.log("Again", removedQuantity);
          setNotification({ type: "removedFromCart", product, removedQuantity });
        }}
      >
        {t("removeFromCart")}
      </button>

      {showViewCart && (
        <Link route="cart">
          <button
            type="button"
            className="basic-button shopping-cart-view-cart"
          >
            {t("viewCart")}
          </button>
        </Link>
      )}
    </div>
  );
};
