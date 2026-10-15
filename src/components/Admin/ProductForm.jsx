import { useEffect, useState } from "react";
import { uploadImageToImgBB } from "@services/uploadImage.js";
import { LANGUAGES } from "./adminConstants.js";
import "./ProductForm.css";

export function ProductForm({
  form,
  editing,
  saving,
  onChange,
  onTranslationChange,
  onSubmit,
  onCancel,
  availableCategories = [],
}) {
  const [editLang, setEditLang] = useState("es");
  const [newCategory, setNewCategory] = useState("");
  const [customCategories, setCustomCategories] = useState([]);

  const selectedCategories = (form.categories || "")
    .split(",")
    .map((category) => category.trim().toLowerCase())
    .filter(Boolean);

  const categoryOptions = [
    ...new Set([
      ...availableCategories,
      ...customCategories,
      ...selectedCategories,
    ]),
  ].sort();

  const toggleCategory = (category) => {
    const nextCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    onChange("categories", nextCategories.join(", "));
  };

  const handleAddCategory = (event) => {
    event.preventDefault();

    const category = newCategory.trim().toLowerCase();

    if (!category) return;

    if (!categoryOptions.includes(category)) {
      setCustomCategories((previous) => [...previous, category]);
    }

    if (!selectedCategories.includes(category)) {
      onChange("categories", [...selectedCategories, category].join(", "));
    }

    setNewCategory("");
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedFile]);

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setImageError("");
    setImageUploading(true);

    try {
const { imageUrl, imageDeleteUrl } =
  await uploadImageToImgBB(file);

onChange("image", imageUrl);
onChange("imageDeleteUrl", imageDeleteUrl);

    } catch (error) {
      setImageError(error.message || "Image upload failed.");
      setSelectedFile(null);
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <h2>{editing ? "Edit product" : "Add a product"}</h2>
          <p>Enter the product details in English, Spanish, and Portuguese.</p>
        </div>

        <button
          type="button"
          className="admin-button admin-button-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

      <form className="admin-form" onSubmit={onSubmit}>
        {/* Translations */}
        <fieldset className="admin-language" key={editLang}>
          <legend className="admin-language-legend">
            {LANGUAGES.map(({ code, label }, index) => (
              <span key={code}>
                {index > 0 && <span className="language-separator"> | </span>}

                <button
                  type="button"
                  className={`admin-language-label ${
                    editLang === code ? "active" : ""
                  }`}
                  onClick={() => setEditLang(code)}
                  aria-pressed={editLang === code}
                >
                  {label}
                </button>
              </span>
            ))}
          </legend>

          <label htmlFor={`name-${editLang}`}>Product name</label>
          <input
            id={`name-${editLang}`}
            value={form.name[editLang]}
            onChange={(event) =>
              onTranslationChange("name", editLang, event.target.value)
            }
            required
          />

          <label htmlFor={`description-${editLang}`}>Description</label>
          <textarea
            id={`description-${editLang}`}
            rows={3}
            value={form.description[editLang]}
            onChange={(event) =>
              onTranslationChange("description", editLang, event.target.value)
            }
            required
          />
        </fieldset>

        {/* Price */}
        <div className="admin-field">
          <label htmlFor="price">Price</label>

          <div className="product-price-wrapper">
            <span className="product-price-currency">USD $</span>

            <input
              type="text"
              inputMode="decimal"
              className="product-price"
              value={form.price}
              onChange={(e) => {
                const value = e.target.value;

                // Allow only digits and one decimal separator.
                if (/^\d*[.,]?\d*$/.test(value)) {
                  onChange("price", value.replace(",", "."));
                }
              }}
              onBlur={() => {
                if (form.price !== "" && Number.isFinite(Number(form.price))) {
                  onChange("price", Number(form.price).toFixed(2));
                }
              }}
            />
          </div>
        </div>

        {/* Image */}

{/* Image */}
<div className="admin-field">
  <label htmlFor="product-image">Product image</label>

  <input
    id="product-image"
    type="file"
    accept="image/*"
    onChange={handleImageSelect}
    disabled={imageUploading}
    required={!form.image}
  />

  {imageUploading && <p>Uploading image to ImgBB...</p>}

  {imageError && (
    <p role="alert" className="admin-error">
      {imageError}
    </p>
  )}

  {(imagePreview || form.image) && (
    <img
      key={imagePreview || form.image}
      className="admin-image-preview"
      src={imagePreview || form.image}
      alt="Product preview"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
      onLoad={(event) => {
        event.currentTarget.style.display = "block";
      }}
    />
  )}

  {form.image && !imageUploading && (
    <p>Image URL saved in the form.</p>
  )}
</div>

        {/* Categories */}
        <fieldset className="admin-category-field">
          <legend>Categories</legend>

          {categoryOptions.length > 0 ? (
            <div className="admin-category-list">
              {categoryOptions.map((category) => (
                <label className="admin-category-option" key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          ) : (
            <p>No categories yet. Add your first category below.</p>
          )}

          <div className="admin-add-category">
            <label htmlFor="new-category">Add a category</label>

            <div className="admin-add-category-row">
              <input
                id="new-category"
                type="text"
                placeholder="e.g. toys"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
              />

              <button
                type="button"
                className="admin-button admin-button-secondary"
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
              >
                Add
              </button>
            </div>
          </div>
        </fieldset>

        {/* Submit */}
        <button
          className="admin-button admin-button-primary"
          type="submit"
          disabled={saving || imageUploading}
        >
          {imageUploading
            ? "Uploading image..."
            : saving
              ? "Saving..."
              : editing
                ? "Save changes"
                : "Create product"}
        </button>
      </form>
    </section>
  );
}
