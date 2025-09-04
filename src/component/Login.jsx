import React, { useState } from 'react'
import { Loginform } from './Loginform';
import { RxCross1 } from "react-icons/rx";

export const Login = ({ open, onClose  }) => {
  if(!open) return null

  return (
    <>
        <div className="relative">
                <div className="fixed z-101 pt-[5%] bg-[#f6f8fa85] inset-0 overflow-y-auto">
                  <div id="modal-overlay" className="flex flex-col lg-flex-row webkitHeightFillAvailable items-end sm:h-screen justify-center text-center sm:block sm:p-0 bg-[#0000008f]  z-23">
                    {/* This span helps center the modal */}
                    <div className='text-white float-right py-10 pe-10'>
                        <RxCross1 className='cursor-pointer' onClick={onClose} />
                    </div>
                    {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> */}
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg  my-2 sm:w-full">
                      <div className="bg-white  pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-center">
                        <h3 className='text-2xl font-semibold'>Login/Register</h3>
                        </div>
                        <div>
                        <Loginform />
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        
    </>
  )
}
