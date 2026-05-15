"use client";

import { ArrowRight } from "lucide-react";

const propertyData = [
  {
    title: "Residential Homes",
    desc: "Apartments, villas & builder floors for modern living",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Commercial Spaces",
    desc: "Offices, shops & high-return investment spaces",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Plots & Land",
    desc: "Secure land for your future and build your vision",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Luxury Properties",
    desc: "Premium homes with world-class lifestyle amenities",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CategoriesProperties() {
  return (
    <section className="w-full mt-[100px]">
      <div className="">
        {/* Heading */}
        <h2 className=" text-2xl font-extrabold uppercase tracking-tight text-[#08233c] sm:text-4xl lg:text-6xl mb-[30px]">
          <span className=" text-2xl font-extrabold uppercase  text-[#08233c] sm:text-4xl lg:text-4xl">FIND YOUR PERFECT DOOR</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {propertyData.map((item, index) => (
            <div key={index} className="group">
              {/* Image Card */}
              <div className="relative overflow-hidden rounded-lg ">
                {/* Image */}
                <div className="relative h-[250px] sm:h-[260px] lg:h-[250px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0  transition duration-500 group-hover:bg-black/40" />

                {/* Hover Button */}
                <div
                  className="
                    absolute bottom-4 left-1/2 w-[85%]
                    -translate-x-1/2 translate-y-20
                    opacity-0 transition-all duration-500
                    group-hover:translate-y-0
                    group-hover:opacity-100

                    md:bottom-5
                  "
                >
                  <button
                    className="
                      flex w-full items-center justify-center gap-2
                      rounded-xl bg-gradient-to-r
                      from-blue-600 to-blue-500
                      px-5 py-3
                      text-sm font-semibold uppercase tracking-wide
                      text-white shadow-xl
                      transition hover:from-blue-700 hover:to-blue-600
                    "
                  >
                    Explore Now
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Mobile Always Visible Button */}
                <div className="absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 md:hidden">
                  <button
                    className="
                      flex w-full items-center justify-center gap-2
                      rounded-xl bg-gradient-to-r
                      from-blue-600 to-blue-500
                      px-5 py-3
                      text-sm font-semibold uppercase tracking-wide
                      text-white 
                    "
                  >
                    Explore Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mt-4 px-1">
  <h4 className="text-xl font-semibold text-[#08233c] leading-tight">
    {item.title}
  </h4>

  <p className="mt-1 text-xs text-gray-600 font-semibold leading-relaxed">
    {item.desc}
  </p>
</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}