import React from 'react'
import { useSelector } from 'react-redux';

const Propertytransation = () => {

  const property = useSelector((state) => state.propertyid.data);

  

//   console.log(property.road_width,'okk');
    

    if(!property || !property.purpose){
        return(
            <div className="text-center py-4 text-gray-500">
                Loading...
            </div>
        )
    }



    const fullDetails = {
        transational:property.purpose,
        Road:property.road_width ? property.road_width : 'j',
        powerbackup:property.pobackup,
        Ownership:property.ownership,
        // gatedCommunity:'yes',
        // propertyCode:'E34398',
        flooring:'Vitrified',
    parking:property.coveredparking+' Coverd '+ property.uncoveredparking+' Uncoverd',
        furnshing:property.furnishing,
        watersource:property.watersource,
    }

  return (
    <div className='py-4 border-b border-gray-300'>
            <div className='grid grid-cols-2 mx-2 lg:grid-cols-3'>
                {Object.entries(fullDetails).map(([key,value]) => (
                    <p key={key} className='flex gap-2 flex-col lg:flex-row'>
                        <span className='font-medium capitalize'>{key} :</span>
                        <span>{value}</span>
                    </p>
                ))}
            </div>
    </div>
  )
}

export default Propertytransation;