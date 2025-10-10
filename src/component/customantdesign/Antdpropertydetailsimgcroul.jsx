import React, { useEffect, useState } from 'react'
import { Carousel,Card, Button } from 'antd'
import { PauseOutlined } from '@ant-design/icons';  
import { FaPlay } from "react-icons/fa6";

const Antdpropertydetailsimgcroul = ({crousal,video}) => {
    // console.log(video);
    

  return (
    <>
        <Card className='w-[100%] lg:w-[48%] bg-gray-500 relative'>
            <div className={`${video === null ? 'hidden' : ''}`}>
            {/* <video src="https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/1759916350173-1759316917750-WhatsApp%2BVideo%2B2025-09-23%2Bat%2B11.44.03%20%281%29.mp4"></video> */}
            </div>
            <Carousel arrows   style={{margin:"auto"}} infinite={false} dots={false}>
                {crousal.map((item,index) => {
                    return(
                        <div key={index}  className="flex justify-center rounded items-center">
                        <img src={item.image} alt={index} className='rounded-t m-auto w-150 h-[40vw]' />
                </div>
                    )
                })}
                
            </Carousel>
            <div className="absolute bottom-2 left-1/2 bg-gray-300 rounded-full overflow-hidden">
        
            </div>
      
     
        </Card>
    </>
  )
}

export default Antdpropertydetailsimgcroul;