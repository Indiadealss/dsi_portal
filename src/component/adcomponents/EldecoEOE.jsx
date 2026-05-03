import React, { useEffect, useState } from "react";
import banner from '../../Images/eldeco1.png';
import EOElogo from '../../Images/cas@3x.png'
import eoelogo from '../../Images/EOElogo.png'
import { Phone, MessageCircle, Image } from 'lucide-react';
import Customenquiryform from "../customcomponent/Customenquiryform.jsx";
import ContactSection from "../ContactSection.jsx";
import Seo from "../Seo.jsx";
import { Landmark } from 'lucide-react';
import sbi from '../../Images/sbi.png';
import uno from '../../Images/uno.png';
import centralLogo from '../../Images/central-bank-of-india-logo-vector.png';
import icici from '../../Images/icici.jpeg';
import eldeco7 from '../../Images/eldeco7.png';
import eldeco2 from '../../Images/eldeco2.png';
import eldeco3 from '../../Images/eldeco3.png';
import eldeco4 from '../../Images/eldeco4.png';
import irishPlatinumQuestion from '../../Images/irishPlatinumQuestion.jpg';
import Dayview from '../../Images/nightViewEoe.png';
import { Tag, Home, Building2 } from 'lucide-react';
import { Bed, Utensils, Sofa, DoorOpen, Paintbrush } from 'lucide-react';
import PropertyCardFloorplan from "./PropertyCardFloorplan.jsx";
import floorPlan1 from "../../Images/eldeco13.png";
import floorPlan2 from "../../Images/eldeco12.png";
import Asset1 from '../../Images/Asset1.jpg';
import Asset2 from '../../Images/Asset2.png'
import CustomNameEnquiryform from "../customcomponent/CustomNameEnquiryform.jsx";
import EOEOFFER from "../../Images/offerEOE.png"


