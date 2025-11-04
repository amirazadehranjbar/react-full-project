import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../../redux/features/navbar/navbarSlice.js";
import {
    BuildingStorefrontIcon,
    ChartPieIcon,
    RocketLaunchIcon,
    ShoppingCartIcon,
    TableCellsIcon,
    UsersIcon
} from "@heroicons/react/24/outline/index.js";

// ✅ Map icon names to components
const iconMap = {
    TableCellsIcon: TableCellsIcon,
    BuildingStorefrontIcon: BuildingStorefrontIcon,
    ShoppingCartIcon: ShoppingCartIcon,
    UsersIcon: UsersIcon,
    RocketLaunchIcon: RocketLaunchIcon,
    ChartPieIcon: ChartPieIcon,
};

function SidebarItemsLinksCard({ item, isOpen, onToggle }) {
    const dispatch = useDispatch();

    // ✅ Get the component from the map
    const IconComponent = iconMap[item.icon];

    return (
        <li id={item.name} className="relative">
            <div onClick={onToggle} className="cursor-pointer">
                <NavLink
                    to={item.href || "#"}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                    }
                >
                    <div className="flex flex-row w-full justify-between items-center">
                        <div className="flex justify-center gap-2 items-center">
                            {/* ✅ Render the icon component */}
                            {IconComponent && <IconComponent aria-hidden="true" className="size-6 shrink-0" />}
                            <span>{item.name}</span>
                        </div>

                        {item.subItems && (
                            <svg
                                className={`w-2.5 h-2.5 ms-3 transform transition-transform duration-150 ${
                                    isOpen ? "rotate-90" : "rotate-0"
                                }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        )}
                    </div>
                </NavLink>
            </div>

            {isOpen && item.subItems && (
                <div className="absolute left-2 top-0 z-10 ml-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {item.subItems.map((subItem, idx) => (
                            <li key={subItem.name || idx}>
                                <NavLink
                                    onClick={() => {
                                        onToggle();
                                        dispatch(setSidebarOpen());
                                    }}
                                    to={subItem.href || "#"}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {subItem.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

export default SidebarItemsLinksCard;