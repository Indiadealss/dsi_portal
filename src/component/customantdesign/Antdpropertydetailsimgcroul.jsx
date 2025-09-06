import React, { useEffect, useState } from 'react'
import { Carousel,Card, Button } from 'antd'
import { PauseOutlined } from '@ant-design/icons';  
import { FaPlay } from "react-icons/fa6";

const Antdpropertydetailsimgcroul = ({crousal,video}) => {
    console.log(video);
    

  return (
    <>
        <Card className='w-[48%] bg-gray-500 relative'>
            <div className={`${video === null ? 'hidden' : ''}`}>
            <video src=""></video>
            </div>
            <Carousel arrows   style={{margin:"auto"}} infinite={false} dots={false}>
                {crousal.map((item,index) => {
                    return(
                        <div className='key={index} className="flex justify-center rounded items-center'>
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