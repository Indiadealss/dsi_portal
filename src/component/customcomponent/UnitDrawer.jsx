import { useState } from "react";
import Leadgentaionform from "./Leadgentaionform";

export default function UnitDrawer({ unit, close }) {
  const formatCr = (n) => `${(n / 1e7).toFixed(2)} Cr`;
  const [leadModel, setLeadModel] = useState(false);

  
const leadGenration = () => {
    setLeadModel(true);
    setOpen(false);
  }

  return (
    <div className="fixed inset-0  z-40  mt-16 flex justify-end">
      <div className="w-[420px] h-full bg-white p-6 overflow-y-auto shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{unit.name}</h2>
          <button className="text-2xl cursor-pointer" onClick={close}>×</button>
        </div>

        <h3 className="mt-3 font-semibold text-lg">Unit Options</h3>

        <div className="mt-4 space-y-6">
          {unit.items.map((item, i) => (
            <div key={i} className="flex justify-between border-b pb-4">
              <p className="font-semibold text-lg">
                {item.area} sq.ft.
              <p className="text-gray-500">Possession from Aug, 2028</p>
              </p>

              <div className="flex justify-between mt-2">
                <div></div>
                <div className="text-right">
                  <p className="font-semibold">₹ {formatCr(item.price)}</p>
                  <p className="text-gray-500">Onwards</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <button className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg cursor-pointer" onClick={() => setLeadModel(true)}>
          Contact for custom prices
        </button>

      </div>

      {/* Lead Modal */}
      {leadModel && (
        <div>
          <Leadgentaionform setLeadModel={setLeadModel} />
        </div>
      )}
    </div>
  );
}
