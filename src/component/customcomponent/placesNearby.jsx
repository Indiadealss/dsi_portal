import React from 'react'
import landmark from '../../Images/landmarkGroup.png'
import Antplanerbycus from '../customantdesign/Antplanerbycus'

const Placesnearby = () => {

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
  return (
    <div className='block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
        <div className='flex my-2 max-w-[270px] justify-between'>
            <img className='' src={landmark} alt="..." />
            <div>
            <h2>Place nearby</h2>
            <p>{placeNearby.location}</p>
            </div>
        </div>
        <Antplanerbycus  articles={placeNearby.nearlocations} />
    </div>
  )
}

export default Placesnearby;