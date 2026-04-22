import React from 'react'
import { useSelector } from 'react-redux'

const Aboutproperty = () => {

  const property = useSelector((state) => state.propertyid.data);

  let locationData = null;

  
  
  
  
  if(!property || !property.location || !property.description){
    return(
      <div className='py-4 border-b border-gray-300'>
        Loading...
      </div>
    )
  }

    const parseLocation = (location) => {
  if (typeof location === "string") {
    try {
      return JSON.parse(location);
    } catch {
      return null;
    }
  }
  return location;
};
  locationData = parseLocation(property.location);
  // console.log(locationData);
  

  const aboutDetaild = {
    title:'About Property',
    Address:locationData[0]?.City,
    addressDetails:property.description
  }
  
  return (
    <div className='py-4 border-b border-gray-300'>
        <div className='grid grid-cols-1'>
                    <p  className='my-1'>
                        <span className='font-medium capitalize'>{aboutDetaild.title}</span>
                    </p>
                    <p  className='my-1'>
                        <span>Address: {aboutDetaild.Address}</span>
                    </p>
                    <p  className='my-1'>
                        <span>{aboutDetaild.addressDetails}</span>
                    </p>
        </div>
    </div>
  )
}

export default Aboutproperty