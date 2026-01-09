import React, { useEffect, useState } from 'react'
import { createCampain, createProjectBanner, getCampain } from '../../api/api';
import { FaEdit } from "react-icons/fa";

const UpcomingProjects = () => {

    const [name,setName] = useState('');
    const [images,setImages] = useState(null);
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [campaindetails,setCampainDetails] = useState(null);

   

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(images,'FOR');
        

        if(!name || !images){
            setMessage('❌ Please provide me all the details. Name Npxid Mobile Number images');
            return
        }

        const formData = new FormData();
        formData.append("name",name);
        formData.append("images",images);

        console.log("images:", images, typeof images);
       for (const [key, value] of formData.entries()) {
  console.log(key, value,'for');
}
        

        try {
            setLoading(true);
            await createProjectBanner(formData);
            setMessage("✅ Feature added successfully!");
        } catch (error) {
            setMessage("❌ Something went wrong.");
        } finally{
            setLoading(false)
        }


    }

  return (
    <div className='my-10'>
      <p className="text-center font-medium">{message}</p>
       <form  className='flex flex-col w-[40vw] mx-auto'>


            <input 
            type="text"
            placeholder='Name of the Project'
            value={name}
            className='border-2 border-gray-400 p-2 rounded mx-auto w-[80%] my-3'
            onChange={(e) => setName(e.target.value)}
            />

          <input
            type="file"
            accept="image/*"
            className="w-[80%] mx-auto border-2 border-gray-400 p-2 rounded text-gray-500"
            onChange={(e) => setImages(e.target.files[0])}
          />

          <button 
            type="submit"
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loading' : 'Add delear'}
          </button>
        </form>


        <div className={campaindetails ? "my-5" : "hidden"}>
  <table className="table-auto w-[70%] mx-auto border-2 border-collapse">
    <thead>
      <tr className="border-2">
        <th className="border-2 px-4 py-2 text-left">Name</th>
        <th className="border-2 px-4 py-2 text-center">Mobile Number</th>
        <th className="border-2 px-4 py-2 text-left">Project Name</th>
        <th className="border-2 px-4 py-2 text-left">edit</th>
        <th className="border-2 px-4 py-2 text-left">delete</th>
      </tr>
    </thead>
      
    <tbody>
      
    </tbody>
  </table>
</div>

    </div>
  )
}

export default UpcomingProjects;
