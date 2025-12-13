import React, { useEffect, useState } from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import computerTable from '../../Images/computerTable.avif';
import shop from '../../Images/shop.jpeg'
import { FaRupeeSign } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";

const Investdetails = ({propertys}) => {

    const [units,setUnits] = useState([]);
    
      
    
    
    
      useEffect(() => {
          const uni = JSON.parse(propertys.officeUnits);
    
      setUnits([uni])
      console.log(units.map((u) => u));
      },[])

    const formatToCr = (value, decimals = 2, suffix = "cr onwards") => {
        if (value == null || isNaN(value)) return "";

        const num = Number(value);
        const ONE_CRORE = 1e7;
        const ONE_LAKH = 1e5;

        if (num >= ONE_CRORE) {
            const val = +(num / ONE_CRORE).toFixed(decimals);
            return `${val} ${suffix}`;
        }

        if (num >= ONE_LAKH) {
            const val = +(num / ONE_LAKH).toFixed(decimals);
            return `${val} L onwards`;
        }

        return num.toLocaleString("en-IN");
    };

    // Get all prices in one array

    const allPrices = units.flatMap(unit => unit.items.map(item => item.price));

    // Find the lowest price
    const lowestPrice = Math.min(...allPrices)
    return (
        <div className='my-20 w-[40%]'>
            <div className="flex justify-around">
                <div className="flex">
                    <div className='p-2 bg-[#fff7e7] rounded-full'>
                        <MdCurrencyRupee className='text-2xl text-blue-500' />
                    </div>
                    <div className='ms-1'>
                        <div className='flex'><FaRupeeSign className='text-sm  mt-2 font-bold' /><span className='text-medium'>{formatToCr(lowestPrice)}</span></div>
                        <span className='text-xs text-gray-500 float-right font-medium'>Onwards</span>
                    </div>
                </div>
                <div className="flex ">
                    <div className='p-2 bg-[#fff7e7] rounded-full'>
                        <PiPottedPlantFill  className='text-2xl text-blue-500' />
                    </div>
                    <div className='ms-3'>
                        <p><span className='text-sm font-medium'>{units.length} options</span></p>
                        <span className='text-xs text-gray-500 float-right font-medium'>for investment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Investdetails
