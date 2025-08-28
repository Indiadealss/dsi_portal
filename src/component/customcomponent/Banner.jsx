import React from 'react'
const Banner = ({image}) => {
  return (
    <>
        <div className=''>
           <img src={image} alt='...' className='banerImage' />
        </div>
    </>
  )
}

export default Banner