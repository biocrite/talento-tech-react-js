import { useLocalizedText, useFormattedPrice } from "@utils";
import "./CartItem.css";
import { Link, ShoppingCartQuantity } from "@components";

export const CartItem = ({ item }) => {


  const formatPrice = useFormattedPrice();
  const getLocalizedText = useLocalizedText();

  return (
    <article className="shopping-cart-item">
      <Link route="product" params={{ id: item.id }}>
        <img src={item.image} alt={getLocalizedText(item.name)} />
      </Link>

      <div className="shopping-cart-item-info">
        <h2>
          <Link route="product" params={{ id: item.id }}>{getLocalizedText(item.name)}</Link>
        </h2>

        <p className="shopping-cart-item-price">{formatPrice(item.price)}</p>
      </div>
      <ShoppingCartQuantity product={item} showViewCart={false} />
    </article>
  );
};
