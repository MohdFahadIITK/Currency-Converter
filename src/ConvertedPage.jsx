import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NewPage.css";

function ConvertedPage() {
  const [searchParams] = useSearchParams();
  const v1 = searchParams.get("v1");
  const v2 = searchParams.get("v2");
  const v3 = searchParams.get("v3");

  const [CurrencyOptions, setCurrencyOptions] = useState([]);
  const [currency1Name, setCurrency1Name] = useState("");
  const [currency2Name, setCurrency2Name] = useState("");
  const [EURtoC1, setRate1] = useState(null);
  const [EURtoC2, setRate2] = useState(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.entries(data).map(([key, value]) => ({ code: key, name: value }));
        setCurrencyOptions(currencyList);
      })
      .catch((error) => console.error("Error fetching currency list:", error));
  }, []);

  useEffect(() => {
    if (v2 && v3) {
      fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRate1(data["eur"][v2] || null);
          setRate2(data["eur"][v3] || null);
        })
        .catch((error) => console.error("Error fetching exchange rates:", error));
    }
  }, [v2, v3]);

  useEffect(() => {
    const currency1 = CurrencyOptions.find((option) => option.code === v2);
    const currency2 = CurrencyOptions.find((option) => option.code === v3);

    if (currency1) setCurrency1Name(currency1.name);
    if (currency2) setCurrency2Name(currency2.name);
  }, [v2, v3, CurrencyOptions]);

  const v4 = EURtoC1 && EURtoC2 ? (EURtoC2 / EURtoC1 * v1).toFixed(2) : null;
  
  return (
    <div className="center">
      <h1>
        {v1} {currency1Name} is
      </h1>
      <h1 style={{ color: "red" }}>
        {v4} {currency2Name}
      </h1>
      <a href="/">
        <button>Go to Home</button>
      </a>
    </div>
  );
}

export default ConvertedPage;
