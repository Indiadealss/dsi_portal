import React, { useEffect, useState } from 'react'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from './Redux/propertySlice';
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { MdAddCircleOutline } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";
import { getLocalAdvantages } from '../api/api';



export const Anenimies = ({setValidator}) => {

    
    const [otherRooms,setOtherRooms] = useState([]);
    const [furnishing,setFurnishing] = useState('');
    const [proptyFacing,setProptyFacing] = useState('');
    const [pobackup,setPobackup] = useState('');
    const [amenitie,setAmenitie] = useState([]);
    const [selectbulding,setSelectbuilding] = useState([]);
    const [addFeature,setAddFeature] = useState([]);
    const [prppertyF,setProppertyF] = useState([]);
    const [watersource,setWatersource] = useState([]);
    const [overlo,setOverlo] = useState([]);
    const [locatadvance,setLocatadavance] = useState([]);
    const [price,setPrice] = useState('');
    const [roadWidth,setRoadWidth] = useState('');
    const [roadSizein,setRoadSizein] = useState('sq.ft');
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false)
     const [selectedPricing, setSelectedPricing] = useState(""); // will store like "500_inputCheck,1000_inputCheck"
    const [light,setLight] = useState(0);
    const [fans,setFans] = useState(0);
    const [ac,setAc] = useState(0);
    const [tv,setTv] = useState(0);
    const [beds,setBeds] = useState(0);
    const [wardrobe,setWardrobe] = useState(0);
    const [geyser,setGeyser] = useState(0);
    const [sofa,setSofa] = useState(false);
    const [washingMachine,setWashingMachine] = useState(false);
    const [fridge,setFridge] = useState(false);
    const [waterPurifer,setWaterPurifer] = useState(false);
    const [microwave,setMicrowave] = useState(false);
    const [modularKitchen,setModularKitchen] = useState(false);
    const [chimeny,setChimeny] = useState(false);
    const [dinning,setDinning] = useState(false);
    const [curtains,setCurtains] = useState(false);
    const [exhaust,setExhaust] = useState(false);
    const [stove,setStove] = useState(false);
    const [furnisherAvailable,setFurnisherAvailable] = useState([]);
    const [brokerageCharge,setBrokerageCharge] = useState('');
    const [projecttitle , setProjecttitle] = useState('');
    const [titleDescription,setTitleDescription] = useState('');
    const [projectdeveloper,setProjectdeveloper] = useState('');
    const [projectKeyword,setProjectKeyword] = useState('');


    const  getLocationIcon =  async (name) => {
      try {
      const response = await getLocalAdvantages(name)
      // // console.log(response.data);
      
      } catch (error) {
        // console.log(error);
      }
  }


   const propertyDataFirst = useSelector((state) => state.property.data);

  const amenities = useSelector((state) => state.feature.amenities);
  const OtherRoom = useSelector((state) => state.feature.otherroom);
  const propertyFeature = useSelector((state) => state.feature.propertyfeature);
  const adfeature = useSelector((state) => state.feature.additionalfeature);
  const overlooking = useSelector((state) => state.feature.overlooking)

  console.log(OtherRoom,propertyFeature,adfeature,overlooking,"hello sir");
  

  
    useEffect(() => {

      const selectedItems = [];

      if(light > 0) selectedItems.push({key:'Light',value:light});
      if(ac > 0) selectedItems.push({key:'AC',value:ac});
      if(fans > 0) selectedItems.push({key:'Fans',value:fans});
      if(tv > 0) selectedItems.push({key:'TV',value:tv});
      if(beds > 0) selectedItems.push({key:'Beds',value:beds});
      if(wardrobe > 0) selectedItems.push({key:'Wardrobe',value:wardrobe});
      if(geyser) selectedItems.push({key:'Gysere',value:geyser});
      if (sofa) selectedItems.push({ key: "sofa", value: sofa });
  if (washingMachine) selectedItems.push({ key: "washingMachine", value: washingMachine });
  if (fridge) selectedItems.push({ key: "fridge", value: fridge });
  if (waterPurifer) selectedItems.push({ key: "waterPurifer", value: waterPurifer });
  if (microwave) selectedItems.push({ key: "microwave", value: microwave });
  if (modularKitchen) selectedItems.push({ key: "modularKitchen", value: modularKitchen });
  if (chimeny) selectedItems.push({ key: "chimeny", value: chimeny });
  if (dinning) selectedItems.push({ key: "dinning", value: dinning });
  if (stove) selectedItems.push({ key: "stove", value: stove });
  if (curtains) selectedItems.push({ key: "curtains", value: curtains });
  if (exhaust) selectedItems.push({ key: "exhaust", value: exhaust });

  setFurnisherAvailable(selectedItems);

    },[light,ac,tv,fans,fridge,stove,exhaust,curtains,dinning,microwave,modularKitchen,waterPurifer,washingMachine,sofa,geyser,beds,wardrobe])

  const handleToggle = (value) => {
    const items = selectedPricing ? selectedPricing.split(",") : [];

    if (items.includes(value)) {
      // Remove item if unchecked
      const newItems = items.filter(item => item !== value);
      setSelectedPricing(newItems.join(","));
    } else {
      // Add item if checked
      const newItems = [...items, value];
      setSelectedPricing(newItems.join(","));
    }
  };

    useEffect(() => {
      dispatch(updateField({otherrooms:otherRooms,furnishing:furnishing,available_furniture:furnisherAvailable,propertyfacing:proptyFacing,amenitie:amenitie,Buldingfeature:selectbulding,pobackup:pobackup,addFeature:addFeature,propertyfeature:prppertyF,watersource:watersource,overlo:overlo,locatadvance:locatadvance,price:price+selectedPricing,road_width:roadWidth ,roadWidthSize:roadSizein,projecttitle:projecttitle,titleDescription:titleDescription,projectdeveloper:projectdeveloper,projectKeyword:projectKeyword}))
    },[price,projecttitle,projectdeveloper,projectKeyword,titleDescription])

    const handleSelect = (value) =>{
    setRoadSizein(value);
    setDropdown(false);
  }
  
    const numberToWords = (num) => {
  if (!num) return "";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"
  ];

  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
    "Eighty", "Ninety"
  ];

  const convert = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + convert(n % 100);
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand " + convert(n % 1000);
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh " + convert(n % 100000);
    return convert(Math.floor(n / 10000000)) + " Crore " + convert(n % 10000000);
  };

  return convert(num).trim();
};


     useEffect(() => {
              if (setValidator) {
                setValidator(validateForm);
              }
            }, [otherRooms,furnishing,proptyFacing,pobackup,amenitie,selectbulding,addFeature,prppertyF,watersource,overlo,locatadvance,price,projecttitle,projectdeveloper,projectKeyword,titleDescription]);

            function validateForm(){
              if(!furnishing){
                alert('add furnishing');
                return false;
              }
              if(!proptyFacing){
                alert('add Property Facing');
                return false;
              }
              if(!pobackup){
                alert('add Details about Power Backup');
                return false;
              }
              if(!price){
                alert('Add price');
                return false;
              }

              if(propertyDataFirst.purpose === 'Project'){
                if(!projecttitle || !titleDescription || !projectdeveloper){
                  alert('Add Project Title, Add Title Description, Add Project Description');
                  return false;
                }
              }
          return true;
        }


        const sizeDropdown = [
    "sq.ft",
    "sq.m",
    "arce",
    "hactare"
  ]

   function dropDownFun() {
    setDropdown(prev => !prev);
  }

   const pricingDetails = [
    {name:'All inclusive Price',label:'All inclusive Price'},
    {name:'Tax and Govt. Charges excluded',label:'Tax and Govt. Charges excluded'},
    {name:'Price Negotiable',label:'Price Negotiable'}
  ]
    const Otherroom = [
        {
            name:'Pooja Room',
            label:'Pooja Room'
        },
        {
            name:'Study Room',
            label:'Study Room'
        },
        {
            name:'Servent Room',
            label:'Servent Room'
        },
        {
            name:'Store Room',
            label:'Store Room'
        }
    ]

    const Furnishing = [
        {
            name:'Furnished',
            label:'Furnished'
        },
        {
            name:'Semi-furnished',
            label:'Semi-furnished'
        },
        {
            name:'Un-furnished',
            label:'Un-furnished'
        }
    ]

    const Propetyfacing = [
      {
        name:'North',
        label:'North'
      },
      {
        name:'South',
        label:'South'
      },
      {
        name:'East',
        label:'East'
      },
      {
        name:'West',
        label:'West'
      },
      {
        name:'North-East',
        label:'North-East'
      },
      {
        name:'North-West',
        label:'North-West'
      },
      {
        name:'South-East',
        label:'South-East'
      },
      {
        name:'South-West',
        label:'South-West'
      }
      
    ]

    const ameniti = [
      {
        name:'Maintandce Staff',
        label:'Maintandce Staff'
      },
      {
        name:'Water Storage',
        label:'Water Storage',
      },
      {
        name:'security/Fire Alarm',
        label:'security/Fire Alarm'  
      },
      {
        name:'visitor prarking',
        label:'visitor prarking'
      },
      {
        name:'Feng shui/vastu complaint',
        label:'Feng shui/vastu complaint'
      },
      {
        name:'Park',
        label:'Park'
      },
      {
        name:'Security',
        label:'Security'
      },
      {
        name:'Lifts',
        label:'Lifts'
      },
      {
        name:'Power Back-up',
        label:'Power Back-up'
      },
      {
        name:'ATM',
        label:'ATM'
      },
      {
        name:'DG Avvailability',
        label:'DG Avvailability'
      },
      {
        name:'Cafeteria/Food Court',
        label:'Carfeteria/Food Court'
      },
      {
        name:'Visitor Parking',
        label:'Visitor Parking'
      },
      {
        name:'CCTV Survellance',
        label:'CCTV Survellance'
      },
      {
        name:'Intercorm Facility',
        label:'Intercorm Facility'
      },
    ]

    const sobufeatur = [
      {
        name:'Water softening plant',
        label:'water softening plant'
      },
      {
        name:'Shopping Centre',
        label:'Shopping Centre'
      },
      {
        name:'Fitness Centre/GYM',
        label:'Fitness Centre/GYM'
      },
      {
        name:'Swimming Pool',
        label:'Swimming Pool'
      },
      {
        name:'club house/Community center',
        label:'club house/Community center'
      }
    ]

    const location = useSelector((state) => state.property.data.location)

    // console.log(location,'k');
    

   const autoFillNearbyPlace = async (selected) => {
  if (!window.google) return;

  // Get property coordinates first
  const geocodeRes = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location[0].Address}&key=AIzaSyDWULr4OlxjUlSpoTR8_haquhxRJx0ynEo`
  );
  const geocodeData = await geocodeRes.json();
  const { lat, lng } = geocodeData.results[0].geometry.location;

  // console.log("Coordinates:", lat, lng);

  // Search nearest place by type (school, metro, hospital, etc.)
  const service = new window.google.maps.places.PlacesService(document.createElement("div"));

  

  service.nearbySearch(
    {
      location: { lat, lng },
      radius: 3000, // 3km radius (adjust)
      keyword: selected.name, // better than type sometimes
      type: selected.type
    },
    (results, status) => {
      if (status !== "OK" || !results.length) {
        // console.log("No nearby match found.");
        return;
      }

      const nearest = results[0];

      // console.log("Nearest:", nearest.name);

      // Now calculate actual road distance
      const distanceService = new window.google.maps.DistanceMatrixService();

      distanceService.getDistanceMatrix(
        {
          origins: [{ lat, lng }],
          destinations: [nearest.geometry.location],
          travelMode: "DRIVING"
        },
        (response, status) => {
          if (status === "OK") {
            const distanceText = response.rows[0].elements[0].distance.text;

            // console.log("Distance:", distanceText);

            // Update state entry
            setLocatadavance(prev =>
              prev.map(item =>
                item.type === selected.type
                  ? { ...item, propertyName: nearest.name, distance: distanceText }
                  : item
              )
            );
          }
        }
      );
    }
  );
};


    const features = useSelector((state) => state.feature.features);
   
    // console.log(typeof(features),sobufeatur,features,typeof(features));
    
    const adfeatu = [
      {
        name:'Separate entry for servant room',
        label:'Separate entry for servant room'
      },
      {
        name:'Waste Disposal',
        label:'Waste Disposal'
      },
      {
        name:'No open drrawne around',
        label:'No open drrawne around'
      },
      {
        name:'Rain water Harvesting',
        label:'Rain water Harvesting'
      },
      {
        name:'Bank Atteched Property',
        label:'Bank Atteched Property'
      },
      {
        name:'Low Density Society',
        label:'Low Density Society'
      }
    ]

    const propertyFe = [
      {
        name:'High Ceilling Height',
        label:'High Ceilling Height'
      },
      {
        name:'False Celling Lighting',
        label:'False Celling Lighting'
      },
      {
        name:'Piped-gas',
        label:'Piped-gas'
      },
      {
        name:'Internet/wi-fi connectivity',
        label:'Internet/wi-fi connectivity'
      },
      {
        name:'Connectivity',
        label:'Connectivity'
      },
      {
        name:'Centerally Air Conditioneal',
        label:'Centerally Air Conditioneal'
      },
      {
        name:'Water Purifier',
        label:'Water Purifier'
      },
      {
        name:'Recently Renovated',
        label:'Recently Renovated'
      },
      {
        name: 'Private Garden/Tarrace',
        label:'Private Garden/Tarrace'
      },
      {
        name:'Natural Light',
        label:'Natural Light'
      },
      {
        name:'Spacious Interiors',
        label:'Spacious Interiors'
      }
    ]

    const powerBackup = [
      {
        name:'None',
        label:'None'
      },
      {
        name:'Partial',
        label:'Partial'
      },
      {
        name:'Full',
        label:'Full'
      }
    ]

    const waterso = [
      {
        name:'Municipal corporation',
        label:'Municipal corporation'
      },
      {
        name:'Borewell/Tank',
        label:'Borewell/Tank'
      },
      {
        name:'24*7 water',
        label:'24*7 water'
      }
    ]

    const overlookings = [
      {
        name:'Pool',
        label:'Pool'
      },
      {
        name:'Park/Garden',
        label:'Park/Garden'
      },
      {
        name:'Club',
        label:'Club'
      },
      {
        name:'Main Road',
        label:'Main Road'
      },
      {
        name:'Others',
        label:'Others'
      }
    ]

    const locationAdvantages = [
      {
        name:'Close to Metro Station',
        label:'Close to Metro Station',
        type: 'metro',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to School',
        label:'Close to School',
        type:'school',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to Hospital',
        label:'Close to Hospital',
        type:'hospital',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to Market',
        label:'Close to Market',
        type:'market',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to Railway Station',
        label:'Close to Railway Station',
        type:'railway station',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to Airport',
        label:'Close to Airport',
        type:'airport',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to Mall',
        label:'Close to Mall',
        type:'mall',
        propertyName: "",
  distance: ""
      },
      {
        name:'Close to Highway',
        label:'Close to Highway',
        type:'highway',
        propertyName: "",
  distance: ""
      }
    ]
  return (
    <>
        <h3 className='text-xl font-medium my-2'>Add amenities/unique features</h3>
        <p className='text-sm text-gray-400 font-normal'>These fields are used to populate USP & captions<br />All fields on this page are optional</p>
        <h3 className='text-xl font-medium my-5'>Other rooms<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {OtherRoom.map((item,index) => {
              const isSelected = otherRooms.includes(item.name)
                return(
                    <button key={index} name={item.name} 
                    className={`${isSelected ? " mx-2 my-1 p-2 rounded-full cursor-pointer bg-gray-100 text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() =>{ 
              if(isSelected){
                //removes if already selected
                setOtherRooms(prev => prev.filter(name => name !== item.name));
              }else{
                setOtherRooms(prev => [...prev, item.name]);
              }
            }}
          >
            {isSelected ? (
              <CheckOutlined />
            ) : (
              <PlusOutlined />
            )}
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Furnishing <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap '>
            {Furnishing.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${furnishing === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setFurnishing(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <div className={`${furnishing === 'Semi-furnished' || furnishing === 'Furnished' ? 'shadow-2xl p-4 mt-2 rounded-xl': 'hidden'}`}>
          <p><span className='text-xs text-gray-500 font-medium'>At least three furnishings are mandatory for furnished</span></p>
          <table className="w-full">
  <tbody className="w-full">
    {/* 🔹 Counter rows */}
    <tr className='flex justify-between my-4'>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!light}><GrSubtractCircle  onClick={() => setLight(light - 1)} /></button><span> {light} </span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setLight(light + 1)} /></span><span className='text-sm mt-1'> Light</span></p>
                </td>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!fans}><GrSubtractCircle  onClick={() => setFans(fans - 1)} /></button><span>  {fans}</span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setFans(fans + 1)} /></span><span className='text-sm mt-1'> Fans</span></p>
                </td>
              </tr>
              <tr className='flex justify-between my-4'>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!ac}><GrSubtractCircle  onClick={() => setAc(ac - 1)} /></button><span> {ac} </span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setAc(ac + 1)} /></span><span className='text-sm mt-1'> AC</span></p>
                </td>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!tv}><GrSubtractCircle  onClick={() => setTv(tv - 1)} /></button><span> {tv} </span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setTv(tv + 1)} /></span><span className='text-sm mt-1'> TV</span></p>
                </td>
              </tr>
              <tr className='flex justify-between my-4'>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!beds}><GrSubtractCircle  onClick={() => setBeds(beds - 1)} /></button><span> {beds} </span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setBeds(beds + 1)} /></span><span className='text-sm mt-1'> Beds</span></p>
                </td>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!wardrobe}><GrSubtractCircle  onClick={() => setWardrobe(wardrobe - 1)} /></button><span> {wardrobe} </span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setWardrobe(wardrobe + 1)} /></span><span className='text-sm mt-1'> Wardrobe</span></p>
                </td>
              </tr>
              <tr className='flex justify-between my-4'>
                <td className='w-[12vw]'>
                  <p className='flex'><button className='px-2 text-gray-500 mt-1 text-xl cursor-pointer' disabled={!geyser}><GrSubtractCircle  onClick={() => setGeyser(geyser - 1)} /></button><span> {geyser} </span><span className='px-1 text-gray-600 text-xl  mt-1 cursor-pointer'><MdAddCircleOutline onClick={() => setGeyser(geyser + 1)} /></span><span className='text-sm mt-1'> Geyser</span></p>
                </td>
              </tr>
    {[
      ["Sofa", sofa, setSofa],
      ["Washing Machine", washingMachine, setWashingMachine],
      ["Fridge", fridge, setFridge],
      ["Water Purifier", waterPurifer, setWaterPurifer],
      ["Microwave", microwave, setMicrowave],
      ["Modular Kitchen", modularKitchen, setModularKitchen],
      ["Chimney", chimeny, setChimeny],
      ["Dinning Table", dinning, setDinning],
      ["Stove", stove, setStove],
      ["Curtains", curtains, setCurtains],
      ["Exhaust Fan", exhaust, setExhaust],
    ]
      // Group every 2 items per row
      .reduce((rows, item, i) => {
        if (i % 2 === 0) rows.push([item]);
        else rows[rows.length - 1].push(item);
        return rows;
      }, [])
      .map((pair, rowIndex) => (
        <tr key={rowIndex} className="flex justify-between my-4">
          {pair.map(([label, state, setter], i) => (
            <td key={i} className="w-[12vw]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-6 font-bold cursor-pointer"
                  checked={state}
                  onChange={() => setter((prev) => !prev)}
                />
                <span
                  className="mx-2 cursor-pointer select-none"
                  onClick={() => setter((prev) => !prev)}
                >
                  {label}
                </span>
              </div>
            </td>
          ))}

          {/* Fill second cell if odd number */}
          {pair.length === 1 && <td className="w-[12vw]" />}
        </tr>
      ))}
  </tbody>
