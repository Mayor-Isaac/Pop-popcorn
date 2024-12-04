import React from "react";
import { useState, useEffect } from "react";
export default function Exchanger() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAPI() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?${amount}=100&from=${from}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(Number(data.rates[toCur]));
      setIsLoading(false);
    }

    if (from === toCur) return setConverted(amount);
    getAPI();
  }, [amount, from, toCur]);

  return (
    <div>
      <input
        disabled={isLoading}
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <select
        disabled={isLoading}
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        disabled={isLoading}
        value={toCur}
        onChange={(e) => {
          setToCur(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {converted && (
        <p>
          {amount * converted} {toCur}
        </p>
      )}
    </div>
  );
}
