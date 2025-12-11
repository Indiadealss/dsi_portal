import React, { useState } from 'react'
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

    const investmentOptions = [
        {
            name: 'Offices',
            icon: computerTable,
            price: 13900000
        },
        {
            name: 'Shop',
            icon: shop,
            price: 13900000
        }
    ]

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
        <div>
            <div className="flex justify-between">
                <div className={propertys.invest ? 'hidden' : ''}>
                    <h2>Investment Options In {propertys.projectname}</h2>
                </div>
                <div className={propertys.invest ? 'hidden' : ''}>
                    <button className='font-bold  text-blue-500 border shadow-sm p-2 rounded cursor-pointer flex h-10' onClick={() => setLeadModel(true)}><ImFolderDownload className='m-1' />Download Brochure</button>
                </div>
            </div>

            <div className='flex my-5'>
                
                    {investmentOptions.map((item, index) => (
                        <div key={index} className='py-3 px-10 mx-2 border border-gray-300 rounded'>
                            <div className='flex'>
                            <img src={item.icon} alt="" className='w-10  me-3'  />
                            <div>
                            <h4>{item.name}</h4>
                            <p><span className='text-gray-500 font-normal text-xs'>{formatToCr(item.price)} </span></p>
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
