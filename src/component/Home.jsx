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
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-40">
  {/* Left content = 8/12 (≈66.7% ≈ 70%) */}
  <div className="lg:col-span-8 ms-8 space-y-10">
    <Customcardcrousal />
    <Customimagebar />

    <div>
      <Appartmentvill />
      <Card
        style={{
          width: "100%",
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

  {/* Right sidebar = 4/12 (≈33.3% ≈ 30%) */}
  <div className="lg:col-span-4">
    <div className="sticky top-20">
      <Customcard />
    </div>
  </div>
</div>


          
    </div>
  )
}


export default Home;