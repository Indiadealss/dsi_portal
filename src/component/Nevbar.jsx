"use client";
import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import { useLocation } from "react-router-dom";
import inheight from "../Images/deskIn.png";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Grid,
  Input, 
  Space,
  Dropdown,
  Avatar,
} from "antd";
import { CgMenuLeft } from "react-icons/cg";
import {
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  DownOutlined,
  
} from "@ant-design/icons";
import { Link } from "react-router";
import { Login } from "./Login";
import Custominputserchbox from "./customantdesign/Custominputserchbox";
import Mobileloginmodal from "./Mobileloginmodal";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./Redux/userSlice";
import { getLogout } from "../api/api";
import { updateFilter } from "./Redux/filterSlice";
import Mobilenavcustombtn from "./customantdesign/Mobilenavcustombtn";

const { Header } = Layout;





// Menu Data
const menuItems = [

  {
    key: "ForBuyers",
    label: "For Buyers",
    children: [
      {
        key: "BuyAHome",
        label: "Buy A Home",
        subChildren: [
          { key: "flats", label: "Flats" },
          { key: "builderFloors", label: "Builder Floors" },
          { key: "independenthouse", label: "Independent House" },
          { key: "PlotsinGreaterNoida", label: "Plots  " },
          { key: "ServicedApartment", label: "Serviced Apartment" },
          {
            key: "studioapartments",
            label: "Studio Apartments / 1 RK flats",
          },
        ],
        subChildren2: [
          { key: "propertyingraternoida", label: "Property  " },
          { key: "verified", label: "Verified Property" },
          {
            key: "newprojectsingraternoida",
            label: "New Projects  ",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      {
        key: "LandPlot",
        label: "Land/Plot",
        subChildren: [
          {
            key: "GatedCommunityPlots",
            label: "Gated Community Plots  ",
          },
          { key: "CornerPlots", label: "Corner Plots  " },
          {
            key: "EastFacingPlots",
            label: "East Facing Plots  ",
          },
          { key: "FreeholdPlots", label: "Freehold Plots  " },
          { key: "AuthorityPlots", label: "Authority Plots  " },
          {
            key: "UPAVPPlots",
            label: "UPAVP Authority Plots  ",
          },
          {
            key: "GNIDAPlots",
            label: "GNIDA Authority Plots  ",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      {
        key: "commercial",
        label: "Commercial",
        subChildren: [
          { key: "readyOffice", label: "Ready to Move Office Spaces" },
          { key: "bareShell", label: "Bare Shell Office Spaces" },
          { key: "coworking", label: "Co-working Office Spaces" },
          { key: "shops", label: "Shops" },
          { key: "factory", label: "Factory" },
          { key: "warehouses", label: "Warehouses" },
          { key: "showrooms", label: "Showrooms" },
          { key: "industrialLand", label: "Industrial Lands/Plots" },
          { key: "agriLand", label: "Agricultural/Farm Land" },
        ],
        subChildren2: [
          {
            key: "commercialProperty",
            label: "Commercial Property for Sale  ",
          },
          {
            key: "verifiedCommercial",
            label: "Verified Commercial Property  ",
          },
          {
            key: "newCommercialProjects",
            label: "New Commercial Projects  ",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      // { key: "articlesnews",
      //   label: "Articles & News",
      //   subChildren: [
      //     {
      //       key: "articlesforbuyers",
      //       label: "Articles For Buyers",
      //     },
      //     {
      //       key: "realestatenews",
      //       label: "Real Estate News",
      //     },
      //     {
      //       key: "buyerguide",
      //       label: "Buyer Guide",
      //     },
      //     {
      //       key: "homeinteriorguides",
      //       label: "Home Interior Guides",
      //     },
      //     {
      //       key:"Policies (GSTRERAPMAYBudget)",
      //       label:"Policies (GST, RERA, PMAY, Budget)"
      //     }
      //   ],
      //   subChildren3: [{ key: "image", image: inheight }],
      //  },
    ],
  },
  {
    key: "ForTalents",
    label: "For Tenants",
    children: [
      { key: "RENTAHOME",
        label: "RENT A HOME",
        subChildren: [
          { key: "Flats",
            label: "Flats"
           },
          { key: "BuilderFloors", label: "Builder Floors" },
          { key: "Independent House", label: "Independent House" },
          { key: "ServicedApartments", label: "Serviced Apartments" },
          { key: "StudioApartments/1 RK Flats", label: "Studio Apartments/1 RK Flats" },
        ],
        subChildren2: [
          {
            key: "PropertyforrentinGreaterNoida",
            label: "Property for rent  ",
          },
          {
            key: "verifiedpropertyingreaternoida",
            label: "Verified Property  ",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "PG/CO-LIVING", 
        label: "PG/CO-LIVING",
        subChildren: [
          { key: "PGforgirlsinGreaterNoida",
            label: "PG for girls  "
           },
          { key: "PGforboysinGreaterNoida",
            label: "PG for boys  " },
          { key: "SingleroompG", label: "Single Room PG  " },
          { key: "DoubleSharingPG", label: "Double Sharing PG  " },
          { key: "TripleSharingPG", label: "Triple Sharing PG  " },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "COMMERCIAL",
        label: "COMMERCIAL",
        subChildren: [
          { key: "ReadytoMoveofficespaces",
            label: "Ready to Move office spaces"
           },
          { key: "Bareshellofficespaces", label: "Bare shell office spaces" },
          { key: "Coworkingofficespaces", label: "Co-working office spaces" },
          { key: "Shops", label: "Shops" },
          { key: "Factory", label: "Factory" },
          {key:"Warehouses",label:"Warehouses"},
          {key:"Showrooms",label:"Showrooms"},
          {key:"Industriallands/Plots",label:"Industrial Lands/Plots"},
          {key:"Agricultural/Farmland",label:"Agricultural/Farm Land"},
        ],
        subChildren2: [
          {
            key: "Commercialpropertyforrentingreaternoida",
            label: "Commercial property for rent  ",
          },
          {
            key: "Verifiedcommercialpropertyingreaternoida",
            label: "Verified Commercial property  ",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      // { key: "POPULAR AREAS",
      //   label: "INSIGHTSNEW",
      //   subChildren: [
      //     { key: "Greater Noida Overview",
      //       label: "Greater Noida Overview"
      //      },
      //     { key: "localitiesingreaternoida", label: "Localities  " },
      //     { key: "Reviewsofgreaternoida", label: "Reviews of Greater Noida" },
      //     { key: "transactionpricesingreaternoida", label: "Transaction Prices  " },
      //     { key: "Propertyratesingreaternoida", label: "Property Rates  " },
      //     {key:"Warehouses",label:"Home Loan Tools & More"},
      //     {key:"Area Unit Converter",label:"Area Unit Converter"},
      //     {key:"Buildersinindia",label:"Builders in India"},
      //   ],
      //   subChildren3: [{ key: "image", image: inheight }],
      // },
      // { key: "ARTICLES & NEWS", label: "ARTICLES & NEWS",
      //   subChildren: [
      //     { key: "ARTICLESNEWS",
      //       label: "Articles For Tenants"
      //      },
      //     { key: "Homeinteriorguide", label: "Home Interior Guide" },
      //     { key: "View All Insights", label: "View All Insights" }
      //   ],
      //   subChildren3: [{ key: "image", image: inheight }],
      //  },
    ],
  },
  {
    key: "ForOwners",
    label: "For Owners",
    children: [
      { key: "OWNEROFFERINGS", label: "OWNER OFFERINGS",
        subChildren: [
          { key: "PostpropertyFre",
            label: "Post PropertyFree"
           },
          { key: "Ownerservices",
            label: "Owner Services"
           },
        ],
        subChildren3: [{ key: "image", image: inheight }],
       },
      // { key: "INSIGHTSNEW",
      //   label: "INSIGHTSNEW",
      //   subChildren: [
      //     { key: "Homeloantools&more",
      //       label: "Home Loan Tools & More"
      //      },
      //     { key: "Areaunitconverter", label: "Area Unit Converter" },
      //     { key: "Buildersinindia", label: "Builders in India" },
      //     { key: "View All Insights", label: "viewallinsights" },
      //   ],
      //   subChildren3: [{ key: "image", image: inheight }],

      //  },
      // { key: "ARTICLES&NEWS", 
      //   label: "ARTICLES & NEWS",
      //   subChildren: [
      //     { key: "Articles For Owners",
      //       label: "Articles For Owners"
      //      },
      //     { key: "Real Estate News", label: "Real Estate News" },
      //     { key: "Seller Guide", label: "Seller Guide" },
      //     { key: "HomeinteriorGuide", label: "Home Interior Guide" },
      //     { key: "policies", label: "Policies (GST, RERA, PMAY, Budget)" },
      //     {key:"ViewAllInsights",label:"View All Insights"}
      //   ],
      //   subChildren3: [{ key: "image", image: inheight }],
      // },
    ],
  },
  {
    key: "ForDealers",
    label: "For Dealers/Builders",
    children: [
      { key: "DEALEROFFERINGS",
        label: "DEALER OFFERINGS",
        subChildren: [
          { key: "PROPERTYsERVICES",
            label: "PROPERTY SERVICES"
           },
          { key: "Postproperty", label: "Post Property" },
          { key: "Dealerservices", label: "Dealer Services" },
          { key: "BOSSplansNEW", label: "BOSS PlansNEW" },
        ],
          subChildren3: [{ key: "image", image: inheight }],
       },
      { key: "RESEARCH AND ADVICE",
        label: "RESEARCH AND ADVICE",
        subChildren: [
          {key: "cosutmerService&faq",label:"Costumer Service & FAQ"}
        ],
        subChildren3: [{ key: "image", image: inheight }],
       },
    ],
  },
  
];


const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");
  
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
};
const MobilemenuItems = [
  {
    key: "ForBuyers",
    label: "For Buyers",
    children: [
      {
        key: "BuyAHome",
        label: "Buy A Home",
        children: [
          { key: "flats", label: <Link to='/property'>Flats</Link>,path:'/property'},
          { key: "builderFloors", label: <Link to='/property'>Builder Floors</Link>,path:'/property' },
          { key: "independenthouse", label: <Link to='/property'>Independent House</Link>,path:'/property' },
          { key: "PlotsinGreaterNoida", label: <Link to='/property'>"Plots  "</Link>,path:'/property' },
          { key: "ServicedApartment", label: <Link to='/property'>Serviced Apartment</Link>,path:'/property' },
          { key: "studioapartments", label: <Link to='/property'>Studio Apartments / 1 RK flats</Link>,path:'/property' },
          { key: "propertyingraternoida", label: <Link to='/property'>Property  </Link>, path:'/property' },
          { key: "verified", label: <Link to='/property'>Verified Property</Link>,path:'/property' },
          { key: "newprojectsingraternoida", label: <Link to='/property'>New Projects  </Link>,path:'/property' },
          { key: "imageBuyHome", label: <img src={inheight} alt="menu" /> },
        ],
      },
      {
        key: "LandPlot",
        label: "Land/Plot",
        children: [
          { key: "GatedCommunityPlots", label: <Link to='/property'>Gated Community Plots  </Link> },
          { key: "CornerPlots", label: <Link to='/property'>Corner Plots  </Link> },
          { key: "EastFacingPlots", label: <Link to='/property'>East Facing Plots  </Link> },
          { key: "FreeholdPlots", label: <Link to='/property'>Freehold Plots  </Link> },
          { key: "AuthorityPlots", label: <Link to='/property'>Authority Plots  </Link> },
          { key: "UPAVPPlots", label: <Link to='/property'>UPAVP Authority Plots  </Link> },
          { key: "GNIDAPlots", label: <Link to='/property'>GNIDA Authority Plots  </Link> },
          { key: "imageLandPlot", label: <img src={inheight} alt="menu" /> },
        ],
      },
      {
        key: "commercial",
        label: "Commercial",
        children: [
          { key: "readyOffice", label: <Link to='/property'>Ready to Move Office Spaces</Link> },
          { key: "bareShell", label: <Link to='/property'>Bare Shell Office Spaces</Link> },
          { key: "coworking", label: <Link to='/property'>Co-working Office Spaces</Link> },
          { key: "shops", label: <Link to='/property'>Shops</Link> },
          { key: "factory", label: <Link to='/property'>Factory</Link> },
          { key: "warehouses", label: <Link to='/property'>Warehouses</Link> },
          { key: "showrooms", label: <Link to='/property'>Showrooms</Link> },
          { key: "industrialLand", label: <Link to='/property'>Industrial Lands/Plots</Link> },
          { key: "agriLand", label: <Link to='/property'>Agricultural/Farm Land</Link> },
          { key: "commercialProperty", label: <Link to='/property'>Commercial Property for Sale  </Link> },
          { key: "verifiedCommercial", label: <Link to='/property'>Verified Commercial Property  </Link> },
          { key: "newCommercialProjects", label: <Link to='/property'>New Commercial Projects  </Link> },
          { key: "imageCommercial", label: <img src={inheight} alt="menu" /> },
        ],
      },
      {
        key: "popularareas",
        label: "Popular Areas",
        children: [
          { key: "PropertyinSector1GreaterNoidaWest", label: <Link to='/property'>Property in Sector 1 Greater Noida West</Link> },
          { key: "PropertyinTechzone4GreaterNoidaWest", label: <Link to='/property'>Property in Techzone 4 Greater Noida West</Link> },
          { key: "PropertyinSector16CGreaterNoida", label: <Link to='/property'>Property in Sector 16C Greater Noida</Link> },
          { key: "PropertyinSector4GreaterNoida", label: <Link to='/property'>Property in Sector 4 Greater Noida</Link> },
          { key: "PropertyinNoidaExtension", label: <Link to='/property'>Property in Noida Extension</Link> },
          { key: "PropertyinSector16GreaterNoida", label: <Link to='/property'>Property in Sector 16 Greater Noida</Link> },
          { key: "PropertyinSector16BGreaterNoida", label: <Link to='/property'>Property in Sector 16B Greater Noida</Link> },
          { key: "PropertyinSectorChi5GreaterNoida", label: <Link to='/property'>Property in Sector Chi 5 Greater Noida</Link> },
          { key: "PropertyinSector10GreaterNoidaWest", label: <Link to='/property'>Property in Sector 10 Greater Noida West</Link> },
          { key: "imagePopular", label: <img src={inheight} alt="menu" /> },
        ],
      },
      {
        key: "insights",
        label: "Insights",
        children: [
          { key: "GreaterNoidaOverview", label: <Link to='/property'>Greater Noida Overview</Link> },
          { key: "LocalitiesinGreaterNoida", label: <Link to='/property'>Localities  </Link> },
          { key: "ReviewsofGreaterNoida", label: <Link to='/property'>Reviews of Greater Noida</Link> },
          { key: "TransactionPricesinGreaterNoida", label: <Link to='/property'>Transaction Prices  </Link> },
          { key: "PropertyRatesinGreaterNoida", label: "Property Rates  " },
          { key: "HomeLoanTools", label: "Home Loan Tools & More" },
          { key: "AreaUnitConverter", label: "Area Unit Converter" },
          { key: "BuildersinIndia", label: "Builders in India" },
          { key: "ViewAllInsights", label: "View All Insights" },
          { key: "imageInsights", label: <img src={inheight} alt="menu" /> },
        ],
      },
      // {
      //   key: "articlesnews",
      //   label: "Articles & News",
      //   children: [
      //     { key: "articlesforbuyers", label: "Articles For Buyers" },
      //     { key: "realestatenews", label: "Real Estate News" },
      //     { key: "buyerguide", label: "Buyer Guide" },
      //     { key: "homeinteriorguides", label: "Home Interior Guides" },
      //     { key: "Policies", label: "Policies (GST, RERA, PMAY, Budget)" },
      //     { key: "imageArticles", label: <img src={inheight} alt="menu" /> },
      //   ],
      // },
    ],
  },
  // ⬇️ Repeat same merging for "ForTalents", "ForOwners", "ForDealers", "Insights2"
];





export default function Navbar() {
  
  const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const MLocation = useSelector((state) => state.filterSlice.location)

    // useEffect(() => {

    // },[MLocation])


    const createSlug = (item) => {
    if (!item?.label) return "";


    console.log(MLocation,'mlo');
    

    if(MLocation === "All India"){
      return `${item.label}-ffid-`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    }
    else{
      return `${item.label}-in-${MLocation}-ffid-`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    }
    
  };



    const fetchLocations = async (value, setData) => {
    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5&countrycodes=in`
        );
        const data = await res.json();
        // console.log(data);
        
        setData(data);
      } catch (error) {
        // console.log("Error fetching location:", error);
      }
    } else {
      setData([]);
    }
  };

    const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchLocations(value, setResults);
  };

   const handleSelect = (place) => {
    if (place.address.village || place.address.city || place.address.town) {
      setQuery(
        place.address.village ||
          place.address.city ||
          place.address.town ||
          place.display_name
      );
      setLocationNav(
      place.address.village ||
          place.address.city ||
          place.address.town ||
          place.display_name
    );
    }
    
    setResults([]);
    setShowLocality(true);
  };
  

  const dropdownContent = (
    <div className=" bg-white w-100 rounded-lg">
      {/* Search box */}
      <div className="p-3">

      
      <h2><span className="text-xl font-medium text-gray-600"> Explore Real state in...</span></h2>

      {/* Custom component */}
      <div className="p-2 bg-gray-100 rounded border border-gray-300 my-4 ">
        <input className="text-sm w-full border-none outline-none" value={query} onChange={handleSearch} id="city" placeholder="Your City" />
        
      </div>
      {results.length > 0 && (
        <ul className="border border-gray-200 mt-2 rounded-lg shadow-md bg-white max-h-48 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              
              {item.address.city}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className="w-full border-t border-gray-300 "></div>
      <div className="p-3 flex">
      {/* <span className="text-gray-500 cursor-pointer mt-[4px]" onClick={() => setLocationNav('All India')}>All India</span> */}
      <div className="h-6 w-1 border-e border-gray-300 mx-5"></div>
      </div>
    </div>
  );

  const location = useLocation();

  const [scroll,setScroll] = useState(false);
  const [locationNav,setLocationNav] = useState('All India')

  


  useEffect(() => {
    
    
    const handleScroll = () => {
      // console.log(window.scrollY);
      
       if(window.scrollY > 79 || location.pathname !== '/' ){
        setScroll(true);
      }else{
        setScroll(false)
      }
    };

    handleScroll();

    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll);
  },[location.pathname])
  
  
  
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const profileLabel = user.loggedIn ? (
    <span>{user.name}</span> //show user name
  ):(
    <Link onClick={() => setShowLogin(true)}>Login/Register</Link>
  )


  

  useEffect(() => {
    dispatch(updateFilter({location:locationNav}));
  },[locationNav])


  //logout api
  const handleLogout = async () => {
    try{
      await getLogout();
      dispatch(clearUser());
    }catch(err){
      console.error("Logout failed",err);
      
    }
  };

  const logout = user.loggedIn ? (
     <span onClick={handleLogout}>Log out</span>//show user name
  ):(
    ''
  )


  const profileItems = [
  { key: "profile", label: profileLabel },
  {key:"myactivty",label:<Link to='/recent-activity?type=viewed' ><span className="text-sm">My activity</span></Link>},
  // {key:'recentlysearch',label:<Link to='/recent-activity?type=recent'><span className="text-sm">Recently Search</span></Link>},
  {key:"recently",label:<Link to='/recent-activity?type=viewed'><span className="text-sm">Recently Viewed</span></Link>},
  {key:"shortlisted",label:<Link to='/recent-activity?type=shortlist'><span className="text-sm">Shortlisted</span></Link>},
  {key:"contacted",label:<Link to='/recent-activity?type=contacted'><span className="text-sm">Contacted</span></Link>},
  {type:"divider"},
  {key:"mybrandsdoor",label:<Link to='/mybrandsdoor' className={user.loggedIn ? '' : 'hidden'}><span className="text-sm">My DOOR</span></Link>},
  {key:"",label:<Link to='/' className={user.loggedIn ? '' : 'hidden'}><span className="text-sm" >Manage Listings</span></Link>},
  {type:"View All Responses",label:<Link to='/responses' className={user.loggedIn ? '' : 'hidden'}><span className="text-sm">View All Resposes</span></Link>},
  {type:'Manage Boss',label:<Link to='/' className={user.loggedIn ? '' : 'hidden'}><span className="text-sm">Manage BOSS</span></Link>},
  // {type:'leadsearch',label:<Link to='/' className={user.loggedIn ? '' : 'hidden'}><span className="text-sm">Lead Search</span></Link>},
  {type:'modifyprofile',label:<Link to='/mybrandsdoor/editProfile' className={user.loggedIn ? '' : 'hidden'}><span className="text-sm">Modify Profile</span></Link>},
  { type: "divider" },
  { key: "logout", danger: true, label:  logout}
];
  const [scrolled, setScrolled] = useState(false);
const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [openWeb, setOpenWeb] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const isTablet = !screens.lg;

    useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    setScrolled(currentScroll > 80);

    if (currentScroll > lastScroll && currentScroll > 100) {
      setVisible(false); // scrolling down
    } else {
      setVisible(true); // scrolling up
    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  

  // Custom dropdown
  const getDropdownRender = (item) => {
    if (!item.children) return null;

    const activeChild = item.children.find((c) => c.key === activeParent);

    return (
      <>
      <div
        style={{
          background: "#f5f5f5",
          borderRadius: 8,
          display: "flex",
        }}
      >

        
        {/* Left Column */}
        <div className="py-5 px-10">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {item.children.map((child) => (
              <li
                key={child.key}
                className="py-3 cursor-pointer font-medium 0"
                onMouseEnter={() => setActiveParent(child.key)}
              >
                {child.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Middle Column */}
        <div className="flex p-10 bg-white rounded-lg">
          <div className="px-5">
            {activeChild?.subChildren && (
              <>
                <p
                  style={{
                    fontWeight: 400,
                    marginBottom: 8,
                    color: "gray",
                    fontSize: "small",
                  }}
                >
                  Sub Items
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {activeChild.subChildren.map((sub) => (
                    <li key={sub.key} style={{ padding: "2px 0" }}>
                      <Link to={createSlug(sub)}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="px-8">
            {activeChild?.subChildren2 && (
              <>
                <h4
                  style={{
                    fontWeight: 400,
                    marginBottom: 8,
                    color: "gray",
                    fontSize: "small",
                  }}
                >
                  Sub Items
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {activeChild.subChildren2.map((sub) => (
                    <li key={sub.key} style={{ padding: "2px 0" }}>
                      <Link  to="/property">{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="px-8">
            {activeChild?.subChildren3 && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {activeChild.subChildren3.map((sub) => (
                  <li key={sub.key} style={{ padding: "2px 0" }}>
                    <img src={sub.image} alt={sub.key} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      </>
    );
  };

  return (
    <>
    <Header
    className={`w-full  left-0 z-50 transition-all duration-50 
  ${
    scrolled
      ? "propertyNavbar text-[#f1e6c8] hover:text-[#f1e6c8] navbackground  shadow-lg top-0"
      : `propertyNavbar2 text-[#f1e6c8] hover:text-[#f1e6c8] top-0  ${location.pathname === '/' ? 'navbackgroundSec bg-transparent' : 'navbackground'}`
  }
  ${visible ? "top-0" : "top-0"}
  `}
      style={{
        position: "",
        top: 0,
        zIndex: 100,
        width: "100%",
        paddingInline: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "transparent",
        height:'80px'
      }}
    >
      <div className="flex">
      {/* Mobile Drawer */}
  
      {/* Logo */}
      <div className={`${scroll && isMobile ? 'flex' : 'md:ms-10  flex' }`}>
      <a
        href="/"
        
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        <img src="https://d3eoh63gynpjzh.cloudfront.net/1771509319781-brandsdoorlog.png" alt="BRANDSDOOR"  width={180} height={100} />
      </a>
        
      </div>

{/* <!-- Dropdown menu --> */}
 {/* <Dropdown
      trigger={["click", "hover"]}
      dropdownRender={() => dropdownContent} // 👈 full control
      placement="bottomLeft"
      className={`${scroll ? 'hidden':'hidden lg:block'}`}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className="text-white  px-3 py-1 rounded-md cursor-pointer">
          {locationNav}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown> */}

      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center" }} className="md:me-10">
 {!scroll ? (
  !isTablet &&
    // menuItems.map((item) =>
    //   item.children ? (
    //     <div>hello</div>
    //   ) : (
    //     <Button key={item.key} type="text" className="menu-btn">
    //       {item.label}
    //     </Button>
    //   )
    // )
    <div>

    </div>
) : (
  !isMobile && (   
    <div className="w-[67vw] lg:w-[50vw] mx-2 lg:me-10">
      <Custominputserchbox />
    </div>
  )
)}

  

  {/* Post Property button */}
  <Button
  className={`px-6 py-2 rounded-md border transition-all duration-300 postPropertyNavbtn
  ${
    scrolled
      ? " text-white border-[#011638]"
      : "bg-transparent text-white border-white  "
  }
  ${
    location.pathname === '/post-property' || location.pathname === '/postproperty'
      ? "hidden"
      : ""
  }`}
>
  <Link to="/post-property">
    Post Property
  </Link>
</Button>

    
  
  {/* Notification Icon */}
  <Button
    type="text"
    aria-label="Notifications"
    className="navBtn postPropertyNavbtn"
    icon={<BellOutlined />}
  />

  {/* Profile Dropdown */}
  <Dropdown
    placement="bottomRight"
    menu={{ items: profileItems }}
    trigger={["click"]}
    className="navBtn"
    
  >
    <Button type="text " >
      <Space>
       <Avatar
  size="small"
  className="LoginBtn bg-blue-500 text-white font-semibold"
  src={user.loggedIn && user.profile_photo ? user.profile_photo : null}
  icon={!user.loggedIn ? <UserOutlined /> : null}
>
  {user.loggedIn && !user.profile_photo && user.name
    ? getInitials(user.name)
    : null}
</Avatar>
        <DownOutlined className="" />
      </Space>
    </Button>
  </Dropdown>
  

  

  {!isTablet &&(
  <Button
      type="text"
      aria-label="Open navigation"
      icon={<CgMenuLeft />}
      style={{color:"white"}}
      onClick={() => setOpenWeb(true)}
    />
    )}
    {isTablet && (
    <Button
      type="text"
      aria-label="Open navigation"
      style={{color:"whitesmoke", textAlign:'right'}}
      icon={<CgMenuLeft  className="text-2xl"/>}
      onClick={() => setOpen(true)}
      className="mt-3 mx-3"
    />
  )}
</div>

      

      {/* Drawer for mobile */}
      <Drawer
  placement="bottom"
  closable={false}
  open={open}
  onClose={() => setOpen(false)}
  height="100%"
  bodyStyle={{ padding: 0 }}
>
 <Mobilenavcustombtn setOpen={setOpen} setShowLogin={setShowLogin} />
</Drawer>

      <Drawer
        title="Navigation"
        placement="right"
        closable
        open={openWeb}
        onClose={() => setOpenWeb(false)}
        bodyStyle={{ padding: 0 }}
        height="100%"
        width="30%"
      >
        <Menu
          mode="inline"
          items={MobilemenuItems}
          onClick={() => setOpenWeb(false)}
          selectedKeys={[]}
        />
      </Drawer>

      
    </Header>
    {isMobile ? (
  <Mobileloginmodal open={showLogin} onClose={() => setShowLogin(false)} />
) : (
  <Login open={showLogin} onClose={() => setShowLogin(false)} />
)}


    </>
  );
}
