import "./App.css";

import { Layout, Shop, ProductDetails, ShoppingCart, Home } from "@components";

import { Page } from "@pages";
import { useLocalization } from "@context";
import { routes } from "@routes";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const supportedLangs = ["en", "es", "pt"];

const routeComponents = {
  cart: <ShoppingCart />,
  terms: <Page content="TermsAndConditions" />,
  privacy: <Page content="PrivacyPolicy" />,
};

const useCurrentLanguage = (fallbackLanguage) => {
  const { pathname } = useLocation();

  const possibleLang = pathname.split("/")[1];

  return supportedLangs.includes(possibleLang)
    ? possibleLang
    : fallbackLanguage;
};

export default function App() {
  const { siteLanguage } = useLocalization();

  const currentLang = useCurrentLanguage(siteLanguage);

  return (
    <Layout>
      <Routes>
        {supportedLangs.map((language) => (
          <Route key={language} path={`/${language}`}>
            {/* Home */}
            <Route index element={<Home />} />

            {/* Shop */}
            <Route path={`${routes.shop[language]}/*`}>
              {/* /en/shop */}
              <Route index element={<Shop />} />

              {/* /en/shop/category/shoes */}
              <Route
                path={`${routes.category[language]}/:category`}
                element={<Shop />}
              />

              {/* /en/shop/product/123 */}
              <Route
                path={`${routes.product[language]}/:id`}
                element={<ProductDetails />}
              />

              {/* Anything else under /shop */}
              <Route path="*" element={<Shop />} />
            </Route>

            {/* Other top-level routes */}
            <Route
              path={routes.cart[language]}
              element={routeComponents.cart}
            />

            <Route
              path={routes.terms[language]}
              element={routeComponents.terms}
            />

            <Route
              path={routes.privacy[language]}
              element={routeComponents.privacy}
            />
          </Route>
        ))}

        {/* Anything unknown */}
        <Route path="*" element={<Navigate to={`/${currentLang}/`} replace />} />
      </Routes>
    </Layout>
  );
}
