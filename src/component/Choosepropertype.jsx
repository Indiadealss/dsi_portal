import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import lightbulb from '../Images/lightbulb.svg'
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from './Redux/propertySlice';

const categories = [
    {
        id: "residential",
        title: "Residential Project",
        desc: "Apartments, Villas, raw houses, and residential communities",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
        ),
    },
    {
        id: "commercial",
        title: "Commercial project",
        desc: "Office spaces, retail shops, showrooms and business complexes",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" />
            </svg>
        ),
    },
    {
        id: "mixed",
        title: "Mixed Use Project",
        desc: "Projects with a combination of residential and commercial spaces",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5v-2h2v2zm4 4H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z" />
            </svg>
        ),
    },
    {
        id: "plotting",
        title: "Plotting Project",
        desc: "Plotted developments, townships and land projects",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z" />
            </svg>
        ),
    },
];

const statuses = [
    {
        id: "new_launch",
        title: "New Launch",
        desc: "Just launched or pre-launch stage",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
        ),
        color: "#0D6EFD",
    },
    {
        id: "under_construction",
        title: "Under Construction",
        desc: "Construction is in Progress",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M13.7 2.3C13.5 2.1 13.3 2 13 2H5C4.4 2 4 2.4 4 3v18c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V9c0-.3-.1-.5-.3-.7l-6-6zM13 4.4L18.6 10H13V4.4z" />
            </svg>
        ),
        color: "#0D6EFD",
    },
    {
        id: "ready_to_move",
        title: "Ready to Move",
        desc: "Construction completed",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5S15.01 22 17.5 22s4.5-2.01 4.5-4.5S19.99 13 17.5 13zm0 7c-1.38 0-2.5-1.12-2.5-2.5S16.12 15 17.5 15s2.5 1.12 2.5 2.5S18.88 20 17.5 20zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
            </svg>
        ),
        color: "#0D6EFD",
    },
];

const purposes = [
    {
        id: "for_sale",
        title: "For sale",
        desc: "Sell units in this project",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
            </svg>
        ),
        color: "#8B5CF6",
        selectedBg: "#F7F2FF",
        selectedBorder: "#8B5CF6",
    },
    {
        id: "prelaunch",
        title: "Prelaunch",
        desc: "Generate interest for upcoming Launch",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
        ),
        color: "#F59E0B",
        selectedBg: "#FFFBEB",
        selectedBorder: "#F59E0B",
    },
    {
        id: "investment",
        title: "Investment",
        desc: "Attract investors for this project",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
            </svg>
        ),
        color: "#0D6EFD",
        selectedBg: "#EDF5FF",
        selectedBorder: "#0D6EFD",
    },
];

