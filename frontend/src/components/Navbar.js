import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/MegaMenu.css';
import menuData from '../data/menuData';
// import Preloader from '../components/Preloader'

function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeTabs, setActiveTabs] = useState({});
  return (
    <>
      {/* <!--Search Popup--> */}
      {/* <Preloader></Preloader> */}
      <div id="search-popup" class="search-popup">
        <div class="popup-inner">
          <div class="upper-box">
            {/* <!-- <figure class="logo-box p_relative z_1"><a href="index.html"><img src="assets/images/logo_6.svg" alt=""></a></figure> --> */}
            <a href="index.html">
              <img src="./images/Indiadealss.svg" height="100%" width="100%" alt="" />
            </a>
            <div class="close-search"><i class="fal fa-times"></i></div>
          </div>
          <div class="overlay-layer"></div>
          <div class="auto-container">
            <div class="search-form">
              <form method="post" action="index.html">
                <div class="form-group">
                  <fieldset>
                    <input type="search" class="form-control" name="search-input" value=""
                      placeholder="Type your keyword and hit" required />
                    <button type="submit"><i class="icon-10"></i></button>
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/* <!-- main header --> */}
      <header class="main-header header-style-two">
        {/* <!-- header-top --> */}
        <div class="header-top">
          <div class="large-container">
            <div class="top-inner">
              <div class="option-block">
                <div class="support-box">
                  <div class="icon-box"><i class="icon-07"></i></div>
                  <a href="tel:912345678">+91-9818752056</a>
                </div>

              </div>

            </div>
          </div>
        </div>
        {/* <!-- header-lower --> */}
        <div class="header-lower">
          <div class="large-container">
            <div class="outer-box">
              {/* <!-- <figure class="logo-box"><a href="index.html"><img src="assets/images/logo_6.svg" alt=""></a></figure> --> */}
              <a href="/"> <img src="./images/Indiadealss.svg" height="100%" width="100%" alt="" />
              </a>
              <div class="menu-area">
                {/* <!--Mobile Navigation Toggler--> */}
                <div class="mobile-nav-toggler">
                  <i class="icon-bar"></i>
                  <i class="icon-bar"></i>
                  <i class="icon-bar"></i>
                </div>
                <div class="container" style={{ padding: "1rem" }}>
                  <nav class="main-menu navbar-expand-md navbar-light clearfix">
                    <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                      <ul class="navigation clearfix">

                        {menuData.map((menu, index) => (
                          <li
                            key={index}
                            class="nav-item dropdown has-megamenu"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            {menu.tabs ? (
                              <span className="nav-link dropdown" role="button">{menu.title}</span>
                            ) : (
                              <Link className="nav-link" to={menu.link}>{menu.title}</Link>
                            )}

                            {menu.tabs && hoveredIndex === index && (
                              <div className="dropdown-menu w-100 p-3 mega-menu">
                                <div className="row">
                                  {/* Tabs */}
                                  <div className="col-md-3 border-end">
                                    <ul className="nav flex-column">
                                      {menu.tabs.map((tab, tabIndex) => (
                                        <li
                                          key={tabIndex}
                                          className={`nav-link ${activeTabs[index] === tab.name || (!activeTabs[index] && tabIndex === 0) ? 'active' : ''}`}
                                          onMouseEnter={() => setActiveTabs({ ...activeTabs, [index]: tab.name })}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          {tab.name}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Tab Content */}
                                  <div className="col-md-9">
                                    {menu.tabs.map((tab, tabIndex) => {
                                      const isActive = activeTabs[index] === tab.name || (!activeTabs[index] && tabIndex === 0);
                                      return (
                                        <div key={tabIndex} className={isActive ? 'd-block' : 'd-none'}>
                                          <h6 className="text-uppercase">{tab.name}</h6>
                                          <ul className="list-unstyled">
                                            {tab.items.map((item, itemIdx) => (
                                              <li key={itemIdx}>
                                                <Link className="dropdown-item" to={item.link}>{item.label}</Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}

                      </ul>


                    </div>

                  </nav>
                </div>

              </div>
              <div class="menu-right-content">
                <div style={{ color: "white", }}><a href="/postproperty">
                  <button type='button' className='btn btn-primary' style={{ width: "200px", marginTop: "0.2rem" }}>Post property</button>
                </a>
                </div>
                <div class="dropdown dropstart">
                  <button data-mdb-button-init
                    data-mdb-ripple-init data-mdb-dropdown-init class="btn dropdown"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "transparent", marginTop: "0.2rem" }}
                  >
                    {/* <i class="fa fa-user" aria-hidden="true" style={{fontSize:"28px",color:"#0d6dfc"}}></i> */}
                    <i class="icon-07" style={{ fontSize: "24px", color: "#0d6dfc" }}></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ padding: "0.5rem" }}>

                    <li class="dropdown-item">
                      <div style={{ display: "flex", width: "max-content" }}>
                        <img src='./images/icon/phone_icon2.jpg' height={"15px"} width={"20px"} />
                        <p style={{ width: "max-content" }}>Tollfree | 9:30 AM - 6:30 PM</p>
                      </div>
                      <div style={{ paddingLeft: "2rem" }}>
                        <p>MONDAY-SUNDAY</p>
                        <p><a href="tel:912345678">1800-12-999001</a></p>
                      </div>

                    </li>

                    <li class="dropdown-item">
                      <div style={{ display: "flex", width: "max-content", marginTop: "1.5rem" }}>
                        <img src='./images/icon/phone_icon2.jpg' height={"15px"} width={"20px"} />
                        <p>For International</p>
                      </div>
                      <p style={{ paddingLeft: "2rem" }} ><a href="tel:912345678">1800-12-999001</a></p>

                    </li>
                    <li>
                      <li >  <div style={{ color: "white", marginTop: "1.5rem", paddingLeft: "3rem" }}><a href="">
                        <button type='button' className='btn btn-primary' style={{ width: "max-content" }}>Request For Call</button>
                      </a>
                      </div></li>
                    </li>

                  </ul>
                </div>



                <div class="dropdown dropstart" style={{ marginRight: "1rem" }}>
                  <button data-mdb-button-init
                    data-mdb-ripple-init data-mdb-dropdown-init class="btn dropdown"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <i class="fa fa-user" aria-hidden="true" style={{ fontSize: "28px", color: "#0d6dfc" }}></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ padding: "1rem", textAlign: "center" }}>
                    <li style={{ color: "#0d6dfc" }}><a class="dropdown-item" href="#">Login/Register</a></li>
                    <li> My Activity
                      <ul>
                        <li> <a class="dropdown-item" href="#"> Recently Searched</a></li>
                        <li> <a class="dropdown-item" href="#"> Recently Viewed</a> </li>
                        <li> <a class="dropdown-item" href="#">Shortlisted</a> </li>
                        <li> <a class="dropdown-item" href="#">Contacted</a> </li>
                        <li><a href="#">Post property</a></li>
                      </ul>
                    </li>

                  </ul>
                </div>

                <span> <i class="fa fa-bars" aria-hidden="true" style={{ fontSize: "30px", color: "#0d6dfc" }}></i> </span>

              </div>
            </div>
          </div>
        </div>

        {/* <!--sticky Header--> */}
        <div class="sticky-header">
          <div class="large-container">
            <div class="outer-box">
              {/* <!-- <figure class="logo-box"><a href="/"><img src="assets/images/logo.png" alt=""/></a></figure> --> */}
              <a href="/"> <img src="./images/Indiadealss.svg" height="100%" width="100%" alt="" />
              </a>
              <div class="menu-area">
                <nav class="main-menu clearfix">
                  {/* <!--Keep This Empty / Menu will come through Javascript--> */}
                  <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                    <ul class="navigation clearfix" style={{ paddingTop: "1rem", marginBottom: "2rem" }}>

                      {menuData.map((menu, index) => (
                        <li
                          key={index}
                          class="nav-item dropdown has-megamenu"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {menu.tabs ? (
                            <span className="nav-link dropdown" role="button">{menu.title}</span>
                          ) : (
                            <Link className="nav-link" to={menu.link}>{menu.title}</Link>
                          )}

                          {menu.tabs && hoveredIndex === index && (
                            <div className="dropdown-menu w-100 p-3 mega-menu">
                              <div className="row">
                                {/* Tabs */}
                                <div className="col-md-3 border-end">
                                  <ul className="nav flex-column">
                                    {menu.tabs.map((tab, tabIndex) => (
                                      <li
                                        key={tabIndex}
                                        className={`nav-link ${activeTabs[index] === tab.name || (!activeTabs[index] && tabIndex === 0) ? 'active' : ''}`}
                                        onMouseEnter={() => setActiveTabs({ ...activeTabs, [index]: tab.name })}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        {tab.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Tab Content */}
                                <div className="col-md-9">
                                  {menu.tabs.map((tab, tabIndex) => {
                                    const isActive = activeTabs[index] === tab.name || (!activeTabs[index] && tabIndex === 0);
                                    return (
                                      <div key={tabIndex} className={isActive ? 'd-block' : 'd-none'}>
                                        <h6 className="text-uppercase">{tab.name}</h6>
                                        <ul className="list-unstyled">
                                          {tab.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                              <Link className="dropdown-item" to={item.link}>{item.label}</Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}




                    </ul>

                  </div>




                </nav>
              </div>
              <div class="menu-right-content">

                <div style={{ color: "white", marginRight: "0.5rem" }}><a href="/postproperty">
                  <button type='button' className='btn btn-primary' style={{ width: "max-content", marginTop: "0.5rem" }}> Post property</button>
                </a>
                </div>
                <div class="dropdown dropstart">
                  <button data-mdb-button-init
                    data-mdb-ripple-init data-mdb-dropdown-init class="btn dropdown"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "transparent", marginTop: "0.3rem" }}
                  >
                    {/* <i class="fa fa-user" aria-hidden="true" style={{fontSize:"28px",color:"#0d6dfc"}}></i> */}
                    <i class="icon-07" style={{ fontSize: "24px", color: "#0d6dfc" }}></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                    <li class="dropdown-item">
                      <div style={{ display: "flex", width: "max-content" }}>
                        <img src='./images/icon/phone_icon2.jpg' height={"20px"} width={"30px"} />
                        <p style={{ width: "max-content" }}>Tollfree | 9:30 AM - 6:30 PM</p>
                      </div>
                      <div style={{ paddingLeft: "2rem" }}>
                        <p>MONDAY-SUNDAY</p>
                        <p><a href="tel:912345678">1800-12-999001</a></p>
                      </div>

                    </li>

                    <li class="dropdown-item">
                      <div style={{ display: "flex", width: "max-content", marginTop: "1.5rem" }}>
                        <img src='./images/icon/phone_icon2.jpg' height={"20px"} width={"30px"} />
                        <p>For International</p>
                      </div>
                      <p style={{ paddingLeft: "2rem" }} ><a href="tel:912345678">1800-12-999001</a></p>

                    </li>
                    <li>
                      <li >  <div style={{ color: "white", marginTop: "1.5rem", paddingLeft: "3rem" }}><a href="">
                        <button type='button' className='btn btn-primary' style={{ width: "max-content" }}>Request For Call</button>
                      </a>
                      </div></li>
                    </li>

                  </ul>
                </div>
                <div class="dropdown dropstart" style={{ marginRight: "1rem" }}>
                  <button data-mdb-button-init
                    data-mdb-ripple-init data-mdb-dropdown-init class="btn dropdown"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <i class="fa fa-user" aria-hidden="true" style={{ fontSize: "28px", color: "#0d6dfc" }}></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ padding: "1rem", textAlign: "center" }}>
                    <li style={{ color: "#0d6dfc" }}><a class="dropdown-item" href="#">Login/Register</a></li>
                    <li> My Activity
                      <ul>
                        <li> <a class="dropdown-item" href="#"> Recently Searched</a></li>
                        <li> <a class="dropdown-item" href="#"> Recently Viewed</a> </li>
                        <li> <a class="dropdown-item" href="#">Shortlisted</a> </li>
                        <li> <a class="dropdown-item" href="#">Contacted</a> </li>
                        <li><a href="#">Post property</a></li>
                      </ul>
                    </li>

                  </ul>
                </div>
                <span> <i class="fa fa-bars" aria-hidden="true" style={{ fontSize: "30px", color: "#0d6dfc" }}></i> </span>

              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- main-header end --> */}


      {/* <!-- Mobile Menu  --> */}
      <div class="mobile-menu">
        <div class="menu-backdrop"></div>
        <div class="close-btn"><i class="fas fa-times"></i></div>
        <nav class="menu-box">
          <div class="nav-logo">
            <a href="/"><img src="./images/Indiadealss.svg" height="100%"
              width="100%" alt="" title="" /></a>
          </div>
          <div class="menu-outer">
            {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
          </div>
          <div class="contact-info">
            <h4>Contact Info</h4>
            <ul>
              <li>Chicago 12, Melborne City, USA</li>
              <li><a href="tel:+8801682648101">+88 01682648101</a></li>
              <li><a href="mailto:info@example.com">info@example.com</a></li>
            </ul>
          </div>
          <div class="social-links">
            <ul class="clearfix">
              <li><a href="/"><span class="fab fa-twitter"></span></a></li>
              <li><a href="/"><span class="fab fa-facebook-square"></span></a></li>
              <li><a href="/"><span class="fab fa-pinterest-p"></span></a></li>
              <li><a href="/"><span class="fab fa-instagram"></span></a></li>
              <li><a href="/"><span class="fab fa-youtube"></span></a></li>
            </ul>
          </div>
        </nav>
      </div>
      {/* <!-- End Mobile Menu --> */}
    </>
  )
}

export default Navbar
