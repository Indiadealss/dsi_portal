import React from 'react';
// Agar aapke paas lucide-react nahi hai, toh install karein: npm install lucide-react
import { Building2, Layers, DoorOpen } from 'lucide-react';

const ProjectStats = () => {
  const stats = [
    {
      id: 1,
      icon: <Building2 size={48} strokeWidth={1} />,
      value: "7",
      label: "Total No. of Towers",
    },
    {
      id: 2,
      icon: <Layers size={48} strokeWidth={1} />,
      value: "25",
      label: "Total No. of Floors",
    },
    {
      id: 3,
      icon: <DoorOpen size={48} strokeWidth={1} />,
      value: "518",
      label: "Total Flats",
    },
  ];

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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