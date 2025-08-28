import  { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";

const Ownerdetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      {/* Button to trigger the modal */}
       <button type="button" onClick={openModal} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer" >View Number</button>
       <button type="button" onClick={openModal} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 px-6 cursor-pointer relative"><span className='p-2'><FaPhoneAlt className='absolute left-2 top-4' /> Contact</span></button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          onClick={(e) => {
            if (e.target.id === 'modal-overlay') {
              closeModal(); // close when clicking outside modal
            }
          }}
        >
          <div id="modal-overlay" className="flex flex-col lg-flex-row webkitHeightFillAvailable items-end sm:h-screen justify-center text-center sm:block sm:p-0 bg-gray-500 bg-opacity-75">
            {/* This span helps center the modal */}
            <p className='font-bold text-white'>You are requesting to view advertiser details.</p>
            {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        POSTED BY DEALER:
                      </p>
                      <div className='flex'>
                        <div>
                            <p className='text-green-500'>+91-8800727604,91-9910740860</p>
                            <p className='text-sm font-bold text-green-500'>ankit.niki.1988@gmail.com</p>
                            <p className='text-xs text-gray-500 pt-4'>Ankit Goeal</p>
                        </div>
                        <div className='px-10'>
                            <p className="text-sm text-gray-500">
                        POSTED ON 26th Jun, 2025:
                      </p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ownerdetails;
