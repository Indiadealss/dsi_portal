import React, { useState } from 'react'
import Subscriptioncreadits from './Subscriptioncreadits';
import Listingboost from './Listingboost';
import { useDispatch, useSelector } from 'react-redux';
import { submitProperty } from '../api/api';
import { resetForm } from './Redux/propertySlice';

const Choosesub = () => {

    const dispatch = useDispatch()
    const propertyFirstData = useSelector((state) => state.property.data);
    const [activeCom,setActiveCom] = useState("Subscriptioncreadits")
    const subDescription = 'By clicking on submit,I confirm that the property details including price, photos are correct And this property is available for sell/reNT. In case of any discreperncies Indiadealss can take strict action including deleting this listing. I also accept terms and conditions.';
    async function handleSumit() {
        if(activeCom === "Subscriptioncreadits"){
            setActiveCom("Listingboost")
        }
        else{
           try {
      const result = await dispatch(submitProperty(propertyFirstData)).unwrap();

      console.log("✅ API Success:", result);
      alert("✅ You have successfully listed the property");

      // dispatch(resetForm());
      // window.location.reload();

    } catch (error) {
      console.error("❌ API Failed:", error);
      alert("❌ Something went wrong while submitting");
    }
        }
        
    }
  return (
    <>
    <div className='flex flex-col w-[100%]'>
       {activeCom === "Subscriptioncreadits" ? <Subscriptioncreadits /> : <Listingboost />}
        <div className='absolute right-0 left-0 bottom-0 my-5 mx-10'>
            <div className='flex'>
            <p><span className='text-xs font-medium'>{subDescription}</span></p>
            <button type='button' onClick={handleSumit} className='bg-blue-600 px-5 py-0 my-0 h-10 text-white font-medium cursor-pointer rounded-lg mx-8'>
                submit
            </button>
            </div>
        </div>
        </div>
    </>
  )
}

export default Choosesub
