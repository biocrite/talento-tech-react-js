import { useLocalization } from "@context";
import { useExchangeRate } from "@utils";

// Function to format a price based on the user's preferred language and currency.
export function useFormattedPrice() {
  const { siteLanguage, siteCurrency } = useLocalization();

  const exchangeRate = useExchangeRate("USD", siteCurrency);

  return (price) => {
    if (price == null || exchangeRate == null) return "";

    const amount = price * exchangeRate;

    const roundedAmount =
      siteCurrency === "ARS"
        ? Math.round(amount / 100) * 100
        : Math.ceil(amount);

    const languageCode = {
      es: "es-AR",
      en: "en-US",
      pt: "pt-BR",
    }[siteLanguage];

    return new Intl.NumberFormat(languageCode, {
      style: "currency",
      currency: siteCurrency,
      minimumFractionDigits: 0,
    }).format(roundedAmount);
  };
}
