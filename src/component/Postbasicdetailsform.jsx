import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Postbasicdetailsform = ({ setValidator }) => {
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
        const [lookSelection, setLookSelection] = useState("");
        const [selection, setSelection] = useState("");
        const [propertyTypes, setPropertyTypes] = useState(sell);
        const [itsType, setItsType] = useState('');
    
        const dispatch = useDispatch();
        const category = useSelector((state) => state.property.data.category);
        const { data, errors } = useSelector((state) => state.property);
        function lookButton(e) {
            // console.log(e.currentTarget.name);
            setLookSelection(e.currentTarget.name)
              dispatch(updateField({ purpose: e.currentTarget.name }));
        }
    
    
        useEffect(() => {
            console.log(selection);
    
            if (selection === 'residential') {
                if (lookSelection === "sell") {
                    setPropertyTypes(sell)
                } else if (lookSelection === "rent") {
                    setPropertyTypes(rentLease)
                } else if (lookSelection === "pg") {
                    setPropertyTypes(pg)
                }
            }
            else if (selection === 'commercial') {
                setPropertyTypes(commercialButton)
            }
        }, [selection, lookSelection])
    
        const commericalMap = {
            office: [
                { title: 'Ready to move office space', name: 'redyOfficeSpace' },
                { title: 'Bare Shell office space', name: 'bsOfficeSpace' },
                { title: 'Co-working Office space', name: 'coOffice' },
            ],
    
            retail: [
                { title: 'Commercial Shops', name: 'comShops' },
                { title: 'Commercial Showrooms', name: 'comShowrooms' }
            ],
    
            plotLand: [
                { title: 'Commerical Land/Inst.Land', name: 'comerLand' },
                { title: 'Agricultural/Farm Land', name: 'agriLand' },
                { title: 'Industrial Lands/Plots', name: 'induLands' }
            ],
    
            storage: [
                { title: 'Storage', name: 'storeStorage' },
                { title: 'Cold Storage', name: 'coldStorage' }
            ],
    
            industry: [
                { title: 'Factory', name: 'factory' },
                { title: 'Manufacturing', name: 'manufacturing' }
            ],
    
            hospitality: [
                { title: 'Hotel/Resorts', name: 'hotelResorts' },
                { title: 'Guest-House/Banquet-Halls', name: 'guestHouseBanquet' }
            ],
    
            other: []
        }
    
        const [commericalSpace, setCommericalSpace] = useState([]);
        const [selectedMainType, setSelectedMainType] = useState(null); // e.g. office, retail
        const resCom = (event) => {
            setCommericalSpace([])
            setSelection(event.target.value);
            console.log("Selected:", event.target.value);
             dispatch(updateField({ category: event.target.value }))
             console.log("Updated category:", category,selection);
        };
        // handle property type click
        function redintalTypes(event) {
            const name = event.target.name;
            console.log(commericalMap[name]);
    
            setItsType(name);
            dispatch(setError({ general: "Please fill all required fields" }));
            if (selection === "commercial") {
                setSelectedMainType(name);
                setCommericalSpace(commericalMap[name] || []);
            }
        }


  // Register validation with parent
  useEffect(() => {
    if (setValidator) {
      setValidator(validateForm);
    }
  }, [lookSelection, selection,itsType,propertyTypes]);

  function validateForm() {
    if(!lookSelection){
        alert("Please select What are you looking for");
        return false;
    }
    if (!selection) {
      alert("Please select Residential or Commercial!");
      return false;
    }
    if(!itsType){
        alert("Please select What kind of selection you are looking for")
        return false;
    }
    return true;
  }

  return (
    <>
      <h3 className='text-2xl font-medium'>Welcome back kapil,<br />Fill out basic details</h3>
      <div className='my-5'><p className='font-medium '>I'm looking to</p>
                            <div className='flex my-3'>
                                {lokingButton.map((item, index) => {
                                    return (
                                        <button key={index} name={item.name} className={`${lookSelection === item.name ? 'bg-gray-100     font-normal text-gray-900  cursor-pointer px-3 rounded-full text-sm mx-1' : 'bg-white border border-gray-300 font-normal text-gray-500  cursor-pointer px-3 rounded-full text-sm mx-1'} ${item.name === 'pg' && selection === 'commercial' ? 'hidden' : 'block'}`} onClick={lookButton}>{item.title}</button>
                                    )
                                })}
                            </div>
                            <div className='my-5'><p className='font-medium '>What kind of property do you have?</p>
                                <div className='flex my-3'>
                                    <div className="flex items-center" onChange={resCom}>
                                        <input id="default-radio-1" checked={selection === "residential"} type="radio" value="residential" name="default-radio" className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 " />
                                        <label for="default-radio-1" className="m-2 text-sm  text-gray-500 dark:text-gray-300">Residential </label>
                                    </div>
                                    <div className="flex items-center" onChange={resCom}>
                                        <input checked={selection === "commercial"} disabled={lookSelection === 'pg'} id="default-radio-2" type="radio" value="commercial" name="default-radio" className={`${lookSelection === 'pg' ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  cursor-not-allowed':'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer'}` }/>
                                        <label for="default-radio-2" className="m-2 text-sm  text-gray-500 dark:text-gray-300">Commerical</label>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {propertyTypes.map((item, index) => {
                                        return (
                                            <button key={index} name={item.name} className={`${itsType === item.name ? 'bg-gray-100 font-normal text-gray-500  cursor-pointer px-2 py-1 m-1  rounded-full text-sm mx-1' : 'bg-white border border-gray-300 font-normal text-gray-500  cursor-pointer px-2 py-1 m-1  rounded-full text-sm mx-1'}`} onClick={redintalTypes} >{item.title}</button>
                                        )
                                    })}
                                </div>
                                <div className={`${commericalSpace.length > 0 ? 'my-5' : 'hidden'}`}>
                                    <h3 className='font-medium'>What Kind of office is it</h3>
                                    <div className='flex flex-wrap'>
                                        {commericalSpace.map((item, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    name={item.name}
                                                    className={`${selectedMainType === item.name
                                                            ? "bg-gray-100 border border-blue-300 font-normal text-gray-500 cursor-pointer px-2 py-1 m-1 rounded-full text-sm mx-1"
                                                            : "bg-white border border-gray-300 font-normal text-gray-500 cursor-pointer px-2 py-1 m-1 rounded-full text-sm mx-1"
                                                        }`}
                                                    onClick={redintalTypes}
                                                >
                                                    {item.title}
                                                </button>
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
    </>
  );
};
