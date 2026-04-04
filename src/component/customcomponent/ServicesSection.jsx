import { FaHome, FaTools, FaBuilding } from "react-icons/fa";
import ourServiceSection from '../../Images/imgOurService.png'

export default function ServicesSection() {
  const services = [
    {
      icon: <FaHome />,
      title: "Renting and Selling Services",
      desc: "Connecting sellers with buyers, and homeowners with renters."
    },
    {
      icon: <FaTools />,
      title: "Property Management",
      desc: "Common area maintenance & housekeeping management."
    },
    {
      icon: <FaBuilding />,
      title: "Property Listing",
      desc: "Showcasing upcoming projects on our dedicated property listing platform."
    }
  ];

  return (
    <section className=" py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT IMAGE */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="absolute w-[80%] h-[90%] bg-gray-200 top-6 left-6 hidden md:block"></div>

          <img
            src={ourServiceSection} // <-- replace with your image
            alt="family"
            className="relative z-10 w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] object-contain"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* Heading */}
          <div className="mb-6">
            <div className="w-6 h-6 border-t-2 border-l-2 border-lime-500 rotate-45 mb-3"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              OUR SERVICES
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              How May We Help You Today?
            </p>
          </div>

          <p className=" text-gray-500 mb-8 leading-relaxed">
            With years of experience in the industry, we bring a diverse range of expert services to meet all your real estate needs.
          </p>

          {/* Services List */}
          <div className="space-y-6">
            {services.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-lime-500 text-lime-500 text-xl shrink-0">
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className=" text-gray-500 text-sm mt-1">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}