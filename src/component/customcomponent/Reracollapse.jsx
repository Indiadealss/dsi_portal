import React from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";

const Reracollapse = ({propertys}) => {

    console.log(propertys.rera,'h');
    
  return (
    <div>
      <div className="flex my-5">
        <div  className='flex bg-green-700 text-white rounded border'>
          <IoCheckmarkOutline className=' px-1 text-xl' />
          <span className='text-[10px] my-0.5'>RERA</span>
          <AiFillInfoCircle className='text-xl px-1' />
        </div>

        <div  className='flex rounded border bg-gray-100 mx-1'>
          <span className='text-[10px] my-1 px-1'>{propertys.availabestatus}</span>
        </div>

        <div className={propertys.availabestatus === 'Ready to move' ? 'hidden' : 'flex rounded border bg-gray-100 mx-1'}>
          {propertys.possession}
        </div>
      </div>
    </div>
  )
}

export default Reracollapse
