import React, { useEffect, useState } from 'react'
import landmark from '../../Images/landmarkGroup.png'
import Antplanerbycus from '../customantdesign/Antplanerbycus'
import { useSelector } from 'react-redux';

const Placesnearby = () => {

  const property = useSelector((state) => state.propertyid.data);
  let locationData = null;

  try{
    if(property?.location){
      locationData = JSON.parse(property.location);
    }
  }catch(er){
    console.error(er);
    
  }

  // console.log(locationData,"hello");
  

  


  const placeNearby = {
    location:'H-01,Sector27,Greater Noida',
    nearlocations:[
      {title:"Delta 1 Metro Station"},
      {title:"MSX Mall"},
      {title:"Noida-Grater Noida E"},
      {title:"Somerville School"},
      {title:"Ram-Eesh Institue"},
      {title:"Kailash Hospital"},
      {title:"Indira Gandhi International Airpot"},
      {title:"Boraki station"},
    ]
}

if (!property || !property.location) {
    return (
      <div className="text-center py-4 text-gray-500">
        Loading nearby places...
      </div>
    );
  }
  return (
    <div className='block max-w-full p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100  '>
        <div className='flex my-2 max-w-[-webkit-fill-available] my-3'>
            <img className='' src={landmark} alt="..." />
            <div>
            <h2>Place nearby</h2>
            <p>{`${locationData.apartment_name}  ${locationData.Address}`}</p>
            </div>
        </div>
        <Antplanerbycus  />
    </div>
  )
}

export default Placesnearby;