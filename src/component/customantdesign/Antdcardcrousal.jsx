import React, { useEffect, useState } from 'react'
import { Carousel,Card, Button } from 'antd'
import { PauseOutlined } from '@ant-design/icons';  
import { FaPlay } from "react-icons/fa6";

const Antdcardcrousal = ({crousal}) => {
    const [progress,setProgress] = useState(0)
    const [autoplay,setAutoplay] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoplaySpeed = 5000; // 5sec
    const intervel = 50;

    console.log(crousal.map((item) => item.banner));
    

    const handleAfterChange = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

    useEffect(() => {
        if(!autoplay) return; 

        if (currentSlide === crousal.length - 1) {
      setAutoplay(false);
      setProgress(100);
      return;
    }

        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + (intervel /autoplaySpeed) * 100))
        }, intervel)

        return () => clearInterval(timer);
    },[autoplay]);

    const playPause = () => {
    setAutoplay((prev) => !prev);
    setProgress(0); // reset bar when toggling
  };
  return (
    <>
        <Card className='w-[72%] bg-gray-500 relative'>
            <Carousel arrows   style={{margin:"auto"}} infinite={false} autoplay={autoplay} afterChange={handleAfterChange}  autoplaySpeed={autoplaySpeed} dots={false}>
                {crousal.map((item,index) => {
                    return(
                        <div className='key={index} className="flex justify-center rounded items-center w-[54vw] h-[40vw]'>
                        <img src={item.banner} alt={index} className='rounded-t m-auto w-[54vw] h-[40vw]' />
                </div>
                    )
                })}
                
            </Carousel>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-1 bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute bottom-10 right-10 overflow-hidden">
        <button className='bg-[#00000066] text-white p-2 rounded-full cursor-pointer' onClick={playPause}>
            {autoplay === true ? (
                <PauseOutlined  />
            ): (
                <FaPlay />
            )}
        </button>
      </div>
     
        </Card>
    </>
  )
}

export default Antdcardcrousal