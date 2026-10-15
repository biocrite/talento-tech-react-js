import { useCallback, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "@context";

import { auth } from "@firebase-config/firebase.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@services/products.js";

import { createEmptyForm } from "./adminConstants.js";

export function useAdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(createEmptyForm);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const {t} = useLocalization();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getProducts();
      setProducts(result);
    } catch (err) {
      console.error(err);
      setError("Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditing(null);
    setAddProduct(false);
    setError("");
  };

  const startAdding = () => {
    setForm(createEmptyForm());
    setEditing(null);
    setAddProduct(true);
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditing = (product) => {
    setEditing(product);
    setAddProduct(false);

    setForm({
      name: {
        en: product.name?.en ?? "",
        es: product.name?.es ?? "",
        pt: product.name?.pt ?? "",
      },
      description: {
        en: product.description?.en ?? "",
        es: product.description?.es ?? "",
        pt: product.description?.pt ?? "",
      },
      price: String(product.price ?? ""),
      image: product.image ?? "",
      imageDeleteUrl: product.imageDeleteUrl ?? "",
      categories: (product.categories ?? []).join(", "),
    });

    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateTranslation = (field, language, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: {
        ...previous[field],
        [language]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const price = Number(form.price);

    if (form.price.trim() === "" || !Number.isFinite(price) || price < 0) {
      setError("Enter a valid, non-negative price.");
      return;
    }

    if (editing && !editing.docId) {
      setError("Cannot update this product: missing document ID.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    const productData = {
      name: form.name,
      description: form.description,
      price,
      image: form.image.trim(),
      imageDeleteUrl: form.imageDeleteUrl,
      categories: [
        ...new Set(
          form.categories
            .split(",")
            .map((category) => category.trim().toLowerCase())
            .filter(Boolean),
        ),
      ],
    };

    try {
      if (editing) {
        await updateProduct(editing.docId, productData);
        setNotice("Product updated successfully.");
      } else {
        await createProduct(productData);
        setNotice("Product created successfully.");
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Could not save the product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    // Ask before discarding the current edit.
    if (editing || addProduct) {
      const confirmed = window.confirm(
        "Discard your current edits and edit another product?",
      );

      if (!confirmed) return;
    }

    startAdding();
  };
  const handleEdit = (product) => {
    // Clicking the product already being edited does nothing.
    if (editing?.docId === product.docId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Ask before discarding the current edit.
    if (editing || addProduct) {
      const confirmed = window.confirm(
        "Discard your current edits and edit another product?",
      );

      if (!confirmed) return;
    }

    startEditing(product);
  };

  const handleDelete = async (product) => {
    const productName =
      product.name?.en ||
      product.name?.es ||
      product.name?.pt ||
      "this product";

    if (!product.docId) {
      setError("Cannot delete this product: missing document ID.");
      return;
    }

    if (!window.confirm(`Delete "${productName}"? This cannot be undone.`)) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await deleteProduct(product.docId);

      setProducts((previous) =>
        previous.filter((item) => item.docId !== product.docId),
      );

      if (editing?.docId === product.docId) {
        resetForm();
      }

      setNotice("Product deleted successfully.");
    } catch (err) {
      console.error(err);
      setError("Could not delete the product.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Could not log out. Please try again.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchableText = [
      product.name?.en,
      product.name?.es,
      product.name?.pt,
      ...(product.categories ?? []).flatMap((category) => [
        category,
        t(category),
      ]),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search.toLowerCase());
  });

  return {
    products,
    form,
    editing,
    search,
    setSearch,
    loading,
    saving,
    addProduct,
    error,
    notice,
    filteredProducts,
    loadProducts,
    resetForm,
    startAdding,
    startEditing,
    handleEdit,
    handleAdd,
    updateTranslation,
    handleSubmit,
    handleDelete,
    handleLogout,
    setForm,
  };
}
