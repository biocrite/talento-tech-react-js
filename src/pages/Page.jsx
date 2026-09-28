import { lazy, Suspense, useMemo } from "react";
import { useLocalization } from "@context";
import "./Page.css";
import { usePageTitle } from "@utils";


const pages = import.meta.glob("./*/{en,es,pt}.jsx");

const lazyPages = Object.fromEntries(
  Object.entries(pages).map(([path, importFn]) => [path, lazy(importFn)])
);

export const Page = ({ content }) => {

  const { siteLanguage, t } = useLocalization();

  const path = `./${content}/${siteLanguage}.jsx`;

  const Content = useMemo(() => {
    return lazyPages[path] || null;
  }, [path]);

  if (!Content) {
    return <p>Content not found for {content} ({siteLanguage})</p>;
  }

  return (
    <Suspense fallback={<h2>{t("loading")}</h2>}>
        <Content usePageTitle={usePageTitle} />
    </Suspense>
  );
};