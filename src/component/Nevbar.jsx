import React, { useEffect, useState } from "react";
import logo from "../Images/logo.svg";
import { useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import inheight from "../Images/deskIn.png";
import { CgMenuLeft } from "react-icons/cg";
import {
  Grid,
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
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./Redux/userSlice";
import { getLogout } from "../api/api";
import { updateFilter } from "./Redux/filterSlice";
import Mobilenavcustombtn from "./customantdesign/Mobilenavcustombtn";
import AlertBox from "./customcomponent/AlertBox";
import LocationModal from "./LocationModel.jsx";
import { useLocationContext } from "./LocationContext.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const [open , setOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const menuItems = ["Buy", "Rent", "Services", "Resources", "Blogs"];
  const [profileOpen, setProfileOpen] = useState(false);

  const {location} = useLocationContext();

  const [locationModal, setLocationModal] = useState(false);

    const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const isTablet = !screens.lg;

    const handleLogout = async () => {
        try{
          await getLogout();
          dispatch(clearUser());
        }catch(err){
          console.error("Logout failed",err);
          
        }
      };


      const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");
  
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
};


const handleLoginmobile = () => {
  setShowLogin(true);
  setMenuOpen(false);
}

  const user = useSelector(state => state.user);
   const profileLabel = user.loggedIn ? (
    <span>{user.name}</span> //show user name
  ):(
    <Link onClick={() => setShowLogin(true)}>Login/Register</Link>
  )

  const logout = user.loggedIn ? (
     <span onClick={handleLogout} className="cursor-pointer">Log out</span>//show user name
  ):(
    ''
  )

  const megaMenuData = {
  Buy: {
    width: "w-[1000px]",
    columns: [
      {
        title: "Popular Choices",
        active: true,
        links: [

          <Link to="/ready-to-move-property-in-noida-ffid-buy-noida-ready-to-move">
            Ready to Move
          </Link>,

          <Link to="/owner-property-in-noida-ffid-buy-noida-owner">
            Owner Properties
          </Link>,

          <Link to="/budget-homes-in-noida-ffid-buy-noida-budget">
            Budget Homes
          </Link>,

          <Link to="/premium-homes-in-noida-ffid-buy-noida-premium">
            Premium Homes
          </Link>,

          <Link to="/new-projects-in-noida-pidd">
            New Projects
          </Link>,
        ],
      },

      {
        title: "Property Type",
        links: [

          <Link to="/buy-property-in-noida-ffid-buy-noida-flat">
            Flats in Noida
          </Link>,

          <Link to="/house-for-sale-in-noida-ffid-buy-noida-house">
            House for sale in Noida
          </Link>,

          <Link to="/villa-in-noida-ffid-buy-noida-villa">
            Villa in Noida
          </Link>,

          <Link to="/plot-in-noida-ffid-buy-noida-plot">
            Plot in Noida
          </Link>,

          <Link to="/office-space-in-noida-ffid-buy-noida-office">
            Office Space in Noida
          </Link>,

          <Link to="/commercial-space-in-noida-ffid-buy-noida-commercial">
            Commercial Space in Noida
          </Link>,
        ],
      },

      {
        title: "Budget",
        links: [

          <Link to="/property-under-50-lac-in-noida-ffid-buy-noida-under50lac">
            Under ₹ 50 Lac
          </Link>,

          <Link to="/property-between-50lac-1cr-in-noida-ffid-buy-noida-50lac-1cr">
            ₹ 50 Lac - ₹ 1 CR
          </Link>,

          <Link to="/property-between-1cr-1-5cr-in-noida-ffid-buy-noida-1cr-1-5cr">
            ₹ 1 CR - ₹ 1.5 CR
          </Link>,

          <Link to="/property-above-1cr-in-noida-ffid-buy-noida-above1cr">
            Above ₹ 1 CR
          </Link>,
        ],
      },

      {
        title: "Explore",
        links: [

          <Link to="/localities-in-noida-ffid-buy-noida-localities">
            Localities in Noida
          </Link>,

          <Link to="/projects-in-noida-pidd">
            Projects in Noida
          </Link>,

          <Link to="/find-agent-in-noida">
            Find an Agent
          </Link>,

          <Link to="/home-interiors-in-noida">
            Home interiors in Noida
          </Link>,
        ],
      },

      {
        title: "Buying Tools",
        links: [

          <Link to="/propworth">
            PropWorth
          </Link>,

          <Link to="/rates-and-trends">
            Rates & Trends
          </Link>,

          <Link to="/buy-vs-rent">
            Buy vs Rent
          </Link>,

          <Link to="/buying-tips-guides">
            Tips & Guides
          </Link>,
        ],
      },
    ],
  },

  Rent: {
    width: "w-[900px]",
    columns: [
      {
        title: "Popular Choices",
        active: true,
        links: [

          <Link to="/owner-rental-properties-in-noida-ffid-rent-noida-owner">
            Owner Properties
          </Link>,

          <Link to="/verified-rental-properties-in-noida-ffid-rent-noida-verified">
            Verified Properties
          </Link>,

          <Link to="/furnished-homes-in-noida-ffid-rent-noida-furnished">
            Furnished Homes
          </Link>,

          <Link to="/bachelor-friendly-homes-in-noida-ffid-rent-noida-bachelor">
            Bachelor Friendly Homes
          </Link>,

          <Link to="/immediately-available-homes-in-noida-ffid-rent-noida-immediate">
            Immediately Available
          </Link>,
        ],
      },

      {
        title: "Property Type",
        links: [

          <Link to="/flats-for-rent-in-noida-ffid-rent-noida-flat">
            Flats for rent in Noida
          </Link>,

          <Link to="/house-for-rent-in-noida-ffid-rent-noida-house">
            House for rent in Noida
          </Link>,

          <Link to="/villa-for-rent-in-noida-ffid-rent-noida-villa">
            Villa for rent in Noida
          </Link>,

          <Link to="/pg-in-noida-ffid-rent-noida-pg">
            PG in Noida
          </Link>,

          <Link to="/office-space-for-rent-in-noida-ffid-rent-noida-office">
            Office Space in Noida
          </Link>,

          <Link to="/commercial-space-for-rent-in-noida-ffid-rent-noida-commercial">
            Commercial Space in Noida
          </Link>,

          <Link to="/coliving-space-in-noida-ffid-rent-noida-coliving">
            Coliving space in Noida
          </Link>,

          <Link to="/student-hostel-in-noida-ffid-rent-noida-hostel">
            Student Hostel in Noida
          </Link>,

          <Link to="/luxury-pg-in-noida-ffid-rent-noida-luxury-pg">
            Luxury PG in Noida
          </Link>,
        ],
      },

      {
        title: "Budget",
        links: [

          <Link to="/rent-property-under-10000-in-noida-ffid-rent-noida-under10k">
            Under ₹ 10,000
          </Link>,

          <Link to="/rent-property-between-10k-15k-in-noida-ffid-rent-noida-10k-15k">
            ₹ 10,000 - ₹ 15,000
          </Link>,

          <Link to="/rent-property-between-15k-25k-in-noida-ffid-rent-noida-15k-25k">
            ₹ 15,000 - ₹ 25,000
          </Link>,

          <Link to="/rent-property-above-25k-in-noida-ffid-rent-noida-above25k">
            Above ₹ 25,000
          </Link>,
        ],
      },

      {
        title: "Explore",
        links: [

          <Link to="/rent-localities-in-noida-ffid-rent-noida-localities">
            Localities
          </Link>,

          <Link to="/buy-vs-rent">
            Buy Vs Rent
          </Link>,

          <Link to="/find-agent-in-noida">
            Find an Agent
          </Link>,

          <Link to="/share-requirement">
            Share Requirement
          </Link>,
        ],
      },
    ],
  },

  Sell: {
    width: "w-[650px]",
    columns: [
      {
        title: "For Owner",
        active: true,
        links: [

          <Link to="/post-property">
            Post Property
          </Link>,

          <Link to="/mybrandsdoor">
            My Dashboard
          </Link>,
        ],
      },

      {
        title: "For Agent & Builder",
        links: [

          <Link to="/mybrandsdoor">
            My Dashboard
          </Link>,

          <Link to="/responses">
            Enquiries
          </Link>,
        ],
      },

      {
        title: "Selling Tools",
        links: [

          <Link to="/property-valuation">
            Property Valuation
          </Link>,

          <Link to="/find-agent-in-noida">
            Find an Agent
          </Link>,
        ],
      },
    ],
  },

  Help: {
    width: "w-[650px]",
    columns: [],
  },
};


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

  return (
    <header className="w-full shadow-md sticky top-0 z-50">

      {/* 🔷 TOP NAVBAR */}
      <div className="bg-[#001A2D] text-white">
        <div className=" mx-auto px-2 md:px-[100px]  py-[11px] flex items-center justify-between">

          {/* Logo */}
          <div className="text-lg font-bold tracking-wide">
            <a
        href="/"
        
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
 <img src="https://d3eoh63gynpjzh.cloudfront.net/logo.svg" alt="BRANDSDOOR"  width={180} className="mt-[0.2px]" />
 </a>
          </div>

          {/* Location (Desktop only) */}
          <div
  onClick={() => setLocationModal(true)}
  className="md:flex items-center gap-1 cursor-pointer text-[large] flex"
>
  {location}
  <FaChevronDown size={12} />
</div>

          

          {/* Right Side */}
          {/* Right Side */}
<div className="hidden md:flex items-center gap-4">
  {user.loggedIn ? (
    <div className="relative">
  <div
    className="flex items-center gap-3 cursor-pointer"
    onClick={() => setProfileOpen(!profileOpen)}
  >
    {/* Profile Circle */}
    <div className="w-10 h-10 rounded-full bg-white text-[#001A2D] flex items-center justify-center font-bold text-sm uppercase shadow-md">
      {getInitials(user.name)}
    </div>

    {/* Name */}
    <span className="text-sm font-medium text-white">
      {user.name}
    </span>

    <FaChevronDown
      size={12}
      className={`transition-all duration-300 ${
        profileOpen ? "rotate-180" : ""
      }`}
    />
  </div>

  {/* Dropdown */}
  {profileOpen && (
    <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-2xl border py-2 z-50">

      {profileItems.map((item, index) => {

        if (item.type === "divider") {
          return (
            <div
              key={index}
              className="border-t my-2"
            />
          );
        }

        return (
          <div
            key={item.key || index}
            className={`px-4 py-2 hover:bg-gray-100 text-sm ${
              item.danger ? "text-red-500" : "text-gray-700"
            }`}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  )}
</div>
  ) : (
    <Link to='/login'>Login</Link>
  )}

  <Link
    className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium"
    to="/post-property"
  >
    Post Property
  </Link>
</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* 🔷 BOTTOM NAVBAR (Desktop) */}
      <div className="bg-white hidden md:block">
         <div className="max-w-7xl mx-auto px-4  flex justify-center gap-10 text-gray-700 font-medium">

            {Object.entries(megaMenuData).map(([menu, data]) => (
              <div key={menu} className="group relative">

                {/* MENU TITLE */}
                <div
  className={`flex items-center gap-1 py-2 ${
    data.columns?.length > 0
      ? "cursor-pointer hover:text-blue-400"
      : "cursor-default"
  }`}
>
  {menu}

  {data.columns?.length > 0 && (
    <FaChevronDown size={12} />
  )}
</div>

                {/* MEGA MENU */}
                {data.columns?.length > 0 && (
  <div
    className={`absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:flex ${data.width} bg-white text-black shadow-2xl rounded-md p-6 z-50`}
  >
                  {data.columns?.map((col, idx) => (
                    <div key={idx} className="min-w-[180px] px-4">

                      <h3
                        className={`text-[15px] font-semibold mb-3 inline-block border-b-2 pb-1 ${
                          col.active
                            ? "border-gray-500"
                            : "border-gray-500"
                        }`}
                      >
                        {col.title}
                      </h3>

                      <ul className="space-y-2">
                        {col.links.map((link, i) => (
                          <li
                            key={i}
                            className="text-[14px] text-gray-700 hover:text-blue-600 cursor-pointer whitespace-nowrap"
                          >
                            {link}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                )}
              </div>
            ))}

            <div>
              <input type="text" className="hidden h-[-webkit-fill-available] border-s-1 border-gray-500" />
            </div>
          </div>
      </div>

      {/* 🔷 MOBILE MENU */}
       {/* 🔷 MOBILE MENU */}
      {menuOpen && (
  <div className="md:hidden fixed top-[50px] w-[80vw] right-0 h-[calc(90vh-58px)] bg-[#efefef] z-50 flex flex-col">

    {/* Top Buttons */}
    {/* Top Section */}
<div className="bg-[#c9d7e3] px-4 py-3">

  {user.loggedIn ? (

    <div className="flex items-center gap-3">

      {/* Profile Circle */}
      <div className="w-10 h-10 rounded-full bg-white text-[#001A2D] flex items-center justify-center font-bold text-sm uppercase shadow-md">
        {getInitials(user.name)}
      </div>

      {/* User Name */}
      <div>
        <p className="text-sm font-semibold text-[#0d2235]">
          {user.name}
        </p>

        <button
          onClick={handleLogout}
          className="text-xs text-red-500"
        >
          Logout
        </button>
      </div>

    </div>

  ) : (

    <div className="flex items-center">

         <Link to='/login' onClick={() => setMenuOpen(false)} className="text-[12px] text-[#0d2235] font-medium pr-6 border-r border-[#6c7a86]">Login</Link>


      <Link
        to="/post-property"
        className="text-[12px] text-[#0d2235] font-medium pl-6"
      >
        POST PROPERTY
      </Link>

    </div>

  )}
</div>

    {/* Menu List */}
    <div className="flex-1 px-4 bg-[#efefef]">

      {menuItems.map((menu, index) => (
        <div
          key={index}
          className="border-b border-gray-300"
        >
          <button
            onClick={() =>
              setOpen(open === menu ? null : menu)
            }
            className="w-full flex items-center justify-between py-3 text-[14px] text-[#23364B]"
          >
            {menu}

            <FaChevronDown
              size={11}
              className={`transition-all duration-300 ${
                open === menu ? "rotate-180" : ""
              }`}
            />
          </button>

          {open === menu && (
            <div className="pb-3 pl-2">

              {megaMenuData[menu]?.columns?.map((col, idx) => (
                <div key={idx} className="mb-4">

                  <h4 className="text-[13px] font-semibold text-[#2F80ED] mb-2">
                    {col.title}
                  </h4>

                  <ul className="space-y-2">
                    {col.links?.map((link, i) => (
                      <li
                        key={i}
                        className="text-[13px] text-gray-700"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>

                </div>
              ))}

            </div>
          )}
        </div>
      ))}

    </div>

    {/* Footer Social */}
    <div className="bg-[#c9d7e3] px-4 py-3">

      <p className="text-[13px] text-[#23364B] mb-3">
        Follow Us
      </p>

      <div className="flex items-center gap-4">

        <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-[#4267B2] text-sm">
          f
        </div>

        <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-pink-500 text-sm">
          <i className="ri-instagram-line"></i>
        </div>

        <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-[#0077B5] text-sm">
          in
        </div>

        <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-red-500 text-sm">
          ▶
        </div>

      </div>
    </div>
  </div>
)}

<LocationModal
  open={locationModal}
  onClose={() => setLocationModal(false)}
/>

      {isMobile ? (
  <Mobileloginmodal open={showLogin} onClose={() => setShowLogin(false)} />
) : (
  <Login open={showLogin} onClose={() => setShowLogin(false)} />
)}
    </header>
  );
};

export default Navbar;