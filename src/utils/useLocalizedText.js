import { useLocalization } from "@context";

// Function to get appropriate product display text depending on the user's preferred language.

export const useLocalizedText = () => {
  const { siteLanguage } = useLocalization();

  return (text) => {
    return text?.[siteLanguage] ?? text?.en ?? "";
  };
};