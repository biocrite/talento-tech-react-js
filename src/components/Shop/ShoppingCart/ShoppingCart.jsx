import { useLocalization, useCart } from "@context";
import { useFormattedPrice } from "@utils";
import { Shop, ShoppingCartItem } from "@components";
import { Link } from "@link";
import { usePageTitle } from "@utils";


import "./ShoppingCart.css";

export function ShoppingCart() {
  const { t } = useLocalization();

  const { cart, cartTotal } = useCart();

  const formatPrice = useFormattedPrice();

  if (cart.length === 0) {
    return (
      <>
        <section className="shopping-cart">
          <h2 className="shopping-cart-empty">{t("emptyCart")}</h2>
        </section>
        <Shop />
      </>
    );
  }

  usePageTitle(t("cart"));

  return (
    <>
      <h1>{t("cart")}</h1>
      <section className="shopping-cart-list">
        {cart.map((item) => (
          <ShoppingCartItem key={item.id} item={item} />
        ))}
      </section>
      <section className="shopping-cart-summary">
        <div className="shopping-cart-total">
          <span>{t("cartTotal")}: </span>
          <strong>{formatPrice(cartTotal)}</strong>
        </div>

        <div className="shopping-cart-bottom-buttons">
          <Link route="shop">
            <button type="button" className="basic-button shopping-cart-add-more-items">
              {t("addMoreItems")}
            </button>
          </Link>
          <button type="button" className="basic-button shopping-cart-checkout">
            {t("checkout")}
          </button>
        </div>
      </section>
    </>
  );
}
