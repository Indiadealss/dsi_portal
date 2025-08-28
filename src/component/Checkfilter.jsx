import React from 'react'

export const Checkfilter = (props) => {
    return (
        <div className='mt-4'>
            {props.checkItem.map((item, index) => {
                return (
                    <div className="flex items-center " key={index}>
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</label>
                    </div>
                )
            })}
        </div>
    )
}
