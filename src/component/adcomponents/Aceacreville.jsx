import React, { useEffect, useState } from "react";
import aceestatelogo from '../../Images/aceestatelogo.png'
import AceEstatteLogo from '../../Images/AceEstatteLogo.png'
import { Phone, MessageCircle, Image } from 'lucide-react';
import Customenquiryform from "../customcomponent/Customenquiryform.jsx";
import ContactSection from "../ContactSection.jsx";
import Seo from "../Seo.jsx";
import { Landmark } from 'lucide-react';
import sbi from '../../Images/sbi.png';
import uno from '../../Images/uno.png';
import centralLogo from '../../Images/central-bank-of-india-logo-vector.png';
import icici from '../../Images/icici.jpeg';
import { Tag, Home, Building2 } from 'lucide-react';
import { Bed, Utensils, Sofa, DoorOpen, Paintbrush } from 'lucide-react';
import PropertyPlotsSizes from "./PropertyPlotsSizes.jsx";


const Aceacreville = () => {

     const [customEnquiry, setCustomEnquiry] = useState(false);
      const [propertys, setPropertys] = useState(null);


      const Plotsamenities = [
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/Ace_Acreville_2.png',
    label: 'Lawn Tennis Court',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/Ace_Acreville_1.png',
    label: 'Cricket Pitch',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/Ace_Acreville_3.png',
    label: 'Pet Area',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/Ace_Acreville_4.png',
    label: 'Golf Cart Stations',
  },
];

