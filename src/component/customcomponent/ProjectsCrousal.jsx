import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { toggleShortlist } from "../../api/api";
import { CiHeart } from "react-icons/ci";
import locationPinIcon from "../../Images/location.png";
import resB from "../../Images/resB.png";
import sizeicon from "../../Images/sizeIcon.png"

const ProjectsCrousal = ({ data }) => {

    const [favurate, setFavurate] = useState(true);

    console.log("data in crousal", data);

     const parseLocation = (location) => {
  if (typeof location === "string") {
    try {
      return JSON.parse(location);
    } catch {
      return null;
    }
  }
  return location;
};

const getSector = (address) => {
  if (!address) return "";

  const match = address.match(/Sector\s*\d+/i);
  return match ? match[0] : "";
};
  const createSlug = (item) => {
  if (!item?.npxid) return "";

  const locationData = parseLocation(item.location);
  const city = locationData?.[0]?.City || "";

  return `${item.label}-${city}-npxid-${item.npxid}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};


const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
 const GetShortList = async () => {
    try {
    const { data } = await toggleShortlist(user?.id, propertys?._id);

    if (data.success) {
      setFavurate((prev) => !prev);
      console.log(data.message);
    }

  } catch (error) {
    console.error(error.response?.data || error.message);
  }
    
  }

  


  return (
    <div className="relative rounded-lg m-1 overflow-hidden group">

  {/* Image */}
  <img
    src={data.img}
    alt="property"
    className="w-[-webkit-fill-available] h-[90vw] md:h-64 lg:h-[310px] object-cover   rounded-lg"
  />

  {/* Price Badge */}
  <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-sm font-semibold px-2 py-1 rounded shadow">
    ₹{data.price?.toLocaleString()}
  </div>

  {/* Heart Icon */}
  <div
    onClick={GetShortList}
    className="absolute top-2 right-2 bg-black/40 backdrop-blur-md backdrop-blur-md rounded-full p-1 cursor-pointer"
  >
    {favurate ? (
      <CiHeart className="text-white text-lg" />
    ) : (
      <FaHeart className="text-white text-lg" />
    )}
  </div>

  {/* Bottom Glass Overlay */}
  <div className="absolute bottom-0 w-[full]  left-0 right-0 pb-[8px] px-[8px] bg-black/40 backdrop-blur-md text-white rounded-b-lg">

    {/* Title */}
    <p className="text-lg font-semibold leading-tight">
      <span className="w-full text-sm font-medium leading-tight truncate whitespace-nowrap">{data.label}</span>
    </p>

    {/* Location (FIXED ERROR HERE) */}
    <p className="text-sm text-gray-200 flex items-center gap-1 mt-1">
      <img src={locationPinIcon} alt="Location"  />
      {getSector(data.location[0]?.Address) && <span className="font-normal text-xs">{getSector(data.location[0]?.Address)}, </span>} <span className="font-normal text-xs">{data.location[0]?.City}</span>
    </p>

    {/* Details */}
    <div className={capitalizeFirst(data.property) === "Residential" ? "flex justify-between text-sm mt-2 text-gray-200" : "hidden"}>
      <div className="flex flex-row justify-between text-xs"><img src={resB} alt="BHK" className="w-[12px] h-[12px] me-2" /> {data.bhk}</div>
      <div className="flex flex-row justify-between text-xs"><img src={sizeicon} alt="Size" className="w-[12px] h-[12px]  me-2" /> {data.size}</div>
    </div>

    {/* Residental Commercial */}
      <div className={capitalizeFirst(data.property) === "Commercial" ? "flex justify-between text-sm mt-2 text-gray-200" : "hidden"}>
      <div className="flex flex-row justify-between text-xs"><img src={sizeicon} alt="Size" className="w-[12px] h-[12px] me-2" /> {data.size}</div>
    </div>

    {/* Button */}
    <div className="mt-3 mx-auto">
      <Link
        to={`/${createSlug(data)}`}
        className="block  text-center bg-white text-sm text-gray-800 hover:bg-[#2f80ed] hover:text-white font-medium py-[5px] rounded transition duration-300"
      >
        Explore Now
      </Link>
    </div>
  </div>

  {/* Property Type Tag */}
  <div className="absolute bottom-30 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-4 py-1 rounded ">
    {capitalizeFirst(data.property)}
  </div>

</div>
  );
};

export default ProjectsCrousal;