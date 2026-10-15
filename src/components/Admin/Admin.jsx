import { useAdminProducts } from "./useAdminProducts.js";
import { AdminHeader } from "./AdminHeader.jsx";
import { ProductForm } from "./ProductForm.jsx";
import { ProductList } from "./ProductList.jsx";

import "./Admin.css";

export function Admin() {
  const admin = useAdminProducts();

  const handleFieldChange = (field, value) => {
    admin.setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <main className="admin-page">
      <AdminHeader onLogout={admin.handleLogout} />

      {admin.notice && (
        <p className="admin-notice" role="status">
          {admin.notice}
        </p>
      )}

      {admin.error && (
        <p className="admin-error" role="alert">
          {admin.error}
        </p>
      )}

      {(admin.addProduct || admin.editing) && (
        <ProductForm
          form={admin.form}
          editing={admin.editing}
          saving={admin.saving}
          onChange={handleFieldChange}
          onTranslationChange={admin.updateTranslation}
          onSubmit={admin.handleSubmit}
          onCancel={admin.resetForm}
          availableCategories={[
            ...new Set(
              admin.products.flatMap((product) => product.categories ?? []),
            ),
          ]}
        />
      )}

      <ProductList
        products={admin.products}
        filteredProducts={admin.filteredProducts}
        search={admin.search}
        onSearchChange={admin.setSearch}
        loading={admin.loading}
        onRefresh={admin.loadProducts}
        onAdd={admin.handleAdd}
        onEdit={admin.handleEdit}
        onDelete={admin.handleDelete}
      />
    </main>
  );
}
