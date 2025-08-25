import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

function Faq_emi_calculator() {
  return (
  <>
  <div className='container' style={{marginTop:"1rem",marginBottom:"3rem"}}>
    <div className='row'>
        <div className='col-md-12'>
            <h1>Frequently asked questions about EMI Calculator</h1>
            <p>Know what questions the users frequently asks about EMI calculators</p>
 <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>what is EMI</Accordion.Header>
        <Accordion.Body>
       EMI stands for equated monthly installments. As a borrower, you need to pay the lender a
        fixed amount every month on a specified date. The EMI is the sum total of the principal amount and the interest amount divided over the tenure of the loan. However, your monthly value is fixed for each month, the principal amount paid and interest amount paid changes every month. For the first few years, the interest portion is higher. With time, the interest amount keeps reducing and principal amount keeps increasing.
        Therefore, your 70-75% interest will be paid in the first few years of the entire loan tenure.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>What is Home-Loan EMI</Accordion.Header>
        <Accordion.Body>
      Home loan is a loan taken from any financial institution for buying a house. 
      The EMI that is calculated for this loan is termed as a Home loan EMI
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </div>
    </div>
   </div>

    
  </>
  )
}

export default Faq_emi_calculator
