import React from 'react';
import Propertydetailsstickcard from './customcomponent/Propertydetailsstickcard';
import Antdcardcrousal from './customantdesign/Antdcardcrousal';
import Antdpropertydetailsimgcroul from './customantdesign/Antdpropertydetailsimgcroul';
import Propertydetailscarddata from './customcomponent/Propertydetailscarddata';

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
   <div className='mx-10'>
   <div className='relative'>
   <Antdpropertydetailsimgcroul crousal={crousalData} video={video}  />
   </div>
   <div className='propertydetails' style={{position:'absolute',right:70,top:'340px'}}>
   <Propertydetailscarddata  />
   </div>
   <div>
        
   </div>
   </div>
   </>
  )
}

export default Propertydetails;