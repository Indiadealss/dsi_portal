import { FaXmark } from "react-icons/fa6";

export default function Filterbutton(props) {
  
  return (
    <div>
      <button type="button" className="text-gray flex justify-between p-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-300 outline-none">
        {props.btname}
        <span className="text-blue"><FaXmark className="mt-1 ms-2" /></span>
        </button>
    </div>
  )
}
