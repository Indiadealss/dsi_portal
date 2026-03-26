import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { toggleShortlist } from "../../api/api";
import { CiHeart } from "react-icons/ci";

const ProjectsCrousal = ({ data }) => {

    const [favurate, setFavurate] = useState(true);

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
  const createSlug = (item) => {
  if (!item?.npxid) return "";

  const locationData = parseLocation(item.location);
  const city = locationData?.[0]?.City || "";

  return `${item.label}-${city}-npxid-${item.npxid}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
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


      console.log(data,'data are property');
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      
      {/* Image */}
      <div className="relative m-5">
        <img
          src={data.img}
          alt="property"
          className="w-full h-52 md:h-56 lg:h-60 object-cover"
        />

        {/* Featured Badge */}
        <span className="absolute top-3 left-0 bg-[#e9ae01] text-white text-xs px-3 py-1 rounded-e-full cursor-pointer" onClick={GetShortList}>
          FEATURED
        </span>

        {/* Bottom Overlay */}
        {/* <div className="absolute bottom-0 left-0 w-full flex justify-between text-white text-xs px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
          <span>📅 {formatDistanceToNow(new Date(data.time), { addSuffix: true })}</span>
          <span>👤 {data.owner?.name}</span>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-4">
        
        {/* Category */}
        {/* <p className="text-green-600 text-xs font-semibold uppercase">
          {data.propertyType}, {data.property}
        </p> */}

        {/* Title */}
        <Link to={`/${createSlug(data)}?preference=S`}><h3 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-2">
          {data.label}
        </h3></Link>

        {/* Location */}
        {/* <p className="text-sm text-gray-500">{data.location}</p> */}

        
      </div>
    </div>
  );
};

export default ProjectsCrousal;