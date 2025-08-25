import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Emi_calculator from './pages/Emi_calculator'
import Area_converter from './pages/Area_converter'
import Loan_Eligibility_Calculator from './pages/Loan_Eligibility_Calculator'

function App() {
  return (
    <>
<Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>} ></Route>
     <Route path='/EMI-Calculator' element={<Emi_calculator></Emi_calculator>} />
      <Route path='/Area-Converter' element={<Area_converter></Area_converter>} />
      <Route path='/Loan-Eligibility-Calculator' element={<Loan_Eligibility_Calculator />} />   
    </Routes>
    </>
  )
}

export default App
