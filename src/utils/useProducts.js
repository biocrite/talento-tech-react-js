
import { useEffect, useState } from "react";
import { getProducts } from "@services/products.js";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);

        if (!cancelled) {
          setError(err.message || "Could not load products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
};
