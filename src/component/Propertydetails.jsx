import React from 'react';
import Propertydetailsstickcard from './customcomponent/Propertydetailsstickcard';
import Antdcardcrousal from './customantdesign/Antdcardcrousal';
import Antdpropertydetailsimgcroul from './customantdesign/Antdpropertydetailsimgcroul';
import Propertydetailscarddata from './customcomponent/Propertydetailscarddata';
import Placesnearby from './customcomponent/placesNearby';
import Propertytransation from './customcomponent/Propertytransation';

const Propertydetails = () => {
    
 const  crousalData = [
    {image:"https://picsum.photos/530/364?random=1"},
    {image:"https://picsum.photos/530/364?random=2"},
    {image:"https://picsum.photos/530/364?random=3"},
    {image:"https://picsum.photos/530/364?random=4"},
    {image:"https://picsum.photos/530/364?random=5"},
  ]

  const video = null;
    
  return (
   <>
   <Propertydetailsstickcard />
   <div className='m-0 lg:mx-10'>
   <div className='relative'>
   <Antdpropertydetailsimgcroul crousal={crousalData} video={video}  />
   </div>
   <div className='perdetdacaabsolute' >
   <Propertydetailscarddata  />
   </div>
   <div className='mt-10'>
      <Placesnearby />
   </div>
   <div className='mt-10'>
    <Propertytransation />
   </div>
   <div className='mt-10'>
      
   </div>
   </div>
   </>
  )
}

export default Propertydetails;