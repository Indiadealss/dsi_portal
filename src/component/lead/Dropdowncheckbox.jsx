import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Dropdowncheckbox() {
    return (
        <Menu as="div" className="relative inline-block w-[10vw] ms-10">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                All Residential
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    <MenuItem className="cursor-pointer">
                        <div class="flex items-center ps-1 pt-2 cursor-pointer">
                            <input checked id="checked-checkbo" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbo" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">All Residential</label>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">Residental Apartment</label>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">Independent/Builder Floor</label>
                        </div>
                    </MenuItem>
                   <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">Independent House/villa</label>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">Residental Land</label>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">1 RK/studio Apartment:</label>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">Farm House</label>
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div class="flex items-center ps-3 pt-2">
                            <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer" />
                            <label for="checked-checkbox" class="select-none ms-2 text-sm font-medium text-heading cursor-pointer">Serviced Apartments</label>
                        </div>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
