import React, { useState } from "react";

export default function LoanEligibilityCalculator() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [existingEmi, setExistingEmi] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");

  // Helper function to calculate EMI
  const calculateEMI = (loanAmount, rate, years) => {
    const n = years * 12; // months
    const r = rate / 12 / 100; // monthly interest
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  // Calculate loan eligibility
  let eligibleLoan = 0;
  if (income && expenses && tenure && interestRate !== "") {
    const disposableIncome =
      Number(income) - Number(expenses) - Number(existingEmi);

    // Banks typically allow 40% - 60% of disposable income for EMI
    const maxAffordableEmi = disposableIncome * 0.5;

    // Reverse calculate loan amount based on EMI formula
    let low = 0,
      high = 100000000, // search range (₹10 Cr)
      result = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const emi = calculateEMI(mid, Number(interestRate), Number(tenure));

      if (emi <= maxAffordableEmi) {
        result = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    eligibleLoan = result;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Loan Eligibility Calculator
      </h2>

      <div className="grid gap-4">
        <label>Monthly Income (₹)</label>
        <input
          type="number"
          placeholder="Monthly Income (₹)"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="p-2 border rounded"
        />
        <label>Monthly Expenses (₹)</label>
        <input
          type="number"
          placeholder="Monthly Expenses (₹)"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          className="p-2 border rounded"
        />
        <label>Existing EMIs (₹)</label>
        <input
          type="number"
          placeholder="Existing EMIs (₹)"
          value={existingEmi}
          onChange={(e) => setExistingEmi(e.target.value)}
          className="p-2 border rounded"
        /> <br />
        <label>Loan Tenure (Years)</label>
        <input
          type="number"
          placeholder="Loan Tenure (Years)"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="p-2 border rounded"
        />
        <label>Interest Rate (%)</label>
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Eligible Loan Amount:
        </h3>
        <p className="text-2xl font-bold text-green-600">
          {eligibleLoan > 0 ? `₹${eligibleLoan.toLocaleString()}` : "--"}
        </p>
      </div>
    </div>
  );
}
