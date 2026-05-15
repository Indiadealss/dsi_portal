import React from 'react';
import { Layout, MessageSquare, Search, ArrowUpRight } from 'lucide-react';
import one from '../../Images/masterRender.jpg';
import two from '../../Images/masterFor.jpg';
import three from '../../Images/masterTwo.jpg';
import Square from '../../Images/NoFakeGroup.svg';
import messageSquare from '../../Images/Group.svg';
import layout from '../../Images/Group20.svg';

const BrandsDoorSection = () => {
  return (
    <section className="mt-[100px]">
      <h4 className="text-3xl font-bold text-[#001f3f]  tracking-wide mb-[30px]">
        WHY BRANDSDOOR IS THE RIGHT CHOICE
      </h4>

      <div className="flex flex-col md:flex-row justify-between gap-12 items-start">
        
        {/* Left Side: Feature Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg h-10vw">
          {/* Card 1 */}
          <div className="bg-[#e1ecf7] px-8 rounded-xl flex flex-col items-center min-h-[150px] justify-center">
            <img src={Square} alt="No Fake" className="w-8 h-8 mb-4" />
            <p className="text-xs w-full font-semibold text-slate-800">No fake or duplicate properties</p>
          </div>

          {/* Card 2 - Dark */}
          <div className="bg-[#001529] px-8 rounded-xl flex flex-col items-center text-center min-h-[150px] justify-center text-white">
            <img src={messageSquare} alt="No Fake" className="w-8 h-8 mb-4 text-white" />
            {/* Text is missing in your image for this card, added placeholder or leave blank */}
          </div>

          {/* Card 3 */}
          <div className="bg-[#e1ecf7] px-8 rounded-xl flex flex-col items-center  min-h-[150px] justify-center">
              <img src={layout} alt="No Fake" className="w-8 h-8 mb-4" />
            <p className="text-xs font-semibold text-slate-800">Better conversion, less spam</p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#e1ecf7] px-8 rounded-xl flex flex-col items-center text-center min-h-[150px] justify-center">
            <Search className="w-8 h-8 mb-4 text-slate-700" />
            <p className="text-sm font-semibold text-slate-800">Find exactly what you need, faster</p>
          </div>
        </div>

        {/* Right Side: Image Collage */}
        <div className="relative grid grid-cols-2 gap-3 w-full max-w-2xl">
          {/* Top Span Image */}
          <div className="col-span-2 shadow-md">
            <img 
              src={three} 
              alt="Modern Arch" 
              
              className="w-full h-48  obeject-bottom rounded-md "
            />
          </div>
          
          {/* Bottom Left Image */}
          <div className="h-48 shadow-md">
            <img 
              src={two} 
              alt="Skyscrapers" 
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Bottom Right Image */}
          <div className="h-84 shadow-md"> {/* Negative margin to create the staggered overlap effect */}
            <img 
              src={one} 
              alt="High-rise" 
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Floating Circular Badge */}
          <div className="absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-34 h-34 bg-[#001529] rounded-full p-8 flex items-center justify-center">
              <ArrowUpRight className="text-white w-10 h-10" />
              {/* Rotating text would go here - simplified for basic CSS */}
              <div className="absolute inset-0 animate-[spin_18s_linear_infinite]">
                 <svg viewBox="0 0 100 100" className="w-full h-full p-1">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[10px] fill-white uppercase tracking-tighter">
                    <textPath xlinkHref="#circlePath" startOffset="0%" textLength="230"  lengthAdjust="spacing">Brandsdoor . Brandsdoor . Brandsdoor .</textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandsDoorSection;