import React, { useEffect, useState } from "react";
import { getallProperty } from "../../api/api";


export default function WordEditor() {

  const [page,setPage] = useState(1);
  const [hasMore , setHasMore] = useState(true);
  const [choseproperty , setChoseProperty ] = useState();
  const purpose = 'Project'

  const [data,setData] = useState([]);
 
  useEffect(() => {
    const response =  async () => {
       const res = await getallProperty(page,'',purpose);
       
    const NewstData = res.data.data;
    
    setData(prev => [...prev, NewstData]);
    console.log(data);
      if(data.length < 10){
        setHasMore(false);
        loadMore
      }
    }

    
    
    
    response()
  },[page])

  const loadMore = () => {
    if(hasMore){
      setPage(prev => prev + 1);
    }
  }

  const chosePropertys = (e) => {
    console.log(e.target.value);
    setChoseProperty(e.target.value);
  }
  return (
    <div className="mx-5">
      <div >
        <p><span className='text-gray-500 font-light text-sm'>Choose</span></p>
                    <select
                        className=" rounded px-1 py-1 cursor-pointer text-sm outline-none"
                        value={choseproperty}
                        onChange={chosePropertys}
                    >
                        {data.map((opt) => (
                            <option key={opt.npxid} className='cursor-pointer'>{opt.projectname}</option>
                        ))}
                    </select>
      </div>

      {/* project title */}

      <div className="mt-10">
        <div className="flex justify-between">
          <div>
          <label>Title</label><br />
          <input type="text" className="outline-none bg-white border border-gray-400 rounded"   />
          </div>

          {/* Discription */}
          <div>
          <label>Discription</label><br />
          <input type="text" className="outline-none bg-white border border-gray-400 rounded w-[10vw]" />
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
}
