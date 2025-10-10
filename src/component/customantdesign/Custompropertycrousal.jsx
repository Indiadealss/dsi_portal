import React from 'react'
import { Carousel } from 'antd'

const Custompropertycrousal = ({images}) => {
    console.log(images);
    const contentStyle = {
        height: '160px',
        color:'#fff',
        lineHeight:'160px',
        textAlign:'center',
        background:'#364d79',
    }

    
    
  return (
    <div className='w-[30vw] propertyListingImage'>
      <Carousel autoplay dots={false}>
        {images.map((item,index) => {
            return(
                <div key={index} style={contentStyle}>
                    <img
                    className='w-full h-auto rounded p-2 propertyListingImage'
                    style={{height:'20vw'}}
                    src={item.src}
                    />
                </div>
            )
        })}
      </Carousel>
    </div>
  )
}

export default Custompropertycrousal
