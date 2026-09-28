import "./Footer.css";
import { Link } from "@link";
import { useLocalization } from "@context";

export function Footer() {

  const { t} = useLocalization();

  return <footer className="layout-footer">
    <p><Link route="home">©2026 AwesomeShop.</Link> {t("allRightsReserved")}</p>
    <p><Link route="terms">{t("termsAndConditions")}</Link> | <Link route="privacy">{t("privacyPolicy")}</Link></p>
    </footer>;
}
