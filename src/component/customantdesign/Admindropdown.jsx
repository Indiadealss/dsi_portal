import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Admindropdown({name,Listings}) {

    const [open, setOpen] = useState(false);
   
    return (
        <div>
            <button className="inline-flex w-full justify-start gap-x-1.5 py-1 text-sm font-semibold text-gray-500 inset-ring-1 inset-ring-white/5 outline-none cursor-pointer" onClick={() => setOpen(prev => !prev)}>
                {name}
                {open ? (
                <FaAngleDown className="m-1  text-gray-400" />
                ) :
                (
                <FaAngleUp className="m-1  text-gray-400" />
                )
            }
            </button>

            <div className={open ? 'hidden' : ''}>
                {Listings.map((item,index) => {
                    return <div className='mt-5 ps-5' key={index}>
                            <p><Link to={`${item.link}`}><span className=' text-gray-500'>{item.name}</span></Link></p>
                    </div>
                })}
            </div>
        </div>
    )
}
