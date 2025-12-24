import React, { useEffect, useState } from 'react'
import { ImFolderDownload } from 'react-icons/im';
import Leadgentaionform from './Leadgentaionform';
import computerTable from '../../Images/computerTable.avif';
import shop from '../../Images/shop.jpeg'

const Investmentoption = ({ propertys }) => {

    const [leadModel, setLeadModel] = useState(false)

    const leadGenration = () => {
        setLeadModel(true);
        setOpen(false);
    }

    

   const [units,setUnits] = useState([]);
   
     
   
   
   
     useEffect(() => {
         const uni = JSON.parse(propertys.officeUnits);
   
     setUnits([uni])
     console.log(units.map((u) => u));
     },[])

      const getLowestPrice = (items) => {
  if (!items || items.length === 0) return null;
  return Math.min(...items.map(i => i.price));
};


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

    return (
        <div className='my-20'>
            <div className="flex justify-between flex-col-reverse md:flex-row">
                <div className={propertys.invest ? 'hidden' : ''}>
                    <h2>Investment Options In {propertys.projectname}</h2>
                </div>
                <div className={propertys.invest ? 'hidden' : ''}>
                    <button className='font-bold  text-blue-500 border shadow-sm p-2 rounded cursor-pointer flex h-10' onClick={() => setLeadModel(true)}><ImFolderDownload className='m-1' />Download Brochure</button>
                </div>
            </div>

            <div className='flex flex-col md:flex-row my-5'>
                
                    {units.map((item, index) => (
                        <div key={index} className='py-3 px-10 mx-2 border border-gray-300 rounded'>
                            <div className='flex'>
                            <img src={item.icon} alt="" className='w-10  me-3'  />
                            <div>
                            <h4>{item.name}</h4>
                            <p><span className='text-gray-500 font-normal text-xs'>{formatToCr(getLowestPrice(item.items))} </span></p>
                            </div>
                            </div>
                        </div>
                    ))}
                
            </div>

            {/* Lead Modal */}
            {leadModel && (
                <div>
                    <Leadgentaionform setLeadModel={setLeadModel} />
                </div>
            )}
        </div>
    )
}

export default Investmentoption;