const benefits = [
    { title: "Maximum Visibility", desc: "Reach thousand of Verified Users" },
    { title: "Trusted Platform", desc: "Secure, reliable and transparent" },
    { title: "Better Leads", desc: "Get quality leads and faster responses" },
    { title: "Quick & Easy", desc: "Simple steps to list and manage your property" },
];
const Choosepropertype = () => {
    const propertyFirstData = useSelector((state) => state.property.data);
    const [formData, setFormData] = useState({
        category: propertyFirstData.propertyType,
        status: propertyFirstData.status,
        purpose: propertyFirstData.projectPurpose,
    });

    const dispatch = useDispatch();

    const debounceRef = useRef(null);


    useEffect(()=> {
        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            dispatch(updateField({
                propertyType: formData.category,
                status:formData.status,
                projectPurpose:formData.purpose,
            }))
        }, 500);

        

        return () => clearTimeout(debounceRef.current);
    },[formData.category, formData.status, formData.purpose])


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
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827]">Choose Project Type</h1>
                        <p className="text-sm text-[#6B7280] mt-1 font-semibold">Select the category, current status and purpose of your project</p>
                        <div className="mt-2 h-0.5 bg-[#0D6EFD] rounded-full w-64 sm:w-80" />
                    </div>
                    {/* Tip card */}
                    <div className="bg-[#F2FBF5] border border-[#CDEED7] rounded-[10px] p-3 flex gap-2.5 items-start sm:min-w-[260px] sm:max-w-[300px] shrink-0">
                        <div className="mt-0.5 shrink-0">
                            <svg viewBox="0 0 24 24" fill="#16A34A" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm3 14H9v-1h6v1zm-6-3v-1.73C7.4 10.53 6 9.07 6 9c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.07-.6 2.53-2 3.27V13H9z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#111827]">Tip</p>
                            <p className="text-xs text-[#6B7280] leading-snug">Selecting the right details helps us highlight your project to the right audience</p>
                        </div>
                    </div>
                </div>

                {/* ── PROJECT CATEGORY ── */}
                <section>
                    <h3 className="text-base font-semibold text-[#111827] mb-1">Select Project Category</h3>
                    <p className="text-xs text-[#6B7280] mb-3">Choose the best category that suits your project</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                        {categories.map((cat) => {
                            const sel = formData.category === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => select("category", cat.id)}
                                    className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-3 hover:shadow-md ${sel ? "bg-[#EDF5FF] border-[#0D6EFD]" : "bg-white border-[#D9D9D9] hover:border-[#0D6EFD]/40"
                                        }`}
                                >
                                    {/* Radio top-right */}
                                    <div className={`absolute top-3 right-3 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-colors ${sel ? "border-[#0D6EFD] bg-[#0D6EFD]" : "border-[#D9D9D9] bg-white"}`} style={{ width: 18, height: 18 }}>
                                        {sel && <CheckIcon />}
                                    </div>
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${sel ? "bg-[#0D6EFD] text-white" : "bg-[#EDF5FF] text-[#0D6EFD]"}`}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-semibold transition-colors ${sel ? "text-[#0D6EFD]" : "text-[#111827]"}`}>{cat.title}</p>
                                        <p className="text-xs text-[#6B7280] mt-0.5 leading-snug">{cat.desc}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ── STATUS + PURPOSE ── */}
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Status */}
                    <section className="flex-1">
                        <h3 className="text-base font-semibold text-[#111827] mb-1">Select Project Status</h3>
                        <p className="text-xs text-[#6B7280] mb-3">Choose the best category that suits your project</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {statuses.map((s) => {
                                const sel = formData.status === s.id;
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => select("status", s.id)}
                                        className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-2 hover:shadow-md ${sel ? "bg-[#EDF5FF] border-[#0D6EFD]" : "bg-white border-[#D9D9D9] hover:border-[#0D6EFD]/40"
                                            }`}
                                    >
                                        <div className={`absolute top-3 right-3 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${sel ? "border-[#0D6EFD] bg-[#0D6EFD]" : "border-[#D9D9D9] bg-white"}`}>
                                            {sel && <CheckIcon />}
                                        </div>
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${sel ? "bg-[#0D6EFD] text-white" : "bg-[#EDF5FF] text-[#0D6EFD]"}`}>
                                            {s.icon}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-semibold ${sel ? "text-[#0D6EFD]" : "text-[#111827]"}`}>{s.title}</p>
                                            <p className="text-xs text-[#6B7280] mt-0.5 leading-snug">{s.desc}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Purpose */}
                    <section className="flex-1">
                        <h3 className="text-base font-semibold text-[#111827] mb-1">Select Purpose</h3>
                        <p className="text-xs text-[#6B7280] mb-3">Choose the best category that suits your project</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {purposes.map((p) => {
                                const sel = formData.purpose === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => select("purpose", p.id)}
                                        className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-2 hover:shadow-md ${sel
                                                ? `border-[${p.selectedBorder}]`
                                                : "bg-white border-[#D9D9D9] hover:border-gray-400"
                                            }`}
                                        style={sel ? { background: p.selectedBg, borderColor: p.selectedBorder } : {}}
                                    >
                                        <div
                                            className={`absolute top-3 right-3 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center`}
                                            style={sel ? { borderColor: p.color, background: p.color } : { borderColor: "#D9D9D9", background: "white" }}
                                        >
                                            {sel && <CheckIcon />}
                                        </div>
                                        <div
                                            className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                                            style={sel ? { background: p.color, color: "white" } : { background: "#F3F4F6", color: p.color }}
                                        >
                                            {p.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold" style={{ color: sel ? p.color : "#111827" }}>{p.title}</p>
                                            <p className="text-xs text-[#6B7280] mt-0.5 leading-snug">{p.desc}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* ── BENEFITS BANNER ── */}
                <div className="bg-[#F6FCF8] border border-[#DCEFE3] rounded-xl px-5 py-4">
                    <h3 className="text-lg font-semibold text-[#111827] mb-4">Why Post with Indiadeals group ?</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {benefits.map((b) => (
                            <div key={b.title} className="flex flex-col md:flex-row items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#E6F8EC] flex items-center justify-center shrink-0">
                                    <img src={lightbulb} className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#111827]">{b.title}</p>
                                    <p className="text-xs text-[#6B7280] leading-snug">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
        </>
    )
}

export default Choosepropertype