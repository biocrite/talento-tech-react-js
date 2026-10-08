import { useEffect, useState } from "react";
import "./Notifications.css";
import { useCart, useLocalization } from "@context";
import { useLocalizedText } from "@utils";
import { Link } from "@components";
import { routes } from "@routes";
import { useLocation } from "react-router-dom";

export const Notifications = () => {
  const { notification, setNotification, addToCart } = useCart();
  const { t, siteLanguage } = useLocalization();
  const { pathname } = useLocation();

  const [fading, setFading] = useState(false);
  const getLocalizedText = useLocalizedText();

  const cartPath = `/${siteLanguage}/${routes.cart[siteLanguage]}`;
  const isCartPage = pathname === cartPath;

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!notification.type || isHovered) return;

    setFading(false);

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setNotification({});
      setFading(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [notification.type, isHovered, setNotification]);

  if (!notification.type) return null;

  const message = t(notification.type);
  const quantity = notification.quantity ?? notification.removedQuantity;

  const productName = getLocalizedText(notification.product.name);

  return (
    <div className="notifications-container">
      <div
        className={`notifications ${fading ? "is-fading" : ""}`}
        onMouseEnter={() => {
          setIsHovered(true);
          setFading(false);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <p>
          <span className="message-text">
            <strong>{message}</strong>:{" "}
          </span>
          <span className="quantity-and-product">
            {quantity > 1 ? quantity : null} {productName}
          </span>{" "}
        </p>
        {(notification.type === "addedToCart" ||
          notification.type === "readdedToCart") &&
          !isCartPage && (
            <Link
              route="cart"
              className="notification-action-buttons see-cart-button"
            >
              {t("viewCart")}
            </Link>
          )}
        {notification.type === "removedFromCart" && (
          <button
            type="button"
            className="notification-action-buttons undo-button"
            onClick={() => {
              addToCart(notification.product, notification.removedQuantity);
              setNotification({
                type: "readdedToCart",
                product: notification.product,
                quantity: notification.removedQuantity,
              });
            }}
          >
            {t("undo")}
          </button>
        )}
        <button
          type="button"
          className="notifications-close"
          aria-label="Close notification"
          onClick={() => setNotification({})}
        >
          ×
        </button>
      </div>
    </div>
  );
};