const gymAmenities = [
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/Ace_Acreville_8.png',
    label: 'Outdoor Badminton',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/Ace_Acreville_7.png',
    label: 'Barbeque Station',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceestate/Ace32@3x(61).png',
    label: 'ENCHANTING SQUASH COURT',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceestate/Ace32@3x(60).png',
    label: 'BADMINTON COURT',
  },
];

      const banksAvailable = [
        {name:'SBI',logo:sbi},
        {name:'ICICI',logo:icici},
        {name:'central',logo:centralLogo},
      ]


      const galleryImages = [
  'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/4.jpg',
  'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/3.jpg',
  'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/2.jpg',
];
        useEffect(() => {
            setPropertys({
        _id:'69e0a802c093dd90d6151b11',
        projectname:'Ace Acreville'
      })
        const timer = setTimeout(() => {
          setCustomEnquiry(true);
        }, 3000); // 5 seconds
      
        return () => clearTimeout(timer); // cleanup
      }, []);


     const floorPlans = [
  {
    id: 1,
    title: "2.25 Cr",
    size: "150 SQ.YD.",
    features: "",
    imageUrl: ''
  },
  {
    id: 2,
    title: "3.0 Cr",
    size: "200 SQ.YD.",
    features: "",
    imageUrl: ''
  },
  {
    id: 3,
    title: "4.5 Cr",
    size: "300 SQ.YD.",
    features: "",
    imageUrl: ''
  },
  {
    id: 4,
    title: "7.5 Cr",
    size: "500 SQ.YD",
    features: "",
    imageUrl: ''
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
          image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/9.jpg', // Replace with your image paths
        },
        {
          title: "Sports Arena",
          description: "Stay active with lawn tennis, badminton, basketball, skating rink, and box cricket facilities.",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/12.jpg',
        },
        {
          title: "Wellness & Gardens",
          description: "Rejuvenate in reflexology, butterfly, theme & urban gardens with dedicated wellness and meditation zones.",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/11.jpg',
        }
      ];
      
      const highlights = [
        { text: "11 ft high ceilings", sub: " offering enhanced space and luxury feel" },
        { text: "8 ft wide balconies", sub: "enjoy a terrace-like experience" },
        { text: "MI-VAN Construction", sub: "" },
        { text: "Low-Density Living", sub: "with Park Facing & Road Facing Units" },
        { text: "High Rise Apartments", sub: "up to 30 Floors" },
      ];

 
        
  return (
    <div>
         <Seo
              title='ACE ESTAEE ACE sector 22D Yamuna Expressway'
              description=""
              canonical={`https://www.brandsdoor.in/ace-estate`}
            />
      <section className="relative h-[90vh] min-h-[700px] w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/7.jpg' // Replace with your image path
          fill
          className="object-cover h-[-webkit-fill-available]  w-[-webkit-fill-available]"
          priority
          alt="Ace Acreville"
        />
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col items-center">
            <div className="w-42 h-12  rounded px-1  flex items-center justify-center mb-1 ">
                <img draggable="false"
          src={AceEstatteLogo} // Replace with your image path
          fill
          className="object-cover"
          priority
          alt="ACE"
        />
            </div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-10 text-right hidden md:block">
        <div className="w-42 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/ace_acrevilleLogo@3x2w.png' // Replace with your image path
          fill
          className="object-cover rounded-xl x-3 "
          priority
          alt="Ace Acreville"
        />
            </div>
        
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-5xl space-y-4">
        <h1 className="text-5xl text-white md:text-7xl font-bold tracking-tight drop-shadow-lg">
          <span className="text-white">Build Your Dream on Luxury Plots</span>
        </h1>
        
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wider text-gray-100">
            <span className="text-white">Ace Acreville</span>
          </h2>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
            Sector 22D, Yamuna Expressway
          </p>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
          RERA APPROVED :- UPRERAPRJ442226
          </p>
        </div>

        <div className="py-2">
          <p className="text-lg md:text-2xl font-bold">
            Starting Price – ₹ 2.25 Cr*
          </p>
          <p className="text-xs md:text-sm font-medium opacity-90 mt-2 flex flex-wrap justify-center gap-x-4">
            <span>Premium Plots</span>
            <span>|</span>
            <span>Low-density Plots</span>
            <span>|</span>
            <span>Premium Lifestyle</span>
            <span>|</span>
            <span>High ROI Investment</span>
          </p>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button onClick={() => setCustomEnquiry(true)} className="bg-gradient-to-r from-[#7a553a] to-[#a3836a] hover:scale-105 transition-transform px-10 py-4 rounded-full font-bold text-sm uppercase shadow-xl cursor-pointer">
            Free Site Visit
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

          <div className="grid grid-cols-1 px-5 md:px-0 md:grid-cols-3 gap-4 w-full overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300" 
     onClick={() => setCustomEnquiry(true)}>
  {galleryImages.map((src, index) => (
    <div key={index} className="relative w-full h-48 md:h-64 group">
      <img
        draggable="false"
        src={src}
        alt={`ACE ${index + 1}`}
        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 hover:shadow-md"
        loading="lazy"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" /> */}
    </div>
  ))}
  </div>

  <div className="max-w-7xl mx-auto  px-4 text-center mt-16">
            <h2 className="text-white text-4xl md:text-5xl font-serif mb-4">
              Where Modern Living Meets Luxury
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
          <div className="max-w-7xl mx-auto px-5 md:px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-6">
                Why Ace Acreville is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for Ultra luxury apartments in Yamuna Expressway with premium amenities and high appreciation?
              </p>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Ace Acreville</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                  Ace Acreville is an expansive, 100-acre integrated, premium township in Sector 22A of the Yamuna Expressway, Greater Noida. The plotted developments have been designed with timeless Neo-Classical architecture and features grand archways, stately facades, and symmetrical landscapes. It is a RERA-registered project and offers a unique opportunity to homebuyers and investors to own a plot in a meticulously planned community. The possession of the project is underway and combines the freedom of independent living with the security and luxury of a gated elite township.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Project Facilities
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                  The central clubhouse is the heart of lifestyle amenities in the project and promises to turn every day into an extraordinary epic. The clubhouse includes social and community spaces, a scenic terrace, a fully equipped gymnasium, a reading nook, swimming pools, a gazebo, a yoga studio, a basketball court, a squash court, table tennis, a badminton court and a tennis court. The project also has a grand banquet hall, a jogging track and a kids’ play area. The vast landscaped green spaces and tranquil water bodies dotting the project puts a bow on things and promise a serene getaway in the middle of NCR’s rapidly developing area.
                  </p>
                   
                </div>
    
                
              </div>
    
              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src='https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/14.jpg'
        alt="ACE"
        // 'object-contain' puri image dikhayega, bina crop kiye.
        // 'object-bottom' building ko neeche se align karega taaki neeche khali jagah na dikhe.
        className="w-full h-full object-cover object-bottom"
      />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
              <div className="space-y-8">
                <div className="mt-10">
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Key Features
                  </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   <ul>
                    <li>●	Features a timeless Neo-Classical architectural style with grand entrance gateways, stately facades, and manicured landscapes.</li>
                    <li>●	An expansive 100-acre integrated gated community.</li>
                    <li>●	Developed with internal street lighting, organised drainage, sewage pipelines, and a reliable municipal water supply.</li>
                    <li>●	A gated elite township with 24/7 security, paved compounds, dedicated parking, and a grand entrance area.</li>
                    <li>●	A central clubhouse designed to host social and community gatherings.</li>
                    <li>●	Includes a scenic terrace, a reading nook for quiet leisure, and a grand banquet hall for events.</li>
                    <li>●	Features a fully equipped gymnasium, a dedicated yoga studio, and multiple swimming pools.</li>
                    <li>●	Dotted with gazebos, tranquil water bodies, and vast landscaped green spaces.</li>
                    <li>●	Comprehensive sports facilities, including a squash court, tennis court, badminton court, and basketball court.</li>
                    <li>●	Dedicated spaces for Table Tennis and other indoor recreation.</li>
                    <li>●	A long jogging track and a dedicated play area for children.</li>
                   </ul>
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                 Ace Acreville’s location on the Yamuna Expressway gives it seamless connectivity to Noida, Greater Noida and the adjoining NCR precincts, while being an exclusive and serene suburban space. The area is an investment hotspot because of its proximity to Noida International Airport, the upcoming film city, and the Yamuna Expressway connectivity.  
                  </p>
                  
                </div>
    
                
              </div>
            </div>
          </div>
          </section>

          <section>
            <div className="bg-[#0f172a] min-h-screen p-10">
      <h1 className="text-white text-3xl mb-10 text-center font-serif">ACE ACREVILLE PRICE LIST</h1>
      
      {/* Grid wrapper to handle multiple cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
        {floorPlans.map((plan) => (
          <PropertyPlotsSizes 
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
          </section>
    
    
    
          <section className="bg-[#fdf2f0] py-16 px-6">
    
            <h2 className='font-serif text-center py-10'>The Finest Address—Now at Its Finest Price</h2>
            <div className='text-center mx-auto lg:w-140 pb-5'>
            <p className=' text-center'><span className='text-xl'>Developed by ACE Group</span></p>
            </div>
          <div className=" w-full mx-auto  px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="rounded min-h-screen p-8 md:p-12 font-sans relative">
      
      {/* Central Tree Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg viewBox="0 0 100 100" className="w-2/3 h-auto fill-current text-[#b08d74]" >
          <path d="M50 10 C 60 25, 40 45, 50 60 C 60 45, 40 25, 50 10 M50 25 L50 60 M25 40 C 15 50, 45 60, 50 60 M75 40 C 85 50, 55 60, 50 60 M35 70 C 25 80, 45 90, 50 90 M65 70 C 75 80, 55 90, 50 90" />
        </svg>
      </div>

      <div className="relative z-10  mx-auto">
        
        {/* Title (Optional, added for context) */}
        {/* <h1 className="text-4xl font-bold text-center mb-12 text-zinc-800">Our Premium Amenities</h1> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {Plotsamenities.map((amenity, index) => (
            <div 
              key={index} 
              className="relative group rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.03]"
            >
              <img 
                src={amenity.image} 
                alt={amenity.label} 
                className="w-full h-80 md:h-96 object-cover rounded-lg" 
              />
              
              {/* Overlay on hover */}
              <div onClick={() => setCustomEnquiry(true)} className="absolute inset-0 bg-white/50 cursor-pointer bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text Label */}
              <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                <p className="text-white text-base md:text-sm font-semibold tracking-wider group-hover:translate-x-2 transition-transform duration-300 uppercase">
                  {amenity.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        

        
      </div>
    </div>

          <div className="rounded min-h-screen p-8 md:p-12 font-sans relative">
      
      {/* Central Tree Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg viewBox="0 0 100 100" className="w-2/3 h-auto fill-current text-[#b08d74]" >
          <path d="M50 10 C 60 25, 40 45, 50 60 C 60 45, 40 25, 50 10 M50 25 L50 60 M25 40 C 15 50, 45 60, 50 60 M75 40 C 85 50, 55 60, 50 60 M35 70 C 25 80, 45 90, 50 90 M65 70 C 75 80, 55 90, 50 90" />
        </svg>
      </div>

      <div className="relative z-10  mx-auto">
        
        {/* Title (Optional, added for context) */}
        {/* <h1 className="text-4xl font-bold text-center mb-12 text-zinc-800">Our Premium Amenities</h1> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {gymAmenities.map((amenity, index) => (
            <div 
              key={index} 
              className="relative group rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.03]"
            >
              <img 
                src={amenity.image} 
                alt={amenity.label} 
                className="w-full h-80 md:h-96 object-cover rounded-lg" 
              />
              
              {/* Overlay on hover */}
              <div onClick={() => setCustomEnquiry(true)} className="absolute inset-0 bg-white/50 cursor-pointer bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text Label */}
              <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                <p className="text-white text-base md:text-sm font-semibold tracking-wider group-hover:translate-x-2 transition-transform duration-300 uppercase">
                  {amenity.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        

        
      </div>
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

    


    <ContactSection projectName='Ace Acreville' projectLocation='TS-01, Yamuna Expy, Gautam Budh Nagar, Sector-22A, Greater Noida, Uttar Pradesh 203201' />
    {customEnquiry && (
            <div>
              <Customenquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} prop />
            </div>
          )}
    </div>
  )
}

export default Aceacreville
