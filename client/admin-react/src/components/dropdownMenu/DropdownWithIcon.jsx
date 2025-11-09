import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {
    ArchiveBoxIcon,
    ArrowRightCircleIcon,
    ChevronDownIcon,
    DocumentDuplicateIcon,
    HeartIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
    UserIcon
} from '@heroicons/react/20/solid'
import {NavLink} from "react-router-dom";


function DropdownWithIcon() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    className="inline-flex w-full justify-center items-center rounded-md bg-white px-1 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    <MenuItem className="group">
                        <NavLink
                            to="/api/users/me"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <UserIcon aria-hidden="true"
                                            className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"/>
                            Profile
                        </NavLink>
                    </MenuItem>

                    <MenuItem className="group">
                        <NavLink
                            to="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <DocumentDuplicateIcon
                                aria-hidden="true"
                                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                            />
                            Duplicate
                        </NavLink>
                    </MenuItem>
                </div>
                <div className="py-1">
                    <MenuItem className="group">
                        <NavLink
                            to="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <ArchiveBoxIcon aria-hidden="true"
                                            className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"/>
                            Archive
                        </NavLink>
                    </MenuItem>
                    <MenuItem className="group">
                        <NavLink
                            to="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <ArrowRightCircleIcon
                                aria-hidden="true"
                                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                            />
                            Move
                        </NavLink>
                    </MenuItem>
                </div>
                <div className="py-1">
                    <MenuItem className="group">
                        <NavLink
                            to="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <UserPlusIcon aria-hidden="true"
                                          className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"/>
                            Share
                        </NavLink>
                    </MenuItem>
                    <MenuItem className="group">
                        <NavLink
                            to="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <HeartIcon aria-hidden="true"
                                       className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"/>
                            Add to favorites
                        </NavLink>
                    </MenuItem>
                </div>
                <div className="py-1">
                    <MenuItem className="group">
                        <NavLink
                            to="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            <TrashIcon aria-hidden="true"
                                       className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"/>
                            Delete
                        </NavLink>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}

export default DropdownWithIcon
