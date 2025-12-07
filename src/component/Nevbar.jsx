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
          { key: "PlotsinGreaterNoida", label: "Plots in Greater Noida" },
          { key: "ServicedApartment", label: "Serviced Apartment" },
          {
            key: "studioapartments",
            label: "Studio Apartments / 1 RK flats",
          },
        ],
        subChildren2: [
          { key: "propertyingraternoida", label: "Property in Greater Noida" },
          { key: "verified", label: "Verified Property" },
          {
            key: "newprojectsingraternoida",
            label: "New Projects in Greater Noida",
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
            label: "Gated Community Plots in Greater Noida",
          },
          { key: "CornerPlots", label: "Corner Plots in Greater Noida" },
          {
            key: "EastFacingPlots",
            label: "East Facing Plots in Greater Noida",
          },
          { key: "FreeholdPlots", label: "Freehold Plots in Greater Noida" },
          { key: "AuthorityPlots", label: "Authority Plots in Greater Noida" },
          {
            key: "UPAVPPlots",
            label: "UPAVP Authority Plots in Greater Noida",
          },
          {
            key: "GNIDAPlots",
            label: "GNIDA Authority Plots in Greater Noida",
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
            label: "Commercial Property for Sale in Greater Noida",
          },
          {
            key: "verifiedCommercial",
            label: "Verified Commercial Property in Greater Noida",
          },
          {
            key: "newCommercialProjects",
            label: "New Commercial Projects in Greater Noida",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "popularareas",
        label: "Popular Areas",
        subChildren: [
          {
            key: "PropertyinSector1GreaterNoidaWest",
            label: "Property in Sector 1 Greater Noida West",
          },
          { key: "PropertyinTechzone4GreaterNoidaWest",
            label: "Property in Techzone 4 Greater Noida West"
           },
          {
            key: "PropertyinSector16CGreaterNoida",
            label: "Property in Sector 16C Greater Noida",
          },
          { key: "PropertyinSector4GreaterNoida",
            label: "Property in Sector 4 Greater Noida"
           },
          { key: "PropertyinNoidaExtension",
            label: "Property in Noida Extension"
          },
          {
            key: "PropertyinSector16GreaterNoida",
            label: "Property in Sector 16 Greater Noida",
          },
          {
            key: "PropertyinSector16BGreaterNoida",
            label: "Property in Sector 16B Greater Noida",
          },
          {
            key: "PropertyinSectorChi5GreaterNoida",
            label: "Property in Sector Chi 5 Greater Noida",
          },
          {
            key: "GNIDAPlots",
            label: "Property in Sector 10 Greater Noida West",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "insights",
        label: "Insights",
        subChildren: [
          {
            key: "GatedCommunityPlots",
            label: "Greater Noida Overview",
          },
          { key: "CornerPlots", label: "Localities in Greater Noida" },
          {
            key: "EastFacingPlots",
            label: "Reviews of Greater Noida",
          },
          { key: "FreeholdPlots", label: "Transaction Prices in Greater Noida" },
          { key: "AuthorityPlots", label: "Property Rates in Greater Noida" },
          {
            key: "UPAVPPlots",
            label: "Home Loan Tools & More",
          },
          {
            key: "GNIDAPlots",
            label: "Area Unit Converter",
          },
          {
            key:"BuildersinIndia",
            label:"Builders in India"
          },
          {
            key:"ViewAllInsights",
            label:"View All Insights"
          }
        ],
        subChildren3: [{ key: "image", image: inheight }],
        
      },
      { key: "articlesnews",
        label: "Articles & News",
        subChildren: [
          {
            key: "articlesforbuyers",
            label: "Articles For Buyers",
          },
          {
            key: "realestatenews",
            label: "Real Estate News",
          },
          {
            key: "buyerguide",
            label: "Buyer Guide",
          },
          {
            key: "homeinteriorguides",
            label: "Home Interior Guides",
          },
          {
            key:"Policies (GSTRERAPMAYBudget)",
            label:"Policies (GST, RERA, PMAY, Budget)"
          }
        ],
        subChildren3: [{ key: "image", image: inheight }],
       },
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
            label: "Property for rent in Greater Noida",
          },
          {
            key: "verifiedpropertyingreaternoida",
            label: "Verified Property in Greater Noida",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "PG/CO-LIVING", 
        label: "PG/CO-LIVING",
        subChildren: [
          { key: "PGforgirlsinGreaterNoida",
            label: "PG for girls in Greater Noida"
           },
          { key: "PGforboysinGreaterNoida",
            label: "PG for boys in Greater Noida" },
          { key: "SingleroompGingreaternoida", label: "Single Room PG in Greater Noida" },
          { key: "DoubleSharingPGingreaternoida", label: "Double Sharing PG in Greater Noida" },
          { key: "TripleSharingPGingreaternoida", label: "Triple Sharing PG in Greater Noida" },
          { key: "PGinGreaterNoida", label: "PG in Greater Noida"},
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
            label: "Commercial property for rent in Greater Noida",
          },
          {
            key: "Verifiedcommercialpropertyingreaternoida",
            label: "Verified Commercial property in Greater Noida",
          },
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "POPULAR AREAS",
        label: "INSIGHTSNEW",
        subChildren: [
          { key: "Greater Noida Overview",
            label: "Greater Noida Overview"
           },
          { key: "localitiesingreaternoida", label: "Localities in Greater Noida" },
          { key: "Reviewsofgreaternoida", label: "Reviews of Greater Noida" },
          { key: "transactionpricesingreaternoida", label: "Transaction Prices in Greater Noida" },
          { key: "Propertyratesingreaternoida", label: "Property Rates in Greater Noida" },
          {key:"Warehouses",label:"Home Loan Tools & More"},
          {key:"Area Unit Converter",label:"Area Unit Converter"},
          {key:"Buildersinindia",label:"Builders in India"},
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
      { key: "ARTICLES & NEWS", label: "ARTICLES & NEWS",
        subChildren: [
          { key: "ARTICLESNEWS",
            label: "Articles For Tenants"
           },
          { key: "Homeinteriorguide", label: "Home Interior Guide" },
          { key: "Policies", label: "Policies (GST, RERA, PMAY, Budget)" },
          { key: "View All Insights", label: "View All Insights" }
        ],
        subChildren3: [{ key: "image", image: inheight }],
       },
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
      { key: "INSIGHTSNEW",
        label: "INSIGHTSNEW",
        subChildren: [
          { key: "Homeloantools&more",
            label: "Home Loan Tools & More"
           },
          { key: "Areaunitconverter", label: "Area Unit Converter" },
          { key: "Buildersinindia", label: "Builders in India" },
          { key: "View All Insights", label: "viewallinsights" },
        ],
        subChildren3: [{ key: "image", image: inheight }],

       },
      { key: "ARTICLES&NEWS", 
        label: "ARTICLES & NEWS",
        subChildren: [
          { key: "Articles For Owners",
            label: "Articles For Owners"
           },
          { key: "Real Estate News", label: "Real Estate News" },
          { key: "Seller Guide", label: "Seller Guide" },
          { key: "HomeinteriorGuide", label: "Home Interior Guide" },
          { key: "policies", label: "Policies (GST, RERA, PMAY, Budget)" },
          {key:"ViewAllInsights",label:"View All Insights"}
        ],
        subChildren3: [{ key: "image", image: inheight }],
      },
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
  {
    key: "insights2",
    label: "Insights",
    children: [
      { key: "price&trends", label: "Price & Trends", 
      subChildren:[
        {
          key:"PropertyRatesinPariChowk",
          label:"Property Rates in Pari Chowk"
        },
        {
          key:"PropertyRatesinSectorMuGreaterNoida",
          label:"Property Rates in Sector Mu Greater Noida"
        },
        {
          key:"PropertyratesinSector31greaternoida",
          label:"Property Rates in Sector 31 Greater Noida"
        },
        {
          key:"PropertyratesinSectorphi2Greater Noida",
          label:"Property Rates in Sector Phi 2 Greater Noida"
        },
        {
          key:"PropertyRatesinKulesara",
          label:"Property Rates in Kulesara"
        },
        {
          key:"PropertyRatesinSectorOmegaGreaterNoida",
          label:"Property Rates in Sector Omega Greater Noida"
        },
        {
          key:"PropertyRatesinSectorOmega1GreaterNoida",
          label:"Property Rates in Sector Omega 1 Greater Noida"
        },
        {
          key:"PropertyratesinSector-12",
          label:"Property Rates in Sector-12"
        },
      ],
      subChildren3: [{ key: "image", image: inheight }],
      },
    ],
  },
];


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
          { key: "PlotsinGreaterNoida", label: <Link to='/property'>"Plots in Greater Noida"</Link>,path:'/property' },
          { key: "ServicedApartment", label: <Link to='/property'>Serviced Apartment</Link>,path:'/property' },
          { key: "studioapartments", label: <Link to='/property'>Studio Apartments / 1 RK flats</Link>,path:'/property' },
          { key: "propertyingraternoida", label: <Link to='/property'>Property in Greater Noida</Link>, path:'/property' },
          { key: "verified", label: <Link to='/property'>Verified Property</Link>,path:'/property' },
          { key: "newprojectsingraternoida", label: <Link to='/property'>New Projects in Greater Noida</Link>,path:'/property' },
          { key: "imageBuyHome", label: <img src={inheight} alt="menu" /> },
        ],
      },
      {
        key: "LandPlot",
        label: "Land/Plot",
        children: [
          { key: "GatedCommunityPlots", label: <Link to='/property'>Gated Community Plots in Greater Noida</Link> },
          { key: "CornerPlots", label: <Link to='/property'>Corner Plots in Greater Noida</Link> },
          { key: "EastFacingPlots", label: <Link to='/property'>East Facing Plots in Greater Noida</Link> },
          { key: "FreeholdPlots", label: <Link to='/property'>Freehold Plots in Greater Noida</Link> },
          { key: "AuthorityPlots", label: <Link to='/property'>Authority Plots in Greater Noida</Link> },
          { key: "UPAVPPlots", label: <Link to='/property'>UPAVP Authority Plots in Greater Noida</Link> },
          { key: "GNIDAPlots", label: <Link to='/property'>GNIDA Authority Plots in Greater Noida</Link> },
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
          { key: "commercialProperty", label: <Link to='/property'>Commercial Property for Sale in Greater Noida</Link> },
          { key: "verifiedCommercial", label: <Link to='/property'>Verified Commercial Property in Greater Noida</Link> },
          { key: "newCommercialProjects", label: <Link to='/property'>New Commercial Projects in Greater Noida</Link> },
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
          { key: "LocalitiesinGreaterNoida", label: <Link to='/property'>Localities in Greater Noida</Link> },
          { key: "ReviewsofGreaterNoida", label: <Link to='/property'>Reviews of Greater Noida</Link> },
          { key: "TransactionPricesinGreaterNoida", label: <Link to='/property'>Transaction Prices in Greater Noida</Link> },
          { key: "PropertyRatesinGreaterNoida", label: "Property Rates in Greater Noida" },
          { key: "HomeLoanTools", label: "Home Loan Tools & More" },
          { key: "AreaUnitConverter", label: "Area Unit Converter" },
          { key: "BuildersinIndia", label: "Builders in India" },
          { key: "ViewAllInsights", label: "View All Insights" },
          { key: "imageInsights", label: <img src={inheight} alt="menu" /> },
        ],
      },
      {
        key: "articlesnews",
        label: "Articles & News",
        children: [
          { key: "articlesforbuyers", label: "Articles For Buyers" },
          { key: "realestatenews", label: "Real Estate News" },
          { key: "buyerguide", label: "Buyer Guide" },
          { key: "homeinteriorguides", label: "Home Interior Guides" },
          { key: "Policies", label: "Policies (GST, RERA, PMAY, Budget)" },
          { key: "imageArticles", label: <img src={inheight} alt="menu" /> },
        ],
      },
    ],
  },
  // ⬇️ Repeat same merging for "ForTalents", "ForOwners", "ForDealers", "Insights2"
];





