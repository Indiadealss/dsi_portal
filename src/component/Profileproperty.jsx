import React, { useState,useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import FloorSelector from './customcomponent/Floorseclector';
import { useSelector } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Postpropertyform } from './Postpropertyform';
import { updateField } from './Redux/propertySlice';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export const Profileproperty = ({setValidator}) => {
   const [coverdParking,setCoverdParking] = useState(0);
    const [uncoverdParking,setUncoverdParking] = useState(0);
    const [noBedroom,setNoBedroom] = useState('');
    const [noBalconies,setNoBalconies] = useState('');
    const [noBathroom,setNoBathroom] = useState('');
    const [ageProperty,setAgeProperty] = useState('');
    const [ownership,setOwnership] = useState('');
    const [availablef,setAvailablef] = useState('');
    const [description,setDescription] = useState('');
    const [paPlotArea,setPlotArea] = useState(null);
    const [buArea,setBuArea] = useState(null);
    const [caArea,setCaArea] = useState(null);
    const [possession,setPossession] = useState('');

    const dispatch = useDispatch();


    useEffect(() => {
      const tf = Number(totalFloor)
      dispatch(updateField({bedroom:noBedroom,bathroom:noBathroom,balconies:noBalconies,plotarea:paPlotArea,plotSizein:plotarea,buildarea:buArea,buildSizein:buildarea,carpetarea:caArea, carpetSizein:carpet,
        totalfloor:totalFloor,availabestatus:choiseProperty,ownership:ownership,propertyage:ageProperty,coveredparking:coverdParking,uncoveredparking:uncoverdParking,description:description,Possession:possession 
      }))
    },[description])
    
    const propertyDataFirst = useSelector((state) => state.property.data);

    console.log('purpose :',propertyDataFirst.purpose,'Property:',propertyDataFirst.property,'property type:',propertyDataFirst.propertyType);
    
  const noOfBedroom = [
    { name: '1', title: 1 },
    { name: '2', title: 2 },
    { name: '3', title: 3 },
    { name: '4', title: 4 }
  ]

  const balconies = [
    { name: '0', title: 0 },
    { name: '1', title: 1 },
    { name: '2', title: 2 },
    { name: '3', title: 3 },
    { name: '4', title: 'More than 3' }
  ]

  const sizeDropdown = [
    "sq.ft",
    "sq.m",
    "arce",
    "hactare"
  ]

 const handleFloorChange = (val) => {
    // val might be "unknown", "G", "B1", "15", "-1" (if you used negative for basement), or free text
    console.log("floor:", val);
  };
  const [dropdown, setDropdown] = useState(false)
  const [buildUpdropdown, setBuildUpDropdown] = useState(false)
  const [carpetArea, setCarpetArea] = useState(false)
  const [plotarea,setPloatarea] = useState('sq.ft');
  const [buildarea,setBuildarea] = useState('sq.ft');
  const [carpet,setCarpet] = useState('sq.ft');
  const [totalFloor,setTotalFloor] = useState(0);

  const handleSelect = (value) =>{
    setPloatarea(value);
    setDropdown(false);
  }

  const handleBuild = (value) => {
    setBuildarea(value);
    setBuildUpDropdown(false);
  }

  const handleCarpet = (value) => {
      setCarpet(value);
      setCarpetArea(false);
  }

  function dropDownFun() {
    setDropdown(prev => !prev);
  }
  
  function buildFun() {
    setBuildUpDropdown(prev => !prev);
  }
  
  function carpetFun() {
    setCarpetArea(prev => !prev);
  }

  const availabilityStatus = [
    {
      name:'Ready to move',
      label:'Ready to move',
    },
    {
      name:'Under construction',
      label:'Under construction'
    }
  ]

  const underConcetraction = [
    {
      name:'within 3 Months',
      label:'Within 3 Months'
    },
    {
      name:'within 6 Months',
      label:'Within 6 Months'
    },
    {
      name:'By 2026',
      label:'By 2026'
    },
    {
      name:'By 2027',
      label:'By 2027'
    },
    {
      name:'By 2028',
      label: 'By 2028'
    },
    {
      name:'By 2029',
      label:'By 2029'
    }
  ]
  const ageOfProperty = [
    {
      name:'0-1 years',
      label:'0-1 years'
    },
    {
      name:'1-5 years',
      label:'1-5 years',
    },
    {
      name:'5-10 years',
      label:'5-10 years'
    },
    {
      name:'10+ years',
      label:'10+ years'
    }
  ]

  const [choiseProperty,setChoiseProperty] = useState('underConcetraction');

  

  const availblefor = [
    {
      name:'Boys',
      label:'Boys'
    },
    {
      name:'Girls',
      label:'Girls'
    },
    {
      name:'Any',
      label:'Any'
    }
  ]
  const ownershipDetails = [
    {
      name:'Freehold',
      label:'Freehold',
    },
    {
      name:'Leasehold',
      label:'Leasehold'
    },
    {
      name:'Co-operative society',
      label:'Co-operative society'
    },
    {
      name:'Power of Attorney',
      label:'Power of Attorney'
    }
  ] 

  useEffect(() => {
          if (setValidator) {
            setValidator(validateForm);
          }
        }, [noBedroom,noBalconies,noBathroom,ageProperty,ownership,choiseProperty,description]);
        
        function validateForm(){
          if(propertyDataFirst.property != 'commercial' && propertyDataFirst.propertyType != 'plotLand' && !noBedroom){
              alert("Please select Number of Bedroom");
              console.log(propertyDataFirst.property != 'commercial',propertyDataFirst.property);
              
              return false;
          }
          if(propertyDataFirst.propertyType != 'plotLand' && !noBalconies){
              alert("Please select Number of Balconies");
              return false;
          }
          if(propertyDataFirst.propertyType != 'plotLand' && !noBathroom){
              alert("Please select Number of Bathroom");
              return false;
          }
          if(description === ''){
            alert("Please specify the unique aspect of your property.")
            return false;
          }
          return true
        }
  return (
    <>
      <h2 className="text-2xl font-medium mb-5">Tell us your property</h2>
      <div className={`${propertyDataFirst.propertyType === 'plotLand' ? 'hidden' : ''}`}>
      <p className={`${propertyDataFirst.property === 'commercial' ? 'hidden' : "text-sm font-medium"}`}>No of Bedrooms</p>
      <div className={`${propertyDataFirst.property === 'commercial' ? 'hidden' : "my-3"}`}>
        {noOfBedroom.map((item, index) => (
          <button
            type="button"
            key={index}
            name={item.name}
            className={`${noBedroom === item.name ? "text-xs rounded-full bg-gray-100 p-3 mx-2 cursor-pointer" :"text-xs rounded-full border border-1 border-gray-300 p-3 mx-2 cursor-pointer"}`}
            onClick={(e) => setNoBedroom(e.currentTarget.name)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium">No of Bathrooms</p>
      <div className="my-3">
        {noOfBedroom.map((item, index) => (
          <button
            type="button"
            key={index}
            name={item.name}
           className={`${noBathroom === item.name ? "text-xs rounded-full bg-gray-100 p-3 mx-2 cursor-pointer" :"text-xs rounded-full border border-1 border-gray-300 p-3 mx-2 cursor-pointer"}`}
            onClick={(e) => setNoBathroom(e.currentTarget.name)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium">Balconies</p>
      <div className="my-3">
        {balconies.map((item, index) => (
          <button
            type="button"
            key={index}
            name={item.name}
           className={`${noBalconies === item.name ? "text-xs rounded-full bg-gray-100 p-3 mx-2 cursor-pointer" :"text-xs rounded-full border border-1 border-gray-300 p-3 mx-2 cursor-pointer"}`}
            onClick={(e) => setNoBalconies(e.currentTarget.name)}
          >
            {item.title}
          </button>
        ))}
      </div>
      </div>

      <p className="font-medium">Add Area Details</p>
      <p className="font-light text-gray-500 text-sm">
        At least one area type is mandatory
      </p>

      {/* Input with Dropdown */}
      <div className="relative w-full my-5">
        
        <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
        <div
          className={`${!paPlotArea ? 'hidden': 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'} `}
        >
          <span>Super Build UP Area</span>
        </div>

        <input
          type="number"
          value={paPlotArea}
          onChange={(e) => setPlotArea(e.currentTarget.value)}
          className="w-full py-2 ps-6 rounded-b outline-none"
          placeholder='Enter the Super Biuld up Area'
        />
      </div>

        <button
          type="button"
          id="unitDropdownButton"
          onClick={dropDownFun}
          className="flex items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 
                  outline-none  font-medium 
                 rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          {plotarea} <ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {dropdown && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700 ps-3 py-2 text-medium"
              aria-labelledby="unitDropdownButton"
            >
              {sizeDropdown.map((item)=>(
                <li key={item} >
                  <button type='button' 
                  onClick={() => handleSelect(item)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative w-full my-5">
        
        <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
        <div
          className={!buArea ? 'hidden':'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
        >
          <span>Build Up Area</span>
        </div>

        <input
          type="number"
          value={buArea}
          onChange={(e) => setBuArea(e.currentTarget.value)}
          className="w-full py-2 ps-6 rounded-b outline-none"
          placeholder='Enter the Build up area'
        />
      </div>

        <button
          type="button"
          id="unitDropdownButton"
          onClick={buildFun}
          className="flex items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                 rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          {buildarea} <ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {buildUpdropdown && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="unitDropdownButton"
            >
              {sizeDropdown.map((item)=>(
                <li key={item} >
                  <button type='button' 
                  onClick={() => handleBuild(item)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative w-full my-5">
        
        <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
        <div
          className={!caArea ? 'hidden':'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
        >
          <span>Carpet Area</span>
        </div>

        <input
          type="number"
          value={caArea}
          onChange={(e) => setCaArea(e.currentTarget.value)}
          className="w-full py-2 ps-6 rounded-b outline-none"
          placeholder='Enter the Carpet Area'
        />
      </div>

        <button
          type="button"
          id="unitDropdownButton"
          onClick={carpetFun}
          className="flex items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                 rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          {carpet}<ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {carpetArea && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="unitDropdownButton"
            >
             {sizeDropdown.map((item)=>(
                <li key={item} >
                  <button type='button' 
                  onClick={() => handleCarpet(item)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>


      <p className="font-medium text-lg">Floor Details</p>
      <p className='font-medium text-xs text-gray-500'>Total no of floors and your floor details.</p>
      <div>
        <input type='text' className='outline-none border border-1 border-gray-200 my-4 p-4 w-full' value={totalFloor} onChange={(e) => setTotalFloor(e.target.value)} placeholder='Total Floor' />
        <div className={`${totalFloor > 1 ? 'block mb-5':'hidden'}`}>
        <FloorSelector maxPreset={totalFloor} onChange={handleFloorChange} />
        </div>
      </div>
      <div className={`${propertyDataFirst.purpose === 'pg' ? 'hidden':'block'}`}>
      <p className='font-medium text-lg'>Availability Status</p>
      <div className="flex">
      {availabilityStatus.map((item,index) => {
        return(
          <button name={item.name} key={index} onClick={(e) => setChoiseProperty(e.currentTarget.name)} 
           className={`${choiseProperty === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" :"text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
          >{item.label}</button>
        )
      })}
      </div>
      </div>
      <div className={`${propertyDataFirst.purpose === 'pg' ? 'block' : 'hidden'}`}>
        <p className='font-medium text-lg my-3'>Availability From</p>
        <Space direction="vertical">
    <DatePicker onChange={onChange} />
  </Space>
        <p className='font-medium text-lg my-3'>Available For</p>
        <div className="flex  my-5">
      {availblefor.map((item,index) => {
        return(
          <button name={item.name} key={index} 
          className={`${availablef === item.name ? 'text-sm text-gray-500 font-normal   p-2 mx-3 rounded-full cursor-pointer bg-gray-100' :'mx-3 text-sm text-gray-500 font-normal  border p-2 rounded-full cursor-pointer border-1 border-gray-200'}`}
          onClick={(e) => setAvailablef(e.currentTarget.name)}
          >
            {item.label}
            </button>
        )
      })}
      </div>
      </div>
      <p className={`${choiseProperty === 'Ready to move' ? 'font-medium text-lg my-5' : 'hidden'}`}>Age of Property</p>
      <div className="flex my-5">
        <div className={`${choiseProperty === 'Ready to move' ? 'font-medium text-lg' : 'hidden'}`} >
      {ageOfProperty.map((item,index) => {
        return(
          <button
          key={index}
          name={item.name}
          className={`${ageProperty === item.name ? 'p-2 mx-2 text-sm font-normal bg-gray-100 cursor-pointer rounded-full' :'cursor-pointer p-2 mx-2 text-sm font-normal border border-1 border-gray-300 rounded-full'}`}
          onClick={(e) => setAgeProperty(e.currentTarget.name)}
          >
            {item.label}</button>
        )
      })}
      </div>
      
<form className={`${choiseProperty === 'Under construction' ? 'w-full mx-auto' : 'hidden'}`}>
  <label for="countries" className="block mb-2  font-medium text-gray-900 ">Possession By</label>
  <select id="countries" value={possession} onChange={(e) => setPossession(e.currentTarget.value)} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ">
    <option selected>Expected by</option>
    {underConcetraction.map((item,index) => {
      return(
        <option value={item.name}>{item.label}</option>
      )
    })}
  </select>
</form>

      </div>
      <div className={`${propertyDataFirst.purpose === 'pg' ? 'hidden' : 'block'}`}>
      <p className='font-medium text-lg '>Ownership</p>
      <div className="flex justify-around my-5">
      {ownershipDetails.map((item,index) => {
        return(
          <button name={item.name} key={index} 
          className={`${ownership === item.name ? 'text-sm text-gray-500 font-normal   p-2 rounded-full cursor-pointer bg-gray-100' :'text-sm text-gray-500 font-normal  border p-2 rounded-full cursor-pointer border-1 border-gray-200'}`}
          onClick={(e) => setOwnership(e.currentTarget.name)}
          >
            {item.label}
            </button>
        )
      })}
      </div>
      </div>
      <h3 className='text-xl font-medium my-5'>Reserved Parking <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap my-5'>
            <div className='mx-3'>
            <p className='font-light text-gray-400'>Covered Parking 
                <div className="flex my-3">
                <button disabled={coverdParking <= 0} className={`${coverdParking <= 0 ? 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-200 border border-gray-200 rounded-full cursor-not-allowed' : 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer'}`} onClick={() => {coverdParking <= 0 ? setCoverdParking(0) : setCoverdParking(prev => prev - 1)}}>-</button>
                <p className='m-2'>{coverdParking}</p>
                <button className="flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer" onClick={() =>  setCoverdParking(prev =>prev + 1)}>+</button>
                </div>
                </p>
                </div>
                <div className='mx-3'>
                    <p className='font-light text-gray-400'>Uncovered Parking 
                <div className="flex my-3">
                <button className={`${uncoverdParking <= 0 ? 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-200 border border-gray-200 rounded-full cursor-not-allowed' : 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer'}`} onClick={() => {uncoverdParking <= 0 ? setUncoverdParking(0) : setUncoverdParking(prev => prev - 1)}}>-</button>
                <p className='m-2'>{uncoverdParking}</p>
                <button className="flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer" onClick={() =>  setUncoverdParking(prev =>prev + 1)}>+</button>
                </div>
                </p>
                </div>
        </div>

        <h3 className='font-medium text-xl'>What makes your property unique</h3>
        <p className='text-xs font-medium  text-gray-500'>Adding description will increase your listing visibility</p>
      <div>
        <textarea id="message" rows="4" value={description} onInput={(e) => setDescription(e.currentTarget.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500     my-5" placeholder="Share some details about your property like spacious rooms, well maintained facilities.." />
        </div>
    </>
  )
}
