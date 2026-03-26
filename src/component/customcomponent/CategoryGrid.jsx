import React from "react";

const CategoryGrid = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-100">

      {/* 🔥 FIXED GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-2 lg:h-[650px]">

        {/* Apartment (BIG LEFT) */}
        <div className="relative lg:col-span-2 lg:row-span-2  overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* <div className="absolute top-5 left-5 text-white">
            <h3 className="text-2xl font-bold">Apartment</h3>
            <p>7 Properties</p>
          </div> */}
        </div>

        {/* House */}
        <div className="relative  overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* <div className="absolute top-5 left-5 text-white">
            <h3 className="text-xl font-bold">House</h3>
            <p>7 Properties</p>
          </div> */}
        </div>

        {/* Restaurant */}
        <div className="relative  overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* <div className="absolute top-5 left-5 text-white">
            <h3 className="text-xl font-bold">Restaurant</h3>
            <p>5 Properties</p>
          </div> */}
        </div>

        {/* Villa (RIGHT BIG - IMPORTANT FIX) */}
      <div className="relative lg:col-start-3 lg:row-start-2 lg:row-span-2 lg:col-span-2  overflow-hidden group">
  
  <img
    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    className="w-full h-full object-cover object-center transition duration-700 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

  {/* <div className="absolute top-5 left-5 text-white z-10">
    <h3 className="text-2xl font-bold">Villa</h3>
    <p>7 Properties</p>
  </div> */}
</div>

        {/* Bar */}
        <div className="relative  overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* <div className="absolute top-5 left-5 text-white">
            <h3 className="text-xl font-bold">Bar</h3>
            <p>8 Properties</p>
          </div> */}
        </div>

        {/* Farm */}
        <div className="relative  overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* <div className="absolute top-5 left-5 text-white">
            <h3 className="text-xl font-bold">Farm</h3>
            <p>5 Properties</p>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default CategoryGrid;