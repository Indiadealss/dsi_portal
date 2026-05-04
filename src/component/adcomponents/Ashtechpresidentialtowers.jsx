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
  import { motion } from "framer-motion";

const Ashtechpresidentialtowers = () => {

     


const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

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
        projectname:'Ashtech Presidential Towers'
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
    size: "2095 SQ. FT.",
    features: "Low-density premium tower",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/3BHK_3TOIL._DRESS@3x.png'
  },
  {
    id: 3,
    title: "3 BHK + 3T + Study",
    size: "2395 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/3BHK_3TOIL._DRESS_P.D_STORE_SER.RM.@3x.png'
  },
  {
    id: 2,
    title: "3 BHK + 3T + Servent + Store",
    size: "2875 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/3BHK_3TOIL._DRESS_P.D_STORE_SER.RM.@3x.png'
  },
  {
    id: 4,
    title: "4 BHK + 4T + Store + SER",
    size: "3095 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/3BHK_3TOIL._DRESSSTUDY RM.@3x.png'
  },
  {
    id: 5,
    title: "4 BHK + 4T + Store + SER",
    size: "3495 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/4BHK_4TOIL._DRESS_P.D._STORE_SER._1@3x.png'
  },
  {
    id: 6,
    title: "4 BHK + 4T + Store + SER",
    size: "3595 SQ.FT",
    features: "MIVAN Superior Construction",
    imageUrl: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/4BHK_4TOIL._DRESS_PD.RM._STORE@3x.png'
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
          title: "Resort-style Landscaping",
          description: "Over 80% open and green",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/ASHTECH@3x(4).png', // Replace with your image paths
        },
        {
          title: "Triple-height Lobby",
          description: "A grand welcome every time",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/ASHTECH@3x(5).png',
        },
        {
          title: "Luxury Access",
          description: "2-to-a-core Residences With Private Lift Lobbies",
          image: 'https://d3eoh63gynpjzh.cloudfront.net/ashtech/ASHTECH@3x(8).png',
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
              title='Ashtech Presidential Towers'
              description="Ashtech Presidential Towers Plot No. GH-01/F,G,H & I, Sector 12, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, 201318"
              canonical={`https://www.brandsdoor.in/irish-platinum`}
            />
      <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }} className="relative h-[90vh] min-h-[700px] w-full flex flex-col  justify-center text-white text-center px-4 overflow-hidden">
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
  src="https://d3eoh63gynpjzh.cloudfront.net/ashtech/bannerAchtesh.webp"
  className="object-cover object-bottom   w-[-webkit-fill-available] h-[-webkit-fill-available]"
  alt=""
