import { useEffect, useState } from "react";

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