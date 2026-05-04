import React, { useEffect, useState } from "react";
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
import PropertyCardFloorplan from "./PropertyCardFloorplan.jsx";

const Crcmaesta = () => {

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
        projectname:'CRC MAESTA'
      })
        const timer = setTimeout(() => {
          setCustomEnquiry(true);
        }, 3000); // 5 seconds
      
        return () => clearTimeout(timer); // cleanup
      }, []);


     const floorPlans = [
  {
    id: 1,
    title: "3 BHK +  3T",
    size: "1720 SQ. FT.",
    features: "Low-density premium tower",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/Tower_1.jpg'
  },
  {
    id: 2,
    title: "3 BHK + 3T + Servent",
    size: "1975 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/Tower_2.jpg'
  },
  {
    id: 3,
    title: "3 BHK + 4T + SER",
    size: "2245 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/Tower_4.jpg'
  },
  {
    id: 4,
    title: "4 BHK + 3T",
    size: "2690 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/Tower_5.jpg'
  }
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
          image: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/crc(5).jpg', // Replace with your image paths
        },
        {
          title: "Sports Arena",
          description: "Stay active with lawn tennis, badminton, basketball, skating rink, and box cricket facilities.",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/crc(32).jpg',
        },
        {
          title: "Wellness & Gardens",
          description: "Rejuvenate in reflexology, butterfly, theme & urban gardens with dedicated wellness and meditation zones.",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/CRC/crc(2).jpg',
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
              title='CRC MAESTA'
              description="CRC MAESTA GH-11B, Greater Noida W Rd, Sector 1, Bisrakh Jalalpur, Greater Noida, Uttar Pradesh 201306"
              canonical={`https://www.brandsdoor.in/irish-platinum`}
            />
      <section className="relative h-[90vh] min-h-[700px] w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/CRC/crc(2).jpg' // Replace with your image path
          fill
          className="object-cover h-[-webkit-fill-available]  w-[-webkit-fill-available]"
          priority
          alt="CRC MAESTA"
        />
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col items-center">
            <div className="w-22 h-12  rounded-full p-4 flex items-center justify-center mb-1">
                <img draggable="false"
                    src='https://d3eoh63gynpjzh.cloudfront.net/CRC/crc_logo_white.webp' // Replace with your image path
          fill
          className="object-cover"
          priority
          alt="CRC MAESTA"
        />
            </div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-10 text-right hidden md:block">
        <div className="w-52 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/CRC/crc-maesta.png' // Replace with your image path
          fill
          className="object-cover "
          priority
          alt="CRC MAESTA"
        />
            </div>
       <a href="tel:+91 9818764200"> <p className=" opacity-80 uppercase tracking-tighter text-white">+91 9818764200</p></a>
        
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-5xl space-y-4">
        <h1 className="text-5xl text-white md:text-7xl font-bold tracking-tight drop-shadow-lg">
          <span className="text-white">Luxury 3 & 4 BHK Apartments</span>
        </h1>
        
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wider text-gray-100">
            <span className="text-white">CRC MAESTA</span>
          </h2>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
            5 TOWER | GREATER NOIDA WEST 
          </p>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
          RERA APPROVED :- UPRERAPRJ724518/07/2024
          </p>
        </div>

        <div className="py-2">
          <p className="text-lg md:text-2xl font-bold">
            Starting Price – ₹ 2.4 Cr*
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
                    className="object-cover w-[-webkit-fill-available] h-[-webkit-fill-available] transition-transform duration-500 group-hover:scale-110"
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
                Why CRC MAESTA is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for Ultra luxury apartments in Greater Noida West with premium amenities and high appreciation?
              </p>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4"> CRC MAESTA</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                  CRC Maesta is a RERA-registered, under-construction housing society in Sector 1, Greater Noida West (Noida Extension). The project is being developed by the CRC Group and is set for completion in May 2029. It is a highly coveted project in the rapidly evolving Greater Noida West region and is all set to be a landmark in the area.  
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Project Features
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   CRC Maesta is a luxury residential project with a 3.64-acre campus and 80% open area. The project is low-density (~98 units per acre), with only 358 units across 5 towers of 33 floors.
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   Homes in CRC Maesta are available in 3-BHK and 4-BHK configurations. The 3-BHK apartments are available in 4 sizes - 1720 sq. ft., 1975 sq. ft., 2245 sq. ft., and 2295 sq. ft. The 4-BHK Apartment is available in 2690 sq. ft.
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   The layout in four of the towers, you will find only two residences on each floor for enhanced privacy and an exclusive living experience. The project has been designed by the world-renowned architect Hafeez Contractor with curated landscapes by Integral Designs International Studio. The ground level is fully landscaped and decked out with seating areas and design features. 
                   </p>
                </div>
    
                
              </div>
    
              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src='https://d3eoh63gynpjzh.cloudfront.net/CRC/crc(25).jpg'
        alt="Tower T-10 Gold Render"
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
                    Project Amenities 
                    </p>
                  <p className="text-gray-600 leading-relaxed text-justify">
                  The elevated living experience of CRC Maesta starts right at the gates. The stunning life-size society entrance makes a lasting first impression and controls access in and out of the society.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-justify mt-3">
                 CRC Maesta has dedicated amenities for a nature-centric, serene living. The seamless pathways looping around the project are a no-vehicular zone, and residents will have access to fitness, sports and wellness amenities. The project includes a multi-purpose court, outdoor gym, reflexology path, a woodland bridge, a yoga/meditation lawn, a kids’ lawn, a colour garden, a butterfly garden, an herb garden, a raised garden and a zen garden.
                 </p>
                 <p className="text-gray-600 leading-relaxed text-justify mt-3">
                 The project also has a suite of luxury amenities. The state-of-the-art clubhouse is the heart of these facilities. It includes a fully equipped gym, yoga room, jacuzzi, spa, sauna/steam room, billiards, table tennis, squash court, indoor games, a kids’ activity room, a karaoke and a business centre.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Key Features  
                  </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   <ul>
                    <li>●	Architecture by the world-renowned Hafeez Contractor with landscaping by Integral Designs International Studio.</li>
                    <li>●	Four of the towers feature only two residences per floor, offering an exclusive and private living experience.</li>
                    <li>●	Vehicle-Free zone on the seamless pathways, ensuring a quiet and safe environment.</li>
                    <li>●	Thematic Gardens include a Zen garden, a butterfly garden, an herb garden, a colour garden, and a raised garden.</li>
                    <li>●	Ground-level landscaping with a woodland bridge, reflexology path, and dedicated seating alcoves.</li>
                    <li>●	Premium wellness facilities like a jacuzzi, spa, and sauna/steam room.</li>
                    <li>●	The clubhouse includes a fully equipped gym, a dedicated yoga room, a squash court, a business centre, a karaoke room, a kids’ activity room, and a variety of indoor games.</li>
                    <li>●	Proximity to major malls, restaurants, and commercial hotspots makes it an emerging residential favourite.</li>
                   </ul>
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                  CRC Maesta is located in Greater Noida West, also known as Noida Extension. Greater Noida West is situated between Noida and Greater Noida, and has quick access to both. Since this area is in the NCR, it is also connected to Delhi, Ghaziabad, Gurugram and Faridabad through roads and metro. 
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                    Greater Noida West has developed tremendously and rapidly to become the emerging commercial and residential hotspot in NCR. The area already hosts a variety of amenities like schools, hospitals, parks, malls and markets, that residents typically look for. There are multi-speciality hospitals in this area, like Yatharth Hospital, NuMed Hospital, and Sarvodaya Hospital. CBSE and internationally affiliated schools are also well-established in Noida Extension. Local markets, supermarkets, malls, and Q-commerce services cater to the shopping needs of the area. Greater Noida West also has many restaurants, cafes, movie theatres, salons and party spaces.
                    </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                    Road travel is easy with options like cabs, autos, and e-rickshaws. Travelling via personal vehicles is also comfortable, as local roads are wide, well-maintained, and serviced by several petrol pumps. NH-24, Delhi-Meerut Expressway, FNG Expressway, and Noida-Greater Noida Link Road are 10-15 minutes away, which gives the area a major connectivity boost. 
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   The nearest metro station is Noida Sector – 52 (Blue Line) and Noida Sector – 51 (Aqua Line). The nearest major railway stations are the Ghaziabad Junction and the Dadri Railway Station. One can access the multiple airports in NCR (Noida International Airport, IGI, Palam and Hindon) from Greater Noida West.
                   </p>
                </div>
    
                
              </div>
            </div>
          </div>
          </section>
    
    
    
          <section className="bg-[#fdf2f0] py-16 px-6">
    
            <h2 className='font-serif text-center py-10'>The Finest Address—Now at Its Finest Price</h2>
            <div className='text-center mx-auto lg:w-140 pb-5'>
            <p className=' text-center'><span className='text-xl'>Developed by CRC Group</span></p>
            </div>
          <div className="max-w-7xl mx-auto  px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side: High-Resolution Render */}
            <div className="relative h-[400px] lg:h-[680px] w-full overflow-hidden shadow-xl rounded">
              <img draggable="false"
        src='https://d3eoh63gynpjzh.cloudfront.net/CRC/crc(13).jpg'
        alt="Tower T-10 Gold Render"
        // 'object-contain' puri image dikhayega, bina crop kiye.
        // 'object-bottom' building ko neeche se align karega taaki neeche khali jagah na dikhe.
        className="w-[-webkit-fill-available] h-full object-cover object-bottom rounded"
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
                    <p className="text-[#333] text-lg font-bold">Starting Price: <span className="text-[#b08d57]">₹2.4 Cr*</span></p>
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
                    <p className="text-[#333] font-bold">3 BHK + 3 Toilets: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1720 sq ft</span>
                  </p>
                    <p className="text-[#333] font-bold">3 BHK + 3 Toilets + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1925 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">3 BHK + 3 Toilets + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2245 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">4 BHK  + 4 Toilets: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2690 sq ft</span>
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
                  <p className="text-[#333] font-bold">Tower: <span className="font-normal text-gray-600">T-5 | G+30 floors (1st to 30th)</span></p>
                  <p className="text-[#333] font-bold">Per Floor: <span className="font-normal text-gray-600"> 2 unit per floor in 3 BHK Tower & 2 unit per floor in 4 BHK </span></p>
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


    <ContactSection projectName='CRC MAESTA' projectLocation='GH-11B, Greater Noida W Rd, Sector 1, Bisrakh Jalalpur, Greater Noida, Uttar Pradesh 201306'/>
    {customEnquiry && (
            <div>
              <Customenquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} />
            </div>
          )}
    </div>
  )
}

export default Crcmaesta
