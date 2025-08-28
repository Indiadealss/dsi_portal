import React, { useEffect, useState } from 'react';
import postPropery from '../Images/Desktop_Animation_compress.gif'
import { Phoneinput } from './Phoneinput';
import { Login } from './Login';

export const Postproperty = () => {
    const lokingButton = [
        { title: 'Sell', name: 'sell' },
        { title: 'Rent / Lease', name: 'rent' },
        { title: 'PG', name: 'pg' }
    ]

    const pg = [
        { title: 'Flat/Apartment', name: 'flatApartment' },
        { title: 'Independent/Builder Floor', name: 'independentBuilder' },
        { title: 'Independent House / Villa', name: 'independentHouse' },
        { title: '1 RK/Studio Apartment', name: 'rkStudio' },
        { title: 'Serviced Aparment', name: 'servicedAparment' }
    ]

    const rentLease = [
        { title: 'Flat/Apartment', name: 'flatApartment' },
        { title: 'Independent/Builder Floor', name: 'independentBuilder' },
        { title: 'Independent House / Villa', name: 'independentHouse' },
        { title: '1 RK/Studio Apartment', name: 'rkStudio' },
        { title: 'Serviced Aparment', name: 'servicedAparment' },
        { title: 'farmhouse', name: 'farmhouse' },
        { title: 'other', name: 'other' }
    ]

    const sell = [
        { title: 'Flat/Apartment', name: 'flatApartment' },
        { title: 'Independent/Builder Floor', name: 'independentBuilder' },
        { title: 'Independent House / Villa', name: 'independentHouse' },
        { title: '1 RK/Studio Apartment', name: 'rkStudio' },
        { title: 'Plot/Land', name: 'plotLand' },
        { title: 'Serviced Aparment', name: 'servicedAparment' },
        { title: 'farmhouse', name: 'farmhouse' },
        { title: 'other', name: 'other' }
    ]

    const commercialButton = [
        { title: 'Office', name: 'office' },
        { title: 'Plot/Land', name: 'plotLand' },
        { title: 'Retail', name: 'retail' },
        { title: 'Storage', name: 'storage' },
        { title: 'Industry ', name: 'industry' },
        { title: 'Hospitality', name: 'hospitality' },
        { title: 'other', name: 'other' }
    ]


    const [propertyTypes,setPropertyTypes] = useState(sell)
    const [selection, setSelection] = useState("");
    const [lookSelection, setLookSelection] = useState("sell");
    const [itsType,setItsType] = useState('');

    useEffect(() => {
        console.log(selection);
        
        if(selection === 'residential'){
            if(lookSelection === "sell"){
            setPropertyTypes(sell)
            }else if(lookSelection === "rent"){
                setPropertyTypes(rentLease)
            }else if(lookSelection === "pg"){
                setPropertyTypes(pg)
            }
        }
        else if(selection === 'commercial'){
            setPropertyTypes(commercialButton)
        }
    },[selection,lookSelection])


    function lookButton(e) {
        // console.log(e.currentTarget.name);
        setLookSelection(e.currentTarget.name)
       
    }

    const resCom = (event) => {
        setSelection(event.target.value);
        console.log("Selected:", event.target.value);
     
    };

    function redintalTypes  (event) {
        console.log('hello',event.target.name);
        setItsType(event.target.name);
        console.log(itsType);
        
    }
    return (
        <>
            <section className='m-10'>
                <div className='flex'>
                    <div className='hidden lg:block lg:w-[50vw]'>
                        <h3 className='text-4xl font-bold'>Sell or Rent Property<br /> online faster with DSI.com</h3>
                        <img src={postPropery} alt='...' />
                    </div>
                    <div>
                        <div className="w-[-webkit-fill-available] lg:w-[35vw] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <h3 className='text-2xl font-semibold py-2'>Start posting your property,it's free</h3>
                            <h3 className='text-xs font-semibold py-2 px-1'>Add Basic details</h3>
                            <h4 className='font-semibold'>You're looking to...</h4>
                            <div className='flex my-3'>
                                {lokingButton.map((item, index) => {
                                    return (
                                        <button key={index} name={item.name} className={`${lookSelection === item.name ? 'bg-gray-100 border border-blue-500    font-normal text-gray-900  cursor-pointer px-3 rounded-full text-sm mx-1' : 'bg-white border border-gray-300 font-normal text-gray-500  cursor-pointer px-3 rounded-full text-sm mx-1'} ${item.name === 'pg' && selection === 'commercial' ? 'hidden':'block'}`} onClick={lookButton}>{item.title}</button>
                                    )
                                })}
                            </div>
                            <h4 className='font-semibold'>And it's a....</h4>
                            <div className='flex'>
                                <div className="flex items-center" onChange={resCom}>
                                    <input id="default-radio-1" checked={selection === "residential"} type="radio" value="residential" name="default-radio" className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 " />
                                    <label for="default-radio-1" className="m-2 text-sm  text-gray-500 dark:text-gray-300">Residential </label>
                                </div>
                                <div className="flex items-center" onChange={resCom}>
                                    <input checked={selection === "commercial"} disabled={lookSelection === 'pg'} id="default-radio-2" type="radio" value="commercial" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 " />
                                    <label for="default-radio-2" className="m-2 text-sm  text-gray-500 dark:text-gray-300">Commerical</label>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                {propertyTypes.map((item,index) =>{return(
                                    <button key={index} name={item.name}  className={`${itsType === item.name ?'bg-gray-100 border border-blue-300 font-normal text-gray-500  cursor-pointer px-2 py-1 m-1  rounded-full text-sm mx-1':'bg-white border border-gray-300 font-normal text-gray-500  cursor-pointer px-2 py-1 m-1  rounded-full text-sm mx-1'}`} onClick={redintalTypes} >{item.title}</button>
                                )})}
                            </div>
                            <h4 className='font-semibold my-5'>Your Contact details for the buyer to reach you</h4>
                            <div className='flex justify-center w-auto'>
                                <Login />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
