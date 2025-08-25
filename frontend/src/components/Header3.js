import React from 'react'

function Header3() {
  return (
   <>
     <div class="boxed_wrapper ltr">


        {/* <!-- preloader --> */}
        <div class="loader-wrap">
            <div class="preloader">
                <div class="preloader-close"><i class="fal fa-times"></i></div>
                <div id="handle-preloader" class="handle-preloader">
                    <div class="animation-preloader">
                        <div class="spinner"></div>
                       <div class="txt-loading">
                            <span data-text-preloader="I" class="letters-loading">
                                I
                            </span>
                            <span data-text-preloader="N" class="letters-loading">
                                N
                            </span>
                            <span data-text-preloader="D" class="letters-loading">
                                D
                            </span>
                            <span data-text-preloader="I" class="letters-loading">
                                I
                            </span>
                            <span data-text-preloader="A" class="letters-loading">
                                A
                            </span>
                            <span data-text-preloader="D" class="letters-loading">
                                D
                            </span>
                            <span data-text-preloader="E" class="letters-loading">
                                E
                            </span>
                            <span data-text-preloader="A" class="letters-loading">
                                A
                            </span>
                              <span data-text-preloader="L" class="letters-loading">
                                L
                            </span>
                              <span data-text-preloader="S" class="letters-loading">
                                S
                            </span>
                              <span data-text-preloader="S" class="letters-loading">
                                S
                            </span>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- preloader end --> */}


        {/* <!-- page-direction --> */}
      {/* <!-- <div class="page_direction">
            <div class="demo-rtl direction_switch"><button class="rtl">RTL</button></div>
            <div class="demo-ltr direction_switch"><button class="ltr">LTR</button></div>
        </div> --> */}
        {/* <!-- page-direction end --> */}


        {/* <!--Search Popup--> */}
        <div id="search-popup" class="search-popup">
            <div class="popup-inner">
                <div class="upper-box">
                    {/* <!-- <figure class="logo-box p_relative z_1"><a href="index.html"><img src="assets/images/logo_6.svg" alt=""></a></figure> --> */}
                    <a href="index.html"> <img src="assets/images/logo_6.svg" height="80px" width="100px" alt="" /> </a>
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
                                <a href="tel:912345678">91 2345 678</a>
                            </div>
                            <div class="language-picker js-language-picker ml_40" data-trigger-class="btn btn--subtle">
                                <form action="index.html" class="language-picker__form">
                                    <label for="language-picker-select">Select your language</label>
                                    <select name="language-picker-select" id="language-picker-select">
                                        <option lang="de" value="deutsch"></option>
                                        <option lang="en" value="english" selected></option>
                                        <option lang="fr" value="francais"></option>
                                        <option lang="it" value="italiano"></option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <ul class="info-list clearfix">
                            <li><i class="icon-28"></i><span>£20 Discount</span> & Get 24/7 Free Assistance</li>
                            <li><i class="icon-27"></i>Free Trading Guides</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!-- header-lower --> */}
            <div class="header-lower">
                <div class="large-container">
                    <div class="outer-box">
                        {/* <!-- <figure class="logo-box"><a href="index.html"><img src="assets/images/logo_6.svg" alt=""></a></figure> --> */}
                        <a href="index.html"> <img src="assets/images/logo_6.svg" height="80px" width="100px" alt=""/>
                        </a>
                        <div class="menu-area">
                            {/* <!--Mobile Navigation Toggler--> */}
                            <div class="mobile-nav-toggler">
                                <i class="icon-bar"></i>
                                <i class="icon-bar"></i>
                                <i class="icon-bar"></i>
                            </div>
                            <div class="container">
                                {/* <style>
                                    h6{
                                        color: gray;
                                    }
                                </style> */}
                                 <nav class="main-menu navbar-expand-md navbar-light clearfix">
                                <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <ul class="navigation clearfix">
                                        <li class="current dropdown"><a href="index.html">Home</a>
                                        </li>

                                        <li class="dropdown"><a href="about.html">About Us</a>
                                        </li>

                                      
                                        <li class="nav-item dropdown has-megamenu">
                                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                                Trading </a>
                                            <div class="dropdown-menu megamenu" role="menu">
                                                <div class="row g-3">
                                                    <div class="col-lg-4 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6>Products</h6>
                                                            <ul>
                                                                <li><a href="forex.html">Forex</a></li>
                                                                <li><a href="crypto.html">Crypto</a></li>
                                                                <li><a href="metals.html">Metals</a></li>
                                                                <li><a href="indices.html">Indices</a></li>
                                                                <li><a href="energies.html">Energies</a></li>
                                                            </ul>
                                                        </div> 
                                                    </div>
                                                    <div class="col-lg-4 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6>Account</h6>
                                                            <ul>
                                                                <li><a href="account_type.html">Account Types</a></li>
                                                                <li><a href="corporate_account.html">Corporate
                                                                        Account</a></li>
                                                                <li><a href="enc_xl_account.html">ECN XL Account</a>
                                                                </li>
                                                                <li><a href="deposit_methods.html">Deposit Methods</a>
                                                                </li>
                                                            </ul>
                                                        </div> 
                                                    </div>
                                                    <div class="col-lg-4 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6 class="title">Forex Tools</h6>
                                                            <ul>
                                                                <li><a href="forex_calculator.html">Forex
                                                                        Calculators</a></li>
                                                                <li><a href="forex_market_hours.html">Forex Market
                                                                        Hours</a></li>
                                                                <li><a href="forex_live_quotes.html">Forex Live
                                                                        Quotes</a></li>


                                                            </ul>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div> 
                                        </li>
                                       
                                        <li class="nav-item dropdown has-megamenu">
                                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                                Platform </a>
                                            <div class="dropdown-menu megamenu" role="menu">
                                                <div class="row g-3">
                                                    <div class="col-lg-4 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6>Metatrader 4</h6>
                                                            <ul>
                                                                <li><a href="mt4_pc.html">MT4 for PC</a></li>
                                                                <li><a href="mt4_mac.html">MT4 for Mac</a></li>
                                                                <li><a href="mt4_ios.html">MT4 for iOS</a></li>
                                                                <li><a href="mt4_android.html">MT4 for Android</a></li>
                                                            </ul>
                                                        </div> 
                                                    </div>

                                                    <div class="col-lg-4 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6>Metatrader 5</h6>
                                                            <ul>
                                                                <li><a href="mt5_pc.html">MT5 for PC</a></li>
                                                                <li><a href="mt5_mac.html">MT5 for Mac</a></li>
                                                                <li><a href="mt5_ios.html">MT5 for iOS</a></li>
                                                                <li><a href="mt5_android.html">MT5 for Android</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>


                                                    <div class="col-lg-4 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6>WEBTRADER</h6>

                                                            <ul>
                                                                <li><a href="mt4_web_trading.html">MT4 Web trading</a>
                                                                </li>
                                                                <li><a href="mt5_web_trading.html">MT5 Web trading</a>
                                                                </li>



                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>



                                        {/* <!-- platform End --> */}

                                        <li class="nav-item dropdown has-megamenu">
                                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                                Forex Offers </a>
                                            <div class="dropdown-menu megamenu" role="menu">
                                                <div class="row g-3">
                                                    <div class="col-lg-12 col-sm-12">
                                                        <div class="col-megamenu">
                                                            <h6>Forex Offers Overview</h6>
                                                            <ul>
                                                                <li><a href="enc_xl_account.html">ECN XL Account</a>
                                                                </li>
                                                                <li><a href="free_vps.html">Free VPS</a></li>
                                                                <li><a href="bonus.html">100% First Deposit Bonus</a>
                                                                </li>

                                                            </ul>
                                                        </div> 
                                                    </div>

                                                </div>
                                            </div> 
                                        </li>











