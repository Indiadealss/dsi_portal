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
  Dropdown,
  Avatar,
  Space,
} from "antd";
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
    label: "For Talents",
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



export default function Navbar() {

  const location = useLocation();

  const [scroll,setScroll] = useState(false);


  useEffect(() => {
    
    
    const handleScroll = () => {
      console.log(window.scrollY);
      
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
  const profileItems = [
  { key: "profile", label: <Link onClick={() => setShowLogin(true)}>Login/Register</Link> },
  {key:"myactivty",label:<Link to='/' >My activity</Link>},
  { type: "divider" },
  { key: "logout", danger: true, label: "Log out" },
];

  const [open, setOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

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
      {/* Logo */}
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        <img src={logo} alt="logo" width={150} />
      </a>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center" }}>
  {!scroll ? (
    // Show nav menu items before scrolling
    !isMobile &&
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
    <div className={`${location.pathname === '/post-property' || location.pathname === '/postproperty' ? "hidden postHiddn" : "hidden lg:block lg:w-[50vw] me-10"}`}>
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

  {/* Mobile Drawer */}
  {isMobile && (
    <Button
      type="text"
      aria-label="Open navigation"
      icon={<MenuOutlined />}
      onClick={() => setOpen(true)}
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
    </Header>
    {isMobile ? (
  <Mobileloginmodal open={showLogin} onClose={() => setShowLogin(false)} />
) : (
  <Login open={showLogin} onClose={() => setShowLogin(false)} />
)}
    </>
  );
}
