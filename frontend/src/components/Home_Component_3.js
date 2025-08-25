import React from 'react'
import Buget_component from './Buget_component'

function Home_Component_3() {
    return (
        <>
            <div className='container' style={{ backgroundColor: "#f0f9ff", position: "relative", maxHeight: "400px" }}>
                <div className='row' style={{ paddingTop: "3rem", padding: "2rem" }}>
                    <div className='col-md-12 col-sm-12'>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <img src='./images/icon/batch_prediction.png' height={"50px"} width={"50px"} />
                                </div>
                                <div>
                                    <h4 className="h4_mv" style={{ fontWeight: "bold" }}>Use Popular tools</h4>
                                    <p className='p_mv'>Go from browsing to buying</p>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn btn-primary btn_mv">View all Insights</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mv_row_slider' style={{ marginTop: "3rem", padding: "2rem", display: "flex", justifyContent: "space-evenly !important" }}>
                    <div className='col-md-3 col-sm-12'>
                        <a href='' data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div className='card card_mv1' style={{ textAlign: "center", borderRadius: "1rem", boxShadow: "5rem 5rem  solid gray", width: "250px", height: "260px" }}>
                                <div style={{ backgroundColor: "#f0f9ff", borderRadius: "50%", height: "100px", width: "100px", margin: "1rem", marginTop: "2rem", marginLeft: "5rem" }}>
                                    <img src='./images/icon/BudgetIcon2.png' height={"50px"} width={"50px"} style={{ marginTop: "1.5rem" }} />
                                </div>
                                <div className='card-title' style={{ color: "black", fontWeight: "bold" }}>Budget calculator</div>
                                <p>Check your affordability <br /> range for buying home</p>
                            </div>
                        </a>
                    </div>
                    <div className='col-md-3 col-sm-12'>
                        <a href='/EMI-Calculator'>
                            <div className='card card_mv2' style={{ textAlign: "center", borderRadius: "1rem", boxShadow: "5rem 5rem  solid gray", width: "250px", height: "260px" }}>
                                <div style={{ backgroundColor: "#f0f9ff", borderRadius: "50%", height: "100px", width: "100px", margin: "1rem", marginTop: "2rem", marginLeft: "5rem" }}>
                                    <img src='./images/icon/EMICalculator2.png' height={"50px"} width={"50px"} style={{ marginTop: "1.5rem" }} />
                                </div>
                                <div className='card-title' style={{ color: "black", fontWeight: "bold" }}>EMI Calculator</div>
                                <p >Calculate your home loan <br /> <span style={{ textAlign: "left" }}> EMI </span></p>

                            </div>
                        </a>

                    </div>
                    <div className='col-md-3 col-sm-12'>
                        <a href='/Loan-Eligibility-Calculator'>
                            <div className='card card_mv2' style={{ textAlign: "center", borderRadius: "1rem", boxShadow: "5rem 5rem  solid gray", width: "250px", height: "260px" }}>
                                <div style={{ backgroundColor: "#f0f9ff", borderRadius: "50%", height: "100px", width: "100px", margin: "1rem", marginTop: "2rem", marginLeft: "5rem" }}>
                                    <img src='./images/icon/LoanEligibility2.png' height={"50px"} width={"50px"} style={{ marginTop: "1.5rem" }} />
                                </div>
                                <div className='card-title' style={{ color: "black", fontWeight: "bold" }}>Loan Eligibility</div>
                                <p>See what you can borrow<br /> for your home</p>

                            </div>
                        </a>
                    </div>
                    <div className='col-md-3 col-sm-12'>
                        <a href='/Area-Converter'>
                            <div className='card card_mv2' style={{ textAlign: "center", borderRadius: "1rem", boxShadow: "5rem 5rem  solid gray", width: "250px", height: "260px" }}>
                                <div style={{ backgroundColor: "#f0f9ff", borderRadius: "50%", height: "100px", width: "100px", margin: "1rem", marginTop: "2rem", marginLeft: "5rem" }}>
                                    <img src='./images/icon/AreaConverter2.png' height={"50px"} width={"50px"} style={{ marginTop: "1.5rem" }} />
                                </div>
                                <div className='card-title' style={{ color: "black", fontWeight: "bold" }}>Area Converter</div>
                                <p>Convert one area into any  <br />other easily</p>

                            </div>
                        </a>

                    </div>
                    <Buget_component></Buget_component>
                </div>
            </div>

        </>
    )
}

export default Home_Component_3
