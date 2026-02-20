import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampain, getCampainbyId, getproperty, getPropertyByRera } from '../api/api';
import { setProperty } from './Redux/propertyidSlice';
import Collapage from './customcomponent/Collapage';
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { Collapse, Divider, Drawer } from 'antd';
import { FaRupeeSign } from "react-icons/fa";
import { ImFolderDownload } from "react-icons/im";
import BhkCards from './customcomponent/Bhkcards';
import FloorPlans from './customcomponent/Floorplans';
import DealerCards from './customcomponent/Dealercards';
import Description from './customcomponent/Description';
import { FaLongArrowAltRight } from "react-icons/fa";
import Interdescription from './customcomponent/Interdescription';
import { IoIosInformationCircle } from "react-icons/io";
import Leadgentaionform from './customcomponent/Leadgentaionform';
import PdfSlider from './customcomponent/PdfSlider';
import { RxCross2 } from "react-icons/rx";
import NearbySlide from './customantdesign/Sweaper';
import { FaHeart } from "react-icons/fa6";
import Investmentoption from './customcomponent/Investmentoption';
import Unitsavailble from './customcomponent/Unitsavailble';
import Reracollapse from './customcomponent/Reracollapse';
import Investdetails from './customcomponent/Investdetails';
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Seo from './Seo';
import { setTitle } from './Redux/titleSlice';




