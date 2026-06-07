import { useEffect, useState } from "react";
import UnitDrawer from "./UnitDrawer";
import computerTable from '../../Images/computerTable.avif';
import shop from '../../Images/shops.svg';
import studio from '../../Images/studio_appartment.svg';
import office from '../../Images/offices.svg';

export default function Emiloan({ propertys }) {


  return (
    <div className="">
      <div className={`flex  gap-6`}>

        {units.map((u, idx) => (
          <div key={idx} className="p-5 w-[100%] md:w-[35%] rounded ">
            <div className="flex items-center gap-3">
              <img src={studio} className={u.name === "studio" ? "w-10 h-10" : "hidden"} />
              <img src={shop} className={u.name === "Shop" ? "w-10 h-10" : "hidden"} />
              <img src={office} className={u.name === "Offices" ? "w-10 h-10" : "hidden"} />
              <h4 className="font-normal text-lg"><span className="font-medium text-sm">{u.name}</span></h4>
            </div>

            <div className="mt-4 space-y-2">
              {u.items.slice(0, 2).map((item, i) => (
                <div className="border-b border-gray-300 pb-3">
                  <div>

                  </div>
                  <div key={i} className="pt-3  flex justify-between">

                    <div className="text-xs">
                      <p className="font-medium"><span className="text-sm">{item.area} sq.ft.</span></p>
                      <p className="text-gray-500"><span className="text-xs">{toSqm(item.area)} sq.m.</span></p>
                    </div>


                    <div className="text-right text-xs">
                      <p className="font-semibold"><span className="text-xs">₹ {formatCr(item.price)}</span></p>
                      <span className="text-gray-500 text-xs">Onwards</span>
                    </div>


                  </div>
                  {/* <p className="text-gray-500 mb-5"><span className="text-xs font-medium">Possession from Aug, 2028</span></p> */}
                </div>
              ))}
            </div>

            <button
              onClick={() => openOptions(u)}
              className="text-blue-600 mt-4 hover:underline cursor-pointer"
            >
              <span className={`${u.items.length - 2 > 0 ? '' : 'hidden'}`}>+ {u.items.length - 2}  More options</span>
              <span className={`${u.items.length - 2 > 0 ? 'hidden' : ''}`}> View all unit options</span>
            </button>
          </div>
        ))}

        {/* Drawer */}
        {openDrawer && (
          <UnitDrawer unit={activeUnit} close={() => setOpenDrawer(false)} />
        )}
      </div>
    </div>
  );
}