{/* 
                                        <!-- forex Offers --> */}



                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </div>
                            </nav>
                            </div>
                           
                        </div>
                        <div class="menu-right-content">
                            <div class="search-btn mr_25"><button class="search-toggler"><i
                                        class="icon-10"></i></button></div>
                            <div class="btn-box"><a href="index.html" class="theme-btn btn-one">Open Account</a></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--sticky Header--> */}
            <div class="sticky-header">
                <div class="large-container">
                    <div class="outer-box">
                        {/* <!-- <figure class="logo-box"><a href="index.html"><img src="assets/images/logo.png" alt=""/></a></figure> --> */}
                        <a href="index.html"> <img src="assets/images/logo_6.svg" height="80px" width="100px" alt=""/>
                        </a>
                        <div class="menu-area">
                            <nav class="main-menu clearfix">
                                {/* <!--Keep This Empty / Menu will come through Javascript--> */}
                            </nav>
                        </div>
                        <div class="menu-right-content">
                            <div class="search-btn mr_25"><button class="search-toggler"><i
                                        class="icon-10"></i></button></div>
                            <div class="btn-box"><a href="index.html" class="theme-btn btn-one">Open Account</a></div>
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
                    <a href="index.html"><img src="assets/images/logo_10.jpeg" height="100%"
                            width="100%" alt="" title=""/></a>
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
                        <li><a href="index.html"><span class="fab fa-twitter"></span></a></li>
                        <li><a href="index.html"><span class="fab fa-facebook-square"></span></a></li>
                        <li><a href="index.html"><span class="fab fa-pinterest-p"></span></a></li>
                        <li><a href="index.html"><span class="fab fa-instagram"></span></a></li>
                        <li><a href="index.html"><span class="fab fa-youtube"></span></a></li>
                    </ul>
                </div>
            </nav>
        </div>
        {/* <!-- End Mobile Menu --> */}
        </div>
   </>
  )
}

export default Header3
