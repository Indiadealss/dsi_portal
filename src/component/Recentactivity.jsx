import React, { useState } from 'react'

const Recentactivity = () => {

    const [active , setActive] = useState('')
    
  return (
    <div className='w-[70vw] mx-auto'>
      <div className='mt-10'>
        <div className='flex border-none overflow-x-auto lg:border-b lg:border-gray-200'>
            <button name='recent' onClick={(e) => setActive(e.currentTarget.name)} className={active === 'recent' ?  'p-4 cursor-pointer m-[1px] font-normal lg:font-medium border-b-2 border-blue-300' : 'p-4 cursor-pointer font-normal lg:font-medium'}>
                <span className='text-xs lg:text-lg'>
                    Recent Searches
                </span>
            </button>
            <button name='viewed' onClick={(e) => setActive(e.currentTarget.name)} className={active === 'viewed'? 'p-4 cursor-pointer m-[1px] font-normal lg:font-medium border-b-2 border-blue-300' : 'p-4 cursor-pointer font-normal lg:font-medium'}>
                <span className='text-xs lg:text-lg'>
                    Viewed
                </span>
            </button>
            <button name='shortlisted'  onClick={(e) => setActive(e.currentTarget.name)} className={active === 'shortlisted'? 'p-4 cursor-pointer m-[1px] font-normal lg:font-medium border-b-2 border-blue-300' : 'p-4 cursor-pointer font-normal lg:font-medium'}>
                <span className='text-xs lg:text-lg'>
                    Shortlisted
                </span>
            </button>
            <button name='contacted' onClick={(e) => setActive(e.currentTarget.name)} className={active === 'contacted'? 'p-4 cursor-pointer m-[1px] font-normal lg:font-medium border-b-2 border-blue-300' : 'p-4 cursor-pointer font-normal lg:font-medium'}>
                <span className='text-xs lg:text-lg'>
                    Contacted
                </span>
            </button>
        </div>

        <div className='mt-10'>

        </div>
      </div>
    </div>
  )
}

export default Recentactivity;
