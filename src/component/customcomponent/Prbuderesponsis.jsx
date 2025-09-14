import React from 'react'

const Prbuderesponsis = ({responses,resposerName}) => {
  return (
    <>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl  p-4 w-[40%] max-w-md">
                    <div className="flex items-center justify-center text-gray-500 w-10">
                        <span className="text-5xl">
                            {responses > 1 ? 
                                responses
                             : 
                                "--"
                            }
                        </span>
                    </div>
                    <div className="h-6 w-px bg-gray-200 mx-4"></div>
                    {/* Text */}
                    <span className="text-lg font-medium text-gray-700">
                        {resposerName}
                    </span>
                </div>
    </>
  )
}

export default Prbuderesponsis