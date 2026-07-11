import React, { useState, useRef, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { getAllProjectNames } from "../api/api";

const STEPS = [1, 2, 3, 4];

const INITIAL_FORM = {
    projectId: "",
    projectName: "",
    projectType: "",
    campaignTitle: "",
    campaignStatus: "",
    brokerName: "",
    mobileNumber: "",
    email: "",
    city: "",
    description: "",
    startDate: "",
    endDate: "",
    leadRouting: "",
};

function FormField({ label, name, value, onChange, placeholder, type = "text" }) {
    return (
        <div className="flex flex-1 flex-col gap-2">
            <label htmlFor={name} className="text-[14px] font-medium text-[#0B1F33]">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-[15px] text-[#0B1F33] placeholder:text-[#9CA3AF] focus:border-[#0F6CBD] focus:outline-none focus:ring-1 focus:ring-[#0F6CBD]"
            />
        </div>
    );
}

function UploadBox({ label, file, onFileSelect, accept, hint }) {
    const inputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) onFileSelect(dropped);
    };

    return (
        <div className="flex-1">
            <p className="mb-2 text-[14px] font-medium text-[#0B1F33]">{label}</p>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`flex h-[130px] flex-col items-center justify-center rounded-[10px] border border-dashed px-4 text-center transition-colors ${dragOver ? "border-[#0F6CBD] bg-[#EEF5FF]" : "border-[#D9D9D9] bg-white"
                    }`}
            >
                <UploadCloud className="mb-2 h-6 w-6 text-[#0F6CBD]" />
                {file ? (
                    <p className="text-[14px] font-medium text-[#0B1F33]">{file.name}</p>
                ) : (
                    <>
                        <p className="text-[14px] text-[#6B7280]">
                            Drag &amp; Drop Files here or{" "}
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="font-medium text-[#0F6CBD] hover:underline"
                            >
                                Browse
                            </button>
                        </p>
                        <p className="mt-1 text-[12px] text-[#9CA3AF]">{hint}</p>
                    </>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => {
                        const selected = e.target.files?.[0];
                        if (selected) onFileSelect(selected);
                    }}
                />
            </div>
        </div>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4 py-1.5">
            <span className="text-[14px] text-[#6B7280]">{label}</span>
            <span className="max-w-[60%] text-right text-[14px] font-medium text-[#0B1F33]">
                {value || "—"}
            </span>
        </div>
    );
}

