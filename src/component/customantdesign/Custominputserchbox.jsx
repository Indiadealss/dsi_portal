import React, { useState } from "react";
import { Input, Space } from "antd";
import { Button } from 'antd';
import { SearchOutlined, AudioOutlined, AimOutlined } from "@ant-design/icons";
import { searchaddress } from "../../api/api";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { updateFilter } from "../Redux/filterSlice";
import { useDispatch } from "react-redux";

const Custominputserchbox = ({search}) => {

  const [location,setLocation] = useState([]);
  const [inputValue,setInputValue] = useState('');


  const getlocation = (value,location) => {

    if(value.length >= 2){
    try{
      searchaddress(value,location)
      .then(res => {
        if(res.status === 200){
          console.log(res);
          setLocation(res.data.results);
        }
      })

    }catch(err){
      console.log(err);
      
    }
  }
  else{
    setLocation([])
  }
  }

  const dispatch = useDispatch();

  const [prLocation,setPrLocation] = useState('');
  const [projectname,setProjectname] = useState('');
  
  function handleClick (){
   dispatch(updateFilter({location:prLocation}));
  }

  const handleSearchlocation = (e) => {
    let value = e.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    setInputValue(value)
     
     if(value.length >= 3){
      getlocation(value,'Noida')
     }
     else{
    setLocation([])
      setPrLocation('')
  }
  }

  const handleSelect = (item) => {
    console.log(item.name == inputValue);
    
     if(item.name === item.city){
      setInputValue(`${item.name}`)
      setLocation([])
      setPrLocation(item.city);
      setProjectname(item.name);
     }
     else{
      setInputValue(`${item.name} , ${item.city}`)
      setLocation([])
      setPrLocation(item.city)
     }
  }

  
  return (
    <>
    <Input
      placeholder="Search location..."
      bordered={false} // removes border
      value={inputValue}
      
      prefix={<SearchOutlined style={{ color: "gray", fontSize: 18 }} className="searchBoxes text-gray-500" />}
      onChange={handleSearchlocation}
      suffix={
        <Space size={16}>
          <AimOutlined style={{ color: "gray", fontSize: 18, cursor: "pointer" }} className="loctate" />
          <AudioOutlined style={{ color: "gray", fontSize: 18, cursor: "pointer" }} />
         <Link to="/property" className={`${!prLocation ? 'hidden' : ''}`} onClick={handleClick}>
         <Button className="buttonStyle"  type="primary" icon={<SearchOutlined />}>
            {search}
          </Button>
          </Link> 
        </Space>
      }
      style={{
        background: "white",
        boxShadow: "none", // pill style (optional)
        padding: "8px 12px",
        
      }}
    />
    {location.length > 0 && (
      <ul className="absolute md:left-0 lg:left-35 rounded-e right-0 top-9 md:w-[100%] lg:w-[85%]  border border-gray-200 mt-2  shadow-md bg-white max-h-48 overflow-y-auto">
        {location.map((item,index) => (
          <div className="border-b-2 border-gray-500 flex justify-between">
          <li 
          key={index}
          className="p-2 cursor-pointer  text-gray-500"
          onClick={() => handleSelect(item)}
          >
            {item.name === inputValue ? item.city : `${item.name}, ${item.city}`}
          </li>
          <div>
            <p className="text-gray-600 flex p-2"><span className="text-xl p-1"><FiExternalLink /></span></p>
          </div>
          </div>
        ))}
      </ul>
    )}
    </>
  );
};

export default Custominputserchbox;
