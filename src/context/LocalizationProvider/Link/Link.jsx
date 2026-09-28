import { Link as RouterLink } from "react-router-dom";

import { useLocalization } from "@context";
import { routes } from "@routes";

export function Link({
  to,
  route,
  params = {},
  children,
  ...props
}) {
  const { siteLanguage } = useLocalization();

  let localizedPath = route
    ? routes[route][siteLanguage]
    : to;

  // Add parent route if one exists
  if (route && routes[route].parent) {
    const parentRoute = routes[route].parent;

    localizedPath = [
      routes[parentRoute][siteLanguage],
      localizedPath,
    ].join("/");
  }

  // Add parameters
  const paramValues = Object.values(params);

  if (paramValues.length > 0) {
    localizedPath += `/${paramValues.join("/")}`;
  }

  const path = `/${siteLanguage}/${localizedPath}`.replace(/\/+/g, "/");

  return (
    <RouterLink to={path} {...props}>
      {children}
    </RouterLink>
  );
}