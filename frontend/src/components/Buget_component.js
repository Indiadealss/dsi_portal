import React, { use, useState } from "react";

function Buget_component() {
  const [progress, setProgress] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [afford, setAfford] = useState(0);

  return (
    <div>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-pledby="exampleModalp" aria-hidden="true">
  <div class="modal-dialog " style={{maxWidth:"1000px",boxShadow:"5px 5px 5px solid gray",marginTop:"7rem"}}>
    <div class="modal-content">
      <div class="modal-header">
        {/* <h5 class="modal-title" id="exampleModalp">Modal title</h5> */}
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-p="Close"></button>
      </div>
      <div class="modal-body">
        <div className='container-fluid'style={{padding:"1rem"}}>
            <h3 class="modal-title" id="exampleModalp">Check your home buying budget</h3>
          <div className='row' style={{marginTop:"3rem"}}>
            <div className='col-md-6 col-sm-12'>
                <div className='row'>
                  <div className='col-md-6 col-sm-6'>
                    <p>Savings for buying home</p>
                  </div>
                  <div className='col-md-6 col-sm-6'>
                   <p style={{textAlign:"right"}}>{progress}</p>
                  </div>
                </div>
                 {/*  1 sub row end */}
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                       <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        style={{ width: "100%", marginTop: "10px", accentColor: "#0079db", }}
      />
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <p>₹ 0</p>
         <p>₹ 20cr</p>
      </div>
                  </div>
                </div>
                {/*  2 sub row end */}
            </div>
            {/* first col end */}
            <div className='col-md-6 col-sm-12' style={{paddingLeft:"2rem"}}>
              <div className='row'>
                  <div className='col-md-6 col-sm-6'>
                    <p>Preffered loan tenure</p>
                  </div>
                  <div className='col-md-6 col-sm-6'>
                   <p style={{textAlign:"right"}}>{tenure}</p>
                  </div>
                </div>
                 {/*  1 sub row end */}
                  <div className="row">
                  <div className="col-md-12 col-sm-12">
                       <input
        type="range"
         value={tenure}
        onChange={(e) => setTenure(e.target.value)}
        min="0"
        max="100" 
        style={{ width: "100%", marginTop: "10px", accentColor: "#0079db", }}
      />
       <div style={{display:"flex",justifyContent:"space-between"}}>
        <p>1 yr</p>
         <p>20 yrs</p>
      </div>
                  </div>
                </div>
                {/*  2 sub row end */}
            </div>
            {/* second col end */}
          </div>
           {/* first main row end */}
           <div className="row" style={{marginTop:"1.5rem"}}>
            <div className="col-md-6">
               <div className='row'>
                  <div className='col-md-6 col-sm-6'>
                    <p>EMI you can afford</p>
                  </div>
                  <div className='col-md-6 col-sm-6'>
                   <p style={{textAlign:"right"}}>{afford}</p>
                  </div>
                </div>
                 {/*  1 sub row end */}
                  <div className="row">
                  <div className="col-md-12 col-sm-12">
                       <input
        type="range"
         value={afford}
        onChange={(e) => setAfford(e.target.value)}
        min="0"
        max="100"
        
        style={{ width: "100%", marginTop: "10px", accentColor: "#0079db", }}
      />
       <div style={{display:"flex",justifyContent:"space-between"}}>
        <p>₹ 1,000</p>
         <p>₹ 10Lacs</p>
      </div>
                  </div>
                </div>
                {/*  2 sub row end */}
            </div>
            {/* first col end */}
             <div className="col-md-6" style={{paddingLeft:"2rem"}}>
              <div style={{display:"flex",paddingTop:"2.7rem",fontWeight:"bold"}}>
                <p>Your home budget</p>
                 <p style={{paddingLeft:"2rem"}}>40 - 45 lacs</p>
              </div>
              {/* <div className="row">
                <div className="col-md-6 col-sm-6">
                   <p>Your home budget</p>
                </div>
                 <div className="col-md-6 col-sm-6">
                   <p>40 - 45 lacs</p>
                 </div>
              </div> */}
             
             </div>
             {/* second col end  */}
           </div>
           {/* second main row end */}
           <div className="row" style={{marginTop:"3rem"}}>
            <div className="col-md-12 col-sm-12">
              <p>*Estimated budget is calculated at an average interest rate of 8.75%</p>
            </div>

           </div>
            {/* thrid main row end */}
        </div>
      </div>
    
    </div>
  </div>
</div>

    
      
    </div>
  )
}

export default Buget_component
