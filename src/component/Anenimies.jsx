import React, { useEffect, useState } from 'react'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateField } from './Redux/propertySlice';
import { ChevronDownIcon } from '@heroicons/react/24/solid'



export const Anenimies = ({setValidator}) => {

    
    const [otherRooms,setOtherRooms] = useState([]);
    const [furnishing,setFurnishing] = useState('');
    const [proptyFacing,setProptyFacing] = useState('');
    const [pobackup,setPobackup] = useState('');
    const [amenitie,setAmenitie] = useState([]);
    const [selectbulding,setSelectbuilding] = useState([]);
    const [addFeature,setAddFeature] = useState([]);
    const [prppertyF,setProppertyF] = useState([]);
    const [watersource,setWatersource] = useState([]);
    const [overlo,setOverlo] = useState([]);
    const [locatadvance,setLocatadavance] = useState([]);
    const [price,setPrice] = useState('');
    const [roadWidth,setRoadWidth] = useState('');
    const [plotarea,setPloatarea] = useState('sq.ft');
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false)
     const [selectedPricing, setSelectedPricing] = useState(""); // will store like "500_inputCheck,1000_inputCheck"

  const handleToggle = (value) => {
    const items = selectedPricing ? selectedPricing.split(",") : [];

    if (items.includes(value)) {
      // Remove item if unchecked
      const newItems = items.filter(item => item !== value);
      setSelectedPricing(newItems.join(","));
    } else {
      // Add item if checked
      const newItems = [...items, value];
      setSelectedPricing(newItems.join(","));
    }
  };

    useEffect(() => {
      dispatch(updateField({otherrooms:otherRooms,furnishing:furnishing,propertyfacing:proptyFacing,amenitie:amenitie,Buldingfeature:selectbulding,pobackup:pobackup,addFeature:addFeature,propertyfeature:prppertyF,watersource:watersource,overlo:overlo,locatadvance:locatadvance,price:price+selectedPricing,road_width:roadWidth + plotarea}))
    },[price])

    const handleSelect = (value) =>{
    setPloatarea(value);
    setDropdown(false);
  }
  

     useEffect(() => {
              if (setValidator) {
                setValidator(validateForm);
              }
            }, [otherRooms,furnishing,proptyFacing,pobackup,amenitie,selectbulding,addFeature,prppertyF,watersource,overlo,locatadvance,price]);

            function validateForm(){
              if(!furnishing){
                alert('add furnishing');
                return false;
              }
              if(!proptyFacing){
                alert('add Property Facing');
                return false;
              }
              if(!pobackup){
                alert('add Details about Power Backup');
                return false;
              }
              if(!price){
                alert('Add price');
                return false;
              }
          return true;
        }


        const sizeDropdown = [
    "sq.ft",
    "sq.m",
    "arce",
    "hactare"
  ]

   function dropDownFun() {
    setDropdown(prev => !prev);
  }

   const pricingDetails = [
    {name:'All inclusive Price',label:'All inclusive Price'},
    {name:'Tax and Govt. Charges excluded',label:'Tax and Govt. Charges excluded'},
    {name:'Price Negotiable',label:'Price Negotiable'}
  ]
    const OtherRoom = [
        {
            name:'Pooja Room',
            label:'Pooja Room'
        },
        {
            name:'Study Room',
            label:'Study Room'
        },
        {
            name:'Servent Room',
            label:'Servent Room'
        },
        {
            name:'Store Room',
            label:'Store Room'
        }
    ]

    const Furnishing = [
        {
            name:'Furnished',
            label:'Furnished'
        },
        {
            name:'Semi-furnished',
            label:'Semi-furnished'
        },
        {
            name:'Un-furnished',
            label:'Un-furnished'
        }
    ]

    const Propetyfacing = [
      {
        name:'North',
        label:'North'
      },
      {
        name:'South',
        label:'South'
      },
      {
        name:'East',
        label:'East'
      },
      {
        name:'West',
        label:'West'
      },
      {
        name:'North-East',
        label:'North-East'
      },
      {
        name:'North-West',
        label:'North-West'
      },
      {
        name:'South-East',
        label:'South-East'
      },
      {
        name:'South-West',
        label:'South-West'
      }
      
    ]

    const amenities = [
      {
        name:'Maintandce Staff',
        label:'Maintandce Staff'
      },
      {
        name:'Water Storage',
        label:'Water Storage',
      },
      {
        name:'security/Fire Alarm',
        label:'security/Fire Alarm'  
      },
      {
        name:'visitor prarking',
        label:'visitor prarking'
      },
      {
        name:'Feng shui/vastu complaint',
        label:'Feng shui/vastu complaint'
      },
      {
        name:'Park',
        label:'Park'
      },
      {
        name:'Security',
        label:'Security'
      },
      {
        name:'Lifts',
        label:'Lifts'
      },
      {
        name:'Intercorm Facility',
        label:'Intercorm Facility'
      },
    ]

    const sobufeature = [
      {
        name:'Water softening plant',
        label:'water softening plant'
      },
      {
        name:'Shopping Centre',
        label:'Shopping Centre'
      },
      {
        name:'Fitness Centre/GYM',
        label:'Fitness Centre/GYM'
      },
      {
        name:'Swimming Pool',
        label:'Swimming Pool'
      },
      {
        name:'club house/Community center',
        label:'club house/Community center'
      }
    ]

    const adfeature = [
      {
        name:'Separate entry for servant room',
        label:'Separate entry for servant room'
      },
      {
        name:'Waste Disposal',
        label:'Waste Disposal'
      },
      {
        name:'No open drrawne around',
        label:'No open drrawne around'
      },
      {
        name:'Rain water Harvesting',
        label:'Rain water Harvesting'
      },
      {
        name:'Bank Atteched Property',
        label:'Bank Atteched Property'
      },
      {
        name:'Low Density Society',
        label:'Low Density Society'
      }
    ]

    const propertyFeature = [
      {
        name:'High Ceilling Height',
        label:'High Ceilling Height'
      },
      {
        name:'False Celling Lighting',
        label:'False Celling Lighting'
      },
      {
        name:'Piped-gas',
        label:'Piped-gas'
      },
      {
        name:'Internet/wi-fi connectivity',
        label:'Internet/wi-fi connectivity'
      },
      {
        name:'Connectivity',
        label:'Connectivity'
      },
      {
        name:'Centerally Air Conditioneal',
        label:'Centerally Air Conditioneal'
      },
      {
        name:'Water Purifier',
        label:'Water Purifier'
      },
      {
        name:'Recently Renovated',
        label:'Recently Renovated'
      },
      {
        name: 'Private Garden/Tarrace',
        label:'Private Garden/Tarrace'
      },
      {
        name:'Natural Light',
        label:'Natural Light'
      },
      {
        name:'Spacious Interiors',
        label:'Spacious Interiors'
      }
    ]

    const powerBackup = [
      {
        name:'None',
        label:'None'
      },
      {
        name:'Partial',
        label:'Partial'
      },
      {
        name:'Full',
        label:'Full'
      }
    ]

    const waterso = [
      {
        name:'Municipal corporation',
        label:'Municipal corporation'
      },
      {
        name:'Borewell/Tank',
        label:'Borewell/Tank'
      },
      {
        name:'24*7 water',
        label:'24*7 water'
      }
    ]

    const overlooking = [
      {
        name:'Pool',
        label:'Pool'
      },
      {
        name:'Park/Garden',
        label:'Park/Garden'
      },
      {
        name:'Club',
        label:'Club'
      },
      {
        name:'Main Road',
        label:'Main Road'
      },
      {
        name:'Others',
        label:'Others'
      }
    ]

    const locationAdvantages = [
      {
        name:'Close to Metro Station',
        label:'Close to Metro Station'
      },
      {
        name:'Close to School',
        label:'Close to School'
      },
      {
        name:'Close to Hospital',
        label:'Close to Hospital'
      },
      {
        name:'Close to Market',
        label:'Close to Market'
      },
      {
        name:'Close to Railway Station',
        label:'Close to Railway Station'
      },
      {
        name:'Close to Airport',
        label:'Close to Airport'
      },
      {
        name:'Close to Mall',
        label:'Close to Mall'
      },
      {
        name:'Close to Highway',
        label:'Close to Highway'
      }
    ]
  return (
    <>
        <h3 className='text-xl font-medium my-2'>Add amenities/unique features</h3>
        <p className='text-sm text-gray-400 font-normal'>These fields are used to populate USP & captions<br />All fields on this page are optional</p>
        <h3 className='text-xl font-medium my-5'>Other rooms<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {OtherRoom.map((item,index) => {
              const isSelected = otherRooms.includes(item.name)
                return(
                    <button key={index} name={item.name} 
                    className={`${isSelected ? " mx-2 my-1 p-2 rounded-full cursor-pointer bg-gray-100 text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() =>{ 
              if(isSelected){
                //removes if already selected
                setOtherRooms(prev => prev.filter(name => name !== item.name));
              }else{
                setOtherRooms(prev => [...prev, item.name]);
              }
            }}
          >
            {isSelected ? (
              <CheckOutlined />
            ) : (
              <PlusOutlined />
            )}
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Furnishing <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {Furnishing.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${furnishing === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setFurnishing(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Property Facing<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {Propetyfacing.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${proptyFacing === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setProptyFacing(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Power Back up<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {powerBackup.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${pobackup === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setPobackup(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Amenities<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {amenities.map((item,index) => {
              const isSelected = amenitie.includes(item.name);
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() =>{
              if(isSelected){
                // removes if already selected
                setAmenitie(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setAmenitie(prev => [...prev,item.name]);
              }
            }}
          >
                       {isSelected ? (
                          <CheckOutlined />
                       )
                       :
                      (
                          <PlusOutlined />
                      )
                      }{item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Property Features<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap'>
            {propertyFeature.map((item,index) => {
              const isSelected = prppertyF.includes(item.name);
              return(
                <button 
                key={index}
                className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
                onClick={() =>{
                  if(isSelected){
                    setProppertyF(prev => 
                      prev.filter(name => name !== item.name)
                    )
                  }else{
                    setProppertyF(prev =>
                    [...prev,item.name]
                    )
                  }
                }} >
                  {isSelected ? (
                    <CheckOutlined />
                  )
                  :
                  (
                    <PlusOutlined />
                  )
                } {item.label}
                </button>
              )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Society/Bullding feature <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap'>
            {sobufeature.map((item,index) => {
              const isSelected = selectbulding.includes(item.name);
              return (
                <button
                key={index}
                name={item.name}
                className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
                onClick={() => {
                  if(isSelected){
                    // remove the selected item 
                  setSelectbuilding(prev => 
                    prev.filter(name => name !== item.name)
                  )
                }else{
                  setSelectbuilding(prev => 
                  [...prev,item.name]
                  )
                }
                }}
                >
                  {
                    isSelected ? (
                        <CheckOutlined />
                    )
                    :
                    (
                        <PlusOutlined />
                    )
                  } {item.label}
                </button>
              )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Additional Features<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {adfeature.map((item,index) => {
            
            const isSelected = addFeature.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setAddFeature(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setAddFeature(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.name}
            </button>
            )
        })}
        </div>
        <h3 className='text-xl font-medium my-5'>Water Source<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {waterso.map((item,index) => {
            
            const isSelected = watersource.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setWatersource(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setWatersource(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.name}
            </button>
            )
        })}
        </div>
        <h3 className='text-xl font-medium my-5'>Overlooking<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {overlooking.map((item,index) => {
            
            const isSelected = overlo.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setOverlo(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setOverlo(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.name}
            </button>
            )
        })}
        </div>
        <h3 className='text-xl font-medium my-5'>Location Advantages<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {locationAdvantages.map((item,index) => {
            
            const isSelected = locatadvance.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setLocatadavance(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setLocatadavance(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.name}
            </button>
            )
        })}
        </div>

         <div className="relative w-full my-5">
        
        <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
        <div
          className={`${!roadWidth ? 'hidden': 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'} `}
        >
          <span>Width of facing road</span>
        </div>

        <input
          type="number"
          value={roadWidth}
          onChange={(e) => setRoadWidth(e.currentTarget.value)}
          className="w-full py-2 ps-6 rounded-b outline-none"
          placeholder='Enter the Width of Road facing'
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
        <p className='font-medium text-lg'>Price Details</p>
      <div className='flex '>
        <input type='number' value={price} onChange={(e) => setPrice(e.currentTarget.value)} className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-40' placeholder='Expected Price' />
        <input type='text' disabled className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-30 text-xs' placeholder='Price per sq.ft' />
        </div>
        <div className='flex flex-wrap my-5'>
          {pricingDetails.map((item,index) =>{
            return(
              <div className='flex mb-4 item-center flex-wrap mx-2 my-1'>
                <input id="default-checkbox" type="checkbox" onChange={() => handleToggle(value)} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none" />
    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.label}</label>
              </div>
            )
          })}
        </div>
        
    </>
  )
}
