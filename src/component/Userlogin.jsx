import React, { useState } from 'react'
import Customcardcrousal from './customantdesign/Customcardcrousal'
import Customimagebar from './customantdesign/Customimagebar'
import Appartmentvill from './customantdesign/Appartmentvill'
import Newlaunchcard from './customcomponent/Newlaunchcard'
import Banner from './customcomponent/Banner';
import banner from '../Images/logoi.png';
import Customcard from './customantdesign/Customcard'
import { Card } from 'antd'
import Propertypostresponse from './customcomponent/Propertypostresponse'
import Searchbox from './customcomponent/Searchbox'

const propertyIds = ["P101", "P102", "P103"];

const Userlogin = () => {

    const [selected, setSelected] = useState(propertyIds[0]);
  return (
    <div className='mb-10'>
        <div className='block'>
        <div className='relative'>
          <Banner image={banner} />
          <div className='block lg:absolute   top-[88%] object-cover w-[-webkit-fill-available]'>
            <Searchbox />
          </div>
        </div>
      </div>
        <div className="  grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 lg:mt-40 lg:px-5 w-full max-w-[1440px] mx-auto">
        <div className="lg:col-span-8 ms-3 space-y-10">
          <Propertypostresponse propertyIds={propertyIds} selectedId={selected} onChange={setSelected} /> 
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-20 right-0 left-10">
            <Customcard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userlogin