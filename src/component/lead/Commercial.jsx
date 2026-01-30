import React from 'react'
import Searchlocationinputbox from './Searchlocationinputbox'
import Minimumprice from './Minimumprice'
import Commericialcheckbox from './Commercialcheckbox'

const Commercial = () => {
  const Minprice = [
        { label: '5 Lacs', price: '5 Lacs' },
        { label: '10 Lacs', price: '10 Lacs' },
        { label: '20 Lacs', price: '20 Lacs' },
        { label: '30 Lacs', price: '30 Lacs' },
        { label: '50 Lacs', price: '50 Lacs' },
        { label: '60 Lacs', price: '60 Lacs' },
        { label: '70 Lacs', price: '70 Lacs' },
        { label: '80 Lacs', price: '80 Lacs' },
        { label: '90 Lacs', price: '90 Lacs' },
        { label: '95 Lacs', price: '95 Lacs' },
        { label: '1 core', price: '1 core' },
        { label: '1.5 core', price: '2 core' },
        { label: '2 core', price: '3 core' },
        { label: '3 core', price: '3 core' },
        { label: '4 core', price: '4 core' },
        { label: '5 core', price: '5 core' },
        { label: '6 core', price: '6 core' },
        { label: '7 core', price: '7 core' },
        { label: '8 core', price: '8 core' },
        { label: '9 core', price: '9 core' },
        { label: '10 core', price: '10 core' },
        { label: '20 core', price: '20 core' },
        { label: '30 core', price: '30 core' },
        { label: '40 core', price: '40 core' },
        { label: '50 core', price: '50 core' },
        { label: '60 core', price: '60 core' },
        { label: '70 core', price: '70 core' },
        { label: '80 core', price: '80 core' },
        { label: '90 core', price: '90 core' },
        { label: '100 core', price: '100 core' },
        { label: '100+ core', price: '100+ core' },
    ]
  return (
     <div className='mx-24'>
            <div className='flex'>
                <h3 className='text-gray-500'><span className='text-gray-700'>Commercial</span></h3>

                <div className="flex items-center ms-10">
                    <input id="default-radio-1" type="radio" value="h" name="default-radio" className="w-4 h-4 text-neutral-primary border-default-medium border-gray-300 bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
                    <label for="default-radio-1" className="select-none ms-2 text-sm font-medium text-heading">Buy</label>
                </div>
                <div className="flex items-center ms-10">
                    <input checked id="default-radio-2" type="radio" value="h" name="default-radio" className="w-4 h-4 text-neutral-primary border-default-medium border-gray-300 bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
                    <label for="default-radio-2" className="select-none ms-2 text-sm font-medium text-heading">Rent</label>
                </div>
            </div>
            <div className='flex'>
                <Searchlocationinputbox />
                    <Commericialcheckbox />
            </div>
            <div className='flex '>
                <div className='flex justify-between w-[50%] m-5'>
                    <div className='flex'>
                    <Minimumprice price={Minprice} />
                        <p className='mt-2'><span className='font-medium text-gray-600'>To</span></p>
                        <Minimumprice price={Minprice} />
                            <Minimumprice price={Minprice} />

                        </div>
                </div>
                <div className='my-auto float-end ms-10'>
                <button type="button" className='text-white bg-blue-500 border border-gray-100 h-[max-content] px-5 rounded cursor-pointer my-auto' > Search</button>
                </div>
            </div>

        </div>
  )
}

export default Commercial
