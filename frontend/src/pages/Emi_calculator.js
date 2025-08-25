import React from 'react'
import Emi_component from '../components/Emi_component'
import Header_2 from '../components/Header_2'
import Footer from '../components/Footer'
import Emi_component2 from '../components/Emi_component2'
import Faq_emi_calculator from '../components/Faq_emi_calculator'



function Emi_calculator() {
  return (
   <>

    <div class="boxed_wrapper ltr">
      <Header_2></Header_2>
   <Emi_component></Emi_component>
   <Emi_component2></Emi_component2>
   <Faq_emi_calculator />
   <Footer></Footer>
   
    
    </div>
 
   </>
  )
}

export default Emi_calculator













































// import React, { useState } from 'react';

// function Emi_calculator() {

//     const [amount, setAmount] = useState('');
//   const [rate, setRate] = useState('');
//   const [months, setMonths] = useState('');
//   const [emi, setEmi] = useState(null);

//   const calculateEMI = () => {
//     const P = parseFloat(amount);
//     const R = parseFloat(rate) / 12 / 100;
//     const N = parseInt(months);

//     const result = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
//     setEmi(result.toFixed(2));
//   };
//   return (
//   <>
//   <div>
//       <h2>EMI Calculator</h2>
//       <input type="number" placeholder="Loan Amount (P)" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       <input type="number" placeholder="Interest Rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
//       <input type="number" placeholder="Tenure (Months)" value={months} onChange={(e) => setMonths(e.target.value)} />
//       <button onClick={calculateEMI}>Calculate EMI</button>
//       {emi && <h3>Monthly EMI: ₹{emi}</h3>}
//       <p>{emi}</p>
//     </div>
//   </>
//   )
// }

// export default Emi_calculator



