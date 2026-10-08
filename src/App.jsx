import "./App.css";

import {
  Layout,
  Shop,
  ProductDetails,
  Cart,
  Home,
  Page,
} from "@components";

import { useLocalization } from "@context";
import { routes } from "@routes";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const supportedLangs = ["en", "es", "pt"];

const useCurrentLanguage = (siteLanguage) => {
  const { pathname } = useLocation();

  const possibleLang = pathname.split("/")[1];

  return supportedLangs.includes(possibleLang) ? possibleLang : siteLanguage;
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
            <Route path={routes.cart[language]} element={<Cart />} />

            <Route
              path={routes.terms[language]}
              element={<Page content="TermsAndConditions" />}
            />

            <Route
              path={routes.privacy[language]}
              element={<Page content="PrivacyPolicy" />}
            />
          </Route>
        ))}

        {/* Anything unknown */}
        <Route
          path="*"
          element={<Navigate to={`/${currentLang}/`} replace />}
        />
      </Routes>
    </Layout>
  );
}