export default function Navbar() {
  
  const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);


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
      <span className="text-gray-500 cursor-pointer " onClick={() => setLocationNav('All India')}>All India</span>
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
      
       if(window.scrollY > 257 || location.pathname !== '/' ){
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
  {key:"myactivty",label:<Link to='/' >My activity</Link>},
  { type: "divider" },
  { key: "logout", danger: true, label:  logout}
];

  const [open, setOpen] = useState(false);
  const [openWeb, setOpenWeb] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const isTablet = !screens.lg;
  

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
                      <Link to="/property">{sub.label}</Link>
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
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        paddingInline: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#011638",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div className="flex">
      {/* Mobile Drawer */}
  {isTablet && (
    <Button
      type="text"
      aria-label="Open navigation"
      style={{color:"whitesmoke", textAlign:'left'}}
      icon={<CgMenuLeft />}
      onClick={() => setOpen(true)}
    />
  )}
      {/* Logo */}
      <div className={`${scroll && isMobile ? 'cutit flex' : 'flex' }`}>
      <a
        href="/"
        
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        <img src={'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/real_estate-removebg-preview.png'} alt="logo" width={150} />
      </a>

      </div>

{/* <!-- Dropdown menu --> */}
 <Dropdown
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
    </Dropdown>

      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center" }}>
  {!scroll ? (
    // Show nav menu items before scrolling
    !isTablet &&
      menuItems.map((item) =>
        item.children ? (
          <Dropdown
            key={item.key}
            dropdownRender={() => getDropdownRender(item)}
            trigger={["hover"]}
          >
            <Button type="text" className="menu-btn">
              {item.label}
            </Button>
          </Dropdown>
        ) : (
          <Button key={item.key} type="text" className="menu-btn">
            {item.label}
          </Button>
        )
      )
  ) : (
    // After scrolling past banner -> show search input
    <div className={`${location.pathname === '/post-property' || location.pathname === '/postproperty' ? "hidden postHiddn" : " w-[67vw] lg:w-[50vw] mx-2 lg:me-10"}`}>
      <Custominputserchbox />
    </div>
  )}

  {/* Post Property button */}
  <Button className={`${location.pathname === '/post-property' || location.pathname === '/postproperty' ? "hidden postHiddn" : "menu-btn default-btn bg-[#011638] postPropertyNavbtn"}`}>
    <Link to="/post-property" className="px-5">
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
    <Button type="text">
      <Space>
        <Avatar size="small" className="navBtn" icon={<UserOutlined />} />
        <DownOutlined className="navBtn postPropertyNavbtn" />
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
</div>

      

      {/* Drawer for mobile */}
      <Drawer
        title="Navigation"
        placement="bottom"
        closable
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={{ padding: 0 }}
        height="100%"
        width="100%"
      >
        <Menu
          mode="inline"
          items={menuItems}
          onClick={() => setOpen(false)}
          selectedKeys={[]}
        />
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
