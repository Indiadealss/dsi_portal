import React from 'react';
// Agar aapke paas lucide-react nahi hai, toh install karein: npm install lucide-react


const ProjectStats = ({stats, gridColumns = 6}) => {
  

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-8xl mx-auto px-1">
        <div className={`grid grid-cols-1 md:grid-cols-${gridColumns} gap-8`}>
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="text-[#c8c895] mb-4">
                {stat.icon}
              </div>
              
              {/* Value */}
              <h3 className="text-4xl font-bold text-gray-600 mb-1">
                {stat.value}
              </h3>
              
              {/* Label */}
              <p className="text-lg text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;