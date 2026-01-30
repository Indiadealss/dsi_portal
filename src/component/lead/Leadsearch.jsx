import React, { useState } from 'react'
import Residential from './Residential'
import Commercial from './Commercial'
import Autoalerts from './Autoalerts'
import Purchasedleads from './Purchasedleads'
import Creditusage from './Creditusage'

const Leadsearch = () => {

    const [active,setActive] = useState()
    const buttons = [
        {name:'Residential',Link:'/lmsSearch',activeBtn:<Residential />},
        {name:'Commercial',Link:'/lmsSearch',activeBtn:<Commercial />},
        {name:'Auto Alerts',Link:'/lmsSearch',activeBtn:<Autoalerts />},
        {name:'Purchased Leads',Link:'/lmsSearch',activeBtn:<Purchasedleads />},
        {name:'Credit Usage',Link:'/lmsSearch',activeBtn:<Creditusage />},
    ]
  return (
    <div className='w-[70%] mx-auto'>
      <div className='flex justify-between border-b border-gray-300 p-3'>
        <div>
            <h2><span className='font-medium text-gray-600'>Lead Search</span></h2>
        </div>
        <div>
            <p><span>Creadits Balance</span></p>
            <p><span className='text-green-500'>0/0</span></p>
        </div>
      </div>
      <div className='mt-3'>
        <div className='flex'>
            {buttons.map((item,index) => {
               return <button key={index} onClick={() => setActive(`${item.name}`)} className={active === item.name ? 'border border-gray-200 bg-white text-xs font-medium text-gray-500 cursor-pointer mx-3 p-3' : 'p-3 cursor-pointer border border-gray-300 bg-gray-100 text-xs font-medium mx-3'}>
                {item.name}
            </button>
            })}
        </div>
        <div className='border border-gray-300'>
           {buttons.map((item,index) => {
            return <div key={index} className={active === item.name ? '' : 'hidden'}>
                    {item.activeBtn}
            </div>
           })}
        </div>
      </div>
    </div>
  )
}

export default Leadsearch;
