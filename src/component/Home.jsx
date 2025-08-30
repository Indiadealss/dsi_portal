import React from 'react';
import { Card,Avatar, Typography } from "antd";
import banner from '../Images/1366-banner-1.jpg';
import Banner from './customcomponent/Banner';
import Searchbox from './customcomponent/Searchbox';
import Customcardcrousal from './customantdesign/Customcardcrousal';
import Customimagebar from './customantdesign/Customimagebar';
import Customcard from './customantdesign/Customcard';
import { Button } from "antd";
import Appartmentvill from './customantdesign/Appartmentvill';
import Antdcrousal from './customantdesign/Antdcrousal';
import Newlaunchcard from './customcomponent/Newlaunchcard';
import Dreamherosection from './customantdesign/Dreamherosection';
import Smallmain from './customantdesign/Smallmain';
import Handpickherosection from './customantdesign/Handpickherosection';
const Home = () => {
  return (
    <div className='mb-10'>
      <div>
        <div className='relative'>
          <Banner image={banner} />
          <div className='block lg:absolute top  top-50 object-cover w-[-webkit-fill-available]'>
            <Searchbox />
          </div>
        </div>
      </div>
     <div className="  grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 lg:mt-40 lg:hidden">
  {/* Left content = 8/12 (≈66.7% ≈ 70%) */}
  <div className="lg:col-span-8 ms-3 space-y-10">
    <Customcardcrousal />
    <Customimagebar />

    <div>
      <Appartmentvill />
      <Card
        style={{
          width: "98%",
          borderRadius: 12,
          background: "#0019432b",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Newlaunchcard colu={2} />
      </Card>
    </div>
  </div>

  {/* Right sidebar = 4/12 (≈33.3% ≈ 30%) */}
  <div className="lg:col-span-4">
    <div className="sticky top-20 right-0 left-10">
      <Customcard />
    </div>
  </div>
</div>
<div className='hidden lg:block ms-3  mt-40'>
  <Smallmain />
  <div style={{ padding: "40px" }}>
  <p className='text-center text-xs font-bold text-gray-400'>ALL PROPERTY NEEDS - ONE PORTAL</p>
  <h1 className='text-center font-bold text-black text-xl my-3'>Find Better Places to Live, Work<br/> and Wonder...</h1>
<Dreamherosection />
</div>
<Card
        style={{
          width: "90%",
          margin:"auto",
          borderRadius: 12,
          background: "#0019432b",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Newlaunchcard colu={3} />
      </Card>
      <div style={{ padding: "40px" }}>
  <h3 className=' font-bold text-black text-xl '>Handpicked Residential Projects</h3>
  <p className=' text-xs font-bold text-gray-400 mb-3'>Handpicked Residential Projects</p>
< Handpickherosection />
</div>
          </div>
    </div>
  )
}


export default Home;