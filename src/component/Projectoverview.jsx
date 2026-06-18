import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import lightbulb from '../Images/lightbulb.svg'
import { CalendarDays } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from './Redux/propertySlice';



const Projectoverview = () => {

    const propertyFirstData = useSelector((state) => state.property.data);

    console.log(propertyFirstData, 'propertyFirstData is property');


    const [name, setName] = useState(propertyFirstData.projectName);
    const [possession, setPossession] = useState(propertyFirstData.Possession);
    const [projectdescription, setProjectdescription] = useState(propertyFirstData.description);
    const [rera, setRera] = useState(propertyFirstData.rera);
    const [totalarea, setTotalArea] = useState(propertyFirstData.totalProjectArea);
    const [tower, setTower] = useState(propertyFirstData.noOfTowerorblocks);
    const [units, setUnits] = useState(propertyFirstData.totalUnits);
    const [openspace, setOpenspace] = useState(propertyFirstData.openspce);
    const [projectLaunchDate, setProjectLaunchDate] = useState(propertyFirstData.productLaunchDate);
    const [expectedPossessiondate, setExpectedPossiondate] = useState(propertyFirstData.expectedPossession);
    const [approvedby, setApprovedBy] = useState(propertyFirstData.approvedBy);
    const [devlopmentype, setDevlopmentType] = useState(propertyFirstData.developmentType);
    const [architect, setArchiect] = useState(propertyFirstData.architectName);
    const [projectemail, setProjectEmail] = useState(propertyFirstData.projectEmail);
    const [projectContactnumber, setProjectContactnumber] = useState(propertyFirstData.projectContctNumber);


    const dispatch = useDispatch();

    const debounce = useRef();

    useEffect(() => {
        clearTimeout(debounce.current);

        console.log(debounce, 'debounce, check what is going on');


        debounce.current = setTimeout(() => {
            dispatch(updateField({
                projectName: name,
                Possession: possession,
                description: projectdescription,
                rera: rera,
                totalProjectArea: totalarea,
                noOfTowerorblocks: tower,
                totalUnits: units,
                openspce: openspace,
                productLaunchDate: projectLaunchDate,
                expectedPossession: expectedPossessiondate,
                approvedBy: approvedby,
                developmentType: devlopmentype,
                architectName: architect,
                projectEmail: projectemail,
                projectContctNumber: projectContactnumber
            }))
        }, 200);

        return () => clearTimeout(debounce.current)
    }, [
        tower,
        name,
        possession,
        projectdescription,
        rera,
        totalarea,
        units,
        openspace,
        projectLaunchDate,
        expectedPossessiondate,
        approvedby,
        devlopmentype,
        architect,
        projectemail,
        projectContactnumber
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
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">Project Overview</h1>
                        <p className="text-sm text-[#6B7280] mt-1 font-semibold">Add Basic information about your project</p>
                        <div className="mt-2 h-0.5 bg-[#0D6EFD] rounded-full w-64 sm:w-80" />
                    </div>
                    {/* Tip card */}
                    <div className="bg-[#F2FBF5] border outline-none border-[#CDEED7] rounded-[10px] p-3 flex gap-2.5 items-start sm:min-w-[260px] sm:max-w-[300px] shrink-0">
                        <div className="mt-0.5 shrink-0">
                            <svg viewBox="0 0 24 24" fill="#16A34A" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm3 14H9v-1h6v1zm-6-3v-1.73C7.4 10.53 6 9.07 6 9c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.07-.6 2.53-2 3.27V13H9z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#111827]">Tip</p>
                            <p className="text-xs text-[#6B7280] leading-snug">Provide accurate information to attract more buyers and build trust</p>
                        </div>
                    </div>
                </div>

                {/* Project information */}
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Project Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} placeholder="E.g Majestic Heights" className='text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-2 w-100' />
                    </div>
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Possession Date</label>
                        <input type="text" placeholder="E.g Majestic Heights" value={possession} onChange={(e) => setPossession(e.currentTarget.value)} className='text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-2 w-100' />
                    </div>
                </div>

                {/* Project Description */}
                <div className="grid grid-cols-2 gap-4">
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Project Description</label>
                        <textarea id="message" rows="3" value={projectdescription} onChange={(e) => setProjectdescription(e.currentTarget.value)} type="text" placeholder='Describe your project, its vision, highlights, lifestyle and key USPs....' className='text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-2 w-100' />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold">RERA Registration Number</label>
                            <input type='text' placeholder='E.g. UPRERAPRJ123456' value={rera} onChange={(e) => setRera(e.currentTarget.value)} className='uppercase text-sm text-gray-600 border outline-none border-gray-400 rounded p-1 my-2 w-100' />
                            <label className='text-green-600 text-xs w-[350px]'>Adding RERA Number Build Trust and Transparency</label>
                        </div>
                    </div>
                </div>

                {/* project details */}
                <div className="grid grid-cols-4 gap-4">
                    {/* Total project Area */}
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Total Project Area</label>
                        <div className="flex items-center border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2">
                            <input
                                type="number"
                                placeholder="E.g. 5.25"
                                className="flex-1 px-3 text-sm outline-none"
                                value={totalarea}
                                onChange={(e) => setTotalArea(e.currentTarget.value)}
                            />

                            <div className="h-full border-l border-gray-300 flex items-center px-3">
                                <select className="bg-transparent text-sm outline-none cursor-pointer">
                                    <option>Acres</option>
                                    <option>Sq.ft</option>
                                    <option>Sq.m</option>
                                    <option>Hectare</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* No of Towers / Blocks */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">No. of Tower/blocks</label>
                        <input type='text' value={tower} onChange={(e) => setTower(e.currentTarget.value)} placeholder='E.g.5' className='border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3' />
                    </div>

                    {/* Total Units */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">Total Units</label>
                        <input type='text' placeholder='E.g.450' value={units} onChange={(e) => setUnits(e.currentTarget.value)} className='border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3' />
                    </div>

                    {/* Open Space (%) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">Open Space(%)</label>
                        <input type="text" placeholder='E.g.65' value={openspace} onChange={(e) => setOpenspace(e.currentTarget.value)} className='border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3' />
                    </div>

                    {/* Project Launch Date */}
                    <div className='flex flex-col'>
                        <div className="w-[245px]">
                            <label className="block text-sm font-semibold mb-2">
                                Project Launch Date
                            </label>

                            <div className="flex items-center border outline-none border-gray-300 rounded-md overflow-hidden bg-white">
                                <input
                                    type="text"
                                    placeholder="Select Date"
                                    className="flex-1 px-4 py-2 text-sm outline-none h-[42px]"
                                    value={projectLaunchDate}
                                    onChange={(e) => setProjectLaunchDate(e.currentTarget.value)}
                                />

                                <div className="border-l border-gray-300 px-4 py-2">
                                    <CalendarDays size={18} className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expected Prossession Date */}
                    <div className='flex flex-col'>
                        <div className="w-[245px]">
                            <label className="block text-sm font-semibold mb-2">
                                Expected Possession Date
                            </label>

                            <div className="flex items-center border outline-none border-gray-300 rounded-md overflow-hidden bg-white">
                                <input
                                    type="text"
                                    placeholder="Select Date"
                                    className="flex-1 px-4 py-2 text-sm outline-none h-[42px]"
                                    value={expectedPossessiondate}
                                    onChange={(e) => setExpectedPossiondate(e.currentTarget.value)}
                                />

                                <div className="border-l border-gray-300 px-4 py-2">
                                    <CalendarDays size={18} className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Approved By */}
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">Approved By</label>
                        <input type="text" value={approvedby} onChange={(e) => setApprovedBy(e.currentTarget.value)} placeholder='E.g.65' className='border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3' />
                    </div>

                    {/* Development Type */}
                    <div className='flex flex-col'>
                        <label className='text-sm font-bold'>Development Type</label>
                        <select value={devlopmentype || ''} onChange={(e) => setDevlopmentType(e.currentTarget.value)} className="border outline-none border-gray-300 rounded-md bg-transparent text-sm outline-none cursor-pointer overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3">
                            <option value="">Select One</option>
                            <option value="MIVAN">MIVAN</option>
                            <option value="New Technology">NEW TECHNOLOGY</option>
                            <option value="ASH BRICKS">ASH BRICKS</option>
                            <option value="CEMENT BRICKS">CEMENT BRICKS</option>
                            <option value="REL BRICK">REL BRICK</option>
                        </select>
                    </div>

                    {/* Devloper Name */}
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Devloper Name</label>
                        <input type="text" value={architect} onChange={(e) => setArchiect(e.currentTarget.value)} placeholder='E.g. Hazzel Contractor' className='border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3' />
                    </div>


                    {/* Project Email */}
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Project Email</label>
                        <input type="text" value={projectemail} onChange={(e) => setProjectEmail(e.currentTarget.value)} placeholder='E.g. contact@yourproject.com' className='border outline-none border-gray-300 rounded-md overflow-hidden w-[245px] h-[42px] bg-white my-2 px-3' />
                    </div>

                    {/* Project Contact Number */}
                    <div className='flex flex-col'>
                        <label className="text-sm font-bold">Project Contact Number</label>
                        <div className="my-2 flex items-center border outline-none border-gray-300 rounded-md overflow-hidden w-full max-w-md bg-white h-[42px]">
                            {/* Country Code */}
                            <div className="border-r border-gray-300 px-3 h-full flex items-center">
                                <label className="bg-transparent outline-none text-gray-600 text-sm cursor-pointer">
                                    +91
                                </label>
                            </div>

                            {/* Phone Number */}
                            <input
                                type="tel"
                                placeholder="Enter phone number"
                                value={projectContactnumber}
                                onChange={(e) => setProjectContactnumber(e.currentTarget.value)}
                                className="flex-1 px-4 h-full outline-none text-sm"
                                maxLength={10}
                                minLength={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projectoverview