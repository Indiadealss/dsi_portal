import React from 'react'
const Banner = ({image}) => {
  return (
    <>
        <div className=''>
           <img src={image} alt='...' className='banerImage w-[100%]' />
        </div>
    </>
  )
}

export default Banner