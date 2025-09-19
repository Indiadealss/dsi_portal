import React, { useState, useEffect } from 'react';
// import MyPieChart from './MyPieChart';


function Emicomponent() {
      const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  useEffect(() => {
    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(tenure);

    if (P > 0 && R > 0 && N > 0) {
      const result = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEmi(result.toFixed(2));
    } else {
      setEmi(null);
    }
  }, [amount, rate, tenure]);

const styles = {
  container: {
    with:"max-content",
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    fontSize: '16px',
  }
};


  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
  {/* Input Row */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Amount */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Amount</label>
      <input
        type="number"
        placeholder="Loan Amount (₹)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>

    {/* Interest Rate */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Interest Rate</label>
      <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
    </div>

    {/* Tenure */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Tenure</label>
      <input
        type="number"
        placeholder="Loan Tenure (Months)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={tenure}
        onChange={(e) => setTenure(e.target.value)}
      />
    </div>
  </div>

  {/* Result Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
    {/* Pie Chart */}
    {/* <div>
      <MyPieChart />
    </div> */}

    {/* EMI Result */}
    <div className="text-center md:text-left">
      <p className="text-gray-600 text-lg">Monthly EMI</p>
      <h3 className="text-2xl font-bold text-blue-600">
        {emi ? `₹${emi}` : ''}
      </h3>
    </div>
  </div>
</div>
    </>
  )
}

export default Emicomponent


