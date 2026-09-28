import { useEffect, useRef, useState } from "react";
import { Link } from "@link";
import { FiMenu as MenuIcon, FiHome as HomeIcon, FiShoppingCart as CartIcon } from "react-icons/fi";
import { LocalizationMenu } from "@components";
import { useLocalization, useCart } from "@context";
import { BsShop as ShopIcon } from "react-icons/bs";

import "./Navbar.css";

export function Navbar() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const [showLocalizationMenu, setShowLocalizationMenu] = useState(false);

  const { cartItemCount } = useCart();
  const { t } = useLocalization();

  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowHamburgerMenu(false);
        setShowLocalizationMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowHamburgerMenu(false);
      setShowLocalizationMenu(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkClick = () => {
    setShowHamburgerMenu(false);
    setShowLocalizationMenu(false);
  };

  return (
    <nav className="layout-navbar" ref={navbarRef}>
  <div className="mobile-navbar-actions">
    <Link
      route="cart"
      onClick={handleLinkClick}
      aria-label={t("cart")}
    >
      <CartIcon className="navbar-icon" />

      {cartItemCount > 0 && (
        <span className="cart-item-count">
          {cartItemCount}
        </span>
      )}
    </Link>

    <button
      type="button"
      aria-label={
        showHamburgerMenu
          ? "Close menu"
          : "Open menu"
      }
      aria-expanded={showHamburgerMenu}
      className="hamburger-menu-opener"
      onClick={() => setShowHamburgerMenu((prev) => !prev)}
    >
      <MenuIcon />
    </button>
  </div>

      <ul className={`layout-navbar-list ${showHamburgerMenu ? "show" : ""}`}>
        <li>
          <Link route="home" onClick={handleLinkClick}>
            <HomeIcon className="navbar-icon" />
            {t("home")}
          </Link>
        </li>

        <li>
          <Link route="shop" onClick={handleLinkClick}>
            <ShopIcon className="navbar-icon" />
            {t("shop")}
          </Link>
        </li>

        <li>
          <Link route="cart" onClick={handleLinkClick}>
            <CartIcon className="navbar-icon" />
            {t("cart")}

            {cartItemCount > 0 && (
              <div className="cart-item-count">{cartItemCount}</div>
            )}
          </Link>
        </li>

        <li>
          <LocalizationMenu
            isOpen={showLocalizationMenu}
            onToggle={() => setShowLocalizationMenu((prev) => !prev)}
          />
        </li>
      </ul>
    </nav>
  );
}
