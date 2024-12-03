import React from "react";
import { useState, useEffect } from "react";
export default function Exchanger() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CAD");

  useEffect(() => {
    async function getAPI() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?${amount}=100&from=${from}&to=${to}`
      );
      const data = await res.json();
      const rate = { ...data.rates };
      console.log(rate.to);
    }

    //   return () => {
    //     second
    //   }

    getAPI();
  }, [from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <select
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
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
