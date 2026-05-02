import React, { useEffect, useState } from "react";
import banner from '../../Images/irishPlatinumBanner.jpg';
import irislogo from '../../Images/irishLogo.png'
import IrishLogo from '../../Images/Irish-Logo.png'
import { Phone, MessageCircle, Image } from 'lucide-react';
import Customenquiryform from "../customcomponent/Customenquiryform.jsx";
import ContactSection from "../ContactSection.jsx";
import Seo from "../Seo.jsx";
import { Landmark } from 'lucide-react';
import sbi from '../../Images/sbi.png';
import uno from '../../Images/uno.png';
import centralLogo from '../../Images/central-bank-of-india-logo-vector.png';
import icici from '../../Images/icici.jpeg';
import irishPlatinumgall from '../../Images/irishPlatinumgall-3.jpg';
import irishPlatinumSportsArea from '../../Images/irishPlatinumSportsArea.jpeg';
import irishPlatinumgalls from '../../Images/irishPlatinumgall-2.jpg';
import irishPlatinumQuestion from '../../Images/irishPlatinumQuestion.jpg';
import Dayview from '../../Images/DayView.png';
import { Tag, Home, Building2 } from 'lucide-react';
import { Bed, Utensils, Sofa, DoorOpen, Paintbrush } from 'lucide-react';
import PropertyCardFloorplan from "./PropertyCardFloorplan.jsx";
import floorPlan1 from "../../Images/1390.jpeg";
import floorPlan2 from "../../Images/1690.jpeg";
import floorPlan3 from "../../Images/1925.jpeg";
import floorPlan4 from "../../Images/2150.jpeg";
import floorPlan5 from "../../Images/2550.jpeg";