/>
        {/* <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" /> */}
      </div>

      {/* 2. Top Navigation Items (Logo & Labels) */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col items-center">
            <div className="w-72 h-12  rounded-full p-4 flex items-center justify-center mb-1">
                <img draggable="false"
                    src='https://d3eoh63gynpjzh.cloudfront.net/ashtech/AshtechBLogo.svg' // Replace with your image path
          fill
          className="object-cover"
          priority
          alt="Ashtech Presidential Towers"
        />
            </div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-10 text-right hidden md:block">
        <div className="w-52 h-12  flex items-center justify-center mb-1">
                <img draggable="false"
          src='https://d3eoh63gynpjzh.cloudfront.net/ashtech/ASHTECHLOGO.png' // Replace with your image path
          fill
          className="object-cover "
          priority
          alt="Ashtech Presidential Towers"
        />
            </div>
        
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-5xl space-y-5">
        <h1 className="text-5xl text-[#732430] md:text-7xl font-bold tracking-tight drop-shadow-lg">
          <span className="text-[#732430]">Luxury 3 & 4 BHK Apartments</span>
        </h1>
        
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-wider">
            <span className="text-[#732430]">Ashtech Presidential Towers</span>
          </h2>
          <p className="text-sm md:text-lg text-[#732430] font-semibold tracking-tight">
            5  TOWER | GREATER NOIDA WEST
          </p>
          <p className="text-sm md:text-lg text-[#732430] font-semibold tracking-tight">
          RERA APPROVED :- UPRERAPRJ746615/10/2025
          </p>
        </div>

        <div className="py-2">
          <p className="text-lg md:text-2xl font-bold text-[#732430]">
            Starting Price – ₹ 2.4 Cr*
          </p>
          <p className="text-xs md:text-sm font-medium opacity-90 mt-2 text-[#732430] flex flex-wrap justify-center gap-x-4">
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
          <button onClick={() => setCustomEnquiry(true)} className="bg-gradient-to-r from-[#7a553a] to-[#a3836a] hover:scale-105 transition-transform px-10 py-4 rounded-full font-bold text-sm uppercase shadow-xl cursor-pointer text-[#732430]">
            Book Site Tour
          </button>
          <button onClick={() => setCustomEnquiry(true)} className="border-2 border-[#732430] backdrop-blur-sm hover:scale-105  transition-all px-10 py-4 rounded-full font-bold text-sm uppercase cursor-pointer text-[#732430]">
            Explore
          </button>
        </div>
      </div>

    </motion.div>
    <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }} className="bg-[#0f172a] pt-20 ">
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
    
          <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }} className="py-20 bg-white">  
          <div className="max-w-7xl mx-auto  px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-6">
                Why Ashtech Presidential Towers is in Tranding
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for Ultra luxury apartments in Greater Noida West with premium amenities and high appreciation?
              </p>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4"> Ashtech Presidential Towers</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                 Ashtech Presidential Towers is a RERA-registered housing society being developed by Ashtech Builder in Sector 12 of Greater Noida West. It is currently under construction and set for completion in September 2030. The project is set to be a luxury residential space where people can enjoy sprawling open spaces, premium amenities and an elevated urban living experience.
                 </p>
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Project Features
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   The Ashtech Presidential Towers project has an area of 5.5 acres, with 5 towers having 30 floors each. The project will have 80% open space. The flats have configurations of 4-BHK and 3-BHK. The flats will have wide balconies and smart interiors that ensure natural lighting & ventilation. 
                   </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   The 3-BHK unit has three variants- 2095 sq. ft., 2395 sq. ft., and 2875 sq. ft. The 4-BHK units also come in three sizes - 3095 sq. ft., 3495 sq. ft., 3595 sq. ft. 
                   </p>
                </div>
    
                
              </div>
    
              {/* Right Side: Image with Rounded Corners */}
              <div className="relative h-[600px] md:h-[700px] w-full rounded-[40px] overflow-hidden shadow-2xl">
               <img draggable="false"
        src='https://d3eoh63gynpjzh.cloudfront.net/ashtech/ASHTECH@3x(3).png'
        alt="Tower T-10 Gold Render"
        // 'object-contain' puri image dikhayega, bina crop kiye.
        // 'object-bottom' building ko neeche se align karega taaki neeche khali jagah na dikhe.
        className="w-full h-full "
      />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
              <div className="space-y-8">
                <div className="mt-10">
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                    Project Features 
                    </p>
                  <p className="text-gray-600 leading-relaxed text-justify">
                  Ashtech Presidential Towers offers premium spacious homes, and a comprehensive elevated living experience that caters to health, wellbeing, leisure and community. The project offers a large 75,000 sq. ft. clubhouse with indoor games and facilities of lush landscaped gardens, a jogging track, children’s play area, fitness zones, a swimming pool, and a dedicated community space for leisure and celebrations. The project also has provisions for solar lighting, CCTV camera surveillance for security, and a dedicated cabin for security personnel. 
                  </p>
                 
                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Key Features  
                  </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   <ul>
                    <li>●	Wide balconies, natural lighting & ventilation in flats.</li>
                    <li>●	80% open area in the project, with the majority of the area being covered in greenery.</li>
                    <li>●	Proximity to Noida, Greater Noida, Delhi, Ghaziabad and Faridabad.</li>
                    <li>●	CCTV-monitored controlled access with professional security personnel </li>
                    <li>●	Get a unit of your choice.</li>
                    <li>●	This project’s RERA registration number is UPRERAPRJ746615/10/2025</li>
                    </ul>
                   </p>
                   <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Premium Living with High-End Amenities  
                  </p>
                   <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                 Greater Noida West is known for modern gated communities that offer a mix of luxury and functionality. Homebuyers are increasingly drawn to the area’s feature-filled housing societies and adjoining amenities. From high-street retail zones and boutique cafes to fully-equipped gyms and sports complexes, the social infrastructure is designed to cater to an aspirational lifestyle. With a proposed integration of the upcoming Rapid Rail (RRTS) link and the continued expansion of the metro network, Greater Noida West is shaping up to be a future-proof investment in a world-class residential ecosystem.
                 </p>

                  <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Strategic Connectivity
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                    Strategically nestled between Noida and Greater Noida, Greater Noida West ( also known as Noida Extension) is a premier residential corridor within the Delhi-NCR. It offers unparalleled road connectivity through the Delhi-Meerut Expressway (NH-24)and the Noida-Greater Noida Link Road, putting Ghaziabad, Gurugram, and Delhi within easy reach. The recent opening of the Parthala Signature Bridge has further streamlined transit, providing a signal-free route to Central Noida. With the Noida International Airport (Jewar) now operational and becoming a global aviation hub, the area has secured its place as a strategic centre for both living and long-term growth.
                    </p>

                    <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Seamless Daily Commuting
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   Greater Noida West offers effortless connectivity to the primary employment hubs of Noida and Delhi. The area is served by wide, 130-meter roads that significantly reduces travel time. Residents benefit from the proximity to the Noida Sector 52 (Blue Line) and Sector 51 (Aqua Line) metro stations, with the planned Aqua Line extension set to bring metro connectivity even closer to residential sectors. Whether you are driving via the FNG Expressway or using the efficient network of cabs and e-rickshaws, the daily commute to office clusters across the NCR is smooth and predictable.
                   </p>

                   <p className="text-gray-800 leading-relaxed mt-3 text-justify font-bold ">
                  Cohesive Lifestyle Ecosystem
                  </p>
                    <p className="text-gray-600 leading-relaxed mt-3 text-justify">
                   Greater Noida West has evolved from a developing pocket in the outskirts of Noida into a vibrant, self-sustained urban destination within NCR. For families, the area offers a lifestyle where all amenities are at their doorstep. The area is home to prestigious schools like Ryan International, Lotus Valley, and GD Goenka, ensuring world-class education just minutes away. Healthcare is equally accessible with multi-speciality hospitals such as Yatharth, Sarvodaya, and NuMed Hospital providing round-the-clock medical care. Residents can find all their shopping and entertainment needs at local retail hubs and major malls like Gaur City Mall, making it an ideal choice for a balanced family life.
                   </p>
                </div>
    
                
              </div>
            </div>
          </div>
          </motion.div>
    
    
    
          <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }} className="bg-[#fdf2f0] py-16 px-6">
    
            <h2 className='font-serif text-center py-10'>The Finest Address—Now at Its Finest Price</h2>
            <div className='text-center mx-auto lg:w-140 pb-5'>
            <p className=' text-center'><span className='text-xl'>Developed by ASHTECH Group</span></p>
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
                    <p className="text-[#333] font-bold">3 BHK + 3 Toilets + Dress: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2095 sq ft</span>
                  </p>
                    <p className="text-[#333] font-bold">3 BHK + 3 Toilets + Dress + Study: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2395 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">3 BHK + 3 Toilets + Store + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">2895 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">4 BHK  + 4 Toilets + Store + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">3495 sq ft</span>
                  </p>
                  <p className="text-[#333] font-bold">4 BHK  + 4 Toilets + Store + Servent: 
                    <span className="font-normal text-gray-600 block sm:inline ml-0 sm:ml-2">3595 sq ft</span>
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
                  <p className="text-[#333] font-bold">Per Floor: <span className="font-normal text-gray-600"> 4 unit per floor in 3 BHK Tower & 4 unit per floor in 4 BHK </span></p>
                  <p className="text-[#333] font-bold">Lifts: <span className="font-normal text-gray-600">3 High-Speed Lifts</span></p>
                  <p className="text-[#333] font-bold">Type: <span className="font-normal text-gray-600">Low-density premium tower</span></p>
                </div>
              </div>
    
            </div>
          </div>
        </motion.div>
    
    
        <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }} className="py-20 bg-gray-50 px-6">
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
        </motion.div>
    
    
    
        </motion.div>
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


    <ContactSection projectName='Ashtech Presidential Towers' projectLocation='Plot No. GH-01/F,G,H & I, Sector 12, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, 201318'/>
    {customEnquiry && (
            <div>
              <Customenquiryform setCustomEnquiry={setCustomEnquiry} propertys={propertys} />
            </div>
          )}
    </div>
  )
}

export default Ashtechpresidentialtowers
