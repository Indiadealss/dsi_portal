import React, { useState } from 'react'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';


export const Anenimies = () => {

    
    const [otherRooms,setOtherRooms] = useState('');
    const [furnishing,setFurnishing] = useState('');
    const [proptyFacing,setProptyFacing] = useState('');
    const [pobackup,setPobackup] = useState('');
    const [amenitie,setAmenitie] = useState([]);
    const [selectbulding,setSelectbuilding] = useState([]);
    const [addFeature,setAddFeature] = useState([]);
    const [prppertyF,setProppertyF] = useState([]);
    const [watersource,setWatersource] = useState([]);
    const [overlo,setOverlo] = useState([])
    const [locatadvance,setLocatadavance] = useState([])


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
        name:'security/Fire/Alarm',
        label:'security/Fire/Alarm'  
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
      }
    ]
  return (
    <>
        <h3 className='text-xl font-medium my-2'>Add amenities/unique features</h3>
        <p className='text-sm text-gray-400 font-normal'>These fields are used to populate USP & captions<br />All fields on this page are optional</p>
        <h3 className='text-xl font-medium my-5'>Other rooms<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {OtherRoom.map((item,index) => {
                return(
                    <button key={index} name={item.name} 
                    className={`${otherRooms === item.name ? " mx-2 my-1 p-2 rounded-full cursor-pointer bg-gray-100 text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setOtherRooms(e.currentTarget.name)}
          >
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
        <p className='font-medium text-lg'>Price Details</p>
      <div className='flex '>
        <input type='number' className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-40' placeholder='Expected Price' />
        <input type='text' disabled className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-30 text-xs' placeholder='Price per sq.ft' />
        </div>
        <div className='flex flex-wrap my-5'>
          {pricingDetails.map((item,index) =>{
            return(
              <div className='flex mb-4 item-center flex-wrap mx-2 my-1'>
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none" />
    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.label}</label>
              </div>
            )
          })}
        </div>
        
    </>
  )
}
