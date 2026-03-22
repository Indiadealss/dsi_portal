"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import {
  createPropertyBasic,
  updatePropertyStep,
  getproperty,
  getadditionalfeature,
  getAllFeature,
  getAminities, 
  getotheroom, 
  getpropertyfeature,
  updatePropertyIdStep,
} from "../../api/api";

import { resetProperty, setPropertyData, updateFields } from "../../component/Redux/propertySlice";

import { Postbasicdetailsform } from "../../component/Postbasicdetailsform";
import { Locationbutton } from "../../component/Locationbutton";
import { Profileproperty } from "../../component/Profileproperty";
import { Photovideo } from "../../component/Photovideo";
import { Anenimies } from "../../component/Anenimies";
import { setEditMode } from "../../component/Redux/propertySlice";
import { updateadditionalfeature, updateAmenities, updateFeatures, updateotheroom, updateoverlookingfeature, updatepropertyfeature } from "../Redux/featureSlice";


const EditPropertyStepper = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isEditMode = !!id;
  const propertyData = useSelector((state) => state.property.data);

  const validateRef = useRef(null);

  const [propertyId, setPropertyId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

    const [features, setSobuFeature] = useState([]);
    const [amenities,setAnimitis] = useState([]);
    const [otheroom,setOtheroom] = useState([]);
    const [propertyfeature,setPropertyfeature] = useState([]);
    const [additionalfeature,setAdditionalfeature] = useState([]);
    const [overlooking,setoverlookingfeature] = useState([]);

  const [steps, setSteps] = useState([
    { id: 1, label: "Basic Details", status: true, component: Postbasicdetailsform },
    { id: 2, label: "Location Details", status: false, component: Locationbutton },
    { id: 3, label: "Property Profile", status: false, component: Profileproperty },
    { id: 4, label: "Photos, Videos & Voice-Over", status: false, component: Photovideo },
    { id: 5, label: "Pricing & Others", status: false, component: Anenimies }
  ]);

  const ActiveForm = steps[currentStep].component;

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
      const data = getallAnimities.data.data.map((item,index) => {
        return(
          {
            name:item._id,
            label:item.name,
          }
        )
      })
  
      console.log(data,'hdfsh');
      
  
      setAnimitis(data);
  
  
      
     }
  
     const featchotheroom = async () => {
      const getallAnimities = await getotheroom();
      const data = getallAnimities.data.data.map((item,index) => {
        return(
          {
            name:item._id,
            label:item.name,
          }
        )
      })
  
      console.log(data,'featchotheroom');
      
  
      setOtheroom(data);
  
  
      
     }



     
     const featchotherpropertyfeature = async () => {
      const getallAnimities = await getpropertyfeature();
      const data = getallAnimities.data.data.map((item,index) => {
        return(
          {
            name:item._id,
            label:item.name,
          }
        )
      })
  
      console.log(data,'featchotherpropertyfeature');
      
  
      setPropertyfeature(data);
  
  
      
     }
  
     const featcadditionalfeature = async () => {
      const getallAnimities = await getadditionalfeature();
      console.log(getAllFeature,'getadditionalfeature');
      
      const data = getallAnimities.data.data.map((item,index) => {
        return(
          {
            name:item._id,
            label:item.name,
          }
        )
      })
  
      console.log(data,'featcadditionalfeature');
      
  
      setAdditionalfeature(data);
  
  
      
     }
  
     const featchoverlookingfeature = async () => {
      const getallAnimities = await getadditionalfeature();
      const data = getallAnimities.data.data.map((item,index) => {
        return(
          {
            name:item._id,
            label:item.name,
          }
        )
      })
  
      console.log(data,'featchoverlookingfeature');
      
  
      setoverlookingfeature(data);
  
  
      
     }
  
     featchotheroom()
     featchotherpropertyfeature()
     featcadditionalfeature()
     featchoverlookingfeature()
     featchAnimities()
     featchFeature()
    },[])


     useEffect(() => {
         dispatch(updateFeatures(features))
       },[features])
     
       useEffect(() => {
         dispatch(updateAmenities(amenities))
       },[amenities])
     
       useEffect(() => {
         dispatch(updateotheroom(otheroom))
       },[otheroom])
     
       useEffect(() => {
         dispatch(updatepropertyfeature(propertyfeature))
       },[propertyfeature])
     
       useEffect(() => {
         dispatch(updateadditionalfeature(additionalfeature))
       },[additionalfeature])
     
       useEffect(() => {
         dispatch(updateoverlookingfeature(overlooking))
       },[overlooking])
        const amenitie = useSelector((state) => state.feature.amenities);
  

  // ================= PREFILL (EDIT MODE) =================
  useEffect(() => {
    const fetchProperty = async () => {
         if (id) {
            dispatch(setEditMode(true));
            } 
      if (!id) return;

      try {
        const res = await getproperty(id);
        const data = res.data;
        dispatch(resetProperty());  
        setPropertyId(data._id);

        dispatch(updateFields(data));
        dispatch(setPropertyData(data));
        

      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [id]);



useEffect(() => {
  console.log("Redux Updated Data:", propertyData);
}, [propertyData]);

  // ================= NAVIGATION =================
  const next = async () => {
    if (validateRef.current) {
      const isValid = validateRef.current();
      if (!isValid) return;
    }

    try {
      // CREATE MODE
      if (currentStep === 0 && !propertyId && !isEditMode) {
        const res = await createPropertyBasic(propertyData);
        setPropertyId(res.data.propertyId);
      }

      const { owner, ...cleanData } = propertyData;

      console.log(cleanData, 'cleanData');
      

      // UPDATE STEP
      await updatePropertyIdStep(propertyId || id, cleanData);

      // Move step
      if (currentStep < steps.length - 1) {
        setSteps(prev =>
          prev.map((s, i) =>
            i === currentStep + 1 ? { ...s, status: true } : s
          )
        );
        setCurrentStep(prev => prev + 1);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const prev = () => {
    setCurrentStep(prev => prev - 1);
  };

  // ================= FINAL SUBMIT =================
  const handleSubmit = async () => {
    try {
      const { owner, ...cleanData } = propertyData;
      

      // UPDATE STEP
      await updatePropertyIdStep(propertyId || id, cleanData);
      alert("Property Updated Successfully ✅");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 lg:mt-[7vw] lg:mx-auto">

      {/* ===== LEFT STEPPER ===== */}
      <div className="w-full lg:w-[25vw] bg-[#cfd8dc] rounded-xl p-6 relative h-[30vw]">

        <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-gray-400"></div>

        {steps.map((s, index) => (
          <div
            key={s.id}
            onClick={() => setCurrentStep(index)}
            className="flex items-center gap-4 mb-10 relative cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 z-10 ${
                currentStep === index
                  ? "bg-blue-500 border-blue-500"
                  : s.status
                  ? "bg-white border-gray-400"
                  : "bg-white border-gray-400"
              }`}
            ></div>

            <span className={`${currentStep === index ? "font-semibold flex " : "flex "}`}>
              {s.label} <MdOutlineEdit className={currentStep === index ? " m-1 text-blue-500" : "hidden"}/>
            </span>
          </div>
        ))}
      </div>

      {/* ===== RIGHT FORM ===== */}
      <div className="w-full lg:w-[35vw]">

        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Edit Property" : "Post Property"}
        </h2>

        <ActiveForm
          propertyId={propertyId || id}
          setValidator={(fn) => (validateRef.current = fn)}
        />

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">

          {currentStep > 0 && (
            <button
              onClick={prev}
              className="px-4 py-2 border rounded"
            >
              Back
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={next}
              className="px-6 py-2 bg-green-600 text-white rounded"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded"
            >
              Update Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPropertyStepper;