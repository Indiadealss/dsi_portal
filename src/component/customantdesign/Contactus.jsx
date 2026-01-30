import React from 'react'

const Contactus = () => {

    const handleClick = () => {
        console.log('hello');
        
    }
  return (
    <div>
        <div className='border border-gray-300 w-[400px] rounded shadow mx-auto my-10 py-10'>
            <div className='mx-auto'>
      <h2 className='text-center'>Contact US</h2>
        <form onSubmit={handleClick}>
            <div className='w-[300px] mx-auto'>
            <div className='flex flex-col mt-2 mx-auto'>
            <label htmlFor="name" >Name</label>
            <input
            type="text"
            name='Name'
            className='border border-gray-300 outline-none text-gray-500 rounded'
            />
            </div>

            {/* Mobile Number */}

            <div className='flex flex-col mt-2 mx-auto'>
            <label htmlFor="name" >Mobile Number</label>
            <input
            type="text"
            name='Mobilenumber'
            className='border border-gray-300 outline-none text-gray-500 rounded'
            />
            </div>

            {/* Email */}

            <div className='flex flex-col mt-2 mx-auto'>
            <label htmlFor="name" >Email</label>
            <input
            type="text"
            name='Mobilenumber'
            className='border border-gray-300 outline-none text-gray-500 rounded'
            />
            </div>

            {/* Message */}

            <div className='flex flex-col mt-2 mx-auto'>
            <label htmlFor="message" className='shadow-sm w-[max-content] px-2 rounded my-2' >Message</label>
            <textarea
            type="text"
            name='Name'
            className='border border-gray-300 outline-none text-gray-500 rounded'
            />
            </div>
            </div>

            <div className='w-[300px] mx-auto'>
              <input type="checkbox" className='' />
              <label htmlFor="" className=''>I agree to be contacted by BRANDSDOOR for promotions & SMS alerts</label>
            </div>
            
            <button className="rounded bg-blue-600 px-3 m-10 ms-12">Submit</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Contactus
