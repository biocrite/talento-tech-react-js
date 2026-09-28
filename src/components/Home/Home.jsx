import { useEffect, useState } from "react";
import { Link } from "@link";
import { ProductList } from "@components";
import { useLocalization } from "@context";
import {usePageTitle} from "@utils";

import "./Home.css";

export function Home() {

  const { t } = useLocalization();

    usePageTitle(t("home"));

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">
            {t("welcome")}
          </p>

          <h1>AwesomeShop</h1>

          <p className="home-hero-description">
            {t("homeSubtitle")}
          </p>

          <Link route="shop" className="basic-button">
            {t("shopNow")}
          </Link>
        </div>

        {/* <div className="home-hero-image">
          <img src="/img/home/hero.jpg" alt="" />
        </div> */}
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">
              {t("ourSelection")}
            </p>

            <h2>{t("featuredProducts")}</h2>
          </div>

          <Link route="shop">
            {t("viewAllProducts")}
          </Link>
        </div>

        <ProductList products={featuredProducts} />
      </section>

      {/* ... */}
    </main>
  );
}