import React from 'react'
import Search_section from './Search_section'

function Header() {
  return (
    <>
     <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style={{paddingLeft:"0px !important", paddingRight:"0px !important"}} >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="./images/banner_1.jpg" class="d-block w-100" alt="..." height={"480px"} />
    </div>
    <div class="carousel-item">
      <img src="./images/banner_2.jpg" class="d-block w-100" alt="..." height={"480px"} />
    </div>
    <div class="carousel-item">
      <img src="./images/banner_3.jpg" class="d-block w-100" alt="..." height={"480px"} />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

  

    </>
    
  )
}

export default Header
