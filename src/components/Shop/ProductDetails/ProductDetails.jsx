import { useProductDetails } from "./useProductDetails";
import { ProductList } from "@components";
import { useLocalizedText, useFormattedPrice, usePageTitle } from "@utils";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "@context";
import { AddToCart } from "@components";
import { MdKeyboardBackspace as BackButton } from "react-icons/md";



import "./ProductDetails.css";

export const ProductDetails = () => {

  const { product, relatedProducts, loading, error } =
    useProductDetails();

  const navigate = useNavigate();

  const getLocalizedText = useLocalizedText();
  const formatPrice = useFormattedPrice();
  const { t } = useLocalization();

  usePageTitle(product ? getLocalizedText(product.name) : "");

  if (loading) return <h2>{t("loading")}</h2>;
  if (error || !product) return <h2>{t("productNotFound")}</h2>;

  const { name, description, price, image } = product;

  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>
        <BackButton/> {t("back")}
      </button>

      <section className="product-details">
        <img
          src={image}
          alt={getLocalizedText(name)}
        />

        <div className="product-details-text">
          <h1>{getLocalizedText(name)}</h1>

          <p>{getLocalizedText(description)}</p>

          <p>{formatPrice(price)}</p>

          <AddToCart product={product} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section>
          <h2>{t("relatedProducts")}</h2>

          <ProductList products={relatedProducts} />
        </section>
      )}
    </>
  );
};