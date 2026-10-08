import { useLocalization, useCart } from "@context";
import { useFormattedPrice, usePageTitle } from "@utils";
import { Shop, CartItem, Link } from "@components";


import "./Cart.css";

export function Cart() {
  const { t } = useLocalization();

  const { cart, cartTotal } = useCart();

  const formatPrice = useFormattedPrice();

  usePageTitle(t("cart"));

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

  

  return (
    <>
      <h1>{t("cart")}</h1>
      <section className="shopping-cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
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
