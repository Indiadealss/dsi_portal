import React from 'react'

function Header4() {
  return (
    <>
      {/* <!-- banner-section --> */}
      <section class="banner-section banner-style-two p_relative">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style={{ paddingLeft: "0px !important", paddingRight: "0px !important" }} >
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="./images/banner_1.jpg" class="d-block w-100 img_mv" alt="..." style={{ height: "480px" }} />
            </div>
            <div class="carousel-item">
              <img src="./images/banner_2.jpg" class="d-block w-100 img_mv" alt="..." style={{ height: "480px" }} />
            </div>
            <div class="carousel-item">
              <img src="./images/banner_3.jpg" class="d-block w-100 img_mv" alt="..." style={{ height: "480px" }} />
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
      </section>
      {/* <!-- banner-section end --> */}

      {/* <!--Scroll to top--> */}
      <div class="scroll-to-top">
        <svg class="scroll-top-inner" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>



    </>
  )
}

export default Header4
