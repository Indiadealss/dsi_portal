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
const Home = () => {
  return (
    <div className='mb-10'>
      <div>
        <div className='relative'>
          <Banner image={banner} />
          <div className='block lg:absolute  top-50 object-cover w-[-webkit-fill-available]'>
            <Searchbox />
          </div>
        </div>
      </div>
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mt-10 lg:mt-40">
  {/* Left side (2 cols wide) */}
  <div className="lg:col-span-2 space-y-10 ms-8">
    {/* Row 1 content */}
    <Customcardcrousal />
    <Customimagebar />

    {/* Row 2 full width but still inside left column */}
    <div>
      <Appartmentvill />
      <Card
        style={{
          width: "97%",
          borderRadius: 12,
          background: "#0019432b",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Newlaunchcard />
      </Card>
    </div>
  </div>

  {/* Right side sticky (sidebar spans both rows) */}
  <div className="hidden lg:block lg:col-span-1">
    <div className="sticky top-20">
      <Customcard />
    </div>
  </div>
</div>

          
    </div>
  )
}


export default Home;