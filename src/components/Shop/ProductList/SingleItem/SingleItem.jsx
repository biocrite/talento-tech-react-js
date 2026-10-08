import "./SingleItem.css";
import { useFormattedPrice, useLocalizedText } from "@utils";
import { Link, AddToCart } from "@components";

export const SingleItem = ({ product }) => {
  const getLocalizedText = useLocalizedText();
  const formatPrice = useFormattedPrice();

  const { id, name, price, description, image } = product;

  return (
    <article className="single-item-card">
      <Link route="product" params={{ id }}>
        <div className="single-item-image">
          <img src={image} alt={getLocalizedText(name)} />
        </div>
        <h3>{getLocalizedText(name)}</h3>
        <p>{getLocalizedText(description)}</p>
        <p>{formatPrice(price)}</p>
      </Link>

      <AddToCart product={product} />
    </article>
  );
};
