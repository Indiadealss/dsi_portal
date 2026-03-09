import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getresponsebyid } from "../../api/api";
import { useParams } from "react-router-dom";
import ResponseList from "./ResponseList";

const DynamicresponseallListing = () => {

  const location = useLocation();
  const property = location.state;

  const [page,setPage] = useState('1');
const [limit,setLimit] = useState('2');
const [data,setData] = useState([])

const { id } = useParams();
console.log(id);



  useEffect(() => {
  if (!id) return;

  const fetchProperties = async () => {
    try {
      const res = await getresponsebyid(id, page, limit);

      if (res.status === 200) {
        const properties = res.data;
        setData(properties.leads)
        console.log(properties);
        
      }

    } catch (err) {
      console.log(err);
    }
  };

  fetchProperties();

}, [id,page, limit]);
  
  if (!property) {
    return <p>No Property Data</p>;
  }

  return (
    <div>
    <div className="shadow-md p-4 rounded-md bg-gray-50">

      <h2 className="font-bold text-lg">{property.title}</h2>

      <p className="text-gray-600 text-sm">
        Price: ₹{property.price} | Carpet Area: {property.carpetArea} sq.ft.
      </p>

      <div className="flex gap-3 text-sm mt-2">
        <span className="text-gray-700 uppercase">
          {property.spid}
        </span>

        <span className="text-red-500">
          {property.status}
        </span>

        <span>
          Posted On: {new Date(property.createdAt).toLocaleDateString()}
        </span>
      </div>

    </div>
    <ResponseList data={data} />
    </div>
  );
};

export default DynamicresponseallListing;