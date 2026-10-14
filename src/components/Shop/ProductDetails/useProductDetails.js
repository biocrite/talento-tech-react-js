import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalization } from "@context";
import {
  getProductById,
  getProductsByCategory,
} from "@services/products.js";

export const useProductDetails = () => {
  const { id } = useParams();
  const { t } = useLocalization();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const item = await getProductById(id);

        if (cancelled) return;

        if (!item) {
          throw new Error(t("productNotFound"));
        }

        setProduct(item);

        const categories = item.categories ?? [];

        if (categories.length === 0) {
          setRelatedProducts([]);
          return;
        }

        const results = await Promise.all(
          categories.map((category) =>
            getProductsByCategory(category)
          )
        );

        if (cancelled) return;

        const uniqueProducts = new Map();

        results.flat().forEach((related) => {
          if (related.id !== item.id) {
            uniqueProducts.set(related.id, related);
          }
        });

        setRelatedProducts([...uniqueProducts.values()]);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || t("productLoadError"));
          setProduct(null);
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
    product,
    relatedProducts,
    loading,
    error,
  };
};