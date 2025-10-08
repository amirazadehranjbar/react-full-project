import React, { useState } from "react";
import SidebarItemsLinksCard from "./SidebarItemsLinksCard.jsx";


function SidebarItemsLinks({ itemsList }) {

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">
                        {itemsList.map((item, idx) => (
                            <SidebarItemsLinksCard
                                key={item.name || idx}
                                item={item}
                                isOpen={openIndex === idx}
                                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        ))}
                    </ul>
                </li>

                {/* settings link */}
                <li className="mt-auto">
                    <a
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                        href="/settings"
                    >

                        <svg className="size-6 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        Settings
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SidebarItemsLinks;
