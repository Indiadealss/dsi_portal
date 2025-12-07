import { useState } from "react";
import { Drawer } from "antd";
import { RxCross2 } from "react-icons/rx";
import Leadgentaionform from "./Leadgentaionform";

export default function Description({ text }) {
  const [open, setOpen] = useState(false);
    const [leadModel, setLeadModel] = useState(false)
  

  const [aboutSpecifications, setAboutSpecificatioons] = useState(false)

  const isLong = text?.length > 60; // Detect if "More" button needed

  const leadGenration = () => {
    setLeadModel(true);
    setOpen(false);
  }

  return (
    <div className="text-sm font-medium">

      {/* --- Truncated Text Preview --- */}
      <p className="line-clamp-1">
        <span className="text-sm">{text}</span>
      </p>

      {/* --- Show More Button Only If Long --- */}
      {isLong && (
        <button
          onClick={() => setOpen(true)}
          className="text-blue-600 font-semibold mt-1 cursor-pointer"
        >
          More
        </button>
      )}

      {/* --- Drawer --- */}
      <Drawer
  footer={
    <div>
      <button className="text-center cursor-pointer bg-blue-500 rounded p-3 w-[100%] text-white font-medium" onClick={leadGenration}>
        I am interested in Project
      </button>
    </div>
  }
  open={open}
  onClose={() => setOpen(false)}
  closable={false}
  title={
    <div>
      <div className="flex justify-between mt-2">
        <p>Project Details</p>
        <RxCross2
      onClick={() => setOpen(false)}
      className="cursor-pointer text-xl hover:text-red-500"
    />
      </div>
      <div className="mt-10 flex">
        <p onClick={() => setAboutSpecificatioons(false)} className="cursor-pointer"><span className={`${aboutSpecifications ? "text-sm font-medium":"border-b-3 text-base pb-1 font-bold border-blue-500"}`}>About Project</span></p>
        <p onClick={() => setAboutSpecificatioons(true)} className="cursor-pointer"><span className={`${aboutSpecifications ? "border-b-3 text-base pb-1 font-bold border-blue-500 ms-4" : "text-sm ms-4 font-medium" }`}>Specifications</span></p>
      </div>
    </div>
  }
  placement="right"
  mask={false}
  styles={{
    header: {
      paddingBottom: 0,
      marginBottom: 0,
      paddingTop: 0,     // optional (if you want tighter spacing)
      display: "flex",
      alignItems: "center",
    },
  }}
  style={{
    top: 64,
    height: "calc(100vh - 64px)",
    marginTop: 64,
  }}
>
  <p className={`${aboutSpecifications ? 'hidden':"mt-4 leading-relaxed "}`}><span className="text-xs">{text}</span></p>
</Drawer>

    {leadModel && (
        <div>
          <Leadgentaionform setLeadModel={setLeadModel} />
        </div>
      )}

    </div>
  );
}
