import { routes } from "@routes";

const supportedLanguages = ["en", "es", "pt"];

// Function to get the localized path for a given pathname depending on the user's preferred language.
// It takes in a pathname and a language code, and returns the corresponding localized path based on the defined routes and supported languages.

export function getLocalizedPath(pathname, language) {
  const segments = pathname.split("/").filter(Boolean);

  // Remove current language
  const currentLanguage = supportedLanguages.includes(segments[0])
    ? segments.shift()
    : null;

  if (!currentLanguage) {
    return `/${language}`;
  }

  // Nothing after language → home
  if (segments.length === 0) {
    return `/${language}`;
  }

  const [first, second, third] = segments;

  /*
   * SHOP
   *
   * /en/shop
   * /en/shop/:category
   * /en/shop/product/:id
   */

  const shopLanguages = Object.values(routes.shop);

  if (shopLanguages.includes(first)) {
    const shopPath = routes.shop[language];

    // /shop
    if (!second) {
      return `/${language}/${shopPath}`;
    }

    /*
     * /shop/product/:id
     */
    const productLanguages = Object.values(routes.product);

    if (productLanguages.includes(second)) {
      const productPath = routes.product[language];

      return [
        language,
        shopPath,
        productPath,
        third,
      ]
        .filter(Boolean)
        .join("/");
    }

    /*
     * /shop/category
     *
     * Category itself is not localized,
     * so preserve it.
     */
    
    const categoryLanguages = Object.values(routes.category);

    if (categoryLanguages.includes(second)) {
      const categoryPath = routes.category[language];

      return [
        language,
        shopPath,
        categoryPath,
        third,
      ]
        .filter(Boolean)
        .join("/");
    }

  }

  /*
   * Top-level routes
   */

  for (const [, route] of Object.entries(routes)) {
  // Skip nested routes
  if (route.parent) continue;

  const localizedPaths = Object.values(route);

  if (localizedPaths.includes(first)) {
    return `/${language}/${route[language]}`;
  }
}

  // Unknown route → language home
  return `/${language}`;
}