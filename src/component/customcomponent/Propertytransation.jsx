import React from 'react'

const Propertytransation = () => {

    const fullDetails = {
        transational:'Resale',
        width:'45.0 Feet',
        powerbackup:'full',
        propertyOwnership:'Leasehold',
        gatedCommunity:'yes',
        propertyCode:'E34398',
        flooring:'Vitrified',
        parking:'2 Covered',
        furnshing:'Semifurnished',
        watersource:'Borewell/Tank'
    }


  return (
    <div className='py-4 border-y border-gray-300'>
            <div className='grid grid-cols-3'>
                {Object.entries(fullDetails).map(([key,value]) => (
                    <p key={key} className='flex gap-2'>
                        <span className='font-medium capitalize'>{key}</span>
                        <span>{value}</span>
                    </p>
                ))}
            </div>
    </div>
  )
}

export default Propertytransation