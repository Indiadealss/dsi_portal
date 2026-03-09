import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DynamicresponseallListing from "./DynamicresponseallListing";

const Dynameiclistingallprodects = ({ properties }) => {

    const navigate = useNavigate();

  const response = (id, item) => {
  navigate(`/mybrandsdoor/all_listings/responce/${id}`, {
    state: item
  });
};

    
  return (
    <div className="space-y-4">

      {properties?.map((item) => (
        <div key={item.id} className="shadow-md p-4 rounded-md bg-gray-50">

          {/* Title */}
          <h4 className="cursor-pointer" onClick={() => response(item.id,item)}>
            <span className="font-bold text-gray-600 text-sm">{item.title}</span>
          </h4>

          {/* Price + Area */}
          <p className="text-gray-600 text-sm">
            Price: ₹{item.price} | Carpet Area: {item.carpetArea} sq.ft.
          </p>

          {/* Property Info */}
          <div className="flex gap-3 text-sm mt-2">
            <span className="text-gray-700 uppercase">
              {item.spid}
            </span>

            <span className="text-red-500">
              {item.status}
            </span>

            <span>
              Posted On: {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Expiry */}
          {/* <p className="text-sm mt-1">
            Expiry On: {new Date(item.expiryDate).toLocaleDateString()}
          </p> */}

          {/* Views
          <div className="text-right text-sm text-gray-500">
            Summary view: {item.summaryView} &nbsp;
            Details view: {item.detailsView}
          </div> */}

        </div>
      ))}

    </div>
  );
};

export default Dynameiclistingallprodects;