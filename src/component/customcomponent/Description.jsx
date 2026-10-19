import { useState } from "react";
import { Drawer } from "antd";
import { RxCross2 } from "react-icons/rx";
import Leadgentaionform from "./Leadgentaionform";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toPlainText } from "../../utils/markdownText";

// Description may be Markdown imported from Word; Tailwind's reset strips list
// bullets and table borders, so style those here. pre-line stays on paragraphs
// only, so older plain-text descriptions keep their line breaks as before.
// ReactMarkdown passes its AST as `node`; drop it so it doesn't reach the DOM
const md = (Tag, extra) =>
  function MarkdownTag(props) {
    const rest = { ...props };
    delete rest.node;
    return <Tag {...extra} {...rest} />;
  };

const markdownComponents = {
  p: md("p", { className: "mb-3", style: { whiteSpace: "pre-line" } }),
  ul: md("ul", { className: "mb-3 list-disc space-y-1 pl-5" }),
  ol: md("ol", { className: "mb-3 list-decimal space-y-1 pl-5" }),
  h1: md("h3", { className: "mb-2 mt-4 text-base font-bold" }),
  h2: md("h3", { className: "mb-2 mt-4 text-base font-bold" }),
  h3: md("h4", { className: "mb-2 mt-3 text-sm font-bold" }),
  h4: md("h4", { className: "mb-2 mt-3 text-sm font-semibold" }),
  table: (props) => (
    <div className="mb-3 overflow-x-auto">
      {md("table", { className: "w-full border-collapse text-xs" })(props)}
    </div>
  ),
  th: md("th", { className: "border border-gray-300 bg-gray-50 px-2 py-1 text-left font-semibold" }),
  td: md("td", { className: "border border-gray-300 px-2 py-1" }),
  a: md("a", { className: "text-blue-600 underline", target: "_blank", rel: "noopener noreferrer" }),
};

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
        <span className="text-sm">{toPlainText(text)}</span>
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
        {/* <p onClick={() => setAboutSpecificatioons(true)} className="cursor-pointer"><span className={`${aboutSpecifications ? "border-b-3 text-base pb-1 font-bold border-blue-500 ms-4" : "text-sm ms-4 font-medium" }`}>Specifications</span></p> */}
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
  <div className={`${aboutSpecifications ? 'hidden':"mt-4 leading-relaxed text-xs"}`}><ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{text}</ReactMarkdown></div>
</Drawer>

    {leadModel && (
        <div>
          <Leadgentaionform setLeadModel={setLeadModel} />
        </div>
      )}

    </div>
  );
}
