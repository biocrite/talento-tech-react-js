import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalization } from "@context";

export const useProductDetails = () => {
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t } = useLocalization();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setError(null);

        const item = data.find((product) => String(product.id) === id);

        if (!item) {
          throw new Error(t("ProductNotFound"));
        }

        const related = data.filter(
          (product) =>
            product.categories.some((category) =>
              item.categories.includes(category),
            ) && product.id !== item.id,
        );

        setProductDetails(item);
        setRelatedProducts(related);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id, t]);

  return {
    product: productDetails,
    relatedProducts,
    loading,
    error,
  };
};
