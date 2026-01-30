import React from 'react'

export const DealerCard = ({ item }) => {
  return (
    <div className=" rounded-md p-4 space-y-3 bg-white">
      
      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Column 1 */}
        <div className="text-sm">
          <span className="font-semibold">Dealing in:</span>{" "}
          <span>{item.dealingIn}</span>
        </div>

        {/* Column 2 */}
        <div className="text-sm space-y-0.5">
          <p><span className="font-semibold">Posted on:</span> {item.postedOn}</p>
          <p><span className="font-semibold">Expiry on:</span> {item.expiryOn}</p>
          <p><span className="font-semibold">Summary Views:</span> {item.summaryViews}</p>
          <p><span className="font-semibold">Detail Views:</span> {item.detailViews}</p>
          <p><span className="font-semibold">Click to Views:</span> {item.clickToViews}</p>
        </div>

        {/* Column 3 */}
        <div className="text-sm space-y-0.5">
          <p>
            <span className="font-semibold">Campaign Type:</span> {item.campaignType}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className={item.status === "Active" ? "text-green-600" : "text-red-600"}>
              {item.status}
            </span>
          </p>
        </div>
      </div>

      <hr className='text-gray-300'/>

      {/* Actions */}
      <div className="flex gap-4 text-sm text-blue-500 cursor-pointer">
        <button className='cursor-pointer'>Preview</button>
        <button className='cursor-pointer'>Report issue</button>
        <button className='cursor-pointer'>Request for Upgrade</button>
      </div>
    </div>
  );
};
