import React, { useState, useRef, useEffect } from 'react';
import { Postbasicdetailsform } from './Postbasicdetailsform';
import { Locationbutton } from './Locationbutton';
import { Profileproperty } from './Profileproperty';
import { Photovideo } from './Photovideo';
import { Anenimies } from './Anenimies';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeature, getAminities, submitProperty } from '../api/api';
import { Creaditmodel } from './Creaditmodel';
import { updateFeatures } from './Redux/featureSlice';

export const Postpropertyform = () => {
  const dispatch = useDispatch();
  const propertyFirstData = useSelector((state) => state.property.data);
  const [continueNO, setContinueNo] = useState(0);
  const [sobufeature, setSobuFeature] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [steps, setSteps] = useState([
    { id: 1, label: "Basic Details", status: true, currentForm: Postbasicdetailsform },
    { id: 2, label: "Location Details", status: false, currentForm: Locationbutton },
    { id: 3, label: "Property Profile", status: false, currentForm: Profileproperty },
    { id: 4, label: "Photos,Videos&Voice-Over", status: false, currentForm: Photovideo },
    { id: 5, label: "Pricing & Others", status: false, currentForm: Anenimies }
  ]);


  useEffect(() => {
    const featchFeature = async () => {
      const getFeature = await getAllFeature();
      const data = getFeature.data;
      const datas = getFeature.data.data.map((item,index) => {
        return(
          {
            name:item._id,
            label:item.name
          }
      )})
  
      setSobuFeature(datas)
          
   }

   const featchAnimities = async () => {
    const getallAnimities = await getAminities();
    const data = getallAnimities.data;
    console.log(data,"data ok");
    
   }
   featchAnimities()
   featchFeature()
  },[])

  useEffect(() => {
    dispatch(updateFeatures(sobufeature))
  },[sobufeature])

  const validateRef = useRef(null); // stores child validate function
  let FormComponent = steps[continueNO].currentForm;

  function backButtonFun() {
    setSteps(prevSteps =>
      prevSteps.map((step, index) =>
        index === continueNO ? { ...step, status: false } : step
      )
    );
    setContinueNo(prev => prev - 1);
  }

  // const sobufeature = useSelector((state) => state.feature);
  //         console.log(sobufeature);

  function continueButton() {
    
    console.log(propertyFirstData);
    
    if (validateRef.current) {
      const isValid = validateRef.current(); // call child validation
      if (!isValid) {
        return; // stop navigation if invalid
      }
    }

    if (continueNO < steps.length - 1) {
      setSteps(prevSteps =>
        prevSteps.map((step, index) =>
          index === continueNO + 1 ? { ...step, status: true } : step
        )
      );
      
      const currentScroll = window.scrollY;
      setContinueNo(prev => prev + 1);

      setTimeout(() =>{
        window.scrollTo({top: currentScroll, behavior:'instant'});
      },0);
    //  setShowLogin(true);

    } else {
     setShowLogin(true);
      // dispatch(submitProperty(propertyFirstData));
      // alert('You have successfully listed the property');
    }
  }

  
  

  return (
    <div className='bg-[#d1dede] min-h-screen'>
      <div className='max-w-4xl min-h-screen p-6 bg-white border border-gray-200 shadow-sm  '>
        <div className='flex justify-around flex-col lg:flex-row'>
          {/* Steps sidebar */}
          <div className='w-[max-content] hidden lg:block h-[max-content] p-6 bg-[#d1dede] border border-gray-200 rounded-lg shadow-sm   sticky top-10'>
            <div className='flex flex-col space-y-10'>
              {steps.map((step, index) =>
                <div key={step.id} className='relative flex items-start'>
                  {index !== steps.length - 1 && (
                    <div className={`${step.status ? 'absolute left-2.5 top-5 w-0.5 h-[5vw] bg-gray-500' : 'absolute left-2.5 top-5 w-0.5 h-[5vw] bg-white'}`} />
                  )}
                  <div className='relative z-20'>
                    <input type="radio"
                      name={step.label}
                      checked={step.status}
                      readOnly
                      className='w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500' />
                  </div>
                  <div className='ml-6'>
                    <p className='font-medium'>{step.label}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form body */}
          <div className='max-w-md lg:w-[55vw] min-h-screen transition-all duration-500 ease-in-out'>
            <button
              type='button'
              className={`${continueNO < 1 ? 'hidden' : 'flex p-2 text-sm text-gray-500 font-bold rounded-2xl my-5 cursor-pointer'}`}
              onClick={backButtonFun}>
              <span className='text-2xl'><IoIosArrowRoundBack /></span>Back
            </button>

            {/* Pass ref setter to child */}
            <FormComponent setValidator={fn => (validateRef.current = fn)} />

            <button
              type="button"
              className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none  cursor-pointer"
              onClick={continueButton}>
              Continue
            </button>
          </div>
        </div>
      </div>
      {showLogin && (
  <Creaditmodel open={showLogin} onClose={() => setShowLogin(false)} />
)}
    </div>
  );
};
