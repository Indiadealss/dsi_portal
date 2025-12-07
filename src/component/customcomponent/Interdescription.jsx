import { useState } from "react";

export default function Interdescription({ text }) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text?.length > 120; // adjust limit as needed

  return (
    <div className="text-sm font-medium">
      
      <p className={expanded ? "" : "line-clamp-1"}>
        <span className="text-xs font-medium text-gray-500">{text}</span>
      </p>

     
    </div>
  );
}