const Projectdetail = () => {
  const [propertys, setPropertys] = useState(null)
  const [image, setImage] = useState([])
  const [video, setVideo] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [leadModel, setLeadModel] = useState(false);
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch()
  const [layoutData, setLayoutData] = useState({});
  const [unitData, setUnitData] = useState();
  const [amenities, setAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const [favurate, setFavurate] = useState(false);



  const npxid = slug.split("npxid-")[1];


  const faq = [
    {
      question: 'Why you should consider Godrej Nature Plus?',
      answer: [
        'Located at foothills of the Aravalli, with picturesque east and west views',
        '5 acre-health park known as O2 Island with enhanced 2X air quality',
        'Fish-eyed 18,000 sq. ft. of clubhouse with top amenities',
        'Family play zone with live Chess, Hopscotch and Picnic table',
        'Entertainment zone with Pet park, Koi pond and Health cafe',
        '5-Tier security system with alarms and various patrols',
        '5 mins drive to Badshahpur Sohna Road Highway'
      ]
    }
  ]

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


  const getLocationIcon = async (name) => {
    try {
      const response = await getLocalAdvantages(name)
      // console.log(response.data);

    } catch (error) {
      // console.log(error);
    }
  }

  const interstedOption = [
    {
      name: 'I am intersted in home loan',
      label: 'I am intersted in home loan',
      value: 'I am intersted in home loan'
    },
    {
      name: 'I am intersted in site visits',
      label: 'I am intersted in site visits',
      value: 'I am intersted in site visits'
    },
  ]

  const [countryCode, setCountryCode] = useState("+91");
  const [selected, setSelected] = useState("");

  const countryCodes = [
    { code: "+91", country: "IND" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "AUS" }
  ];


  useEffect(() => {
    if (!propertys) return;

    const layoutImages = propertys.images?.filter(img => img.type === "layout") || [];
    console.log(propertys.images, propertys.images?.filter(img => img.type === "layout"), '125');


    let answerArray = [];

    const rawAnswer = propertys.faq[0].answer;

    if (typeof rawAnswer === "string") {
      // clean if wrapped in code block
      const cleaned = rawAnswer.replace(/```json|```/g, "").trim();
      answerArray = JSON.parse(cleaned);
    } else {
      // already an array
      answerArray = rawAnswer;
    }


    // console.log(propertys.faq[0].answer, answerArray, 'hello faq');


    // console.log('layoutImages', layoutImages);


    const grouped = {};

    layoutImages.forEach(img => {
      const obj = {};

      console.log(img, '153');


      img.fields.forEach(f => {
        console.log(f, '157');

        obj[f.key.toLowerCase()] = f.value; // ✅ make all keys lowercase
      });

      const bhk = (obj["floor_plan"] || "").toUpperCase(); // "2 BHK"
      console.log(bhk, 163);


      if (!grouped[bhk]) grouped[bhk] = [];
      console.log(grouped[bhk], '167');


      const areaValue = obj["carpet_aria"]?.split(" ")[0] || "0";
      console.log(areaValue, '171');


      // console.log(obj, "hello");


      grouped[bhk].push({
        bhk,
        image: img.src,
        areaSqft: Number(areaValue),
        areaSqm: parseInt(Number(areaValue) / 10.764),
        price: Number(obj["price"]?.replace(/,/g, "") || 0),
        status: obj["status"] || "",
        possession: obj["possession"] || "—"
      });
    });

    console.log(grouped, '188');



    setLayoutData(grouped);
  }, [propertys]);


  // const npxid = propertys.npxid;

  console.log(npxid, 'npxid');

  const [campainadd, setCampainadd] = useState(null);
  useEffect(() => {
    getcampaindetails(npxid)
  }, [])

  const getcampaindetails = async (npxid) => {
    try {
      const res = await getCampainbyId(npxid);
      //  console.log(res,'26');
      //  const data = res.data.data[0];
      //  console.log(data,'33');

      setCampainadd(res.data)

    } catch (err) {
      console.error(err);

    }
  }



  useEffect(() => {
    if (propertys?.projectname) {
      document.title = `${propertys.projectname}`;
      dispatch(setTitle(propertys.projectname));
    }
  }, [propertys?.projectname]);

  useEffect(() => {
    fetchproperty()
  }, [npxid])

  const fetchproperty = async () => {
    try {
      const res = await getPropertyByRera(npxid)
      const data = res.data
      setPropertys(data)
      // console.log(data);

      dispatch(setProperty(res.data))
      if (data.images?.length) setImage(data.images)
      if (data.video?.length) setVideo(data.video)
      if (data.unitData?.length) setUnitData(data.unitData)

      if (data.Buldingfeature) {
        setAmenities(
          Array.isArray(data.Buldingfeature)
            ? data.Buldingfeature
            : [data.Buldingfeature]
        );
      }
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    console.log(campainadd, typeof (campainadd), '275');

  }, [campainadd])
  const brochurePdf = propertys?.images?.find(img => img.type === "brouser")?.src;
  console.log(brochurePdf, '266');


  console.log(Object.keys(layoutData).length, 'layoutData 269');




  if (!propertys || !layoutData || !campainadd) {
    return (
      <div className='my-3'>
        <p>Loading...</p>
      </div>
    )
  }




  const layoutDat = {
    "2 BHK": [
      {
        areaSqft: 779.85,
        areaSqm: 72.45,
        bhk: "2 BHK",
        price: 8578000,
        status: "Under Construction",
        possession: "Apr 2026",
        image: "https://....jpg"
      },
      {
        areaSqft: 1205,
        areaSqm: 111.95,
        bhk: "2 BHK",
        price: 13300000,
        status: "Under Construction",
        possession: "Apr 2026",
        image: "https://....jpg"
      },
      {
        areaSqft: 1205,
        areaSqm: 111.95,
        bhk: "2 BHK",
        price: 13300000,
        status: "Under Construction",
        possession: "Apr 2026",
        image: "https://....jpg"
      },
      {
        areaSqft: 1205,
        areaSqm: 111.95,
        bhk: "2 BHK",
        price: 13300000,
        status: "Under Construction",
        possession: "Apr 2026",
        image: "https://....jpg"
      }, {
        areaSqft: 1205,
        areaSqm: 111.95,
        bhk: "2 BHK",
        price: 13300000,
        status: "Under Construction",
        possession: "Apr 2026",
        image: "https://....jpg"
      },

    ],

    "3 BHK": [
      {
        areaSqft: 1180,
        areaSqm: 109.63,
        bhk: "3 BHK",
        price: 13000000,
        status: "Under Construction",
        possession: "Apr 2026",
        image: "https://....jpg"
      }
    ]
  };

  const amenitie = [
    { name: "Swimming Pool", icon: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/swimming_pool.png" },
    { name: "Gymnasium", icon: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/gymnasium.png" },
    { name: "Club House", icon: "/icons/clubhouse.svg" },
    { name: "Mini Theatre", icon: "/icons/theatre.svg" },
    { name: "Creche/Day Care", icon: "/icons/daycare.svg" },
    { name: "Children's Play Area", icon: "/icons/play.svg" },
    { name: "Terrace Garden", icon: "/icons/garden.svg" },
    { name: "Park", icon: "/icons/park.svg" },
    { name: "Banquet Hall", icon: "/icons/banquet.svg" },
  ];

  let answer = propertys.faq[0].answer;

  // If it's an array, convert the first item to string
  if (Array.isArray(answer)) {
    answer = answer[0];
  }

  // Now clean markdown syntax
  answer = answer.replace(/```json|```/g, "").trim();

  // Convert to actual array
  const result = JSON.parse(answer);

  console.log(answer);
  


  const firstThree = result.slice(0, 3);
  const remaining = result.slice(3);


  const showDrawer = () => {
    setOpen(true)
  };

  const onClose = () => {
    setOpen(false)
  };


  const leadGenration = () => {
    setLeadModel(true);
    setOpen(false);
  }



  return (
    <>
      <Seo
        title={`${propertys?.projecttitle || "BRANDSDOOR"}`}
        description={
          propertys?.titleDescription
            ? propertys.titleDescription
            : "Explore premium residential and commercial projects in India."
        }
        canonical={
          slug
            ? `https://www.indiadealss.com/project/${slug}`
            : null
        }
      />
      <div className="flex justify-center flex-col mt-[7vw] md:flex-row mx-6">
        <div className="w-full md:w-[60%] m-2">
          <Collapage images={image} video={video} />
          <p><span className='text-xs'>Home > Project in > {propertys.projectname}</span></p>
          <div className="flex">
            <div className="flex">
              <h2 className=''>{propertys.projectname}</h2>
              <div onClick={() => setFavurate((prev) => !prev)}>
                {favurate ? (
                  <CiHeart className='text-2xl mt-1 mx-2 text-red-500 cursor-pointer' />
                ) : (
                  <FaHeart className='text-xl mt-2 mx-2 text-red-500 cursor-pointer' />
                )}
                {/* <CiHeart className='text-2xl mt-1 mx-2 text-red-500' /> */}
                {/* <FaHeart className='text-2xl mt-1 mx-2 text-red-500' /> */}
              </div>
            </div>
          </div>

          {/* collapse faq */}
          <div className={`${propertys.property === 'commercial' ? 'hidden' : ''}`}>
            <Divider orientation='center'>CONSTRUCTION STATUS</Divider>
            <Collapse
              expandIconPosition="end"
              items={[
                {
                  key: '1',
                  label: propertys.availabestatus,
                  children: propertys.availabestatus === "Ready to move" ? (
                    <p></p>
                  ) : (
                    <p className="text-gray-600">Completion {propertys.Possession}</p>
                  ),
                },
              ]}
            />

          </div>

          {/* commercial projects */}
          <div className={`${propertys.property === 'commercial' ? '' : 'hidden'}`}>
            <Reracollapse propertys={propertys} />
          </div>

          {/* project charges */}
          <div className={propertys.property === 'commercial' ? 'hidden' : "flex flex-col md:flex-row justify-between mt-10"}>
            <div>
              <p><span className='flex'><FaRupeeSign className='mt-2 ' /><span className='font-bold text-2xl'>{propertys.price} </span> <span className='font-medium text-blue-500 ms-1 mt-1'> + charges</span></span></p><span className='text-xs text-gray-500 ms-5 font-normal'>PRICE RANGE</span>
            </div>
            <button className='font-bold  text-blue-500 border shadow-sm p-2 rounded cursor-pointer flex h-10' onClick={() => setLeadModel(true)}><ImFolderDownload className='m-1' />Download Brochure</button>

          </div>
          {/* Apartment Layout */}
          <div className={`${propertys.property === 'commercial' ? 'hidden' : 'mt-2'}`}><p><span className="font-medium text-gray-500 mt-5">{Array.isArray(propertys?.propertyType) ? propertys.propertyType.map(p => p.replace(" Bhk", "")).join(", ") : ''} BHK Apartment</span></p></div>
          <div className='mb-5'>
            <BhkCards data={unitData} />
          </div>
          {propertys.property === 'commercial' && (
            <div>
              <div className="mt-2">
                <Investdetails propertys={propertys} />
              </div>

              <div className="mt-2">
                <Investmentoption propertys={propertys} />
              </div>

              <div className="mt-2">
                <Unitsavailble propertys={propertys} />
              </div>
            </div>
          )}

          {propertys.property === 'residential' && (
            <div className={Object.keys(layoutData).length === 0 ? "hidden" : "my-5"}>
              <FloorPlans layoutData={layoutData} propertys={propertys} />
            </div>
          )}

          {/* property sellers  */}
          <div className={campainadd.length === 0 ? 'hidden' : ''}>
            <div className="flex justify-between flex-col md:flex-row">
              <h2><span className='text-lg'>Sellers you may contact for more details</span></h2>
              <button className='text-lg text-blue-500 font-medium me-4'>View All Sellers</button>
            </div>

            {/* Sellers Cards */}

            <DealerCards propertys={propertys} campainadd={campainadd} />
          </div>


          {/* Top facilities */}

          <div>
            <div className="flex justify-between">
              <div>
                <h2><span className='font-medium'>Top Facilities</span></h2>
              </div>
              <div>
                {/* <button className='text-blue-500 cursor-pointer font-medium'>View All</button> */}
              </div>
            </div>
            <div className='flex flex-wrap my-10'>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-4 rounded-xl 
                 bg-[linear-gradient(to_top,#fefaf3_60%,transparent_40%)] hover:shadow-md transition"
                  >
                    <img src={item.icon} alt={item.name} className="w-10 h-10 mb-2" />
                    <p className="text-gray-800 text-sm font-medium text-center">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* <div class="w-full h-40 bg-[linear-gradient(to_top,#3b82f6_50%,transparent_50%)]"></div> */}
          </div>


          {/* Localities */}

          <div>
            <div className="flex justify-between">
              <div>
                <h2><span>Location Advantages</span></h2>

              </div>
              <div>
                {/* <button className='text-blue-500 font-medium'>View All</button> */}
              </div>
            </div>

            <div className='my-3'>
              <NearbySlide data={propertys.locatadvance} />
            </div>
          </div>

          {/* about Project */}
          <div className='my-5'>
            <h2><span className='text-xl'>More about {propertys.projectname}</span></h2>
            <Description text={propertys.projectDescription} />
          </div>

          {/* Interiors and Other Specifications */}
          <div className='hidden'>
            <h2 className='flex'><span className='text-sm'>Interiors and Other Specifications </span>  <span className='font-normal mx-3 '><FaLongArrowAltRight /></span></h2>
            <Interdescription text={propertys.description} />
          </div>


          {/* Official brochure */}
          <div className={brochurePdf ? '' : 'hidden'}>
            <div className="flex justify-between my-5">
              <div>
                <h2><span className='text-lg text-gray-800'>View offical brochure</span></h2>
                <p><span className='text-xs font-medium text-gray-500'>{propertys.projectname} Brochure & payment plan</span></p>
              </div>
              <div className='mt-5'>
                <IoIosInformationCircle className='text-3xl text-gray-500' />
              </div>
            </div>
            <PdfSlider pdfUrl={brochurePdf} />
          </div>
        </div>


        <div className="w-full md:w-[30%] m-2 sticky top-20 self-start" style={{ position: 'sticky' }}>
          <div className="bg-white shadow-xs rounded p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {propertys.faq[0].question}
            </h2>

            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {firstThree.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {result.length > 3 && (
              <button
                onClick={showDrawer}
                className="mt-3 text-blue-600 font-medium  cursor-pointer flex"
              >
                View {remaining.length} more <IoIosArrowRoundForward className='text-3xl' />
              </button>
            )}
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between">
              <div>
                <p><span className='text-xs font-bold text-gray-500'>DEVELOPED BY</span></p>
                <p><span className=' font-bold'>{propertys.projectdeveloper}</span></p>
              </div>
            </div>
          </div>

          <Drawer
            footer={
              <div>
                <button className='text-center cursor-pointer bg-blue-500 rounded p-3 w-[100%] text-white font-medium' type='button' onClick={leadGenration}>I am intersted in Project</button>
              </div>
            }
            open={open}
            onClose={() => setOpen(false)}
            placement="right"
            mask={false} /** Prevents overlay from covering navbar */
            style={{
              top: 64, // height of navbar
              height: "calc(100vh - 64px)",
              marginTop: 64,
            }}

            styles={{
              header: {
                borderBottom: "none",
                display: "none"
              },
            }}
          >
            <div className="bg-white rounded-xl max-w-lg w-full">

              <div className='float-right mb-5'>
                <span onClick={() => setOpen(false)} className='cursor-pointer text-xl'><RxCross2 /></span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {propertys.faq[0].question}
              </h3>

              <ul className="list-disc list-inside text-gray-600 space-y-1 max-h-80 overflow-y-auto">
                {remaining.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>


            </div>
          </Drawer>
        </div>
      </div>

      {/* ✅ Modal
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {propertys.faq[0].question}
            </h3>

            <ul className="list-disc list-inside text-gray-600 space-y-1 max-h-80 overflow-y-auto">
              {remaining.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <div className="text-right mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}



      {/* Lead Modal */}
      {leadModel && (
        <div>
          <Leadgentaionform setLeadModel={setLeadModel} />
        </div>
      )}
    </>
  )
}


export default Projectdetail
