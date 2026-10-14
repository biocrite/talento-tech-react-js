import { useNavigate, useParams } from "react-router-dom";

import { ProductList } from "@components";
import { useLocalization } from "@context";
import { usePageTitle, useProducts } from "@utils";
import { routes } from "@routes";

import "./Shop.css";

const useSortedLocalizedCategories = (products) => {
  const { t } = useLocalization();

  return [...new Set(products.flatMap((product) => product.categories))]
    .map((category) => ({
      key: category,
      label: t(category).toLowerCase(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

const getProductsFromCategory = (products, category) => {
  if (!category) return products;

  return products.filter((product) => product.categories.includes(category));
};

const getCapitalizedFirstLetter = (str) =>
  str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";

export const Shop = () => {
  const { t, siteLanguage } = useLocalization();
  const { category } = useParams();
  const navigate = useNavigate();

  const { products, loading, error } = useProducts();


  const categories = useSortedLocalizedCategories(products);

  const selectedCategory = category || null;

  const filteredProducts = getProductsFromCategory(products, selectedCategory);

  usePageTitle(category ? getCapitalizedFirstLetter(t(category)) : t("shop"));

  const handleCategoryClick = (categoryKey) => {
    if (!categoryKey || categoryKey === selectedCategory) {
      navigate(`/${siteLanguage}/${routes.shop[siteLanguage]}/`, {
        replace: true,
      });
      return;
    }

    navigate(
      `/${siteLanguage}/${routes.shop[siteLanguage]}/${routes.category[siteLanguage]}/${categoryKey}`,
      { replace: true },
    );
  };

  if (loading) return <h2>{t("loading")}</h2>;

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>{t("shop")}</h1>

      <div className="shop-display-area">
        <div className="categories-list">
          <ul>
            <li>
              <button
                className={selectedCategory === null ? "selected" : ""}
                onClick={() => handleCategoryClick(null)}
              >
                {t("allItems").toLowerCase()}
              </button>
            </li>

            {categories.map((category) => (
              <li key={category.key}>
                <button
                  className={
                    category.key === selectedCategory ? "selected" : ""
                  }
                  onClick={() => handleCategoryClick(category.key)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <section>
          <ProductList products={filteredProducts} />
        </section>
      </div>
    </section>
  );
};
