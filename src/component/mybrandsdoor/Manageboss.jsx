import React from 'react'
import { WiDirectionUpRight } from "react-icons/wi";
import Manabossbar from '../customantdesign/Manabossbar';


const Manageboss = () => {
  return (
    <div className='mx-5'>
      <div className='flex justify-between'>
        <h4><span className='text-gray-700 font-medium'>Your Plan Status</span></h4>
        <div className='flex text-blue-500 cursor-pointer'>
        <p><span>See Contacted Properties</span></p>
        <WiDirectionUpRight className='text-xl'/>
        </div>
      </div>

      {/* Limited Contact */}

      <div className='mt-5'>
      <Manabossbar totalContacts={0} usedContacts={0} />
      </div>
    </div>
  )
}

export default Manageboss
