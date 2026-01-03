import { useEffect, useState } from "react";
import UnitDrawer from "./UnitDrawer";
import computerTable from '../../Images/computerTable.avif';
import shop from '../../Images/shop.jpeg'

export default function Unitsavailble({ propertys }) {

  const unit = [
    {
      name: "Offices",
      icon: computerTable,
      items: [
        { area: 914, price: 13900000 },
        { area: 975, price: 14800000 }
      ]
    },
    {
      name: "Shop",
      icon: shop,
      items: [
        { area: 615, price: 17900000 }
      ]
    }
  ];

  const [units, setUnits] = useState([]);





  useEffect(() => {
    if(typeof(propertys.officeUnits) === 'string'){
            const uni = JSON.parse(propertys.officeUnits);
            setUnits([uni])
        }else{
            setUnits([propertys.officeUnits])
        }
    console.log(units.map((u) => u));
  }, [])

  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeUnit, setActiveUnit] = useState(null);

  const formatCr = (value, decimals = 2, suffix = "cr onwards") => {
    if (value == null || isNaN(value)) return "";

    const num = Number(value);
    const ONE_CRORE = 1e7;
    const ONE_LAKH = 1e5;

    if (num >= ONE_CRORE) {
      const val = +(num / ONE_CRORE).toFixed(decimals);
      return `${val} ${suffix}`;
    }

    if (num >= ONE_LAKH) {
      const val = +(num / ONE_LAKH).toFixed(decimals);
      return `${val} L onwards`;
    }

    return num.toLocaleString("en-IN");
  };

  const openOptions = (unit) => {
    setActiveUnit(unit);
    setOpenDrawer(true);
  };

  const toSqm = (sqft) => (sqft * 0.092903).toFixed(2);

  return (
    <div className="my-20">
      <h2 className="my-10">Investment Options In {propertys.projectname}</h2>
      <div className={`flex  gap-6`}>

        {units.map((u, idx) => (
          <div key={idx} className="p-5 w-[100%] md:w-[35%] rounded shadow">
            <div className="flex items-center gap-3">
              <img src={u.icon} className="w-10 h-10" />
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
                  <p className="text-gray-500 mb-5"><span className="text-xs font-medium">Possession from Aug, 2028</span></p>
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
