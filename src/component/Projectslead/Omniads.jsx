import React from 'react'

const Omniads = () => {

    const numberofActiveProduct = 12;

    const numberofCampain = [
    ]
  return (
    <div className=' overflow-y-auto'>
        <div className='flex justify-between px-5 border-b-2 p-3 border-gray-300'>
            <div>
                <span className='text-xs cursor-default'>ACTIVATION STATUS</span>
                <div className='flex'>
                <span className='text-xs px-3  border-e cursor-pointer text-gray-600'>ALL</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Active</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Expired</span>
            </div>
            </div>
            <div>
                <span className='cursor-default'>SORT</span>
            </div>
            
        </div>

        <div className='shadow-md w-[96%] m-3 p-2 border border-gray-300 rounded'>
            <span className='font-medium text-sm'>{numberofCampain.length} Active Products</span> 
        </div>
        <div className='pb-20 '>
        {numberofCampain?.map((item,index) => {
            return <div className='shadow-xl w-[96%] m-3 p-2 border border-gray-300 rounded py-10'>
                <div className='flex justify-around'>
                    <div><span>{item.projectName}</span></div>
                    <div>
                        <span>Expiry on: {item.expiry_Date}</span>
                    </div>
                    <div>
                        <p><span className='text-sm'>Campaign Type:{item.campain_type}</span></p>
                        <p><span className='text-sm'>Status:{item.campain_type}</span></p>
                        <p><span className='text-sm'>View {item.count} Responses</span></p>
                    </div>
                </div>
            </div>
        })}
        </div>
        
    </div>
  )
}

export default Omniads;
