import React from "react";

const dealers = [
  {
    name: "Mayra Homes",
    logo: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/299496974O-1622789292915.jpeg",
    badges: ["RERA Registered", "Property Advisor"],
  },
  {
    name: "HOUZEE",
    logo: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/299496974O-1622789292915.jpeg",
    badges: ["RERA Registered", "Property Advisor"],
  },
  {
    name: "Abrade Realty",
    logo: "/abrade.png",
    badges: ["RERA Registered", "Builder Approved"],
  },
];

const DealerCards = () => {
  return (
    <div className="w-full h-[30vw] py-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dealers.map((d, i) => (
        <div
          key={i}
          className="rounded-xl bg-red-300 bg-gradient-to-b from-slate-200/40 to-slate-50 shadow-lg flex flex-col justify-between"
          style={{backgroundImage:"url('https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/saller.svg')",backgroundSize:'cover'}}
        >
          {/* badges */}
          <div className="flex flex-col mb-4">
            {d.badges.map((b, j) => (
              <span
                key={j}
                className="bg-yellow-600 w-40 text-white text-xs font-semibold px-3 py-1 my-2 whitespace-nowrap"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Illustration */}
          <div className="relative mb-4">
            <div className="w-16 h-16 absolute object-cover top-20 left-5 rounded-full bg-white shadow-md flex items-center justify-center">
              <img
                src={d.logo}
                alt={d.name}
                className="w-16 h-16 object-contain bg-white rounded-full"
              />
            </div>
          </div>

          {/* Name */}
          <div className="relative">
          <h2 className="text-center absolute object-cover top-12 left-2 text-lg font-semibold text-gray-800 mb-4">
            {d.name}
          </h2>
          </div>

          {/* Button */}
          <button className="w-[80%] mx-auto my-4 bg-white cursor-pointer hover:bg-blue-700 text-blue-500 py-2 rounded-xl font-medium transition">
            View Number
          </button>
        </div>
      ))}
    </div>
  );
};

export default DealerCards;
