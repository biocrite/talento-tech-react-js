import { useLocation, useNavigate } from "react-router-dom";
import { useLocalization } from "@context";
import { getLocalizedPath } from "@utils";

import "./LocalizationMenu.css";

import { MdOutlineCurrencyExchange as CurrencyIcon } from "react-icons/md";
import { IoLanguage as LanguageIcon } from "react-icons/io5";
import { BiWorld as WorldIcon } from "react-icons/bi";

export function LocalizationMenu({ isOpen, onToggle }) {
  const { siteLanguage, setSiteLanguage, siteCurrency, setSiteCurrency, t } =
    useLocalization();

  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (language) => {
    const path = getLocalizedPath(location.pathname, language);

    setSiteLanguage(language);
    navigate(path, { replace: true });
  };

  return (
    <div className="localization">
      <button className="localization-button" type="button" onClick={onToggle}>
        <WorldIcon className="navbar-icon" />
        {siteLanguage} ({siteCurrency})
      </button>

      <div className={`localization-menu ${isOpen ? "show" : ""}`}>
        <span>
          <LanguageIcon className="navbar-icon" />
          {t("language")}
        </span>

        <ul>
          <li>
            <button type="button" className={siteLanguage === "es" && "selected"} onClick={() => changeLanguage("es")}>
              {t("spanish")}
            </button>
          </li>

          <li>
            <button type="button" className={siteLanguage === "en" && "selected"} onClick={() => changeLanguage("en")}>
              {t("english")}
            </button>
          </li>

          <li>
            <button type="button" className={siteLanguage === "pt" && "selected"} onClick={() => changeLanguage("pt")}>
              {t("portuguese")}
            </button>
          </li>
        </ul>

        <span>
          <CurrencyIcon className="navbar-icon" />
          {t("currency")}
        </span>

        <ul>
          <li>
            <button type="button" className={siteCurrency === "ARS" && "selected"} onClick={() => setSiteCurrency("ARS")}>
              $ ARS ({t("ars")})
            </button>
          </li>

          <li>
            <button type="button" className={siteCurrency === "USD" && "selected"} onClick={() => setSiteCurrency("USD")}>
              $ USD ({t("usd")})
            </button>
          </li>

          <li>
            <button type="button" className={siteCurrency === "BRL" && "selected"} onClick={() => setSiteCurrency("BRL")}>
              R$ BRL ({t("brl")})
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
