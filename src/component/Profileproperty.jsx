import React, { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import FloorSelector from './customcomponent/Floorseclector';
import { useSelector } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Postpropertyform } from './Postpropertyform';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { updateField } from './Redux/propertySlice';
import { MdAddCircleOutline } from 'react-icons/md';
import { GrSubtractCircle } from 'react-icons/gr';
const onChange = (date, dateString) => {
  // console.log(date, dateString);
};

export const Profileproperty = ({ setValidator }) => {
  const [coverdParking, setCoverdParking] = useState(0);
  const [uncoverdParking, setUncoverdParking] = useState(0);
  const [addsuperBuild, setAddSuperBuild] = useState(false);
  const [noBedroom, setNoBedroom] = useState('');
  const [noBalconies, setNoBalconies] = useState('');
  const [noBathroom, setNoBathroom] = useState('');
  const [ageProperty, setAgeProperty] = useState('');
  const [ownership, setOwnership] = useState('');
  const [availablef, setAvailablef] = useState('');
  const [description, setDescription] = useState('');
  const [paPlotArea, setPlotArea] = useState(null);
  const [buArea, setBuArea] = useState(null);
  const [caArea, setCaArea] = useState(null);
  const [possession, setPossession] = useState('');
  const [numCabin, setNumCabin] = useState(null);
  const [numSets, setNumSeats] = useState(null);
  const [maxnumSets, setMaxnumSets] = useState(null);
  const [mettingRoom, setMettingRoom] = useState(null);
  const [numFlats, setNumFlats] = useState(null);
  const [offices, setOffices] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [value, setValue] = useState("");

  const [units, setUnits] = useState([]);


  const [reraStatus, setReraStatus] = useState("Not Available");
  const [reraNumber, setReraNumber] = useState("");

  const handleStatusChange = (value) => {
    setReraStatus(value);

    // Automatically clear number if "Not Available"
    if (value === "Not Available") {
      setReraNumber("");
    }
  };

  const handleInput = (value) => {
    setReraNumber(value);
  };




  const fields = [
    "price",
    "size",
    "location",
    "floor",
    "furnished",
    "rent",
    "maintenance"
  ];



  const dispatch = useDispatch();


  useEffect(() => {
    const tf = Number(totalFloor)
    dispatch(updateField({
      bedroom: noBedroom, bathroom: noBathroom, balconies: noBalconies, plotarea: paPlotArea, plotSizein: plotarea, buildarea: buArea, buildSizein: buildarea, carpetarea: caArea, carpetSizein: carpet,rera:reraNumber,
      totalfloor: totalFloor, availabestatus: choiseProperty, ownership: ownership, propertyage: ageProperty, coveredparking: coverdParking, uncoveredparking: uncoverdParking, description: description, Possession: possession, saftyFeature: saftyFeature, choiseWashroom: choiseWashroom, choiseConfrance: choiseConfrance, recptionarea: recptionarea, parking: parking, pantry: pantry, privateWashroom: privateWashroom, publicWashroom: publicWashroom,
    }))
  }, [description])

  useEffect(() => {
  dispatch(updateField({ offices }));
}, [offices]);

// ✅ Update units only when units change
useEffect(() => {
  dispatch(updateField({ unitData: units }));
}, [units]);

  const propertyDataFirst = useSelector((state) => state.property.data);

  // console.log('purpose :', propertyDataFirst.purpose, 'Property:', propertyDataFirst.property, 'property type:', propertyDataFirst.propertyType);

  const noOfBedroom = [
    { name: '1', title: 1 },
    { name: '2', title: 2 },
    { name: '3', title: 3 },
    { name: '4', title: 4 }
  ]

  const balconies = [
    { name: '0', title: 0 },
    { name: '1', title: 1 },
    { name: '2', title: 2 },
    { name: '3', title: 3 },
    { name: '4', title: 'More than 3' }
  ]

  const sizeDropdown = [
    "sq.ft",
    "sq.m",
    "arce",
    "hactare"
  ]

  const handleFloorChange = (val) => {
    // val might be "unknown", "G", "B1", "15", "-1" (if you used negative for basement), or free text
    // console.log("floor:", val);
  };
  const [dropdown, setDropdown] = useState(false)
  const [buildUpdropdown, setBuildUpDropdown] = useState(false)
  const [carpetArea, setCarpetArea] = useState(false)
  const [plotarea, setPloatarea] = useState('sq.ft');
  const [buildarea, setBuildarea] = useState('sq.ft');
  const [carpet, setCarpet] = useState('sq.ft');
  const [totalFloor, setTotalFloor] = useState(0);
  const [projectTotalFloor, setProjectTotalFloor] = useState(null);

  const handleSelect = (value) => {
    setPloatarea(value);
    setDropdown(false);
  }

  const handleBuild = (value) => {
    setBuildarea(value);
    setBuildUpDropdown(false);
  }

  const handleCarpet = (value) => {
    setCarpet(value);
    setCarpetArea(false);
  }

  function dropDownFun() {
    setDropdown(prev => !prev);
  }

  function buildFun() {
    setBuildUpDropdown(prev => !prev);
  }

  function carpetFun() {
    setCarpetArea(prev => !prev);
  }

  const availabilityStatus = [
    {
      name: 'Ready to move',
      label: 'Ready to move',
    },
    {
      name: 'Under construction',
      label: 'Under construction'
    }
  ]

  const washroomAvailable = [
    {
      name: 'Available',
      label: 'Available'
    },
    {
      name: 'Not Available',
      label: 'Not Available'
    }
  ]

  const pantryAvalible = [
    {
      name: 'Private',
      label: 'Private'
    },
    {
      name: 'Shared',
      label: 'Shared'
    },
    {
      name: 'Not-Available',
      label: 'Not-Available'
    }
  ]

  const underConcetraction = [
    {
      name: 'within 3 Months',
      label: 'Within 3 Months'
    },
    {
      name: 'within 6 Months',
      label: 'Within 6 Months'
    },
    {
      name: 'By 2026',
      label: 'By 2026'
    },
    {
      name: 'By 2027',
      label: 'By 2027'
    },
    {
      name: 'By 2028',
      label: 'By 2028'
    },
    {
      name: 'By 2029',
      label: 'By 2029'
    }
  ]
  const ageOfProperty = [
    {
      name: '0-1 years',
      label: '0-1 years'
    },
    {
      name: '1-5 years',
      label: '1-5 years',
    },
    {
      name: '5-10 years',
      label: '5-10 years'
    },
    {
      name: '10+ years',
      label: '10+ years'
    }
  ]

  const [choiseProperty, setChoiseProperty] = useState('underConcetraction');
  const [choiseWashroom, setChoiseWashroom] = useState('');
  const [choiseConfrance, setChoiseConfrance] = useState('');
  const [recptionarea, setRecptionArea] = useState('');
  const [parking, setParking] = useState('');
  const [pantry, setPantry] = useState('')
  const [privateWashroom, setPrivateWashroom] = useState(0);
  const [publicWashroom, setPublicWashroom] = useState(0);
  const [saftyFeature, setSaftyFeature] = useState([])

  const [facilities, setFacilities] = useState({
    furnishing: "",
    centralAirConditioning: "",
    oxygenDuct: "",
    ups: "",
  });

  const handleFacilityChange = (key, value) => {
    setFacilities({ ...facilities, [key]: value });
  };

  const [parkingsA, setParkingsA] = useState([])
  const parkingAvailable = [
    {
      name: 'Private Parking in Basement',
      label: 'Private Parking in Basement'
    },
    {
      name: 'Private Parking in Outside',
      label: 'Private Parking in Outside'
    },
    {
      name: 'Public Parking',
      label: 'Public Parking'
    }
  ]


  const availblefor = [
    {
      name: 'Boys',
      label: 'Boys'
    },
    {
      name: 'Girls',
      label: 'Girls'
    },
    {
      name: 'Any',
      label: 'Any'
    }
  ]
  const ownershipDetails = [
    {
      name: 'Freehold',
      label: 'Freehold',
    },
    {
      name: 'Leasehold',
      label: 'Leasehold'
    },
    {
      name: 'Co-operative society',
      label: 'Co-operative society'
    },
    {
      name: 'Power of Attorney',
      label: 'Power of Attorney'
    }
  ]

  const faclities = [
    {
      label: 'Furnishing',
      name: 'Furnishing'
    },
    {
      label: 'Central Air Conditioning',
      name: 'Central Air Conditioning'
    },
    {
      label: 'Oxygen Duct',
      name: 'Oxygen Duct'
    },
    {
      label: 'UPS',
      name: 'UPS'
    },
  ]

  const safetyMeasures = [
    {
      name: 'Fire Extinguisher',
      label: 'Fire Extinguisher'
    },
    {
      name: 'Fire Sensor',
      label: 'Fire Sensor'
    },
    {
      name: 'Sprinklers',
      label: 'Sprinklers'
    },
    {
      name: 'Fire House',
      label: 'Fire House'
    }
  ]

  useEffect(() => {
    if (setValidator) {
      setValidator(validateForm);
    }
  }, [noBedroom, noBalconies, noBathroom, ageProperty, ownership, choiseProperty, description, numFlats, projectTotalFloor]);

  function validateForm() {
    if (propertyDataFirst.purpose != 'Project' && propertyDataFirst.property != 'commercial' && propertyDataFirst.propertyType != 'plotLand' && !noBedroom) {
      alert("Please select Number of Bedroom");
      // console.log(propertyDataFirst.property != 'commercial', propertyDataFirst.property);

      return false;
    }
    if (propertyDataFirst.purpose != 'Project' && propertyDataFirst.property != 'commercial' && propertyDataFirst.propertyType != 'plotLand' && !noBalconies) {
      alert("Please select Number of Balconies");
      return false;
    }
    // if (propertyDataFirst.purpose != 'Project' && propertyDataFirst.Property != 'commercial' && propertyDataFirst.propertyType != 'plotLand'  && !noBathroom) {
    //   alert("Please select Number of Bathroom");
    //   return false;
    // }
    if (propertyDataFirst.purpose != 'Project' && !numFlats) {
      alert('Enter the total number of Flats')
      return false;
    }
    if (propertyDataFirst.purpose === 'Project' && !projectTotalFloor) {
      alert('Enter the total number of Floors')
      return false;
    }
    if (propertyDataFirst.purpose === 'Project' && !ownership) {
      alert('Enter the ownership')
      return false;
    }
    if (description === '') {
      alert("Please specify the unique aspect of your property.")
      return false;
    }
    return true
  }
  return (
    <>
      <h2 className="text-2xl font-medium mb-5">Tell us your property</h2>
      <div className={`${propertyDataFirst.propertyType === 'plotLand' ? 'hidden' : ''}`}>
        <div className={`${propertyDataFirst.property === 'commercial' ? 'hidden' : ''}`}>
          <p className={`${propertyDataFirst.property === 'commercial' || propertyDataFirst.purpose === 'Project' ? 'hidden' : "text-sm font-medium"}`}>No of Bedrooms</p>
          <div className={`${propertyDataFirst.property === 'commercial' || propertyDataFirst.purpose === 'Project' ? 'hidden' : "my-3"}`}>
            {noOfBedroom.map((item, index) => (
              <button
                type="button"
                key={index}
                name={item.name}
                className={`${noBedroom === item.name ? "text-xs rounded-full bg-gray-100 p-3 mx-2 cursor-pointer" : "text-xs rounded-full border border-1 border-gray-300 p-3 mx-2 cursor-pointer"}`}
                onClick={(e) => setNoBedroom(e.currentTarget.name)}
              >
                {item.title}
              </button>
            ))}
          </div>


          <div className={`${propertyDataFirst.purpose === 'project' ? "my-2 rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2" : 'hidden'}`}>
            <div
              className={!numFlats ? 'hidden' : ' text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
            >
              <span>Number of Flat's</span>
            </div>

            <input
              type='number' onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
              }} onWheel={(e) => e.target.blur()}
              value={numFlats}
              onChange={(e) => setNumFlats(e.currentTarget.value)}
              className="w-full py-2 ps-6 rounded-b outline-none"
              placeholder="Number of Flat's"
            />
          </div>
          <p className={`${propertyDataFirst.property === 'commercial' || propertyDataFirst.purpose === 'Project' ? 'hidden' : "text-sm font-medium"}`}>No of Bathrooms</p>
          <div className={`${propertyDataFirst.property === 'commercial' || propertyDataFirst.purpose === 'Project' ? 'hidden' : "my-3"}`}>
            {noOfBedroom.map((item, index) => (
              <button
                type="button"
                key={index}
                name={item.name}
                className={`${noBathroom === item.name ? "text-xs rounded-full bg-gray-100 p-3 mx-2 cursor-pointer" : "text-xs rounded-full border border-1 border-gray-300 p-3 mx-2 cursor-pointer"}`}
                onClick={(e) => setNoBathroom(e.currentTarget.name)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <p className={`${propertyDataFirst.property === 'commercial' || propertyDataFirst.purpose === 'Project' ? 'hidden' : "text-sm font-medium"}`}>Balconies</p>
          <div className={`${propertyDataFirst.property === 'commercial' || propertyDataFirst.purpose === 'Project' ? 'hidden' : "my-3"}`}>
            {balconies.map((item, index) => (
              <button
                type="button"
                key={index}
                name={item.name}
                className={`${noBalconies === item.name ? "text-xs rounded-full bg-gray-100 p-3 mx-2 cursor-pointer" : "text-xs rounded-full border border-1 border-gray-300 p-3 mx-2 cursor-pointer"}`}
                onClick={(e) => setNoBalconies(e.currentTarget.name)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={`${propertyDataFirst.purpose === 'Project' ? 'hidden' : "font-medium"}`}>Add Area Details</p>
      <p className={`${propertyDataFirst.purpose === 'Project' ? 'hidden' : "font-light text-gray-500 text-sm"}`}>
        At least one area type is mandatory
      </p>

      {/* Input with Dropdown */}
      <div className={`${addsuperBuild ? "relative w-full my-5" : "hidden"}`}>

        <div className={`${propertyDataFirst.purpose === 'Project' ? "hidden" : "rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2"}`}>
          <div
            className={`${!paPlotArea ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'} `}
          >
            <span>Super Build UP Area</span>
          </div>

          <input
            type='number' onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
            }} onWheel={(e) => e.target.blur()}
            value={paPlotArea}
            onChange={(e) => setPlotArea(e.currentTarget.value)}
            className={`${propertyDataFirst.purpose === 'Project' ? "hidden" : "w-full py-2 ps-6 rounded-b outline-none"}`}
            placeholder='Enter the Super Biuld up Area'
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
          {plotarea} <ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {dropdown && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700 ps-3 py-2 text-medium"
              aria-labelledby="unitDropdownButton"
            >
              {sizeDropdown.map((item) => (
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
      <div className={`${propertyDataFirst.purpose === 'Project' ? 'hidden' : "relative w-full my-5"}`}>

        <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
          <div
            className={!buArea ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
          >
            <span>Build Up Area</span>
          </div>

          <input
            type='number' onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
            }} onWheel={(e) => e.target.blur()}
            value={buArea}
            onChange={(e) => setBuArea(e.currentTarget.value)}
            className="w-full py-2 ps-6 rounded-b outline-none"
            placeholder='Enter the Build up area'
          />
        </div>

        <button
          type="button"
          id="unitDropdownButton"
          onClick={buildFun}
          className="flex items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                 rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          {buildarea} <ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {buildUpdropdown && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="unitDropdownButton"
            >
              {sizeDropdown.map((item) => (
                <li key={item} >
                  <button type='button'
                    onClick={() => handleBuild(item)}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`${propertyDataFirst.purpose === 'Project' ? "hidden" : "relative w-full mt-5"}`}>

        <div className={`${propertyDataFirst.purpose === 'Project' ? "hidden" : "rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2"}`}>
          <div
            className={!caArea ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
          >
            <span>Carpet Area</span>
          </div>

          <input
            type='number' onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
            }} onWheel={(e) => e.target.blur()}
            value={caArea}
            onChange={(e) => setCaArea(e.currentTarget.value)}
            className="w-full py-2 ps-6 rounded-b outline-none"
            placeholder='Enter the Carpet Area'
          />
        </div>

        <button
          type="button"
          id="unitDropdownButton"
          onClick={carpetFun}
          className="flex items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                 rounded-lg text-sm px-4 py-2 cursor-pointer"
        >
          {carpet}<ChevronDownIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        {carpetArea && (
          <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="unitDropdownButton"
            >
              {sizeDropdown.map((item) => (
                <li key={item} >
                  <button type='button'
                    onClick={() => handleCarpet(item)}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='mb-5'>
        <p onClick={() => setAddSuperBuild(true)}><span className={`${addsuperBuild ? 'hidden' : 'font-bold text-blue-400 cursor-pointer text-[15px] ms-2'}`}>+ Add Super-Build Area</span></p>
      </div>

      <div className={`${propertyDataFirst.propertyType === 'office' ? '' : 'hidden'}`}>
        <p ><span className='font-medium text-lg'>Describe your office setup</span></p>
        <div className='flex justify-between my-2'>
          <div className="rounded border w-[49%] border-gray-300 text-gray-900 bg-gray-50 pt-2">
            <div
              className={!numSets ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
            >
              <span>Min. no. of Seats</span>
            </div>

            <input
              type='number' onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
              }} onWheel={(e) => e.target.blur()}
              value={numSets}
              onInput={(e) => setNumSeats(e.currentTarget.value)}

              className="w-full py-2 ps-6 rounded-b outline-none"
              placeholder='Min. no. of Seats'
            />
          </div>

          <div className="rounded border w-[48%] border-gray-300 text-gray-900 bg-gray-50 pt-2">
            <div
              className={!maxnumSets ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
            >
              <span>Max. no. of Seats</span>
            </div>

            <input
              type='number' onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
              }} onWheel={(e) => e.target.blur()}
              value={maxnumSets}
              onInput={(e) => setMaxnumSets(e.currentTarget.value)}
              className="w-full py-2 ps-6 rounded-b outline-none"
              placeholder='Max. no. of Seats'
            />
          </div>
        </div>

        <div className="rounded border w-[49%] border-gray-300 text-gray-900 bg-gray-50 pt-2">
          <div
            className={!numCabin ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
          >
            <span>Number of Cabin</span>
          </div>

          <input
            type='number' onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
            }} onWheel={(e) => e.target.blur()}
            value={numCabin}
            onInput={(e) => setNumCabin(e.currentTarget.value)}

            className="w-full py-2 ps-6 rounded-b outline-none"
            placeholder='Number of cabin'
          />
        </div>
        <div className='my-5'>
          <p className='my-2'><span className="font-medium text-lg my-5">No. of Meeting Rooms</span></p>
          <div className="rounded border border-gray-300 text-gray-900 bg-gray-50 pt-2">
            <div
              className={!mettingRoom ? 'hidden' : 'text-gray-400 font-medium h-[5px] text-xs px-2 rounded-t'}
            >
              <span>No of Meating Room</span>
            </div>

            <input
              type='number' onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); // disable arrow keys
              }} onWheel={(e) => e.target.blur()}
              value={mettingRoom}
              onInput={(e) => setMettingRoom(e.currentTarget.value)}

              className="w-full py-2 ps-6 rounded-b outline-none"
              placeholder='No of Metting Rooms'
            />
          </div>
        </div>

        <div className="my-5">
          <p className="my-2"><span className="font-medium text-lg">Washrooms</span></p>
          <div className="flex">
            {washroomAvailable.map((item, index) => {
              return (
                <button name={item.name} key={index} onClick={(e) => setChoiseWashroom(e.currentTarget.name)}
                  className={`${choiseWashroom === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" : "text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
                >{item.label}</button>
              )
            })}
          </div>

          <div className={`${choiseWashroom === 'Available' ? '' : 'hidden'}`}>

            <p className='flex'><span className='text-sm mt-1 font-medium text-gray-600'> No. of Private Washrooms</span><button className='px-2 text-gray-500 mt-1 text-2xl cursor-pointer' disabled={!privateWashroom}><GrSubtractCircle onClick={() => setPrivateWashroom(privateWashroom - 1)} /></button><span className='mt-1'>  {privateWashroom}</span><span className='px-1 text-gray-600 text-2xl  mt-2 cursor-pointer'><MdAddCircleOutline onClick={() => setPrivateWashroom(privateWashroom + 1)} /></span></p>
            <p className='flex'><span className='text-sm mt-1 font-medium text-gray-600'> No. of Public Washrooms</span><button className='px-2 text-gray-500 mt-1 text-2xl cursor-pointer' disabled={!publicWashroom}><GrSubtractCircle onClick={() => setPublicWashroom(publicWashroom - 1)} /></button><span className='mt-1'>  {publicWashroom}</span><span className='px-1 text-gray-600 text-2xl  mt-2 cursor-pointer'><MdAddCircleOutline onClick={() => setPublicWashroom(publicWashroom + 1)} /></span></p>

          </div>


        </div>

        <div className="my-5">
          <p className="my-2"><span className="font-medium text-lg">Conference Room</span></p>
          <div className="flex">
            {washroomAvailable.map((item, index) => {
              return (
                <button name={item.name} key={index} onClick={(e) => setChoiseConfrance(e.currentTarget.name)}
                  className={`${choiseConfrance === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" : "text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
                >{item.label}</button>
              )
            })}
          </div>
        </div>

        <div className="my-5">
          <p className="my-2"><span className="font-medium text-lg">Recption Area</span></p>
          <div className="flex">
            {washroomAvailable.map((item, index) => {
              return (
                <button name={item.name} key={index} onClick={(e) => setRecptionArea(e.currentTarget.name)}
                  className={`${recptionarea === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" : "text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
                >{item.label}</button>
              )
            })}
          </div>
        </div>

        <div className="my-5">
          <p className="my-2"><span className="font-medium text-lg">Pantry Type</span></p>
          <div className="flex">
            {pantryAvalible.map((item, index) => {
              return (
                <button name={item.name} key={index} onClick={(e) => setPantry(e.currentTarget.name)}
                  className={`${pantry === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" : "text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
                >{item.label}</button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="my-2"><span className="font-medium text-lg">Please Select the facilities available</span></p>
          {faclities.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="text-gray-700">
                {item.label}
              </span>
              <div className="flex gap-4"><label className="flex item-center gap-1 cursor-pointer">
                <input type="radio"
                  name={item.name}
                  value="Avalible"
                  checked={facilities[item.name] === "Available"}
                  onChange={() => handleFacilityChange(item.name, "Available")}
                  className="accent-blue-500"
                />
                <span>Available</span>
              </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={item.name}
                    value="Not Available"
                    checked={facilities[item.name] === "Not Available"}
                    onChange={() => handleFacilityChange(item.name, "Not Available")}
                    className="accent-blue-500"
                  />
                  <span>Not Available</span>
                </label>
              </div>
            </div>
          ))}

        </div>

        <h3 className='text-xl font-medium my-5'>Fire Safety measure include</h3>
        <div className='flex flex-wrap '>
          {safetyMeasures.map((item, index) => {
            const isSelected = saftyFeature.includes(item.name);
            return (
              <button key={index}
                name={item.name}
                className={`${isSelected ? "bg-gray-100 mx-2 my-1 p-2 rounded-full cursor-pointer text-sm text-gray-500 font-normal" : "border mx-2 my-1 p-2 rounded-full cursor-pointer border-1 border-gray-400 text-sm text-gray-400 font-normal"}`}
                onClick={() => {
                  if (isSelected) {
                    // removes if already selected
                    setSaftyFeature(prev =>
                      prev.filter(name => name !== item.name)
                    )
                  } else {
                    setSaftyFeature(prev => [...prev, item.name]);
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

        <div className="my-5">
          <p className="my-2"><span className="font-medium text-lg">Parking</span></p>
          <div className="flex">
            {washroomAvailable.map((item, index) => {
              return (
                <button name={item.name} key={index} onClick={(e) => setParking(e.currentTarget.name)}
                  className={`${parking === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" : "text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
                >{item.label}</button>
              )
            })}
          </div>

          <div className={`${parking === 'Available' ? 'my-4' : 'hidden'}`}>
            {parkingAvailable.map((item, index) => (
              <label key={index} className='flex items-center gap-2 cursor-pointer' onChange={() => setParkingsA((prev) => prev.includes(item.name) ? prev.filter((p) => p !== item.name) : [...prev, item.name])}>
                <input type="checkbox" checked={parkingsA.includes(item.name)} className="w-4 h-4 accent-blue-600" />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>


      <p className="font-medium text-lg">Floor Details</p>
      <p className='font-medium text-xs text-gray-500'><span className={`${propertyDataFirst.purpose != 'Project' ? "hidden" : ''}`}>Total no of floors in this Project</span><span className={`${propertyDataFirst.purpose === 'Project' ? "hidden" : ''}`}>Total no of floors and your floor details.</span></p>
      <div>
        <input type='text' className={`${propertyDataFirst.purpose === 'Project' ? "hidden" : 'outline-none border border-1 border-gray-200 my-4 p-4 w-full'}`} value={totalFloor} onChange={(e) => setTotalFloor(e.target.value)} placeholder='Total Floor' />
        <input type='text' className={`${propertyDataFirst.purpose === 'Project' ? 'outline-none border border-1 border-gray-200 my-4 p-4 w-full': 'hidden'}`} value={projectTotalFloor} onChange={(e) => setProjectTotalFloor(e.target.value)} placeholder='Total Floor' />
        <div className={`${totalFloor > 1 ? 'block mb-5' : 'hidden'}`}>
          <FloorSelector maxPreset={totalFloor} onChange={handleFloorChange} />
        </div>
      </div>
      <div className={`${propertyDataFirst.purpose === 'pg' ? 'hidden' : 'block'}`}>
        <p className='font-medium text-lg'>Availability Status</p>
        <div className="flex">
          {availabilityStatus.map((item, index) => {
            return (
              <button name={item.name} key={index} onClick={(e) => setChoiseProperty(e.currentTarget.name)}
                className={`${choiseProperty === item.name ? "text-sm mx-2 text-gray-500 font-normal my-2  p-2 rounded-full cursor-pointer bg-gray-100" : "text-sm mx-2 text-gray-500 font-normal my-2 border p-2 rounded-full cursor-pointer border-1 border-gray-200"}`}
              >{item.label}</button>
            )
          })}
        </div>
      </div>
      <div className={`${propertyDataFirst.purpose === 'pg' ? 'block' : 'hidden'}`}>
        <p className='font-medium text-lg my-3'>Availability From</p>
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
        </Space>
        <p className='font-medium text-lg my-3'>Available For</p>
        <div className="flex  my-5">
          {availblefor.map((item, index) => {
            return (
              <button name={item.name} key={index}
                className={`${availablef === item.name ? 'text-sm text-gray-500 font-normal   p-2 mx-3 rounded-full cursor-pointer bg-gray-100' : 'mx-3 text-sm text-gray-500 font-normal  border p-2 rounded-full cursor-pointer border-1 border-gray-200'}`}
                onClick={(e) => setAvailablef(e.currentTarget.name)}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
      <p className={`${choiseProperty === 'Ready to move' ? 'font-medium text-lg my-5' : 'hidden'}`}>Age of Property</p>
      <div className="flex my-5">
        <div className={`${choiseProperty === 'Ready to move' ? 'font-medium text-lg' : 'hidden'}`} >
          {ageOfProperty.map((item, index) => {
            return (
              <button
                key={index}
                name={item.name}
                className={`${ageProperty === item.name ? 'p-2 mx-2 text-sm font-normal bg-gray-100 cursor-pointer rounded-full' : 'cursor-pointer p-2 mx-2 text-sm font-normal border border-1 border-gray-300 rounded-full'}`}
                onClick={(e) => setAgeProperty(e.currentTarget.name)}
              >
                {item.label}</button>
            )
          })}
        </div>

        <form className={`${choiseProperty === 'Under construction' ? 'w-full mx-auto' : 'hidden'}`}>
          <label for="countries" className="block mb-2  font-medium text-gray-900 ">Possession By</label>
          <select id="countries" value={possession} onChange={(e) => setPossession(e.currentTarget.value)} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    ">
            <option selected>Expected by</option>
            {underConcetraction.map((item, index) => {
              return (
                <option value={item.name}>{item.label}</option>
              )
            })}
          </select>
        </form>

      </div>
      <div className={`${propertyDataFirst.purpose === 'pg' ? 'hidden' : 'block'}`}>
        <p className='font-medium text-lg '>Ownership</p>
        <div className="flex justify-around my-5">
          {ownershipDetails.map((item, index) => {
            return (
              <button name={item.name} key={index}
                className={`${ownership === item.name ? 'text-sm text-gray-500 font-normal   p-2 rounded-full cursor-pointer bg-gray-100' : 'text-sm text-gray-500 font-normal  border p-2 rounded-full cursor-pointer border-1 border-gray-200'}`}
                onClick={(e) => setOwnership(e.currentTarget.name)}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
      
      <div className={`${propertyDataFirst.property === 'commercial' ? 'hidden' : ''}`}>
        <h3 className='text-xl font-medium my-5'>Reserved Parking <span className="font-light text-sm text-gray-400">(Optional)</span></h3>
        <div className='flex flex-wrap my-5'>
          <div className='mx-3'>
            <p className='font-light text-gray-400'>Covered Parking
              <div className="flex my-3">
                <button disabled={coverdParking <= 0} className={`${coverdParking <= 0 ? 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-200 border border-gray-200 rounded-full cursor-not-allowed' : 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer'}`} onClick={() => { coverdParking <= 0 ? setCoverdParking(0) : setCoverdParking(prev => prev - 1) }}>-</button>
                <p className='m-2'>{coverdParking}</p>
                <button className="flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer" onClick={() => setCoverdParking(prev => prev + 1)}>+</button>
              </div>
            </p>
          </div>
          <div className='mx-3'>
            <p className='font-light text-gray-400'>Uncovered Parking
              <div className="flex my-3">
                <button className={`${uncoverdParking <= 0 ? 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-200 border border-gray-200 rounded-full cursor-not-allowed' : 'flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer'}`} onClick={() => { uncoverdParking <= 0 ? setUncoverdParking(0) : setUncoverdParking(prev => prev - 1) }}>-</button>
                <p className='m-2'>{uncoverdParking}</p>
                <button className="flex items-center justify-center w-10 h-10 text-2xl font-light text-gray-500 border border-gray-400 rounded-full cursor-pointer" onClick={() => setUncoverdParking(prev => prev + 1)}>+</button>
              </div>
            </p>
          </div>
        </div>
      </div>

{/* ✅✅ FIXED: DYNAMIC OFFICES */}
<div className={`${propertyDataFirst.purpose === 'Project' && propertyDataFirst.property !== 'residential' ? '' : 'hidden'}`}>

  <button
    onClick={() =>
      setOffices(prev => [
        ...prev,
        { id: Date.now(), specs: {}, selectedKey: "", value: "" }
      ])
    }
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Add Office
  </button>

  {offices.map((office, index) => (
    <div key={office.id} className="border p-4 my-4 rounded">
      <h2 className="text-lg font-bold">Office {index + 1}</h2>

      {/* ✅ SELECT FIELD FIX */}
      <select
        className="border p-2 my-2 rounded"
        value={office.selectedKey}
        onChange={(e) =>
          setOffices(prev =>
            prev.map((o, i) =>
              i === index ? { ...o, selectedKey: e.target.value } : o
            )
          )
        }
      >
        <option value="">Select Field</option>
        <option value="size">Size</option>
        <option value="price">Price</option>
        <option value="priceRange">Price Range</option>
        <option value="location">Location</option>
        <option value="furnished">Furnished</option>
      </select>

      {/* ✅ VALUE INPUT FIX */}
      <input
        className="border p-2 ml-2 rounded"
        placeholder="Enter value"
        value={office.value}
        onChange={(e) =>
          setOffices(prev =>
            prev.map((o, i) =>
              i === index ? { ...o, value: e.target.value } : o
            )
          )
        }
      />

      {/* ✅ ADD FIELD FIX */}
      <button
        className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
        onClick={() => {
          if (!office.selectedKey || !office.value) return;

          setOffices(prev =>
            prev.map((o, i) =>
              i === index
                ? {
                    ...o,
                    specs: { ...o.specs, [o.selectedKey]: o.value },
                    selectedKey: "",
                    value: ""
                  }
                : o
            )
          );
        }}
      >
        Add
      </button>

      {/* SHOW SPECS */}
      <div className="mt-3">
        <h3 className="font-semibold">Specifications:</h3>
        {Object.entries(office.specs).map(([k, v]) => (
          <p key={k}>
            <strong>{k}:</strong> {v}
          </p>
        ))}
      </div>
    </div>
  ))}
</div>


{/* ✅✅ FIXED: DYNAMIC UNITS */}
<div className={`${propertyDataFirst.purpose === 'Project' && propertyDataFirst.property === 'residential' ? '' : 'hidden'}`}>

  <button
    onClick={() =>
      setUnits(prev => [
        ...prev,
        { id: Date.now(), specs: {}, selectedKey: "", value: "" }
      ])
    }
    className="bg-blue-600 text-white px-4 py-2 rounded my-4"
  >
    Add Apartment Unit
  </button>

  {units.map((unit, index) => (
    <div key={unit.id} className="border p-4 rounded my-4 bg-gray-50">
      <h2 className="text-lg font-bold">Unit {index + 1}</h2>

      {/* ✅ SELECT FIELD FIX */}
      <select
        className="border p-2 my-2 rounded"
        value={unit.selectedKey}
        onChange={(e) =>
          setUnits(prev =>
            prev.map((u, i) =>
              i === index ? { ...u, selectedKey: e.target.value } : u
            )
          )
        }
      >
        <option value="">Select Field</option>
        <option value="bhk">BHK Type</option>
        <option value="areaMin">Area Min</option>
        <option value="areaMax">Area Max</option>
        <option value="priceMin">Price Min</option>
        <option value="priceMax">Price Max</option>
      </select>

      {/* ✅ VALUE INPUT FIX */}
      <input
        className="border p-2 ml-2 rounded"
        placeholder="Enter value"
        value={unit.value}
        onChange={(e) =>
          setUnits(prev =>
            prev.map((u, i) =>
              i === index ? { ...u, value: e.target.value } : u
            )
          )
        }
      />

      {/* ✅ ADD FIELD FIX */}
      <button
        className="bg-green-500 text-white px-3 py-1 ml-2 rounded"
        onClick={() => {
          if (!unit.selectedKey || !unit.value) return;

          setUnits(prev =>
            prev.map((u, i) =>
              i === index
                ? {
                    ...u,
                    specs: { ...u.specs, [u.selectedKey]: u.value },
                    selectedKey: "",
                    value: ""
                  }
                : u
            )
          );
        }}
      >
        Add
      </button>

      {/* SHOW SPECS */}
      <div className="mt-3">
        <h3 className="font-semibold">Specifications:</h3>
        {Object.entries(unit.specs).map(([k, v]) => (
          <p key={k}>
            <strong>{k}:</strong> {v}
          </p>
        ))}
      </div>
    </div>
  ))}
</div>

 <div className={`${propertyDataFirst.purpose === 'Project' ? 'flex flex-col' : 'hidden'}`}>
      <label className="font-medium">RERA Number</label>

      {/* Radio Buttons */}
      <div className="flex my-3">

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            value="Available"
            name="reraStatus"
            checked={reraStatus === "Available"}
            onChange={() => handleStatusChange("Available")}
            className="w-4 h-4 cursor-pointer border border-gray-400 rounded-full"
          />
          <span className="ml-2 text-sm font-medium text-heading">Available</span>
        </label>

        <label className="flex items-center cursor-pointer ml-4">
          <input
            type="radio"
            value="Not Available"
            name="reraStatus"
            checked={reraStatus === "Not Available"}
            onChange={() => handleStatusChange("Not Available")}
            className="w-4 h-4 cursor-pointer border border-gray-400 rounded-full"
          />
          <span className="ml-2 text-sm font-medium text-heading">Not Available</span>
        </label>
      </div>

      {/* Conditional Input */}
      {reraStatus === "Available" && (
        <input
          type="text"
          placeholder="Enter RERA Number"
          value={reraNumber}
          onChange={(e) => handleInput(e.target.value)}
          className="mx-2 border border-gray-300 rounded outline-none w-[50%] my-2 px-2 py-1"
        />
      )}
    </div>


      <h3 className='font-medium text-xl'>What makes your property unique</h3>
      <p className='text-xs font-medium  text-gray-500'>Adding description will increase your listing visibility</p>
      <div>
        <textarea id="message" rows="4" value={description} onInput={(e) => setDescription(e.currentTarget.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500     my-5" placeholder="Share some details about your property like spacious rooms, well maintained facilities.." />
      </div>
    </>
  )
}
