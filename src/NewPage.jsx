import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPage.css';

function NewPage() {
  const [CurrencyOptions, setCurrencyOptions] = useState([]);
  const [Currency1, setCurrency1] = useState("");
  const [Currency2, setCurrency2] = useState("");
  const [Amount, SetAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
      .then(response => response.json())
      .then(data => {
        const currencyList = Object.entries(data).map(([key, value]) => ({ code: key, name: value }));
        setCurrencyOptions(currencyList);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleChange1 = (event) => setCurrency1(event.target.value);
  const handleChange2 = (event) => setCurrency2(event.target.value);
  const handleAmountChange = (event) => SetAmount(event.target.value);

  const handleNavigate = () => {
    if (!Amount || isNaN(Amount) || Amount <= 0) {
      alert("Invalid amount! Please enter a valid number.");
    } else {
      if (Currency1 && Currency2) {
        navigate(`/ConvertedPage?v1=${Amount}&v2=${Currency1}&v3=${Currency2}`);
      } else {
        alert("Please select both currencies!");
      }
    }
  };

  return (
    <div className="center">
      <h1>Convert Currency </h1>
      <br />
      <div>
        <label> Convert From : </label>
        <select value={Currency1} onChange={handleChange1}>
          <option value="" disabled>Select a Currency</option>
          {CurrencyOptions.map((currency, index) => (
            <option key={index} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label> Convert To : </label>
        <select value={Currency2} onChange={handleChange2}>
          <option value="" disabled>Select a Currency</option>
          {CurrencyOptions.map((currency, index) => (
            <option key={index} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label>Amount : </label>
        <input 
          type="number" 
          step="0.01" 
          value={Amount} 
          onChange={handleAmountChange}
        />
      </div>
      <br />
      <div>
        <button onClick={handleNavigate}>Convert</button>
      </div>
    </div>
  );
}

export default NewPage;
