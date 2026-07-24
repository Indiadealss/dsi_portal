import React, { useEffect, useState } from "react";
import irislogo from '../../Images/irishLogo.png';
import IrishLogo from '../../Images/Irish-Logo.png';
import IrishBanner from '../../Images/Irisheta1.jpg';
import irishEtaContent from '../../Images/irishEtaContent.png';
import FloorCommingplan from '../../Images/FloorCommingplan.png';
import dicover1 from '../../Images/dicover1.png';
import dicover2 from '../../Images/dicover2.png';
import dicover3 from '../../Images/dicover3.png';
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
import ProjectStats from "./ProjectStats.jsx";
import { Layers } from 'lucide-react';

const Irishplatinumeta1 = () => {

     const [customEnquiry, setCustomEnquiry] = useState(false);
      const [propertys, setPropertys] = useState(null);

      const stats = [
    {
      id: 1,
      icon: <Building2 size={48} strokeWidth={1} />,
      value: "4",
      label: "Total No. of Towers",
    },
    {
      id: 2,
      icon: <Layers size={48} strokeWidth={1} />,
      value: "34",
      label: "Max Floors (Stilt+34)",
    },
    {
      id: 3,
      icon: <Home size={48} strokeWidth={1} />,
      value: "6 Acres",
      label: "Land Area",
    },
    {
      id: 4,
      icon: <Home size={48} strokeWidth={1} />,
      value: "3 BHK",
      label: "1450 Sq.ft. - 1750 Sq.ft.",
    },
    {
      id: 5,
      icon: <Home size={48} strokeWidth={1} />,
      value: "4 BHK",
      label: "2040 Sq.ft. - 2450 Sq.ft.",
    },
    {
      id: 6,
      icon: <Layers size={48} strokeWidth={1} />,
      value: "25:25:25:25",
      label: "Payment Plan",
    },
  ];

      const gymAmenities = [
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Irishplatinumeta1/Asset1@3x(1).png',
    label: 'GRAND 62,000 SQ.FT. CLUBHOUSE',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Irishplatinumeta1/Asset1@3x(2).png',
    label: 'THE GRAND ARRIVAL AWAITS',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Irishplatinumeta1/Asset1@3x(3).png',
    label: 'LOW-DENSITY 3-SIDE OPEN TOWERS',
  },
  {
    image: 'https://d3eoh63gynpjzh.cloudfront.net/Irishplatinumeta1/Asset1@3x(4).png',
    label: 'CENTRALLY AIR-CONDITIONED LIVING',
  },
];

      const banksAvailable = [
        {name:'SBI',logo:sbi},
        {name:'ICICI',logo:icici},
        {name:'central',logo:centralLogo},
      ]

      const galleryImages = [
  dicover1,
  dicover2,
  dicover3,
];

        useEffect(() => {
            setPropertys({
        _id:'69e0a802c093dd90d6151b11',
        projectname:'Irish Eta 1'
      })
        const timer = setTimeout(() => {
          setCustomEnquiry(true);
        }, 3000); // 5 seconds

        return () => clearTimeout(timer); // cleanup
      }, []);


     const floorPlans = [
  {
    id: 1,
    title: "3 BHK + 2T",
    size: "1450 SQ.FT",
    features: "Low-density premium tower",
    imageUrl: FloorCommingplan
  },
  {
    id: 2,
    title: "3 BHK + 3T",
    size: "1750 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: FloorCommingplan
  },
  {
    id: 3,
    title: "4 BHK + 4T",
    size: "2040 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: FloorCommingplan
  },
  {
    id: 4,
    title: "4 BHK + Study + Pooja + 5T",
    size: "2450 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: FloorCommingplan
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

      const highlights = [
        { text: "12 ft high ceilings", sub: "offering enhanced space and luxury feel" },
        { text: "Central Air-Conditioning", sub: "throughout every unit" },
        { text: "MI-VAAN Construction", sub: "" },
        { text: "3-Side Open Development", sub: "with low-density living" },
        { text: "High Rise Apartments", sub: "up to Stilt+34 Floors" },
      ];


  return (
    <div>
         <Seo
              title='Irish Eta 1 Greater Noida | 3BHK/4BHK Premium Apartments'
              description="Irish Eta 1 Greater Noida offers 3BHK and 4BHK Premium Apartments with all modern amenities, which is located at Eta 1 Greater Noida."
              canonical={`https://www.indiadealsgroup.com/irish-eta-1-greater-noida`}
            />
      <section className="relative h-[90vh] min-h-[700px] w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img draggable="false"
          src={IrishBanner}
          fill
          className="object-cover h-[-webkit-fill-available] lg:h-auto w-[-webkit-fill-available]"
          priority
          alt="Irish Eta 1"
        />
        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col items-center">
            <div className="w-22 h-12 bg-white rounded-full p-2  flex items-center justify-center mb-1">
                <img draggable="false"
          src={IrishLogo}
          fill
          className="object-cover"
          priority
          alt="Irish Eta 1"
        />
            </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10 text-right hidden md:block">
        {/* <div className="w-42 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src={irislogo}
          fill
          className="object-cover"
          priority
          alt="Irish Eta 1"
        />
            </div> */}

      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-5xl space-y-4">
        <h1 className="text-5xl text-white md:text-7xl font-bold tracking-tight drop-shadow-lg">
          <span className="text-white">Luxury 3 & 4 BHK Apartments</span>
        </h1>

        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wider text-gray-100">
            <span className="text-white">IRISH ETA 1</span>
          </h2>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
            4 TOWERS | ETA 1, GREATER NOIDA
          </p>
          <p className="text-sm md:text-lg font-semibold tracking-tight text-gray-200">
            NEW LAUNCH | 3-SIDE OPEN DEVELOPMENT
          </p>
        </div>

        <div className="py-2">
          <p className="text-xs md:text-sm font-medium opacity-90 mt-2 flex flex-wrap justify-center gap-x-4">
            <span>MI-Vaan Construction</span>
            <span>|</span>
            <span>Central Air-Conditioning</span>
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
     <ProjectStats stats={stats} gridColumns={6} />
    <section className="bg-[#0f172a] pt-20 ">
          <div className="max-w-7xl mx-auto  px-4 text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-baskervville font-bold mb-4">
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
        alt={`Irish Eta 1 ${index + 1}`}
        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 hover:shadow-md"
        loading="lazy"
      />
    </div>
  ))}
  </div>

          <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-baskervville font-bold text-[#0f172a] mb-6">
                Why Irish Eta 1 is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for new-launch luxury apartments in Greater Noida with premium amenities and high appreciation?
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Irish Eta 1,  Greater Noida</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                  This is an exclusive pre-launch project by the Irish Group in ETA-1, Greater Noida. The Irish Group has delivered successful projects in Greater Noida West and is now expanding its footprint to the Greater Noida region. 
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                  This upcoming development represents a rare opportunity, where you can lock-in the best price for a home that is situated in the heart of ETA-1, Greater Noida.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                    Spread across a sprawling 6-acre land parcel, this project is a 3-side open development that will feature four premium residential towers. This project offers an exclusive and meticulously planned environment where low-density living and expansive layouts create a premium sanctuary for aspirational homeowners.
                  </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Project Features
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                  The project architecture is grand and is set to have 4 high-rise towers. The Standard Tower features an optimized layout of 8 apartments per floor, and is supported by 6 high-speed lifts to keep waiting times for residents minimal. The Premium Tower offers heightened exclusivity and privacy with only 4 apartments per floor, serviced by 5 high-speed lifts.
                  </p>

                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                  The towers have been designed to maximize ventilation and views through its 3-side open layout.
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    The residential blocks are systematically structured into two distinct tower designs to cater to different privacy preferences. The Standard Tower is designed with an 8-apartments-per-floor layout and is fully supported by 6 high-speed lifts. For those seeking heightened exclusivity, the Premium Tower features a lower density layout of just 4 apartments per floor, serviced seamlessly by 5 high-speed lifts. Both layouts ensure that passenger movement remains swift, fluid, and comfortable.
                  </p>

                  

                </div>


              </div>

              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src={irishEtaContent}
        alt="Irish Eta 1"
        className="w-full h-full object-cover object-bottom"
      />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
              <div className="space-y-8">
                <div className="mt-10">
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                    Homes in The Project
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                      The project offers highly versatile living spaces divided carefully across its premium and standard towers. The 3 BHK configurations are available in two sizes - a 1,450 sq. ft. layout which features 3 bedrooms and 2 toilets, and a 1,750 sq. ft. option layout with 3 bedrooms and 3 toilets.
                  </p>

                  

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    For larger families, the 4 BHK configurations provide ultimate spatial freedom. The 2,050 sq. ft. unit has 4 bedrooms and 4 toilets. The 2,450 sq. ft. residence option includes 4 bedrooms, a study room, a pooja room, and 5 toilets.  Each home is crafted to deliver an unmatched sense of comfort and luxury to you. The flats will have an impressive 12-foot ceiling height and centralized air conditioning systems operating throughout the units.                  
                  </p>


                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    The floor plans are meticulously optimized, and the individual configurations are designed to meet diverse family needs while ensuring a premium, uncluttered living experience. In this Irish Pre-Launch Project, residents will enjoy access to a massive, grand clubhouse spanning approximately 62,000 sq. ft., which will serve as the social and recreational heart of the community.
                  
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    Vertical movement across the towers is engineered for absolute convenience, featuring up to 6 high-speed lifts per tower to ensure minimal wait times and smooth transit for all residents.
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    Beyond the gates, Sector ETA-1 provides exceptional, future-ready infrastructure links that anchor you right in the middle of a major urban corridor.
                  </p>
                  
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                    Investment & Pricing
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    As a premier pre-launch opportunity, the project offers a lucrative price advantage for early buyers. The pre-launch pricing is highly competitive, starting from ₹8,000 to ₹9,000 per sq. ft., which stands in advantageous contrast to the expected launch price of ₹10,000 per sq. ft.
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    To ensure a smooth acquisition process, there is an offer for a highly flexible 25:25:25:25 payment plan. 
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    Expressions of Interest (EOI) are currently open and starting from ₹10 Lakhs only, allowing astute investors to book early and maximize their price benefits.
                  </p>

                  <p className="text-gray-800 leading-relaxed mt-3 text-justify">
                    About The Location
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    Situated in the prime location of ETA-1, Greater Noida, the project boasts excellent connectivity to the region's primary transport and social networks. It is located just 300 meters away from the 130-metre Expressway and is a brief 2 km from both the nearest Metro Station and the upcoming RRTS network.
                  </p>

                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    Daily convenience is fully accounted for with local schools situated just 2 km away, colleges and universities at a 4 km distance, and a hospital located 5 km from the gates.
                  </p>
                  <p className="text-gray-600 leading-relxed mt-3 text-justify">
                    Furthermore, the project sits 5 km from the Railway Station and 35 km away from the upcoming Noida International Airport, placing residents at the center of a rapidly growing urban corridor.
                  </p>

                </div>


              </div>
            </div>
          </div>
          </section>

          <section>
            <div className="bg-[#0f172a] min-h-screen p-10">
      <h1 className="text-white text-3xl mb-10 text-center font-baskervville font-bold">Floor Plan Options</h1>

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



        <section className="py-20 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto  px-4">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-baskervville font-bold text-[#0f172a] mb-4">
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
      <h3 className="text-2xl md:text-3xl font-baskervville font-bold font-bold text-[#0f172a] text-center mb-10">
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
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-400 text-sm mt-8 border-t pt-8 border-gray-50">
        & many other leading financial institutions
      </p>
    </div>

    <ContactSection projectName='Irish Eta 1' projectLocation='Irish Eta 1,Sector ETA 1 / ETA II, Greater Noida, Uttar Pradesh (Plot No. GH-01/A)' />
    {customEnquiry && (
            <div>
              <Customenquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} prop />
            </div>
          )}
    </div>
  )
}

export default Irishplatinumeta1
