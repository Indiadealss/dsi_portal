import React from 'react';
import { WhatsAppOutlined,ArrowRightOutlined } from "@ant-design/icons";
import { Card, Avatar, Typography } from "antd";
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
import Antdpropertycard from './customantdesign/Antdpropertycard';
import Antdcardcrousal from './customantdesign/Antdcardcrousal';
const Home = () => {

 const handpickherosection = {
  rentHome:[{
    img : "https://picsum.photos/700/450?random=1",
    title:"BUY PLOTS/LAND",
    subtitle:"Residential & Commerical Plots/Land",
    subtitleDesc:"Explore Residential,Agricultural, Industrial and Commerical Plots/Land",
    buttonName:"Explore Plots/Land",
    bannercontenttitle:"Best articles on Plots/land",
    articles : [
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
  ]

  }
  ],
  postPropertyViaWhatsapp:[{
    img : "https://picsum.photos/700/450?random=7",
    title:`Post via  Whatsapp`,
    subtitle:"Sell or rent faster at the right price!",
    subtitleDesc:"List your property now",
    buttonName:"Post Property,It's Free",
    bannercontenttitle:"Articles & guides for property Owners",
    articles : [
    {
      title: "Kolkata Tower Demolition Impact on Buyers",
      date: "Sep 02,2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "No stamp duty on husing plots in Harya",
      date: "Aug 28,2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
  ]

  }
  ]

 }

  const  crousalData = [
    {image:"https://picsum.photos/830/464?random=1"},
    {image:"https://picsum.photos/830/464?random=2"},
    {image:"https://picsum.photos/830/464?random=3"},
    {image:"https://picsum.photos/830/464?random=4"},
    {image:"https://picsum.photos/830/464?random=5"},
  ]
  return (
    <div className='mb-10'>
      <div>
        <div className='relative'>
          <Banner image={banner} />
          <div className='block lg:absolute   top-[88%] object-cover w-[-webkit-fill-available]'>
            <Searchbox />
          </div>
        </div>
      </div>
      <div className="  grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 lg:mt-40 lg:hidden w-full max-w-[1440px] mx-auto">
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
      <div className='hidden lg:block  mt-40 w-full homeContainer max-w-[1265px] mx-auto'>
        <Smallmain />
        <div style={{ padding: "40px" }}>
          <p className='text-center text-xs font-bold text-gray-400'>ALL PROPERTY NEEDS - ONE PORTAL</p>
          <h1 className='text-center font-bold text-black text-xl my-3'>Find Better Places to Live, Work<br /> and Wonder...</h1>
          <Dreamherosection />
        </div>
        <Card
          style={{
            width: "90%",
            margin: "auto",
            borderRadius: 12,
            background: "#0019432b",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Newlaunchcard colu={2} />
        </Card>
        

          <div style={{ padding: "40px" }}>
          <h2 className=' font-bold text-black text-xl '>Handpicked Residential Projects</h2>
          <p className=' text-xs font-medium text-gray-300 mb-3'>Featured Residential projects across India</p>
        <div className="flex justify-evenly w-[85%] ">
      <Antdpropertycard
        image="https://picsum.photos/500/450?random=1"
        logo="https://picsum.photos/100/100?random=1"
        title="Bricks Marvella"
        description="2,3,4 BHK Apartment, Tellapur, Hyderabad"
        price="₹ 99.71 Lacs - 2.58 Cr"
        featured
      />
      <Antdpropertycard
        image="https://picsum.photos/500/450?random=1"
        logo="https://picsum.photos/100/100?random=1"
        title="Rishi Coral Wood Bungalows"
        description="4,5 BHK Independent House/Villa, Hoshangabad Road, Bhopal"
        price="₹ 1.95 Cr"
        featured
      />
    </div>
    </div>
    <div style={{ padding: "40px",marginTop:"60px" }}>
          <h2 className=' font-bold text-black text-xl '>Upcoming Projects</h2>
          <p className=' text-xs font-medium text-gray-300 mb-3'>Visit these projects and get early bird benefits</p>
            <Antdcardcrousal  crousal={crousalData}/>
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Dreamherosection />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Handpickherosection content={handpickherosection.rentHome} />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Handpickherosection content={handpickherosection.postPropertyViaWhatsapp} />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          <h2>Our Services for owners</h2>
          <p>Make your life easier with our service</p>
        </div>
      </div>
    </div>
  )
}


export default Home;