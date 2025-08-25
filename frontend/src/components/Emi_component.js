import React, { useState, useEffect } from 'react';
import MyPieChart from './MyPieChart';


function Emi_component() {
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
      <div className='container' style={styles.container}>
        <div className='row'>
            <div className='col-md-4'>
              <label>Amount</label>
                  <input
        type="number"
        placeholder="Loan Amount (₹)"
        className='form-control'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />
            </div>
            <div className='col-md-4'>
              <label>Interest Rate</label>
                  <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        className='form-control'
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        style={styles.input}
      />
            </div>
            <div className='col-md-4'>
              <label>Tenure</label>
                  <input
        type="number"
        placeholder="Loan Tenure (Months)"
        className='form-control'
        value={tenure}
        onChange={(e) => setTenure(e.target.value)}
        style={styles.input}
      />
            </div>
        </div>

        <div className='row' style={{marginTop:"1rem"}}>
          <div className='col-md-6 col-sm-12'>
         <MyPieChart></MyPieChart>
          </div>
          <div className='col-md-6 col-sm-12'>
            <p>Monthly EMI</p>
             <h3>{emi ? `₹${emi}` : ''}</h3>
          </div>
        </div>

    </div>
    </>
  )
}

export default Emi_component


// import React, { useState, useEffect } from 'react';

// const EmiCalculator = () => {
//   const [amount, setAmount] = useState('');
//   const [rate, setRate] = useState('');
//   const [tenure, setTenure] = useState('');
//   const [emi, setEmi] = useState(null);

//   useEffect(() => {
//     const P = parseFloat(amount);
//     const R = parseFloat(rate) / 12 / 100;
//     const N = parseInt(tenure);

//     if (P > 0 && R > 0 && N > 0) {
//       const result = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
//       setEmi(result.toFixed(2));
//     } else {
//       setEmi(null);
//     }
//   }, [amount, rate, tenure]);

//   return (
//     <div style={styles.container}>
//       <h2>EMI Calculator</h2>
//       <input
//         type="number"
//         placeholder="Loan Amount (₹)"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         placeholder="Annual Interest Rate (%)"
//         value={rate}
//         onChange={(e) => setRate(e.target.value)}
//         style={styles.input}
//       />
//       <input
//         type="number"
//         placeholder="Loan Tenure (Months)"
//         value={tenure}
//         onChange={(e) => setTenure(e.target.value)}
//         style={styles.input}
//       />
//       <h3>{emi ? `Monthly EMI: ₹${emi}` : 'Enter all fields to calculate EMI'}</h3>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '50px auto',
//     padding: '30px',
//     borderRadius: '10px',
//     background: '#fff',
//     boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     padding: '12px',
//     margin: '10px 0',
//     fontSize: '16px',
//   }
// };

// export default EmiCalculator;

