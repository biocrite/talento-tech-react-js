import { useProducts } from "@utils/useProducts.js";
import { Link, ProductList } from "@components";
import { useLocalization } from "@context";
import { usePageTitle } from "@utils";

import "./Home.css";

export function Home() {
  const { t } = useLocalization();

  usePageTitle(t("home"));

  const { products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">{t("welcome")}</p>

          <h1>AwesomeShop</h1>

          <p className="home-hero-description">{t("homeSubtitle")}</p>

          <Link route="shop" className="basic-button">
            {t("shopNow")}
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">{t("ourSelection")}</p>
            <h2>{t("featuredProducts")}</h2>
          </div>

          <Link route="shop">{t("viewAllProducts")}</Link>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error || featuredProducts[0] == null ? (
          <p role="alert">{error}</p>
        ) : (
          <ProductList products={featuredProducts} />
        )}
      </section>
    </main>
  );
}