const EldecoEOE = () => {

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
        projectname:'Eldeco Echoes of Eden'
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
    size: "1550 SQ. FT.",
    features: "Low-density premium tower",
    imageUrl: floorPlan1
  },
  {
    id: 2,
    title: "3 BHK + 3T",
    size: "1850 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: floorPlan2
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
          image: eldeco7, // Replace with your image paths
        },
        {
          title: "Sports Arena",
          description: "Stay active with lawn tennis, badminton, basketball, skating rink, and box cricket facilities.",
          image: eldeco2,
        },
        {
          title: "Wellness & Gardens",
          description: "Rejuvenate in reflexology, butterfly, theme & urban gardens with dedicated wellness and meditation zones.",
          image: eldeco4,
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
              title='Eldeco EOE sector 22D Yamuna Expressway'
              description=""
              canonical={`https://www.brandsdoor.in/eldeco-eoe`}
            />
      <section className="relative h-[90vh] min-h-[700px] w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img draggable="false"
          src={banner} // Replace with your image path
          fill
          className="object-cover h-[-webkit-fill-available] lg:h-auto w-[-webkit-fill-available]"
          priority
          alt="Eldeco Echoes of Eden"
        />
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col items-center">
            <div className="w-32 h-12 bg-white/100 rounded px-1  flex items-center justify-center mb-1 ">
                <img draggable="false"
          src={eoelogo} // Replace with your image path
          fill
          className="object-cover"
          priority
          alt="EOE"
        />
            </div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-10 text-right hidden md:block">
        <div className="w-42 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src={EOElogo} // Replace with your image path
          fill
          className="object-cover bg-white rounded-xl p-3"
          priority
          alt="Eldeco Echoes of Eden"
        />
            </div>
        <p className=" opacity-80 uppercase tracking-tighter">+91 9818764200</p>
        
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-5xl space-y-4">
        <h1 className="text-5xl text-white md:text-7xl font-bold tracking-tight drop-shadow-lg">
          <span className="text-white">Luxury 3 BHK Apartments</span>
        </h1>
        
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wider text-gray-100">
            <span className="text-white">Eldeco Echoes of Eden</span>
          </h2>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
            Sector 22D, Yamuna Expressway
          </p>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
          RERA APPROVED :- UPRERAPRJ125342/02/2026
          </p>
        </div>

        <div className="py-2">
          <p className="text-lg md:text-2xl font-bold">
            Starting Price – ₹ 1.39 Cr*
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

          <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded bg-white shadow-md" onClick={() => setCustomEnquiry(true)}>
  <div className="relative aspect-video w-full group">
    <img
      draggable="false"
      src={EOEOFFER}
      alt="EOE"
      className=" w-full object-cover transition-transform duration-500 group-hover:scale-102 cursor-pointer"
    />
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
                Why Eldeco Echoes of Eden is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for Ultra luxury apartments in Greater Noida West with premium amenities and high appreciation?
              </p>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Eldeco Echoes of Eden</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Eldeco Echoes of Eden is an under-construction, RERA-registered residential society being developed by the Eldeco Group in Sector 22D, Yamuna Expressway. It is an ultra-luxury project located in the rapidly developing Yamuna Expressway area, promising lucrative investment returns and a home in a future-ready cosmopolitan. It offers homes in an apartment format of 3-BHK configurations. The project is set for completion in 2031.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Project Features
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   As a residential project, Eldeco Echoes of Eden is a fantastic blend of low-density planning, a suite of curated amenities, open campus, and seamless connectivity to NCR and other adjoining districts. The campus of the society is spread over an area of 5 acres, and there are only 558 apartments! This relatively low-density design gives your address an exclusive edge, and provides a quieter environment.  
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   The flats in Eldeco Echoes of Eden are available in 3-BHK configurations. The size options for the 3-BHK apartments in Eldeco Echoes of Eden is 1550 sq. ft., and 1850 sq. ft. The apartments are open on 3 sides, with airy balconies for enhanced indoor-outdoor living experience, optimum natural lighting and ventilation of air. 
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   There are 5 high-speed elevators in each tower for the residents’ convenience and quick mobility within the building. 
                   </p>
                </div>
    
                
              </div>
    
              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src={eldeco3}
        alt="EOE"
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
                    Project Facilities 
                    </p>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Eldeco Echoes of Eden lives up to its name, and is truly an embodiment of the Garden of Eden. The project has an impressive expanse of greenery, and 3 acres of the campus are dedicated to central green landscaping. The podium-based ground level separates the flow of vehicles and residents, creating a safer and calmer environment.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-justify mt-3">
                 There is also a comprehensive suite of sports and fitness facilities at Echoes of Eden, which includes amenities like a fully-equipped gymnasium, a half Olympic-sized swimming pool, a tennis court, a jogging track, and a basketball court.    
                 </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Key Features & Benefits of Irish Platinum  
                  </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   <ul>
                    <li>●	Central green landscaping of 3 acres</li>
                    <li>●	Low-density, exclusive residential project with only 558 units. </li>
                    <li>●	Three-side-open flats for enhanced natural lighting and ventilation.</li>
                    <li>●	Half Olympic-size swimming pool.</li>
                    <li>●	Sports facilities like badminton court, basketball court, jogging/running track.</li>
                    <li>●	Located in the real estate hotspot of Yamuna Expressway Industrial Development Area.</li>
                    <li>●	High property value appreciation and rental yield potential.</li>
                    <li>●	Close to schools, universities, hospitals, malls and business parks.</li>
                   </ul>
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                 Eldeco Echoes of Eden is located in Sector 22D, Yamuna Expressway bordered by Greater Noida. This location gives it seamless connectivity to Noida, Greater Noida and the adjoining NCR precincts, while being an exclusive and serene suburban space. The area is an investment hotspot because of its proximity to Noida International Airport, the upcoming film city, and the Yamuna Expressway connectivity. It is also being moulded into an industrial hub with multiple government-backed, and large-scale industrial projects taking shape. Alongside these developments, the civic amenities and social infrastructure of the area is also growing day-by-day. 
                 </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                The project is located close to the Noida International Airport at Jewar, and has proximity to the Yamuna Expressway. It is located in the Yamuna Expressway growth corridor and benefits greatly from the improving regional connectivity, expanding institutional development, and rising demand for premium residences. 
                </p>
                </div>
    
                
              </div>
            </div>
          </div>
          </section>
    
    
    
          <section className="bg-[#fdf2f0] py-16 px-6">
    
            <h2 className='font-serif text-center py-10'>The Finest Address—Now at Its Finest Price</h2>
            <div className='text-center mx-auto lg:w-140 pb-5'>
            <p className=' text-center'><span className='text-xl'>Developed by Eldeco Group</span></p>
            </div>
          <div className="max-w-7xl mx-auto  px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side: High-Resolution Render */}
            <div className="relative h-[400px] lg:h-[680px] w-full overflow-hidden shadow-xl rounded">
              <img draggable="false"
        src={Dayview}
        alt="EOE"
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
                  <span className="uppercase tracking-widest text-sm">PRE LAUNCH OFFER Price (₹ 8999/ SQ.FT)</span>
                </div>
                <hr className="border-gray-300" />
                <div className="space-y-2 pt-2">
                    <p className="text-[#333] text-lg font-bold">Starting Price: <span className="text-[#b08d57]">₹1.39 Cr*</span></p>
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
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1550 sq ft</span>
                  </p>
                    <p className="text-[#333] font-bold">3 BHK + 3 Toilets: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">1850 sq ft</span>
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
                  <p className="text-[#333] font-bold">Tower: <span className="font-normal text-gray-600">T-3 | G+30 floors (1st to 30th)</span></p>
                  <p className="text-[#333] font-bold">Lifts: <span className="font-normal text-gray-600">4 High-Speed Lifts</span></p>
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


    <ContactSection projectName='Eldeco Echoes of Eden' projectLocation='GH 01 B/1, Sector 22D, Yamuna Expressway, Greater Noida, Uttar Pradesh' />
    {customEnquiry && (
            <div>
              <CustomNameEnquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} prop />
            </div>
          )}
    </div>
  )
}

export default EldecoEOE
