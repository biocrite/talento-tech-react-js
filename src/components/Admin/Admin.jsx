
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@firebase-config/firebase.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@services/products.js";
import "./Admin.css";

const emptyForm = {
  name: { en: "", es: "", pt: "" },
  description: { en: "", es: "", pt: "" },
  price: "",
  image: "",
  categories: "",
};

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
];

export function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      setProducts(await getProducts());
    } catch (err) {
      console.error(err);
      setError("Could not load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setError("");
  };

  const startEditing = (product) => {
    setEditing(product);
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
    setSaving(true);
    setError("");
    setNotice("");

    const price = Number(form.price);

    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid, non-negative price.");
      setSaving(false);
      return;
    }

    const productData = {
      name: form.name,
      description: form.description,
      price,
      image: form.image.trim(),
      categories: [
        ...new Set(
          form.categories
            .split(",")
            .map((category) => category.trim().toLowerCase())
            .filter(Boolean)
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

  const handleDelete = async (product) => {
    const productName =
      product.name?.en || product.name?.es || product.name?.pt || "this product";

    if (!window.confirm(`Delete "${productName}"? This cannot be undone.`)) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await deleteProduct(product.docId);
      setProducts((previous) =>
        previous.filter((item) => item.docId !== product.docId)
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
      ...(product.categories ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search.toLowerCase());
  });

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">STORE MANAGEMENT</p>
          <h1>Admin dashboard</h1>
          <p className="admin-subtitle">
            Manage your shop's products and translations.
          </p>
        </div>

        <button
          className="admin-button admin-button-secondary"
          onClick={handleLogout}
        >
          Log out
        </button>
      </header>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <span>Total products</span>
          <strong>{loading ? "—" : products.length}</strong>
        </article>

        <article className="admin-stat-card">
          <span>Filtered results</span>
          <strong>{loading ? "—" : filteredProducts.length}</strong>
        </article>
      </section>

      {notice && (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      )}

      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <h2>{editing ? "Edit product" : "Add a product"}</h2>
            <p>
              Enter the product details in English, Spanish, and Portuguese.
            </p>
          </div>

          {editing && (
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={resetForm}
            >
              Cancel editing
            </button>
          )}
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          {languages.map(({ code, label }) => (
            <fieldset className="admin-language" key={code}>
              <legend>{label}</legend>

              <label htmlFor={`name-${code}`}>Product name</label>
              <input
                id={`name-${code}`}
                value={form.name[code]}
                onChange={(event) =>
                  updateTranslation("name", code, event.target.value)
                }
                required
              />

              <label htmlFor={`description-${code}`}>Description</label>
              <textarea
                id={`description-${code}`}
                rows={3}
                value={form.description[code]}
                onChange={(event) =>
                  updateTranslation("description", code, event.target.value)
                }
                required
              />
            </fieldset>
          ))}

          <div className="admin-field">
            <label htmlFor="product-price">Price</label>
            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: event.target.value })
              }
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="product-image">Image URL</label>
            <input
              id="product-image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(event) =>
                setForm({ ...form, image: event.target.value })
              }
              required
            />

            {form.image && (
              <img
                className="admin-image-preview"
                src={form.image}
                alt="Product preview"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                onLoad={(event) => {
                  event.currentTarget.style.display = "block";
                }}
              />
            )}
          </div>

          <div className="admin-field">
            <label htmlFor="product-categories">
              Categories (comma-separated)
            </label>
            <input
              id="product-categories"
              placeholder="children, baby"
              value={form.categories}
              onChange={(event) =>
                setForm({ ...form, categories: event.target.value })
              }
            />
          </div>

          <button
            className="admin-button admin-button-primary"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editing
                ? "Save changes"
                : "Create product"}
          </button>
        </form>
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <h2>Products</h2>
            <p>Search, edit, or remove products from your shop.</p>
          </div>

          <button
            className="admin-button admin-button-secondary"
            onClick={loadProducts}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        <input
          className="admin-search"
          type="search"
          placeholder="Search names or categories..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search products"
        />

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="admin-empty">No products found.</p>
        ) : (
          <div className="admin-product-list">
            {filteredProducts.map((product) => (
              <article className="admin-product" key={product.docId}>
                <img
                  className="admin-product-image"
                  src={product.image}
                  alt={product.name?.en || "Product"}
                  loading="lazy"
                />

                <div className="admin-product-info">
                  <h3>
                    {product.name?.en ||
                      product.name?.es ||
                      product.name?.pt ||
                      "Untitled product"}
                  </h3>

                  <p className="admin-product-price">
                    {Number(product.price).toFixed(2)}
                  </p>

                  <p className="admin-product-categories">
                    {(product.categories ?? []).join(" · ") ||
                      "No categories"}
                  </p>

                  <p className="admin-product-translations">
                    EN: {product.name?.en || "—"} · ES:{" "}
                    {product.name?.es || "—"} · PT:{" "}
                    {product.name?.pt || "—"}
                  </p>
                </div>

                <div className="admin-product-actions">
                  <button
                    className="admin-button admin-button-secondary"
                    onClick={() => startEditing(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-button admin-button-danger"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
