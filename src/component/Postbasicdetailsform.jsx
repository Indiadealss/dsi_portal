import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from './Redux/propertySlice';

export const Postbasicdetailsform = ({ setValidator }) => {
         const lokingButton = [
        { title: 'Sell', name: 'sell' },
        { title: 'Rent / Lease', name: 'rent' },
        { title: 'PG', name: 'pg' },
        { title:'Project', name: 'Project'}
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

        const projectResidental = [
            {title:'1 Bhk', name:'1 Bhk'},
            {title:'2Bhk', name:'2 Bhk'},
            {title:'3 Bhk', name:'3 Bhk'},
            {title:'4 Bhk', name:'4 Bhk'},
            {title:'5 Bhk', name:'5 Bhk'},
            {title:'1 RK', name:'1 Rk'},
            {title:'Studio', name:'Studio Appartment'},
            {title:'Independent House/Villa', name:'Independent House/Villa'},
            {title:'Farmhouse',name:'Farmhouse'}

        ]

        const commericalProject = [
            {title:'Office',name:'Office'},
            {title:'Ploat/Land',name:'Ploat/Land'},
            {title:'Retail',name:'Retail'},
            {title:'Storage',name:'Storage'},
            {title:'Industry',name:'Industry'}
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

        const [units, setUnits] = useState([
  { bhk: "", areaMin: "", areaMax: "", priceMin: "", priceMax: "" }
]);


const handleUnitChange = (index, field, value) => {
  const updated = [...units];
  updated[index][field] = value;
  setUnits(updated);
  dispatch(updateField({ unitData: updated }));
};

const addUnitRow = () => {
  setUnits([
    ...units,
    { bhk: "", areaMin: "", areaMax: "", priceMin: "", priceMax: "" }
  ]);
};

    
        const dispatch = useDispatch();
        const category = useSelector((state) => state.property.data.category);
        const { data, errors } = useSelector((state) => state.property);
        function lookButton(e) {
            // // console.log(e.currentTarget.name);
            setLookSelection(e.currentTarget.name)
              dispatch(updateField({ purpose: e.currentTarget.name }));
        }
        
    
    
        useEffect(() => {
            // console.log(selection);
    
            if (selection === 'residential') {
                if (lookSelection === "sell") {
                    setPropertyTypes(sell)
                } else if (lookSelection === "rent") {
                    setPropertyTypes(rentLease)
                } else if (lookSelection === "pg") {
                    setPropertyTypes(pg)
                }
                else if(lookSelection === 'Project'){
                    setPropertyTypes(projectResidental)
                }
            }
            else if (selection === 'commercial') {
                if(lookSelection === "sell" || lookSelection === "rent"){
                    setPropertyTypes(commercialButton)
                }
                else if(lookSelection === 'Project'){
                    setPropertyTypes(commericalProject)
                }
            }

            
        }, [selection, lookSelection])
    
        const commericalMap = {
            office: [
                { title: 'Ready to move office space', name: 'Office Space' },
                { title: 'Bare Shell office space', name: 'Bare Shell office space' },
                { title: 'Co-working Office space', name: 'Co-working Office space' },
            ],
    
            retail: [
                { title: 'Commercial Shops', name: 'Commercial Shops' },
                { title: 'Commercial Showrooms', name: 'Commercial Showrooms' }
            ],
    
            plotLand: [
                { title: 'Commerical Land/Inst.Land', name: 'Commerical Land/Inst.Land' },
                { title: 'Agricultural/Farm Land', name: 'Agricultural/Farm Land' },
                { title: 'Industrial Lands/Plots', name: 'Industrial Lands/Plots' }
            ],
    
            storage: [
                { title: 'Store Storage', name: 'Store Storage' },
                { title: 'Cold Storage', name: 'Cold Storage' }
            ],
    
            industry: [
                { title: 'Factory', name: 'Factory' },
                { title: 'Manufacturing', name: 'Manufacturing' }
            ],
    
            hospitality: [
                { title: 'Hotel/Resorts', name: 'Hotel/Resorts' },
                { title: 'Guest-House/Banquet-Halls', name: 'Guest-House/Banquet-Halls' }
            ],
    
            other: []
        }
    
        const [commericalSpace, setCommericalSpace] = useState([]);
        const [selectedMainType, setSelectedMainType] = useState(null); // e.g. office, retail
        const resCom = (event) => {
            setCommericalSpace([])
            setSelection(event.target.value);
             dispatch(updateField({ property: event.target.value }))
        };
        // handle property type click
        function redintalTypes(event) {
            const name = event.target.name;
            dispatch(updateField({propertyType:event.target.name}));
    
            setItsType(name);
            if (selection === "commercial") {
                setSelectedMainType(name);
                setCommericalSpace(commericalMap[name] || []);
            }
        }

        function wkcpisit(e){
            setSelectedMainType(e.target.name)
            dispatch(updateField({commercialType:e.target.name}))
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

  const user = useSelector(state => state.user);
  // console.log(user.mobile);
  
  

  return (
    <>
      <h3 ><span className='text-2xl font-medium'> Welcome back ,<br />Fill out basic details</span></h3>
      <div className='my-5'><p className='font-medium '>I'm looking to</p>
                            <div className='flex my-3'>
                                
                                {lokingButton
                                .filter(item => user.mobile === "+917906518272" ?  true : item.name !== "Project" )
                                .map((item, index) => {
                                    return (
                                        <button key={index} name={item.name} className={`${lookSelection === item.name ? 'bg-gray-100     font-normal text-gray-900  cursor-pointer px-3 rounded-full text-sm mx-1' : 'bg-white border border-gray-300 font-normal text-gray-500  cursor-pointer px-3 rounded-full text-sm mx-1'} ${item.name === 'pg' && selection === 'commercial' ? 'hidden' : 'block'}`} onClick={lookButton}>{item.title}</button>
                                    )
                                })}
                            </div>
                            <div className='my-5'><p className='font-medium '>What kind of property do you have?</p>
                                <div className='flex my-3'>
                                    <div className="flex items-center" onChange={resCom}>
                                        <input id="default-radio-1" checked={selection === "residential"} type="radio" value="residential" name="default-radio" className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 " />
                                        <label for="default-radio-1" className="m-2 text-sm  text-gray-500 ">Residential </label>
                                    </div>
                                    <div className="flex items-center" onChange={resCom}>
                                        <input checked={selection === "commercial"} disabled={lookSelection === 'pg'} id="default-radio-2" type="radio" value="commercial" name="default-radio" className={`${lookSelection === 'pg' ? 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  cursor-not-allowed':'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer'}` }/>
                                        <label for="default-radio-2" className="m-2 text-sm  text-gray-500 ">Commerical</label>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">

    {lookSelection === "Project" ? (
        // ✅ CHECKBOX MODE — user can select multiple property types
        propertyTypes.map((item, index) => (
            <label
                key={index}
                className="flex items-center bg-white border border-gray-300 px-3 py-1 m-1 rounded-full text-sm cursor-pointer"
            >
                <input
                    type="checkbox"
                    name={item.name}
                    value={item.name}
                    checked={Array.isArray(itsType) && itsType.includes(item.name)}
                    onChange={(e) => {
                        let updated = Array.isArray(itsType) ? [...itsType] : [];

                        if (e.target.checked) {
                            updated.push(item.name);
                        } else {
                            updated = updated.filter((x) => x !== item.name);
                        }

                        setItsType(updated);
                        dispatch(updateField({ propertyType: updated }));
                    }}
                    className="mr-2"
                />
                {item.title}
            </label>
        ))
    ) : (
        // ✅ BUTTON MODE — normal behavior
        propertyTypes.map((item, index) => (
            <button
                key={index}
                name={item.name}
                className={`${itsType === item.name
                    ? 'bg-gray-100 font-normal text-gray-500 cursor-pointer px-2 py-1 m-1 rounded-full text-sm'
                    : 'bg-white border border-gray-300 font-normal text-gray-500 cursor-pointer px-2 py-1 m-1 rounded-full text-sm'
                }`}
                onClick={redintalTypes}
            >
                {item.title}
            </button>
        ))
    )}
</div>

                                <div className={`${commericalSpace.length > 0 ? 'my-5 block' : 'hidden'}`}>
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
                                                    onClick={wkcpisit}
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
