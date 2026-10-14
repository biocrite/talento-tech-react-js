import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import rosetta from "@data/translations.json";

const LocalizationContext = createContext(null);

const LANGUAGE_STORAGE_KEY = "siteLanguage";
const CURRENCY_STORAGE_KEY = "siteCurency";

function LocalizationProvider({ children }) {
  const [siteLanguage, setSiteLanguage] = useState(() => {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || "es";
  });

  const [siteCurrency, setSiteCurrency] = useState(() => {
    return localStorage.getItem(CURRENCY_STORAGE_KEY) || "ARS";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, siteLanguage);
  }, [siteLanguage]);

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, siteCurrency);
  }, [siteCurrency]);

  function t(key) {
    return rosetta[key]?.[siteLanguage] ?? key;
  }

  return (
    <LocalizationContext.Provider
      value={{
        siteLanguage,
        setSiteLanguage,
        siteCurrency,
        setSiteCurrency,
        t,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

function useLocalization() {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider",
    );
  }

  return context;
}

export {
  LocalizationProvider,
// eslint-disable-next-line react-refresh/only-export-components
  useLocalization,
};