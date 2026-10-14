import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalization } from "@context";
import { getProducts } from "@services/products.js";

export const useProductDetails = () => {
  const { id } = useParams();
  const { t } = useLocalization();

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const products = await getProducts();

        if (cancelled) return;

        const item = products.find(
          (product) => String(product.id) === id,
        );

        if (!item) {
          throw new Error(t("ProductNotFound"));
        }

        const related = products.filter(
          (product) =>
            product.id !== item.id &&
            product.categories?.some((category) =>
              item.categories?.includes(category),
            ),
        );

        setProductDetails(item);
        setRelatedProducts(related);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || t("ProductLoadError"));
          setProductDetails(null);
          setRelatedProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();

    return () => {
      cancelled = true;
    };
  }, [id, t]);

  return {
    product: productDetails,
    relatedProducts,
    loading,
    error,
  };
};