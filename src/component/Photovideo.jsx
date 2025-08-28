import React from 'react'
import { Uploadfile } from './Uploadfile'

export const Photovideo = () => {
  return (
    <>
        <h3 className='text-xl font-medium'>Add one Video of Property</h3>
        <p className='text-sm font-medium text-gray-400 my-3'>A video is worth a thousand picture with video get higher page views.</p>
        <div>
        <label className='font-medium my-3'>Upload Video</label>
        <Uploadfile />
        <p className='text-xl font-medium mt-5'>Add photos of your Property<span className='text-sm font-normal text-gray-400'>(optional)</span></p>
        <p className='text-sm font-normal text-gray-400 my-1'>A picture is worth a thousand words. 87% of buyers look at photos before buying</p>
        <div className='mt-5'>
        <label className='font-medium'>Upload Photos</label>
        <Uploadfile />
        </div>
        </div>
    </>
  )
}
