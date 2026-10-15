import { AdminStats } from "./AdminStats.jsx";
import { useLocalization } from "@context";
import "./ProductList.css";

export function ProductList({
  products,
  filteredProducts,
  search,
  onSearchChange,
  loading,
  onRefresh,
  onAdd,
  onEdit,
  onDelete,
}) {
  const { t } = useLocalization();
  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <h2>Products</h2>
          <p>Search, edit, or remove products from your shop.</p>
        </div>

        <div>
          <button
            type="button"
            className="admin-button admin-button-secondary"
            onClick={onAdd}
            disabled={loading}
          >
            Add product
          </button>

          <button
            type="button"
            className="admin-button admin-button-secondary"
            onClick={onRefresh}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>
      <AdminStats
        total={products.length}
        filtered={filteredProducts.length}
        loading={loading}
      />

      <input
        className="admin-search"
        type="search"
        placeholder="Search names or categories..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
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
                  {product.name?.es ||
                    product.name?.en ||
                    product.name?.pt ||
                    "Untitled product"}
                </h3>

                <p className="admin-product-price">
                  USD ${Number(product.price).toFixed(2)}
                </p>
                
                <p className="admin-product-categories">
                  {(product.categories ?? [])
                    .map((category) => t(category))
                    .join(" · ") || t("noCategories")}
                </p>

                <p className="admin-product-translations">
                  EN: {product.name?.en || "—"} · ES: {product.name?.es || "—"}{" "}
                  · PT: {product.name?.pt || "—"}
                </p>
              </div>

              <div className="admin-product-actions">
                <button
                  type="button"
                  className="admin-button admin-button-secondary"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="admin-button admin-button-danger"
                  onClick={() => onDelete(product)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
