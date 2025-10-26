import React, { useEffect, useState } from 'react';
import Propertydetailsstickcard from './customcomponent/Propertydetailsstickcard';
import Antdcardcrousal from './customantdesign/Antdcardcrousal';
import Antdpropertydetailsimgcroul from './customantdesign/Antdpropertydetailsimgcroul';
import Propertydetailscarddata from './customcomponent/Propertydetailscarddata';
import Placesnearby from './customcomponent/placesNearby';
import Propertytransation from './customcomponent/Propertytransation';
import Aboutproperty from './customcomponent/Aboutproperty';
import Furnshingdetails from './customcomponent/Furnshingdetails';
import Propertydelardetail from './customcomponent/Propertydelardetail';
import Simllarpropertites from './customcomponent/Simllarpropertites';
import Newlaunchcard from './customcomponent/Newlaunchcard';
import Appartmentvill from './customantdesign/Appartmentvill';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import { getproperty } from '../api/api';
import { useDispatch } from 'react-redux';
import { setProperty } from './Redux/propertyidSlice';

const Propertydetails = () => {

   const [dealer,setDealer] = useState(null);
   const [smilarProper,setSmilarProper] = useState(null);

const handleDealerPosition = (y) => {
     setDealer(y) 
     console.log(y);
     
   }

   const handleSimalerPosition = (y) => {
      setSmilarProper(y)
      console.log(y,"let's see");
      
   }
   const buttonNames = [
           {
               title: 'Overview',
               to: 61
               
           },
           {
               title: 'Dealer Details',
               to: dealer
           },
           {
               title: 'Registry Record',
               to: 0
           },
           {
               title: 'Explore Locality',
               to: 400
           },
           {
               title: 'Recommendations',
               to: smilarProper
           },
           {
               title: 'Articles',
               to: 1800
           }
       ]

   

   const { id } = useParams();
   const dispatch = useDispatch();

   const [propertys,setPropertys] = useState(null);
   const [crousalData, setCrousalData] = useState([]);
   const [video,setVideo] = useState([]);

   useEffect(() => {
      fetchproperty()
   },[id])

   const fetchproperty = async () => {
      try{
         const res = await getproperty(id);
         const data = res.data
         setPropertys(data);
         dispatch(setProperty(res.data));

         if(data){
            if(data.images && data.images.length > 0){
               setCrousalData(data.images.map((img)=>({
                  image:img.src
               }))
            );
            }
         }
         if(data.video && data.video.length > 0){
                  setVideo(data.video.map((video) => ({
                     video:video.src
                  }))
               );
               }
         
      }catch(err){
         console.error(err);
         
      }
   }
    
 const  crousalDaata = [
    {image:"https://picsum.photos/530/364?random=1"},
    {image:"https://picsum.photos/530/364?random=2"},
    {image:"https://picsum.photos/530/364?random=3"},
    {image:"https://picsum.photos/530/364?random=4"},
    {image:"https://picsum.photos/530/364?random=5"},
  ]

  const furnshingdetails = [
    "Modular Kitchen",
    "No AC",
    "No Bed",
    "No Chimney",
    "No Curtains",
    "No Dining Table",
    "No Exhaust Fan",
    "No Fan",
    "No Geyser",
    "No Light",
    "No Fridge",
    "No Sofa",
    "No Stove",
    "No TV",
    "No Wardrobe",
    "No Washing Machine",
    "No Water Purifier",
    "No Microwave",
  ];

  const features = [
   'Lifts',
   'Mantenance Staff',
   'Water Storage',
   'Park',
   'Waste Disposal'
  ]

  
    
  return (
   <>
   <Propertydetailsstickcard buttonNames={buttonNames} />
   <div className='m-0 lg:mx-10'>
   <div className='relative'>
   <Antdpropertydetailsimgcroul crousal={crousalData} video={video}  />
   </div>
   <div className='perdetdacaabsolute' >
   <Propertydetailscarddata property={propertys} />
   </div>
   <div className='mt-10'>
      <Placesnearby property={propertys} />
   </div>
   <div className='mt-10'>
    <Propertytransation />
   </div>
   <div className='my-5'>
      <Aboutproperty />
   </div>
   <div className='my-4'>
      <Furnshingdetails furnshingdetails={furnshingdetails} title={'Semifurnished'} subtitle={'Furnishing Details'} rows={6} />
   </div>
   <div className='my-4'>
      <Furnshingdetails furnshingdetails={features} title={'Semifurnished'} rows={6}/>
   </div>
   </div>
   
   {/* <div className='my-6'>
      <Furnshingdetails furnshingdetails={features} title={'Semifurnished'} rows={6}/>
   </div> */}
   <div className='m-0 lg:mx-10'>
      <div className='my-4'>
         <Propertydelardetail  onDealerPosition={handleDealerPosition}/>
   </div>
   </div>
   <div className='m-0 lg:mx-10'>
      <div className='my-4'>
         <Simllarpropertites title={'Similar Properties'} onDealerPosition={handleSimalerPosition} />
   </div>
   </div>
   <div className='m-0 lg:mx-10'>
      <div className='my-4'>
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

   </>
  )
}

export default Propertydetails;