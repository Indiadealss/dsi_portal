import React from "react";
import { Carousel } from "antd";

const Antdcrousal = () => {
    const hedding = [
        {title:"Limited Launch offeres avalable"},
        {title:"Limited Launch offeres avalable"},
        {title:"Limited Launch offeres avalable"},
        {title:"Limited Launch offeres avalable"},
        {title:"Limited Launch offeres avalable"},
    ]
    
  return (
    <Carousel autoplay autoplaySpeed={3000} dots={false}>
        {hedding.map((item,index) =>{
            return(
      <div key={index} className="" >
        <h3>
          {item.title}
        </h3>
      </div>
      )
        })}
    </Carousel>
  );
};

export default Antdcrousal;