const Irishplatinum = () => {

     const [customEnquiry, setCustomEnquiry] = useState(false);
      const [propertys, setPropertys] = useState(null)

      const banksAvailable = [
        {name:'SBI',logo:sbi},
        {name:'ICICI',logo:icici},
        {name:'central',logo:centralLogo},
      ]

        useEffect(() => {
            setPropertys({
        _id:'69c0104cd245c44e5d487a7f',
        projectname:'IRISH PLATINUM'
      })
        const timer = setTimeout(() => {
          setCustomEnquiry(true);
        }, 3000); // 5 seconds
      
        return () => clearTimeout(timer); // cleanup
      }, []);


     const floorPlans = [
  {
    id: 1,
    title: "3 BHK +  2T",
    size: "1390 - 1925 SQ. FT.",
    features: "Low-density premium tower",
    imageUrl: floorPlan1
  },
  {
    id: 2,
    title: "3 BHK + 3T",
    size: "1390 - 1925 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: floorPlan2
  },
  {
    id: 3,
    title: "3 BHK + 3T + SQ",
    size: "1390 - 1925 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: floorPlan3
  },
  {
    id: 4,
    title: "4 BHK + 4T",
    size: "2125 - 2550 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: floorPlan3
  },
  {
    id: 5,
    title: "4 BHK + 4T",
    size: "2125 - 2550 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: floorPlan4
  },
];

      const specs = [
        {
          title: "Master Bedroom",
          detail: "Laminated wooden flooring",
          icon: Bed,
        },
        {
          title: "Bedrooms",
          detail: "Vitrified tile flooring",
          icon: Bed,
        },
        {
          title: "Kitchen",
          detail: "Anti-skid vitrified tile flooring",
          icon: Utensils,
        },
        {
          title: "Living & Dining",
          detail: "Vitrified tile flooring",
          icon: Sofa,
        },
        {
          title: "Balcony",
          detail: "Anti-skid vitrified flooring",
          icon: DoorOpen,
        },
        {
          title: "External Finish",
          detail: "Quartz reinforced textured paint",
          icon: Paintbrush,
        },
      ];
      
      
      const amenities = [
        {
          title: "Infinity Pool & Jacuzzi",
          description: "Experience world-class leisure with infinity pool, jacuzzi, floating cabana, and lily pond for ultimate relaxation.",
          image: irishPlatinumgall, // Replace with your image paths
        },
        {
          title: "Sports Arena",
          description: "Stay active with lawn tennis, badminton, basketball, skating rink, and box cricket facilities.",
          image: irishPlatinumSportsArea,
        },
        {
          title: "Wellness & Gardens",
          description: "Rejuvenate in reflexology, butterfly, theme & urban gardens with dedicated wellness and meditation zones.",
          image: irishPlatinumgalls,
        }
      ];
      
      const highlights = [
        { text: "11 ft high ceilings", sub: " offering enhanced space and luxury feel" },
        { text: "8 ft wide balconies", sub: "enjoy a terrace-like experience" },
        { text: "MI-VAN Construction", sub: "" },
        { text: "Low-Density Living", sub: "with Park Facing & Road Facing Units" },
        { text: "High Rise Apartments", sub: "up to 29 Floors" },
      ];

 
        
  return (
    <div>
         <Seo
              title='Irish Platinum Sector 10 Greater Noida West'
              description=" Irish Platinum offers 3bhk and 4bhk premium apartments located at  Sector 10 Greater Noida West."
              canonical={`https://www.brandsdoor.in/irish-platinum`}
            />
      <section className="relative h-[90vh] min-h-[700px] w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img draggable="false"
          src={banner} // Replace with your image path
          fill
          className="object-cover h-[-webkit-fill-available] lg:h-auto w-[-webkit-fill-available]"
          priority
          alt="Irish Platinum"
        />
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col items-center">
            <div className="w-22 h-12 bg-white rounded-full p-2  flex items-center justify-center mb-1">
                <img draggable="false"
          src={IrishLogo} // Replace with your image path
          fill
          className="object-cover"
          priority
          alt="Irish Platinum"
        />
            </div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-10 text-right hidden md:block">
        <div className="w-42 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src={irislogo} // Replace with your image path
          fill
          className="object-cover"
          priority
          alt="Irish Platinum"
        />
            </div>
        <p className=" opacity-80 uppercase tracking-tighter">+91 9818764200</p>
        
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-5xl space-y-4">
        <h1 className="text-5xl text-white md:text-7xl font-bold tracking-tight drop-shadow-lg">
          <span className="text-white">Luxury 3 & 4 BHK Apartments</span>
        </h1>
        
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wider text-gray-100">
            <span className="text-white">IRISH PLATINUM</span>
          </h2>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
            4 TH TOWER | GREATER NOIDA WEST
          </p>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
          RERA APPROVED :- UPRERAPRJ503189/03/2024
          </p>
        </div>

        <div className="py-2">
          <p className="text-lg md:text-2xl font-bold">
            Starting Price – ₹ 2.60 Cr*
          </p>
          <p className="text-xs md:text-sm font-medium opacity-90 mt-2 flex flex-wrap justify-center gap-x-4">
            <span>Best Luxury Flats</span>
            <span>|</span>
            <span>Mivan Construction</span>
            <span>|</span>
            <span>Premium Lifestyle</span>
            <span>|</span>
            <span>High ROI Investment</span>
          </p>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button onClick={() => setCustomEnquiry(true)} className="bg-gradient-to-r from-[#7a553a] to-[#a3836a] hover:scale-105 transition-transform px-10 py-4 rounded-full font-bold text-sm uppercase shadow-xl cursor-pointer">
            Book Site Tour
          </button>
          <button onClick={() => setCustomEnquiry(true)} className="border-2 border-white/80 backdrop-blur-sm hover:scale-105  transition-all px-10 py-4 rounded-full font-bold text-sm uppercase cursor-pointer">
            Explore
          </button>
        </div>
      </div>

    </section>
    <section className="bg-[#0f172a] pt-20 ">
          <div className="max-w-7xl mx-auto  px-4 text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-serif mb-4">
              Discover Premium Living
            </h2>
            <div className="w-24 h-1 bg-white mx-auto relative">
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-[#0f172a]" />
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto  px-4 py-20">
            {amenities.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#1e293b]/50 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#1e293b] hover:-translate-y-2 group"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                  <img draggable="false"
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover w-[-webkit-fill-available] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
    
                {/* Text Content */}
                <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>
    
                {/* Gradient Button */}
                <button onClick={() => setCustomEnquiry(true)} className="bg-gradient-to-r from-[#7a553a] to-[#a3836a] text-white px-8 py-2 rounded font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Learn More
                </button>
              </div>
            ))}
          </div>
    
          <section className="py-20 bg-white">  
          <div className="max-w-7xl mx-auto  px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-6">
                Why Irish Platinum is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for Ultra luxury apartments in Greater Noida West with premium amenities and high appreciation?
              </p>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Irish Platinum</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Irish Platinum in Sector 10, Greater Noida West, is an emerging residential project that brings together modern architecture, thoughtful design, and a comfortable lifestyle. Designed for urban families seeking both luxury and convenience, this development offers a perfect blend of elegance and practicality. With its strategic location and high-quality construction, Irish Platinum is quickly becoming a preferred choice among homebuyers and investors.
                  </p>
                  
                </div>
    
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-[#0f172a]">Project Highlights</h4>
                  <ul className="space-y-4">
                    {highlights.map((item, index) => (
                      <li key={index} className="flex flex-col">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-[#0f172a] min-w-max">
                            {item.text}
                          </span>
                          {item.sub && (
                            <span className="text-gray-500 font-normal">
                              {item.sub}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
    
              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[400px] md:h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src={irishPlatinumQuestion}
        alt="Tower T-10 Gold Render"
        // 'object-contain' puri image dikhayega, bina crop kiye.
        // 'object-bottom' building ko neeche se align karega taaki neeche khali jagah na dikhe.
        className="w-full h-full object-contain object-bottom"
      />
              </div>
            </div>
          </div>
          </section>
    
    
    
          <section className="bg-[#fdf2f0] py-16 px-6">
    
            <h2 className='font-serif text-center py-10'>The Finest Address—Now at Its Finest Price</h2>
            <div className='text-center mx-auto lg:w-140 pb-5'>
            <p className=' text-center'><span className='text-xl'>Developed by IRISH Group</span></p>
            </div>
          <div className="max-w-7xl mx-auto  px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side: High-Resolution Render */}
            <div className="relative h-[500px] lg:h-[650px] w-full overflow-hidden shadow-xl">
              <img draggable="false"
        src={Dayview}
        alt="Tower T-10 Gold Render"
        // 'object-contain' puri image dikhayega, bina crop kiye.
        // 'object-bottom' building ko neeche se align karega taaki neeche khali jagah na dikhe.
        className="w-[-webkit-fill-available] h-full object-contain object-bottom"
      />
            </div>
    
            {/* Right Side: Information Data */}
            <div className="space-y-12 py-4">
              
              {/* Section 1: Pricing */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#b08d57] font-bold">
                  <Tag size={20} />
                  <span className="uppercase tracking-widest text-sm"> Pricing</span>
                </div>
                <hr className="border-gray-300" />
                <div className="space-y-2 pt-2">
                    <p className="text-[#333] text-lg font-bold">Starting Price: <span className="text-[#b08d57]">₹2.60 Cr*</span></p>
                  <p className="text-[#333] text-lg font-bold">Booking Amount: <span className="font-normal text-gray-600 text-base">10% of the total value</span></p>
                </div>
              </div>
    
              {/* Section 2: Configurations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#b08d57] font-bold">
                  <Home size={20} />
                  <span className="uppercase tracking-widest text-sm">Configurations</span>
                </div>
                <hr className="border-gray-300" />
                <div className="space-y-3 pt-2">
                    <p className="text-[#333] font-bold">3 BHK + 2 Toilets: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1390 sq ft</span>
                  </p>
                    <p className="text-[#333] font-bold">3 BHK + 3 Toilets: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1690 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">3 BHK + 4 Toilets + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1925 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">4 BHK  + 4 Toilets: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2150 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">4 BHK  + 5 Toilets + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2550 sq ft</span>
                  </p>
                  
                </div>
              </div>
    
              {/* Section 3: Tower Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#b08d57] font-bold">
                  <Building2 size={20} />
                  <span className="uppercase tracking-widest text-sm">Tower Details</span>
                </div>
                <hr className="border-gray-300" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 pt-2">
                  <p className="text-[#333] font-bold">Tower: <span className="font-normal text-gray-600">T-4 | G+29 floors (1st to 29th)</span></p>
                  <p className="text-[#333] font-bold">Per Floor: <span className="font-normal text-gray-600"> 6 unit per floor in 3 BHK Tower & 4 unit per floor in 4 BHK </span></p>
                  <p className="text-[#333] font-bold">Lifts: <span className="font-normal text-gray-600">3 High-Speed Lifts</span></p>
                  <p className="text-[#333] font-bold">Type: <span className="font-normal text-gray-600">Low-density premium tower</span></p>
                </div>
              </div>
    
            </div>
          </div>
        </section>
    
    
        <section className="py-20 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto  px-4">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-4">
                Tower Specifications
              </h2>
              <p className="text-gray-500 font-medium">
                Premium finishes and world-class construction standards
              </p>
            </div>
    
            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specs.map((spec, index) => (
                <div 
                  key={index} 
                  className="bg-white p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col items-center text-center border-t-4 cursor-default border-[#b08d57] hover:border-[#b08d57] transition-all duration-300 group"
                >
                  {/* Icon with Gold Accent */}
                  <div className="mb-6 text-[#b08d57] transition-transform duration-300 group-hover:scale-110">
                    <spec.icon size={48} strokeWidth={1.5} />
                  </div>
    
                  {/* Text Content */}
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">
                    {spec.title}
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {spec.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
    
    
    
        </section>
    <div className="mx-auto bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 transition-all hover:shadow-lg max-w-4xl">
      {/* Header Section */}
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0f172a] text-center mb-10">
        All Bank Finance Available
      </h3>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
        {banksAvailable.map((bank, index) => (
          <div key={index} className=" flex flex-col items-center gap-3">
            <div className="relative w-32 h-16  filter ">
              <img draggable="false"
                src={bank.logo}
                alt={`${bank.name} logo`}
                fill
                className="object-contain" // Ensures logos aren't stretched
              />
            </div>
            {/* <span className="text-xs font-bold ">
              {bank.name}
            </span> */}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-400 text-sm mt-8 border-t pt-8 border-gray-50">
        & many other leading financial institutions
      </p>
    </div>

    <div className="bg-[#0f172a] min-h-screen p-10">
      <h1 className="text-white text-3xl mb-10 text-center font-serif">Floor Plan Options</h1>
      
      {/* Grid wrapper to handle multiple cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
        {floorPlans.map((plan) => (
          <PropertyCardFloorplan 
            key={plan.id} // Important for React performance
            title={plan.title}
            size={plan.size}
            features={plan.features}
            imageUrl={plan.imageUrl}
            setCustomEnquiry={setCustomEnquiry}
          />
        ))}
      </div>
    </div>


    <ContactSection />
    {customEnquiry && (
            <div>
              <Customenquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} />
            </div>
          )}
    </div>
  )
}

export default Irishplatinum
