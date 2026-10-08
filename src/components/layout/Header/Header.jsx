import { Link, Navbar  } from "@components";
import "./Header.css";

export function Header() {
  return (
    <header className="layout-header">
      <div className="layout-header-website-title">
        <Link route="home">
          {" "}
          <img className="website-logo" src="/favicon.svg" alt="" />
          AwesomeShop
        </Link>
      </div>
      <Navbar />
    </header>
  );
}
