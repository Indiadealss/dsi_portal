import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home, Building2, KeyRound, BedDouble, ShieldCheck, Zap, IndianRupee,
    ArrowRight, Star, Clock, Tag, MessageSquare,
} from 'lucide-react';

export const Postproperty = () => {

    const navigate = useNavigate();
    const lokingButton = [
        { title: 'Sell', name: 'sell', icon: Home },
        { title: 'Rent / Lease', name: 'rent', icon: KeyRound },
        { title: 'PG', name: 'pg', icon: BedDouble }
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

    const highlights = [
        { icon: Zap, text: 'Get listed in minutes', ring: 'bg-blue-100 text-blue-600' },
        { icon: ShieldCheck, text: 'Verified genuine buyers', ring: 'bg-indigo-100 text-indigo-600' },
        { icon: IndianRupee, text: '100% free, no hidden fees', ring: 'bg-emerald-100 text-emerald-600' },
    ]

    const trustPoints = [
        { icon: Tag, text: 'Free forever', ring: 'bg-emerald-100 text-emerald-600' },
        { icon: Clock, text: 'Quick & easy', ring: 'bg-blue-100 text-blue-600' },
        { icon: MessageSquare, text: 'Get responses fast', ring: 'bg-indigo-100 text-indigo-600' },
    ]

    const [propertyTypes, setPropertyTypes] = useState(sell)
    const [selection, setSelection] = useState("");
    const [lookSelection, setLookSelection] = useState("sell");
    const [itsType, setItsType] = useState('');

    useEffect(() => {
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


    function lookButton(e) {
        setLookSelection(e.currentTarget.name)
    }

    const resCom = (event) => {
        setSelection(event.target.value);
    };

    function redintalTypes(event) {
        setItsType(event.currentTarget.name);
    }

    return (
        <>
            <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F7FF] via-white to-[#F4F0FF] py-10 px-4 sm:py-16 sm:px-6 lg:px-10">

                {/* decorative dot grid + glows */}
                <div
                    className="hidden lg:block absolute top-6 right-6 w-56 h-56 opacity-60 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                />
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 right-0 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left – marketing copy */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 bg-white text-[#0D6EFD] text-xs font-bold tracking-wide px-4 py-2 rounded-full mb-6 shadow-sm border border-gray-100">
                            <Home size={14} /> INDIADEALS GROUP
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] text-[#0B1526]">
                            <span className="text-[#2563EB]">Sell</span> or{' '}
                            <span className="text-[#7C3AED]">Rent</span> Your Property
                            {/* <br className="hidden sm:block" />  */}
                            <br className="hidden sm:block" /> Online,{' '}
                            <span className="relative inline-block text-[#2563EB]">
                                Faster.
                                <svg className="absolute left-0 -bottom-1 w-full" height="8" viewBox="0 0 120 8" preserveAspectRatio="none">
                                    <path d="M2 6 Q 30 -2 60 4 T 118 3" stroke="#93C5FD" strokeWidth="4" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="mt-5 text-gray-500 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                            Reach thousands of verified buyers and tenants across India. Post your property for free and get responses within hours.
                        </p>

                        <ul className="mt-7 flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-6 lg:gap-4 justify-center lg:justify-start">
                            {highlights.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.text} className="flex items-center gap-3 justify-center lg:justify-start text-sm font-semibold text-gray-700">
                                        <span className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${item.ring}`}>
                                            <Icon size={16} />
                                        </span>
                                        {item.text}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Illustration */}
                        <div className="hidden lg:block relative mt-10 w-[26vw] max-w-md">
                            <img
                                src="https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1772110066681-sa2x.png"
                                alt="Post your property"
                                className="w-full"
                            />

                            {/* trust badge */}
                            <div className="absolute bottom-6 -right-4 sm:right-0 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 max-w-[280px]">
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600 shrink-0">
                                    <Star size={16} fill="currentColor" />
                                </span>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-gray-800 leading-snug">Trusted by 50K+ property owners</p>
                                    <div className="flex items-center mt-1 -space-x-2">
                                        <span className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">A</span>
                                        <span className="w-5 h-5 rounded-full bg-indigo-500 border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">R</span>
                                        <span className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">S</span>
                                        <span className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white text-gray-600 text-[9px] font-bold flex items-center justify-center">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right – form card */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl shadow-blue-900/5 p-5 sm:p-8 overflow-hidden">

                            {/* FREE ribbon */}
                            <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden">
                                <div className="absolute top-[18px] right-[-38px] w-[150px] rotate-45 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-bold tracking-wider text-center py-1 shadow">
                                    FREE
                                </div>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1526] leading-snug pr-10">
                                Start posting your property
                                <br /> — <span className="text-[#7C3AED]">it's free!</span>
                            </h3>

                            <h4 className="font-semibold text-gray-800 mt-6 mb-2 text-sm">You're looking to...</h4>
                            <div className="flex flex-wrap gap-2">
                                {lokingButton.map((item, index) => {
                                    if (item.name === 'pg' && selection === 'commercial') return null;
                                    const active = lookSelection === item.name;
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            name={item.name}
                                            onClick={lookButton}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border cursor-pointer transition-colors ${active
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white shadow-md'
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                                                }`}
                                        >
                                            <Icon size={15} /> {item.title}
                                        </button>
                                    )
                                })}
                            </div>

                            <h4 className="font-semibold text-gray-800 mt-5 mb-2 text-sm">And it's a...</h4>
                            <div className="flex flex-wrap gap-2" onChange={resCom}>
                                <label
                                    htmlFor="default-radio-1"
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border cursor-pointer transition-colors ${selection === 'residential'
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white shadow-md'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                                        }`}
                                >
                                    <input id="default-radio-1" checked={selection === "residential"} onChange={resCom} type="radio" value="residential" name="default-radio" className="sr-only" />
                                    <Home size={15} /> Residential
                                </label>
                                <label
                                    htmlFor="default-radio-2"
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${lookSelection === 'pg' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${selection === 'commercial'
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white shadow-md'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                                        }`}
                                >
                                    <input checked={selection === "commercial"} disabled={lookSelection === 'pg'} onChange={resCom} id="default-radio-2" type="radio" value="commercial" name="default-radio" className="sr-only" />
                                    <Building2 size={15} /> Commercial
                                </label>
                            </div>

                            {selection !== '' && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {propertyTypes.map((item, index) => {
                                        const active = itsType === item.name;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                name={item.name}
                                                onClick={redintalTypes}
                                                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium border cursor-pointer transition-colors ${active
                                                    ? 'bg-blue-50 border-blue-400 text-blue-600'
                                                    : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
                                                    }`}
                                            >
                                                {item.title}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}

                            <div className="flex items-start gap-3 mt-5 bg-blue-50/70 rounded-xl px-4 py-3">
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white shrink-0 mt-0.5">
                                    <ShieldCheck size={16} />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Your contact details are safe with us</p>
                                    <p className="text-xs text-gray-500 mt-0.5">We never share your information with anyone.</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors text-white font-bold text-base sm:text-lg rounded-xl py-3.5 cursor-pointer shadow-lg shadow-indigo-600/20"
                                onClick={() => navigate('/login')}
                            >
                                Start Now <ArrowRight size={18} />
                            </button>

                            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5">
                                {trustPoints.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <span key={item.text} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${item.ring}`}>
                                                <Icon size={11} />
                                            </span>
                                            {item.text}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
