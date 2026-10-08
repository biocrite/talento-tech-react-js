import { useEffect, useState } from "react";

// Function to fetch the exchange rate between two currencies using an external API.
// It takes in two currency codes (fromCurrency and toCurrency) and returns the exchange rate between them.
// The exchange rate is fetched whenever either of the currency codes changes.

export function useExchangeRate(fromCurrency, toCurrency) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    async function fetchExchangeRate() {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );

      const data = await response.json();

      setRate(data.rates[toCurrency]);
    }

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  return rate;
}