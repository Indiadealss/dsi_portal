import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { ImFolderDownload } from "react-icons/im";
import { useSelector } from 'react-redux';
import { createLead } from '../../api/api';
import Afterlead from './Afterlead';

const Leadgentaionform = ({ setLeadModel }) => {

  const [Name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [id, setId] = useState('');
  const [propertyid, setPropertyid] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);


  const validateForm = () => {
    let newErrors = {};

    if (!Name.trim()) {
      newErrors.Name = "Name is required";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!selected) {
      newErrors.selected = "Please select when you plan to buy";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to Terms & Conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // no errors → form valid
  };




  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.propertyid);

  console.log(user, 'hello');


  const createLeads = async (uid, pid) => {

    const formdata = new FormData();
    formdata.append("user_id", uid);
    formdata.append("property_id", pid)
    formdata.append("purpose", '')
    formdata.append("message", '')
    try {
      const res = await createLead(formdata);
      console.log(res);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false); // stop loader
      setReady(true);

    }


  }

  const setLeadFunction = () => {
    setLeadModel(false); // 3. close Lead modal lage
  }

  useEffect(() => {
    if (user?.loggedIn) {
      console.log("User loaded:", user._id);
      console.log("Project loaded:", project.data._id);

      setName(user.name);
      setPhoneNumber(user.mobile.slice(-10));
      setId(user.id);
      setPropertyid(project.data._id);

      createLeads(user.id, project.data._id);
      setLoading(true);
    }
  }, []);




  const planningOption = [
    {
      name: '3 Months',
      label: '3 Months',
      value: '3 Months'
    },
    {
      name: '6 Months',
      label: '6 Months',
      value: '6 Months'
    },
    {
      name: 'More than 6 months',
      label: 'More than 6 months',
      value: 'More than 6 months'
    }
  ];

  const [countryCode, setCountryCode] = useState("+91");
  const [selected, setSelected] = useState("");

  const countryCodes = [
    { code: "+91", country: "IND" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "AUS" }
  ];



  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log('hello');

    // setLoading(true);
    // createLeads(id, propertyid);
  };
  return (
    <div className="fixed inset-0 flex  justify-center bg-black/90 z-50">
      <div className='mt-[10vw]'>
        <div className='flex justify-between'>
          <p><span className='text-white font-medium'>Please share your details to download brochure</span></p>
          <button
            onClick={() => setLeadModel(false)}
            className="text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            X
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6   mt-10">

          <div className='flex justify-between w-[60vw]'>
            <div className=" mt-4 w-[25vw]">
              <span className='text-xs font-medium'>BASIC INFORMATION</span>
              {/* reason to buy */}
              <div className='flex justify-between my-5'>
                Your reason to buy is

                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Investment</label>
                </div>
                <div class="flex items-center mb-4">
                  <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Self Use</label>
                </div>

              </div>
              {/* property Dealor */}
              <div className='flex justify-between'>
                Are you a property dealer

                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="flex items-center mb-4">
                  <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>

              {/* name of the user */}
              <label className='text-xs font-bold text-gray-500'>Name</label>
              <input type='text' value={Name} onInput={(e) => setName(e.currentTarget.value)} className='w-full border-b border-gray-200 outline-none' placeholder='Enter your Name' />
              {errors.Name && <p className="text-red-500 text-xs">{errors.Name}</p>}
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
            <div className='w-[30vw] mx-5'>
              <p><span className='text-xs font-medium my-5'>OPTIONAL INFORMATION</span></p>
              <div className='my-5'>
                <span className='text-xs font-medium text-gray-500'>By when you are planning to buy the property?</span>
                {/* Dynamic Radio button */}

                <div className="flex justify-between mt-1">
                  {planningOption.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={name}
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
                    <input type="checkbox" className='text-gray-500' />
                    <label className='text-gray-500 font-medium mx-3'>I agree to the Terms & Conditions and Privacy Policy</label>
                  </div>
                </div>


                {/* Download Bauher */}

                <div className='mt-10'>
                  <button className='font-bold  text-blue-500 border shadow-sm p-2 rounded cursor-pointer flex h-10' onClick={handleSubmit}><ImFolderDownload className='m-1' />Download Brochure</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {ready && (
          <div>
            <Afterlead setReadyModal={setReady} setLeadfunction={setLeadFunction} />
          </div>
        )}
      </div>


    </div>
  )
}

export default Leadgentaionform
