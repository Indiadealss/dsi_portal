import React from 'react'
import Header3 from '../components/Header3'
import Header4 from '../components/Header4'
import Search_section from '../components/Search_section'
import Search2 from '../components/Search2'
import Home_Component_3 from '../components/Home_Component_3'
import Home_Component_4 from '../components/Home_Component_4'
import Footer from '../components/Footer'
import Slider from '../components/Slider'


function Home() {
  return (
    <>
      <div class="boxed_wrapper ltr">
        <Header4></Header4>
        <Search_section></Search_section>
        <Slider></Slider>
        <Home_Component_3></Home_Component_3>
        <Home_Component_4></Home_Component_4>
        <Footer></Footer>


      </div>
    </>
  )
}

export default Home