</table>

        </div>
        <h3 className='text-xl font-medium my-5'>Property Facing<span className="font-light text-sm text-gray-400"></span></h3>
        <div className='flex flex-wrap '>
            {Propetyfacing.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${proptyFacing === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setProptyFacing(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Power Back up<span className="font-light text-sm text-gray-400"></span></h3>
        <div className='flex flex-wrap '>
            {powerBackup.map((item,index) => {
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${pobackup === item.name ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={(e) => setPobackup(e.currentTarget.name)}
          >
                        {item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Amenities</h3>
        <div className='flex flex-wrap '>
            {amenities.map((item,index) => {
              const isSelected = amenitie.includes(item.name);
                return(
                    <button key={index} 
                    name={item.name}
                    className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() =>{
              if(isSelected){
                // removes if already selected
                setAmenitie(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setAmenitie(prev => [...prev,item.name]);
              }
            }}
          >
                       {isSelected ? (
                          <CheckOutlined />
                       )
                       :
                      (
                          <PlusOutlined />
                      )
                      }{item.label}
                        </button>
                )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Property Features<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap'>
            {propertyFeature.map((item,index) => {
              const isSelected = prppertyF.includes(item.name);
              return(
                <button 
                key={index}
                className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
                onClick={() =>{
                  if(isSelected){
                    setProppertyF(prev => 
                      prev.filter(name => name !== item.name)
                    )
                  }else{
                    setProppertyF(prev =>
                    [...prev,item.name]
                    )
                  }
                }} >
                  {isSelected ? (
                    <CheckOutlined />
                  )
                  :
                  (
                    <PlusOutlined />
                  )
                } {item.label}
                </button>
              )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Society/Bullding feature <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap'>
            {features.map((item,index) => {
              const isSelected = selectbulding.includes(item.name);
              return (
                <button
                key={index}
                name={item.name}
                className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
                onClick={() => {
                  if(isSelected){
                    // remove the selected item 
                  setSelectbuilding(prev => 
                    prev.filter(name => name !== item.name)
                  )
                }else{
                  setSelectbuilding(prev => 
                  [...prev,item.name]
                  )
                }
                }}
                >
                  {
                    isSelected ? (
                        <CheckOutlined />
                    )
                    :
                    (
                        <PlusOutlined />
                    )
                  } {item.label}
                </button>
              )
            })}
        </div>
        <h3 className='text-xl font-medium my-5'>Additional Features<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {adfeature.map((item,index) => {
            
            const isSelected = addFeature.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setAddFeature(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setAddFeature(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.label}
            </button>
            )
        })}
        </div>
        <h3 className='text-xl font-medium my-5'>Water Source<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {waterso.map((item,index) => {
            
            const isSelected = watersource.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setWatersource(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setWatersource(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.name}
            </button>
            )
        })}
        </div>
        <h3 className='text-xl font-medium my-5'>Overlooking<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div
        className='flex flex-wrap'>
          {overlooking.map((item,index) => {
            
            const isSelected = overlo.includes(item.name);
            return(
            <button
            key={index}
            className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" :"border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
            onClick={() => {
              if(isSelected){
                setOverlo(prev => 
                  prev.filter(name => name !== item.name)
                )
              }else{
                setOverlo(prev => [...prev, item.name])
              }
            }}
            >
              {isSelected 
                ? (
                  <CheckOutlined />
                ) :
                (
                  <PlusOutlined />
                )
              }
              {item.label}
            </button>
            )
        })}
        </div>
        <h3 className='text-xl font-medium my-5'>Location Advantages<span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className="flex flex-wrap">
  {locationAdvantages.map((item, index) => {
    const existing = locatadvance.find(x => x.name === item.name);
    const isSelected = Boolean(existing);

    return (
      <div key={index}>
        <button
          className={`${isSelected ? "bg-gray-100 text-gray-500" : "border text-gray-500"} mx-2 my-1 p-2 rounded-full`}
          onClick={() => {
  if (isSelected) {
    // remove if deselected
    setLocatadavance(prev => prev.filter(x => x.name !== item.name));
  } else {
    const newItem = { 
      name: item.name, 
      type: item.type, 
      icon:getLocationIcon(item.type),
      propertyName: "", 
      distance: "" 
    };

    // Add to state
    setLocatadavance(prev => [...prev, newItem]);

    // Auto detect nearest location & fill input
    autoFillNearbyPlace(newItem);
  }
}}

        >
          {isSelected ? <CheckOutlined /> : "+"} {item.label}
        </button>

        {isSelected && (
          <div className="ml-10 mt-2 space-y-2">
            <input 
              type="text" 
              placeholder={`Nearby ${item.type} name`}
              className="border p-1 rounded w-[250px]"
              value={existing.propertyName}
              onChange={(e) => {
                setLocatadavance(prev =>
                  prev.map(x => x.name === item.name ? { ...x, propertyName: e.target.value } : x)
                );
              }}
            />

            <input 
              type="text" 
              placeholder="Distance (ex: 4.3 km)"
              className="border p-1 rounded w-[250px]"
              value={existing.distance}
              onChange={(e) => {
                setLocatadavance(prev =>
                  prev.map(x => x.name === item.name ? { ...x, distance: e.target.value } : x)
                );
              }}
            />
          </div>
        )}
      </div>
    );
  })}
</div>


         <div className="relative w-full my-5">
        
        <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
        <div
          className={`${!roadWidth ? 'hidden': 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'} `}
        >
          <span>Width of facing road</span>
        </div>

        <input
          type='number' onKeyDown={(e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
  }} onWheel={(e) => e.target.blur()}
          value={roadWidth}
          onChange={(e) => setRoadWidth(e.currentTarget.value)}
          className="w-full py-2 ps-6 rounded-b outline-none"
          placeholder='Enter the Width of Road facing'
        />
      </div>

        <button
          type="button"
          id="unitDropdownButton"
          onClick={dropDownFun}
          className="flex items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 
                  outline-none  font-medium 
                 rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          {roadSizein} <ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {dropdown && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700 ps-3 py-2 text-medium"
              aria-labelledby="unitDropdownButton"
            >
              {sizeDropdown.map((item)=>(
                <li key={item} >
                  <button type='button' 
                  onClick={() => handleSelect(item)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
        <p className='font-medium text-lg'>Price Details</p>
      <div className={propertyDataFirst.purpose === 'Project' ?  'flex' : 'flex'}>
        <input type='number' onKeyDown={(e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
  }} onWheel={(e) => e.target.blur()} value={price} onChange={(e) => setPrice(e.currentTarget.value)} className='mx-2 my-1 outline-none border border-1 border-gray-200 my-4 px-4 py-2 w-40' placeholder='Expected Price' />
        <input type='text' disabled className='mx-2  outline-none border border-1 border-gray-200  px-4 my-4 w-30 text-xs' placeholder='Price per sq.ft' />
        </div>

        {/* residental */}
        {/* <div>

        </div> */}
        <div>
          <p><span className='font-medium text-lg'>{numberToWords(Number(price))}</span></p>
        </div>
        <div className='flex flex-wrap my-5'>
          {pricingDetails.map((item,index) =>{
            return(
              <div className='flex mb-4 item-center flex-wrap mx-2 my-1'>
                <input id="default-checkbox" type="checkbox" onChange={() => handleToggle(value)} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none" />
    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 ">{item.label}</label>
              </div>
            )
          })}
        </div>

        <div className=''>
        <p className='font-medium text-lg'>Do you charge brokerage?</p>
        <div class="flex items-center my-4">
        <input id="default-radio-1" type="radio" value="yes" name="default-radio" onClick={(e) => setBrokerageCharge(e.currentTarget.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
        <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
        <input id="default-radio-2" type="radio" value="no" name="default-radio" onClick={(e) => setBrokerageCharge(e.currentTarget.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ms-4" />
        <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
        </div>

        <div className={brokerageCharge === 'yes' ? 'flex items-center my-4' : 'hidden' }>
        <input id="fixed-radio-1" type="radio" value="fixed" name="fixed-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
        <label for="fixed-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fixed</label>
        <input id="fixed-radio-2" type="radio" value="negocible" name="fixed-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ms-4" />
        <label for="fixed-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Negotiable</label>
        </div>
          <div className={brokerageCharge === 'yes' ? 'flex items-center my-4' : 'hidden' }>
        <input type="Number" className='bg-gray-50 w-[50%] border outline-none p-2 border-gray-300 h-10 rounded-lg' />
        <input id="price-radio-1" type="radio" value="Price" name="price-radio"  className="w-4 h-4 ms-2 text-blue-600 bg-gray-100 border-gray-300" />
        <label for="price-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
        <input id="percentage-radio-2" type="radio" value="Percentage" name="price-radio"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 ms-4" />
        <label for="percentage-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Percentage</label>
        
        </div>
        </div>

        {/* projecttitle,titleDescription,projectdeveloper */}

        <div className={`${propertyDataFirst.purpose === 'Project' ? 'mt-5 flex flex-col': 'hidden'}`}>
          <div>
            <label htmlFor="">Project Title </label>
            <input type="text" className='border border-gray-400 rounded my-1 outline-none' value={projecttitle} onChange={(e) => setProjecttitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="">Description </label>
          <input type="text" className='border border-gray-400 rounded my-1 outline-none' value={titleDescription} onChange={(e) => setTitleDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Project Developer </label>
          <input type="text" className='border border-gray-400 rounded my-1 outline-none outline-none' value={projectdeveloper} onChange={(e) => setProjectdeveloper(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Meta Keyword</label>
            <input type="text" className='border border-gray-400 rounded my-1 outline-none' value={projectKeyword} onChange={(e) => setProjectKeyword(e.target.value)} />
          </div>
        </div>
        
    </>
  )
}
