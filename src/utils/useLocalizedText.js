import { useLocalization } from "@context";

export const useLocalizedText = () => {
  const { siteLanguage } = useLocalization();

  return (text) => {
    return text?.[siteLanguage] ?? text?.en ?? "";
  };
};