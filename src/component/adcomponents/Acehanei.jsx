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
import PropertyCardFloorplan from "./PropertyCardFloorplan.jsx";
import Custombanner from "./Custombanner.jsx";
import ProjectStats from "./ProjectStats.jsx";


const Acehanei = () => {

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
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/Asset1@3x(13).png',
    label: 'SERENE LIVING WITHIN A TRANQUIL OASIS',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/Asset1@3x(7).png',
    label: 'THE GRAND ARRIVAL AWAITS',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/Asset1@3x(6).png',
    label: 'DISCOVER THE PINNACLE OF LUXURY',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/Asset1@3x(5).png',
    label: 'YOUR GATEWAY TO ABUNDANT LIVING',
  },
];

      const banksAvailable = [
        {name:'SBI',logo:sbi},
        {name:'ICICI',logo:icici},
        {name:'central',logo:centralLogo},
      ]


      const galleryImages = [
  'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/4.jpg',
  'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/3.jpg',
  'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/5.jpg',
];
        useEffect(() => {
            setPropertys({
        _id:'69e0a802c093dd90d6151b11',
        projectname:'Ace Hanei'
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
    size: "2290 SQ.FT",
    features: "Low-density premium tower",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/2290.jpeg'
  },
  {
    id: 2,
    title: "3 BHK + 4T + Servent",
    size: "3200 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/2900.jpeg'
  },
  {
    id: 3,
    title: "3 BHK + 4T",
    size: "4190 SQ.FT.",
    features: "Premium finishing",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/4190.jpeg'
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
          image: 'https://d3eoh63gynpjzh.cloudfront.net/Acehanei/2.jpg', // Replace with your image paths
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
              title='Ace Hanei, Plot No- GH-05, Sector 12, Saini, Greater Noida, Uttar Pradesh 203207'
              description=""
              canonical={`https://www.brandsdoor.in/ace-hanei`}
            />
      <section className="relative h-[90vh] min-h-[700px] w-full flex flex-col items- justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/Acehanei/1.jpg' // Replace with your image path
          fill
          className="object-cover h-[-webkit-fill-available]  w-[-webkit-fill-available]"
          priority
          alt="Ace Hanei"
        />
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-10 left-4 md:top-8 md:left-8 z-10  block">
        <div className="flex flex-col items-center">
            <div className="w-42 h-12 bg-white/50 md:bg-transparent p-10  rounded px-1  flex items-center justify-center mb-1 ">
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
      
      <div className="absolute top-8   right-4 md:right-8 z-10 text-right  md:block">
        <div className="w-30 md:w-42 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/Aceacervillay/ace_acrevilleLogo@3x.png' // Replace with your image path
          fill
          className="object-cover rounded-xl mt-3 "
          priority
          alt="Ace Hanei"
        />
            </div>
        
      </div>

      {/* 3. Main Content */}
      <Custombanner setCustomEnquiry={setCustomEnquiry} />

    </section>
     <ProjectStats />
    <section className="bg-[#0f172a] pt-20 ">
          <div className="max-w-7xl mx-auto  px-4 text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-serif mb-4">
              Discover Premium Living
            </h2>
            <div className="w-24 h-1 bg-white mx-auto relative">
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-[#0f172a]" />
            </div>
          </div>

          <div className="grid grid-cols-1 pb-20 md:px-0 md:grid-cols-3 gap-4 w-full overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300" 
     onClick={() => setCustomEnquiry(true)}>
  {galleryImages.map((src, index) => (
    <div key={index} className="relative w-full p-5 h-48 md:h-64 group">
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

 

  
    
          
    
          <section className="py-20 bg-white">  
          <div className="max-w-7xl mx-auto px-5 md:px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-6">
                Why Ace Hanei is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for Ultra luxury apartments in Yamuna Expressway with premium amenities and high appreciation?
              </p>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Ace Hanei</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                  ACE Hanei is an upcoming, under-construction, RERA-registered project in Sector 12 of Greater Noida West (Noida Extension). It is being developed by ACE Group, an established real estate developer in NCR’s real estate market known for delivering premium projects. ACE Hanei offers seamless connectivity to Delhi, Ghaziabad, and the wider NCR, and a sophisticated living experience with strategic connectivity. The project is set for completion by October 2028.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Project Facilities
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                  ACE Hanei, Greater Noida West (Noida Extension) Sector 12, is an upcoming world-class residential society that presents a state-of-the-art living opportunity with its era-redefining infrastructure and blend of in-project facilities. The project is spread across an area of 6.4 acres and 80% open space. The project has 6 towers of 25 floors each, and 518 units in total. This project has 2-BHK, 3-BHK and 4-BHK flats. The 2-BHK configuration measures 1341 sq. ft. The 3-BHK flat has two variants - 1623 sq. ft. and 2054 sq. ft. The 4-BHK flat also has two variants measuring 2355 sq. ft. and 3108 sq. ft. 
                  </p>
                   
                </div>
    
                
              </div>
    
              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src='https://d3eoh63gynpjzh.cloudfront.net/Acehanei/Asset1@3x(4).png'
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
                    <li>●	Situated in the high-growth corridor of Sector 12, Greater Noida West (Noida Extension).</li>
                    <li>●	Spread across 6.4 acres with an impressive 80% open space.</li>
                    <li>●	Offers premium 2, 3, and 4-BHK luxury apartments.</li>
                    <li>●	Signature wrap-around balconies for seamless outdoor-indoor living.</li>
                    <li>●	Strategically positioned towers to ensure unmatched resident privacy.</li>
                    <li>●	High-end triple-height lobbies and high-speed elevators.</li>
                    <li>●	The massive 32,000 sq. ft. clubhouse includes a 7,500 sq. ft. gym, a dedicated yoga terrace, and a jacuzzi.</li>
                    <li>●	Olympic-sized swimming pool, bowling alley, amphitheatre, and a library for resident recreation.</li>
                    <li>●	Tennis and badminton courts, jogging tracks, and a multipurpose court for sports lovers.</li>
                    <li>●	Dedicated EV charging bays to charge your electric vehicles.  </li>
                    <li>●	The RERA registration number for the project is UPRERAPRJ677887/10/2024.</li>
                   </ul>
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                 Greater Noida West has evolved from a developing pocket in the outskirts of Noida into a vibrant, self-sustained urban destination within NCR. For families, the area offers a lifestyle where all amenities are at their doorstep. The area is home to prestigious schools like Ryan International, Lotus Valley, and GD Goenka, ensuring world-class education just minutes away. Healthcare is equally accessible with multi-speciality hospitals such as Yatharth, Sarvodaya, and NuMed Hospital providing round-the-clock medical care. Residents can find all their shopping and entertainment needs at local retail hubs and major malls like Gaur City Mall, making it an ideal choice for a balanced family life.</p>
                  
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
          </section>
    
    
    
          <section className="bg-[#fdf2f0] py-16 px-6">
    
            <h2 className='font-serif text-center py-10'>The Finest Address—Now at Its Finest Price</h2>
            <div className='text-center mx-auto lg:w-140 pb-5'>
            <p className=' text-center'><span className='text-xl'>Developed by ACE Group</span></p>
            </div>
          <div className=" w-full mx-auto  px-4 grid grid-cols-1 lg:grid-cols-1 gap-12 items-start">
            

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

    


    <ContactSection projectName='Ace Hanei' projectLocation='Ace Hanei, Plot No- GH-05, Sector 12, Saini, Greater Noida, Uttar Pradesh 203207' />
    {customEnquiry && (
            <div>
              <Customenquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} prop />
            </div>
          )}
    </div>
  )
}

export default Acehanei
