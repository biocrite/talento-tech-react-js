import { lazy, Suspense } from "react";
import { useLocalization } from "@context";
import { usePageTitle } from "@utils";
import "./Page.css";

const pages = import.meta.glob("../../pages/*/{en,es,pt}.jsx");

const lazyPages = Object.fromEntries(
  Object.entries(pages).map(([path, importFn]) => [
    path,
    lazy(importFn),
  ])
);

export const Page = ({ content }) => {
  const { siteLanguage, t } = useLocalization();

  const path = `../../pages/${content}/${siteLanguage}.jsx`;

  const Content = lazyPages[path];

  if (!Content) {
    return (
      <p>
        {t("contentNotFound")} {content} ({siteLanguage})
      </p>
    );
  }

  return (
    <Suspense fallback={<h2>{t("loading")}</h2>}>
      <Content usePageTitle={usePageTitle} />
    </Suspense>
  );
};