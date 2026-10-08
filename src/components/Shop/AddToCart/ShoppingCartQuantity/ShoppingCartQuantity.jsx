import { useLocalization, useCart } from "@context";
import { Link } from "@components";
import "./ShoppingCartQuantity.css";

export const ShoppingCartQuantity = ({ product, showViewCart = true }) => {
  const { t } = useLocalization();
  const { updateQuantity, removeFromCart } = useCart();

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
          removeFromCart(product, removedQuantity);
        }}
      >
        {t("removeFromCart")}
      </button>

      {showViewCart && (
        <Link route="cart" className="basic-button shopping-cart-view-cart">
          {t("viewCart")}
        </Link>
      )}
    </div>
  );
};