export default function CreateCampaignForm({setActiveNav}) {
    const [activeStep, setActiveStep] = useState(3);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [brokerLogo, setBrokerLogo] = useState(null);
    const [promoVideo, setPromoVideo] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [projectName, setProjectName] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'projectName') {
            console.log(value, 'value is')

            const output = projectName.filter((item) => {
                return item.projectname === item.value;
            })

            console.log(output, 'output is this');
            
        }
    };

    useEffect(() => {
        featchAllProjectNames()
    }, [])

    const featchAllProjectNames = async () => {
        const res = await getAllProjectNames()
        setProjectName(res.data.data);

    }

    const handleBack = () => {
        setActiveStep((prev) => Math.max(1, prev - 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setSubmitSuccess(false);
        setSubmitting(true);

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
            });
            if (brokerLogo) payload.append("brokerLogo", brokerLogo);
            if (promoVideo) payload.append("promotionalVideo", promoVideo);

            const response = await fetch("/api/campaigns", {
                method: "POST",
                body: payload,
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.message || "Failed to submit campaign");
            }

            setSubmitSuccess(true);
            setFormData(INITIAL_FORM);
            setBrokerLogo(null);
            setPromoVideo(null);
        } catch (err) {
            setSubmitError(err.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const campaignName =
        formData.projectName && formData.campaignTitle
            ? `${formData.projectName} - ${formData.campaignTitle}`
            : formData.campaignTitle || formData.projectName;

    return (
        <div className="min-h-screen w-full bg-[#F8F9FB] p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[32px] font-bold leading-tight text-[#0B1F33] sm:text-[40px]">
                        Create Campaign
                    </h1>
                    <p className="mt-1 text-[16px] font-normal text-[#6B7280]">
                        Add a new broker or dealer campaign for a project
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
                        {/* Main form column */}
                        <div className="flex flex-col gap-6 lg:col-span-7">
                            {/* Progress Stepper */}
                            <div className="flex items-center justify-center px-4 py-2 sm:px-10">
                                {STEPS.map((step, idx) => (
                                    <React.Fragment key={step}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveStep(step)}
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F6CBD] text-[13px] font-semibold text-white"
                                        >
                                            {step}
                                        </button>
                                        {idx < STEPS.length - 1 && (
                                            <div className="mx-2 h-0 flex-1 border-t-2 border-dotted border-[#0F6CBD] sm:mx-4" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Section 1: Address Verification */}
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
                                <h2 className="mb-5 text-[20px] font-semibold text-[#0B1F33] sm:text-[24px]">
                                    Address Verification
                                </h2>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-5 sm:flex-row">
                                        <FormField
                                            label="Project ID"
                                            name="projectId"
                                            value={formData.projectId}
                                            onChange={handleChange}
                                            placeholder="Gurgaon"
                                            disabled={true}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Project Name
                                            </label>

                                            <input
                                                type="text"
                                                name="projectName"
                                                list="project-list"
                                                value={formData.projectName}
                                                onChange={handleChange}
                                                placeholder="CRC Maesta"
                                                className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-[15px] text-[#0B1F33] placeholder:text-[#9CA3AF] focus:border-[#0F6CBD] focus:outline-none focus:ring-1 focus:ring-[#0F6CBD]"
                                            />

                                            <datalist id="project-list">
                                                {projectName.map((project) => (
                                                    <option
                                                        key={project._id}
                                                        value={project.projectname}
                                                    />
                                                ))}
                                            </datalist>
                                        </div>
                                        <FormField
                                            label="Project Type"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            placeholder="Residential"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-5 sm:flex-row">
                                        <FormField
                                            label="Campaign Title"
                                            name="campaignTitle"
                                            value={formData.campaignTitle}
                                            onChange={handleChange}
                                            placeholder="Gurgaon"
                                        />
                                        <FormField
                                            label="Campaign Status"
                                            name="campaignStatus"
                                            value={formData.campaignStatus}
                                            onChange={handleChange}
                                            placeholder="Gurgaon"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Broker / Dealer Details */}
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
                                <h2 className="mb-5 text-[20px] font-semibold text-[#0B1F33] sm:text-[24px]">
                                    Broker / Dealer Details
                                </h2>
                                <div className="flex flex-col gap-5 sm:flex-row">
                                    <FormField
                                        label="Broker Name"
                                        name="brokerName"
                                        value={formData.brokerName}
                                        onChange={handleChange}
                                        placeholder="ACE Terra Reality"
                                    />
                                    <FormField
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="+91 9818763100"
                                    />
                                    <FormField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Info@aceterrareality.com"
                                    />
                                    <FormField
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Noida"
                                    />
                                </div>
                            </div>

                            {/* Section 3: Media Upload */}
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
                                <h2 className="mb-5 text-[20px] font-semibold text-[#0B1F33] sm:text-[24px]">
                                    Media Upload
                                </h2>
                                <div className="flex flex-col gap-5 sm:flex-row">
                                    <UploadBox
                                        label="Broker Logo or photo"
                                        file={brokerLogo}
                                        onFileSelect={setBrokerLogo}
                                        accept="image/jpeg,image/png"
                                        hint="JPG, PNG (10 MB)"
                                    />
                                    <UploadBox
                                        label="Promotional Video"
                                        file={promoVideo}
                                        onFileSelect={setPromoVideo}
                                        accept="video/mp4"
                                        hint="MP4 (10 MB)"
                                    />
                                </div>
                            </div>

                            {/* Section 4: Campaign Details */}
                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
                                <h2 className="mb-5 text-[20px] font-semibold text-[#0B1F33] sm:text-[24px]">
                                    Campaign Details
                                </h2>
                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <label
                                            htmlFor="description"
                                            className="text-[14px] font-medium text-[#0B1F33]"
                                        >
                                            Short Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Premium residential project located in Sector 22d, Yamuna expressway, Noida. Spread across 5 acres with world class amenities and excellent connectivity"
                                            className="h-[130px] w-full resize-none rounded-lg border border-[#D9D9D9] bg-white p-4 text-[15px] text-[#0B1F33] placeholder:text-[#9CA3AF] focus:border-[#0F6CBD] focus:outline-none focus:ring-1 focus:ring-[#0F6CBD]"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-5">
                                        <div className="flex flex-col gap-5 sm:flex-row">
                                            <FormField
                                                label="Start Date"
                                                name="startDate"
                                                type="date"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                            />
                                            <FormField
                                                label="End Date"
                                                name="endDate"
                                                type="date"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <FormField
                                            label="Lead Routing"
                                            name="leadRouting"
                                            value={formData.leadRouting}
                                            onChange={handleChange}
                                            placeholder="Project Admin"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary sidebar */}
                        <div className="lg:col-span-3">
                            <div className="sticky top-6 rounded-xl border border-[#E5E7EB] bg-white p-6">
                                <h2 className="mb-4 text-[18px] font-semibold text-[#0B1F33]">
                                    Campaign Summary
                                </h2>

                                <div className="mb-1">
                                    <p className="mb-1 text-[15px] font-semibold text-[#0B1F33]">
                                        Project Details
                                    </p>
                                    <SummaryRow label="Project ID" value={formData.projectId} />
                                    <SummaryRow label="Project Name" value={formData.projectName} />
                                    <SummaryRow label="Project Type" value={formData.projectType} />
                                    <SummaryRow label="Campaign Name" value={campaignName} />
                                    <SummaryRow label="Status" value={formData.campaignStatus} />
                                </div>

                                <div className="my-4 border-t border-[#E5E7EB]" />

                                <div className="mb-1">
                                    <p className="mb-1 text-[15px] font-semibold text-[#0B1F33]">
                                        Broker / Dealer Details
                                    </p>
                                    <SummaryRow label="Broker Name" value={formData.brokerName} />
                                    <SummaryRow label="Mobile Number" value={formData.mobileNumber} />
                                    <SummaryRow label="Email" value={formData.email} />
                                    <SummaryRow label="City" value={formData.city} />
                                </div>

                                <div className="my-4 border-t border-[#E5E7EB]" />

                                <div className="mb-1">
                                    <p className="mb-1 text-[15px] font-semibold text-[#0B1F33]">
                                        Media
                                    </p>
                                    <SummaryRow label="Broker Logo" value={brokerLogo?.name} />
                                    <SummaryRow label="Promotional Video" value={promoVideo?.name} />
                                </div>

                                <div className="my-4 border-t border-[#E5E7EB]" />

                                <div className="mb-2">
                                    <p className="mb-1 text-[15px] font-semibold text-[#0B1F33]">
                                        Campaign Details
                                    </p>
                                    <SummaryRow label="Short Description" value={formData.description} />
                                    <SummaryRow label="Start Date" value={formData.startDate} />
                                    <SummaryRow label="End Date" value={formData.endDate} />
                                    <SummaryRow label="Lead Routing" value={formData.leadRouting} />
                                </div>

                                {submitError && (
                                    <p className="mt-3 text-[13px] text-[#EF4444]">{submitError}</p>
                                )}
                                {submitSuccess && (
                                    <p className="mt-3 text-[13px] text-[#16A34A]">
                                        Campaign submitted successfully.
                                    </p>
                                )}

                                <div className="mt-5 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setActiveNav('campaign')}
                                        className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white text-[15px] font-medium text-[#374151] transition-colors hover:bg-[#F3F4F6]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="h-12 w-full rounded-lg bg-[#0F6CBD] text-[15px] font-medium text-white transition-colors hover:bg-[#0B5AA0] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {submitting ? "Submitting..." : "Submit for verification"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
