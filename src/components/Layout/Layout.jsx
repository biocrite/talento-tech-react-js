import "./Layout.css";
import { Header, Notifications, Footer } from "@components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Layout({ children }) {

  // Return to top when URL changess
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div className="layout">
      <Header />
      <Notifications />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
