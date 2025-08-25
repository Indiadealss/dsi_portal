import React from 'react'

function Search2() {
  return (
    <>
      <div className='container mv_cnt' style={{ marginTop: "-2.5rem" }}>
        <div className='card mv' style={{ boxShadow: "5px 5px 10px 10px gray", width: "max-content", height: "max-content", borderRadius: "2rem", height: "max-content" }}>
          <ul class="nav nav-pills mb-3 mobile_view" id="pills-tab" role="tablist" style={{ margin: "0.5rem", marginLeft: "2rem" }}>
            <li class="nav-item" role="presentation">
              <button class="btn nav-link fw-normal seach_tab active" id="pills-Buy-tab" data-bs-toggle="pill" data-bs-target="#pills-Buy" type="button" role="tab" aria-controls="pills-Buy" aria-selected="true" style={{ fontSize: "16px", backgroundColor: "transparent", color: "#041533", paddingTop: "16px" }}>Buy</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-normal" id="pills-Rent-tab" data-bs-toggle="pill" data-bs-target="#pills-Rent" type="button" role="tab" aria-controls="pills-Rent" aria-selected="false" style={{ fontSize: "16px", backgroundColor: "transparent", color: "#041533", padding: "16px 32px" }}>Rent</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-normal" id="pills-New_Launch-tab" data-bs-toggle="pill" data-bs-target="#pills-New_Launch" type="button" role="tab" aria-controls="pills-New_Launch" aria-selected="false" style={{ fontSize: "16px", backgroundColor: "transparent", color: "#041533", padding: "16px 32px" }}>New Launch </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-normal" id="pills-PG-tab" data-bs-toggle="pill" data-bs-target="#pills-PG" type="button" role="tab" aria-controls="pills-PG" aria-selected="false" style={{ fontSize: "16px", backgroundColor: "transparent", color: "#041533", padding: "16px 32px" }}>PG / Co-living</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-normal" id="pills-Plots-tab" data-bs-toggle="pill" data-bs-target="#pills-Plots" type="button" role="tab" aria-controls="pills-Plots" aria-selected="false" style={{ fontSize: "16px", backgroundColor: "transparent", color: "#041533", padding: "16px 32px" }}>Plots/Land</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-normal" id="pills-Projects-tab" data-bs-toggle="pill" data-bs-target="#pills-Projects" type="button" role="tab" aria-controls="pills-Projects" aria-selected="false" style={{ fontSize: "16px", backgroundColor: "transparent", color: "#041533", padding: "16px 32px" }}>Projects</button>
            </li>
            <li class="nav-item">
              <div style={{ marginRight: "0.5rem", marginTop: "1.2rem" }}><a href="/postproperty">
                <button type='button' className='btn btn-primary' style={{ width: "max-content", fontSize: "16px", fontweight: "bold", border: "none", backgroundColor: "transparent", color: "#041533" }}>Post property</button>
              </a>
              </div>

            </li>
          </ul>
          <hr />
          <div className='conatiner mv_cnt2' style={{ margin: "1rem" }}>
            <div className='row'>
              <div className='col-md-4 col-sm-12'>
                <select class="form-select mv_search" aria-label="Default select example" style={{ marginLeft: "1.5rem" }}>
                  <option value={"Residential"} selected>All Residential</option>
                </select>
              </div>
              <div className='col-md-8 col-sm-12'>
                {/* <div class="tab-content" id="pills-tabContent"> */}
                <div class="tab-content" id="pills-tabContent" style={{ border: "none", borderRadius: "2rem" }}>
                  <div class="tab-pane fade show active" id="pills-Buy" role="tabpanel" aria-labelledby="pills-Buy-tab">

                    <div class="input-group mb-3" style={{ paddingRight: "5rem" }}>
                      <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                      <input type="text" class="form-control mv_input" placeholder="Search Buyer property" aria-label="Search Buyer property" aria-describedby="button-addon2" />
                      <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>



                  </div>
                  {/* tab content 1 end */}




                  <div class="tab-pane fade" id="pills-Rent" role="tabpanel" aria-labelledby="pills-Rent-tab">

                    <div class="input-group mb-3" style={{ paddingRight: "5rem" }}>
                      <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                      <input type="text" class="form-control" placeholder="Search Rent property" aria-label="Search Rent property" aria-describedby="button-addon2" />
                      <spa class="input-group-text" id="basic-addon1"><i class="fa fa-microphone" aria-hidden="true"></i></spa>
                      <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>

                  </div>

                  {/* tab content 2 end */}


                  <div class="tab-pane fade" id="pills-New_Launch" role="tabpanel" aria-labelledby="pills-New_Launch-tab">

                    <div class="input-group mb-3" style={{ paddingRight: "5rem" }}>
                      <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                      <input type="text" class="form-control" placeholder="Search New property" aria-label="Search New property" aria-describedby="button-addon2" />
                      <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>

                  </div>
                  {/* tab content 3 end */}

                  <div class="tab-pane fade " id="pills-PG" role="tabpanel" aria-labelledby="pills-PG-tab">

                    <div class="input-group mb-3" style={{ paddingRight: "5rem" }}>
                      <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                      <input type="text" class="form-control" placeholder="Search PG property" aria-label="Search PG property" aria-describedby="button-addon2" />
                      <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>

                  </div>

                  {/* tab content 4 end */}

                  <div class="tab-pane fade" id="pills-Plots" role="tabpanel" aria-labelledby="pills-Plots-tab">

                    <div class="input-group mb-3" style={{ paddingRight: "5rem" }}>
                      <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                      <input type="text" class="form-control" placeholder="Search Plots property" aria-label="Search Plots property" aria-describedby="button-addon2" />
                      <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>

                  </div>

                  {/* tab content 5 end */}

                  <div class="tab-pane fade" id="pills-Projects" role="tabpanel" aria-labelledby="pills-Projects-tab">

                    <div class="input-group mb-3" style={{ paddingRight: "5rem" }}>
                      <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                      <input type="text" class="form-control" placeholder="Search Projects property" aria-label="Search Projects property" aria-describedby="button-addon2" />
                      <button class="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>

                  </div>

                  {/* tab content 6 end */}

                </div>
                {/* tab content end */}



              </div>
            </div>

          </div>

          {/* for mobile view start */}




          {/* for mobile view end */}
        </div>
      </div>
      <div className='container search_mv'>
        <div className='card' style={{ boxShadow: "3px 3px 5px 5px gray" }}>
          <input type="text" class="form-control mv_input" placeholder="Search Buyer property" aria-label="Search Buyer property" aria-describedby="button-addon2" />
        </div>
      </div>


    </>

  )
}

export default Search2
