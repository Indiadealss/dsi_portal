import React, { useEffect, useState } from "react";
import { ImFolderDownload } from "react-icons/im";
import { useSelector } from "react-redux";
import { createLead } from "../../api/api";
import Afterlead from "./Afterlead";
import { useNavigate } from "react-router-dom";

const Leadgentaionform = ({ setLeadModel }) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.propertyid);

  const [countryCode ,setCountryCode] = useState("+91")
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selected, setSelected] = useState("");
  const [reason,setReason] = useState("");
  const [youPropertyDealer,setYouPropertyDealer] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();


    const property = useSelector((state) => state.propertyid.data);
  
    const [pdfFile, setPdfFile] = useState(null);
  
  
    useEffect(() => {
      const pdf = property.images.filter((item) => item.type === 'brouser')
      setPdfFile(pdf[0].src)
      console.log(pdf[0].src, "ikl");
  
    }, [])

  const planningOption = [
    { label: "3 Months", value: "3 Months" },
    { label: "6 Months", value: "6 Months" },
    { label: "More than 6 months", value: "More than 6 months" }
  ];

  const yourReason = [
    {
      label: "Investment",
      value: "Investment"
    },
    {
      label: "Self Use",
      value: "Self Use"
    }
  ]

  const countryCodes = [
    { code: "+91", country: "IND" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "AUS" }
  ];

  /* ================= PREFILL USER DATA ================= */
  useEffect(() => {
    if (user?.loggedIn && project?.data?._id) {
      setName(user.name || "");
      setPhoneNumber(user.mobile?.slice(-10) || "");
    }
  }, [user, project]);

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!selected) newErrors.selected = "Please select a buying timeline";

    if(!reason) newErrors.reason = "Please select Your Reason";

    if (!agreeTerms)
      newErrors.agreeTerms = "You must agree to Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= API CALL ================= */
  const createLeads = async (uid, pid) => {

    const formdata = new FormData();
    if(user?.id){
      formdata.append("user_id", user.id);     
    }
    formdata.append("Name",name);
    formdata.append("PhoneNumber",phoneNumber);
    formdata.append("property_id", project.data._id);
    formdata.append("projectname",project.data.projectname);
    formdata.append("purpose", reason);
    formdata.append("message", "");
    try {
      const res = await createLead(formdata);
      console.log(res.status);
     
      
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false); // stop loader
      setReady(true);

    }


  }


  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    console.log('check');
    
    if (!validateForm()) return;

    console.log('let');
    

    try {
      setLoading(true);
      await createLeads();
      window.open(pdfFile, "_blank");
        navigate("/sucessfullydownload");
    
    } catch (err) {
      console.error("Lead creation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const setLeadFunction = () => {
    setLeadModel(false); // 3. close Lead modal lage
  }

  const termsCondition = 'I agree to the Terms & Conditions and Privacy Policy'

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
  <div className="w-full max-w-5xl">
        <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>
          <p><span className='text-white font-medium'>Please share your details to download brochure</span></p>
          <button
            onClick={() => setLeadModel(false)}
            className="text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            X
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6   mt-10">

          <div className='flex flex-col lg:flex-row gap-10'>
            <div className="mt-4 w-full lg:w-1/2">
              <span className='text-xs font-medium'>BASIC INFORMATION</span>
              {/* reason to buy */}
                {errors.reason && <p className="text-red-500 text-xs mt-5">{errors.reason}</p>}
              <div className='flex flex-col sm:flex-row sm:justify-between gap-3 mb-5'>
                Your reason to buy is

                {yourReason.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={option.value}
                        value={option.value}
                        checked={reason === option.value}
                        onChange={() => setReason(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />

                      <span className="text-gray-400 ">{option.label}</span>
                    </label>
                  ))}


              </div>
              {/* property Dealor */}
              <div className='flex justify-between'>
                Are you a property dealer

                {[{label:"Yes",value:"Yes"},{label:"No",value:"No"}].map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={option.value}
                        value={option.value}
                        checked={youPropertyDealer === option.value}
                        onChange={() => setYouPropertyDealer(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />

                      <span className="text-gray-400 ">{option.label}</span>
                    </label>
                  ))}

              </div>

              {/* name of the user */}
              <label className='text-xs font-bold text-gray-500'>Name</label>
              <input type='text' value={name} onInput={(e) => setName(e.currentTarget.value)} className='w-full border-b border-gray-200 outline-none' placeholder='Enter your Name' />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              {/* Mobile Number of the user */}
              <div className='my-5'>
                <label className='text-xs font-bold text-gray-500 ms-10'>Phone</label>
                <div className='flex pb-2 border-b border-gray-200'>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-transparent outline-none text-gray-700"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} {c.country}
                      </option>
                    ))}
                  </select>

                  <input type='tel' value={phoneNumber} onInput={(e) => setPhoneNumber(e.currentTarget.value)} className='w-full outline-none' maxLength='10' minLength='10' placeholder='Enter your Phone Number' />
                  
                </div>
                {errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                  )}
              </div>

            </div>
            <div className='w-full lg:w-1/2'>
              <p><span className='text-xs font-medium my-5'>OPTIONAL INFORMATION</span></p>
              <div className='my-5'>
                <span className='text-xs font-medium text-gray-500'>By when you are planning to buy the property?</span>
                {/* Dynamic Radio button */}

                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-2">
                  {planningOption.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={option.value}
                        value={option.value}
                        checked={selected === option.value}
                        onChange={() => setSelected(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />

                      <span className="text-gray-400 ">{option.label}</span>
                    </label>
                  ))}

                  {errors.selected && <p className="text-red-500 text-xs">{errors.selected}</p>}

                </div>


                {/* Dynamic check box */}
                <div className=' mt-5'>
                  <div className='flex'>
                    <input type="checkbox" className='text-gray-500' />
                    <label className='text-gray-500 font-medium mx-3'>I am intersted in home loan</label>
                  </div>
                  <div className='flex'>
                    <input type="checkbox" className='text-gray-500' />
                    <label className='text-gray-500 font-medium mx-3'>I am interested in site visits.</label>
                  </div>
                  <div className='flex'>
                    <input type="checkbox" className='text-gray-500' checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                    <label className='text-gray-500 font-medium mx-3'>I agree to the Terms & Conditions and Privacy Policy</label>
                    {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}
                  </div>
                </div>


                {/* Download Bauher */}

                <div className='mt-10'>
                  <button className='w-full lg:w-auto font-bold text-blue-500 border shadow-sm p-3 rounded flex items-center justify-center gap-2' onClick={handleSubmit}><ImFolderDownload className='m-1' />Download Brochure</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {/* {ready && (
          <div>
            <Afterlead setReadyModal={setReady} setLeadfunction={setLeadFunction} />
          </div>
        )} */}
      </div>


    </div>
  );
};

export default Leadgentaionform;
