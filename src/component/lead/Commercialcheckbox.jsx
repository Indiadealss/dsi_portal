import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useState } from "react"

const types = [
  "Ready to move office space",
  "Bare Shell office space",
  "Co-working office space",
  "Commercial Shops",
  "Commercial Showrooms",
  "Commercial office/space",
  "Commercial Land/Inst.Land",
  "Industrial Lands/Plots",
  "Agricultural/Farm Land",
  "Hotel/Resorts",
  "Guest-House/Banquet-Halls",
  "Time Share",
  "Space in Retail Mall",
  "Office in Business Park",
  "Office in IT Park",
  "Ware House",
  "Cold Storage",
  "Factory",
  "Manufacturing",
  "Business Center",
  "Others",
]

export default function Commericialcheckbox() {
  const [selected, setSelected] = useState([])

  const allSelected = selected.length === types.length

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]) // Uncheck all
    } else {
      setSelected(types) // Check all
    }
  }

  const toggleItem = (item) => {
    if (selected.includes(item)) {
      setSelected((prev) => prev.filter((i) => i !== item))
    } else {
      setSelected((prev) => [...prev, item])
    }
  }

  return (
    <Menu as="div" className="relative inline-block w-[10vw] ms-10">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
        All Commercial
        <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute h-[10vw] overflow-auto right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg outline-1 outline-black/5">
        <div className="py-1">

          {/* ALL COMMERCIAL TOGGLE */}
          <MenuItem as='div' disabled>
            {() => (
              <div
                className="flex items-center px-3 py-2 cursor-pointer"
                onClick={toggleAll}
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  readOnly
                  className="w-4 h-4 cursor-pointer"
                />
                <label className="ml-2 font-medium text-sm cursor-pointer">
                  All Commercial
                </label>
              </div>
            )}
          </MenuItem>

          {/* INDIVIDUAL ITEMS */}
          {types.map((item, i) => (
            <MenuItem key={i} as='div' disabled>
              {() => (
                <div
                  className="flex items-center px-3 py-2 cursor-pointer"
                  onClick={() => toggleItem(item)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    readOnly
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label className="ml-2 text-sm cursor-pointer">
                    {item}
                  </label>
                </div>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
