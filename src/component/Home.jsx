import React, { useEffect, useState } from 'react';
import { WhatsAppOutlined,ArrowRightOutlined } from "@ant-design/icons";
import { Card, Avatar, Typography } from "antd";
import banner from '../Images/banner.jpg';
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
import Customantservicecard from './customantdesign/Customantservicecard';
import Antddobluecardcrousal from './customantdesign/Antddobluecardcrousal';
import Antdcitiescardcrousal from './customantdesign/Antdcitiescardcrousal';
import Contiunebrowser from './customcomponent/Contiunebrowser';
import { getallProperty, getProjectBanner } from '../api/api';
import homepageBaner from '../Images/banner.jpg';
import { useSelector } from 'react-redux';
import Seo from './Seo';
import SclatingHomepage from './Loading/SclatingHomepage';
import HeroSearch from './HeroSearch';
import ProjectsCrousal from './customcomponent/ProjectsCrousal';
import PropertyList from './customcomponent/PropertyList';
import ImageCrousal from './customantdesign/ImageCrousal';
import CategoryGrid from './customcomponent/CategoryGrid';
import ServicesSection from './customcomponent/ServicesSection';
import CategoriesProperties from './customantdesign/CategoriesProperties';
import BrandsDoorSection from './customantdesign/BrandsdoorSection';
import ContactglobalForm from './customantdesign/ContactglobalForm';
import CitySection from './customantdesign/Citysection';
import TestimonialSection from './customantdesign/TestimonialSection';
const Home = () => {

   const [hideBanner, setHideBanner] = useState(false);
   const [page,setPage] = useState(1)
  const [hasMore,setHasMore]  = useState(true)
  const [loading,setLoading] = useState(false)
  const location = 'All India';
  const [data,setData] = useState([]);
  const [crousalData,setCrousalData] = useState();
  const [HandpickedProject,setHandpickedProject] = useState();

    const getcrousal = async  () => {
      const res =  await  getProjectBanner()
      console.log(res.data.data,'res 35');

       setCrousalData(res.data.data);
      
  }

  const user = useSelector((state) => state.user);

  
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 290) {
        setHideBanner(true);
      } else {
        setHideBanner(false);
      }
    };
    getcrousal()

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


 

  const fetchProperties = async (pageNumber,purpose) => {
          
         try{
          const res = await getallProperty(pageNumber,location,purpose);
          const resultsAre = res.data?.data;
          const result = resultsAre.filter((p) => p.purpose === 'Project')

          if(result.length === 0){
            setHasMore(false);
            return;
          }

          const formattedData = result.map((p) => {
            let locationData = [];
            try{
                locationData = JSON.parse(p.location);
                // console.log(p);
                
            }catch(err){
                locationData = [];
            }

            let highlights = [];
  if (p.propertyfacing) highlights.push({ helight: p.propertyfacing });
  if (p.pobackup) highlights.push({ helight: p.pobackup });
  if (p.watersource) highlights.push({ helight: p.watersource });
  if (Array.isArray(p.overlo)) {
    p.overlo.forEach((item) => {
      highlights.push({ helight: item });
    });
  }

            const validImages =
  Array.isArray(p.images) && p.images.length > 0
    ? p.images
        .filter(
          (img) =>
            img &&
            (img.src || img.fields?.src) &&
            (img.src || img.fields?.src) !== "No image uploaded"
        )
        .map((img) => ({
          type: img.type || img.fields?.type || "unknown",
          src: img.src || img.fields?.src || "",
          image: img, // store full original image object too
        }))
    : [];

            return{
                id:p._id,
                property:p.property,
      images: validImages.length ? validImages : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg', alt: "No image" }],
      title: locationData[0]?.apartment_name || p.projectname,
      heilights:highlights.length ? highlights : [{ helight: "N/A" }],
      subtitle: p.property === 'commercial' ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData[0]?.City}`: `${p.propertyType === 'plotLand' ? `${p.property} Property available in ${p.City} for ${p.purpose}`: `${p.bedroom} BHK ${p.propertyType} in ${p.City}`}`,
      bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
      bedroom:p.bedroom ? p.bedroom : '',
      location: p.location || "Unknown",
      price: p.price || 0,
      npxid:p.npxid? p.npxid : "N/A",
      deposit: p.deposit || "N/A",
      unitData:p.unitData || "N/A",
      officeUnits: p.officeUnits || "N/A",
      size: p.plotarea || 0,
      area: p.areaType || "Built-up",
      description: p.description || "No description available",
      time: new Date(p.updatedAt).toLocaleDateString() || "N/A",
      devloper: p.projectdeveloper || '',
      owner: p.owner || "Owner",
      hotScreen: p.hotScreen || false,
       };
    });
    console.log(formattedData, 'formattedData is myth');
    
          
          setData((prev) => [...prev, ...formattedData])
          if(res.status === 200 && res.totalPages !== page){
            setPage(page + 1)
          } 
          
      }catch(err){
          console.error(err);
      }finally{
          setLoading(false);      }
      };


      useEffect(() => {
              const handleScroll = ()  => {
                  if(
                      window.innerHeight + document.documentElement.scrollTop >=
                       document.documentElement.offsetHeight - 100 && 
                       hasMore && 
                       !loading
                  ) {
                      setPage(prev => prev + 1);
                  }
              };
              window.addEventListener("scroll",handleScroll);
              return () => window.removeEventListener("scroll",handleScroll);
          },[hasMore,loading])
      
          useEffect(() => {
              fetchProperties(page,'Project')
          },[page,location]);
      



  const  crousalDat = [
    {image:"https://picsum.photos/830/464?random=1"},
    {image:"https://picsum.photos/830/464?random=2"},
    {image:"https://picsum.photos/830/464?random=3"},
    {image:"https://picsum.photos/830/464?random=4"},
    {image:"https://picsum.photos/830/464?random=5"},
  ]

 

  if (!data || !crousalData) {
    // console.log(data);
    
        return (
            <div className='mt-[8vw]'>
                <SclatingHomepage />
            </div>
        )
    }

    
   const residential = data.filter(item => 
    item.property === 'residential'
);

console.log(residential, 'residential');

  console.log(residential,'residential');
  


    

    if(crousalData){
      console.log(crousalData);
    }
  return (
    <div>
      <Seo
              title='Residential and Commercial properties in India, Flats, Plots, Villas, Apartments'
              description="Brandsdoor.in offers to Buy, Sale, Lease and Rent Residential and Commercial Properties Like Flats, Plots, Villas, Apartments and Commercial Office Spaces, Shops & Industries Plots in India."
              canonical={`https://www.brandsdoor.in/`}
            />
      <div className='block'>
        <div className='relative'>
          <HeroSearch />
          {/* <div className='absolute  topSearchbox  object-cover w-[-webkit-fill-available] flex '>
            <Searchbox />
          </div> */}
        </div>
      </div>

      {/* <div className={user.loggedIn ?  'mt-20 hidden lg:block' : 'hidden'}>
        <Smallmain title='Continue browsing...' />
        <Contiunebrowser title='Continue browsing...' />
      </div> */}
      {/* small {'GET STARTED WITH EXPLORING REAL ESTATE OPTIONS'} */}
      

      {/* main */}
      <div className='lg:block
          w-[90%]
          2xl:w-[85%]
          3xl:w-[95%]
          4xl:w-[82%]
          mx-auto'>
        {/* <Smallmain  title='GET STARTED WITH EXPLORING REAL ESTATE OPTIONS' data={data}/> */}
        <PropertyList properties={data} />
        <CategoriesProperties />
        {/* <BrandsDoorSection /> */}
        
      </div>



        <div className=' lg:block
          w-[90%]
          2xl:w-[85%]
          3xl:w-[95%]
          4xl:w-[82%]
          mx-auto'>
             <CitySection />
             {/* <TestimonialSection /> */}
          </div>
      

       <div className='h-400px'>
        <div className=' w-full '>
            <ContactglobalForm />
           
            
            {/* <Contactussection /> */}
        </div>
       </div>

       

    </div>
  )
}


export default Home;