import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import lightbulb from '../Images/lightbulb.svg'
import { CalendarDays } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from './Redux/propertySlice';



const Projectlocationnew = () => {

    const propertyFirstData = useSelector((state) =>  state.property.data);

    const [city, setCity] = useState(propertyFirstData.city);
    const [sectorLocality, setSectorLocality] = useState(propertyFirstData.location);
    const [pincode, setPincode] = useState(propertyFirstData.pincode);
    const [projectaddress, setProjectAddress] = useState(propertyFirstData.projectaddress);
    const [selectonMap, setSelectOnMap] = useState(propertyFirstData.selectonMap);
    const [nearbyLandmarks, setNearbyLandmarks] = useState(propertyFirstData.landmark);
    const [locationhighlights, setLocationhighlights] = useState(propertyFirstData.locatadvance);

    const dispatch = useDispatch();
    const debounce = useRef(null);



    useEffect(() => {
        clearTimeout(debounce.current);

        debounce.current = setTimeout(() => {
            dispatch(updateField({
                location:sectorLocality,
                city: city,
                pincode: pincode,
                projectaddress: projectaddress,
                selectonMap: selectonMap,
                landmark: nearbyLandmarks,
                locatadvance: locationhighlights,
            }))
        },400)
    },[
        sectorLocality,
        city,
        pincode,
        projectaddress,
        selectonMap,
        nearbyLandmarks,
        locationhighlights,
    ])

    const select = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));



    const CheckIcon = () => (
        <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
    );

    return (
        <>
            <div className="p-5 sm:p-7 space-y-7">

                {/* Page header + tip */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">Project Location</h1>
                        <p className="text-sm font-semibold text-[#6B7280] mt-1">Add the Exact Location and nearby Details to help buyers find your project easily</p>
                        <div className="mt-2 h-0.5 bg-[#0D6EFD] rounded-full w-64 sm:w-80" />
                    </div>
                    {/* Tip card */}
                    <div className="bg-[#F2FBF5] border border-[#CDEED7] rounded-[10px] p-3 flex gap-2.5 items-start sm:min-w-[260px] sm:max-w-[300px] shrink-0">
                        <div className="mt-0.5 shrink-0">
                            <svg viewBox="0 0 24 24" fill="#16A34A" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm3 14H9v-1h6v1zm-6-3v-1.73C7.4 10.53 6 9.07 6 9c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.07-.6 2.53-2 3.27V13H9z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#111827]">Tip</p>
                            <p className="text-xs text-[#6B7280] leading-snug">Accurate location details improve visibility and bring more genunie leads.</p>
                        </div>
                    </div>
                </div>

                {/* Project information */}
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col'>
                        <label className="text-sm font-semibold">City</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.currentTarget.value)} placeholder="Noida" className='text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 w-[245px]' />
                    </div>

                    <div className='flex flex-col'>
                        <label className="text-sm font-semibold">Sector/Locality</label>
                        <input type="text" value={sectorLocality} onChange={(e) => setSectorLocality(e.currentTarget.value)} placeholder="Sector 150" className="text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 w-[245px]" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Pincode</label>
                        <input type="text" placeholder="201310" value={pincode} onChange={(e) => setPincode(e.currentTarget.value)} className="text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 w-[245px]" /> 
                    </div>
                </div>

                {/* Project Address */}
                <div className="grid grid-cols-1 gap-4">
                    <div className='flex flex-col'>
                        <label className="text-sm font-semibold">Project Adress</label>
                        <input type="text" value={projectaddress} onChange={(e) => setProjectAddress(e.currentTarget.value)} placeholder="Plot Number 45, Sector 150, Noida Epressway, Noida, Utter Pradesh" className="text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 max-w-[929px]" />
                    </div>
                </div>

                {/* Select on Map */}
                <div className="grid grid-cols-1 gap-4">
                    <div className='flex flex-col'>
                        <label className="text-sm font-semibold">Select on Map</label>
                        <input type="text" value={selectonMap} onChange={(e) => setSelectOnMap(e.currentTarget.value)} placeholder="Drop a pin on the map or search location" className="text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 max-w-[929px]" />
                    </div>
                </div>

                {/* Nearby Landmarks */}
                <div className="grid grid-cols-1 gap-4">
                    <div className='flex flex-col'>
                        <label className="text-sm font-semibold">Nearby Landmarks</label>
                        <textarea rows={3} value={nearbyLandmarks} onChange={(e) => setNearbyLandmarks(e.currentTarget.value)} type="text" placeholder="Near Locations" className="text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 max-w-[929px]" />
                    </div>
                </div>

                {/* distance */}

                {/* Location Highlights */}
                <div className="grid grid-cols-1 gap-4">
                    <div className='flex flex-col'>
                        <label className="text-sm font-semibold">Location Highlights</label>
                        <textarea rows={3} type="text" value={locationhighlights} onChange={(e) => setLocationhighlights(e.currentTarget.value)} placeholder="E.g. prime Location on Noida Expressway, close to schools, hospitals shooping mails, IT hubs, etc." className="text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-1 max-w-[929px]" />
                    </div>
                </div>


            </div>
        </>
    )
}

export default Projectlocationnew;