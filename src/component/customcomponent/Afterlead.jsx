import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Afterlead = ({ setReadyModal, setLeadfunction }) => {

  const modalclose = () => {
    setReadyModal(false);
    setLeadfunction();
  }

  const property = useSelector((state) => state.propertyid.data);

  const [pdfFile, setPdfFile] = useState(null);


  useEffect(() => {
    const pdf = property.images.filter((item) => item.type === 'brouser')
    setPdfFile(pdf[0].src)
    console.log(pdf[0].src, "ikl");

  }, [])


  return (
    <div>
      <div className="fixed inset-0 flex  justify-center bg-black/90 z-50">
        <div className='mt-[10vw] w-[50%]'>
          <div className='flex justify-between'>
            <div className='flex'>
              <p><span className='text-white font-medium'>Great, You can download brochure here</span></p>
              <button className='text-white font-medium bg-blue-500 rounded mx-3 px-2 cursor-pointer'>
                <a
                  href={pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >Download</a>
              </button>
            </div>
            <button
              onClick={modalclose}
              className="text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              X
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6   mt-10">

            <p><span className='text-green-500 font-medium'>Your brouchure is ready!</span></p>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Afterlead
