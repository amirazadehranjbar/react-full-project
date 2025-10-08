//region imports
import React from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'
import SidebarItemsLinks from "./sidebarComponents/SidebarItemsLinks.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setSidebarOpen} from "../redux/features/navbar/navbarSlice.js";

//endregion


const Sidebar = () => {

    const {itemsList, sidebarOpen} = useSelector(state => state.navbarReducer);

    const dispatch = useDispatch();

    return (

        <>
            {/*region mobile sidebar dialog*/}
            <Dialog open={sidebarOpen} onClose={() => {
                dispatch(setSidebarOpen())
                console.log(sidebarOpen)
            }} className="relative z-50 lg:hidden">
                {/*region sidebar backdrop*/}
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />
                {/*endregion*/}
                {/*region sidebar panel*/}
                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">


                        {/*region close sidebar button*/}
                        <TransitionChild>
                            <div
                                className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">

                                <button type="button" onClick={() => dispatch(setSidebarOpen())}
                                        className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="size-6 text-white"/>
                                </button>

                            </div>
                        </TransitionChild>
                        {/*endregion*/}


                        {/*region sidebar content*/}
                        <div
                            className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                            {/*region logo*/}
                            <div className="flex h-16 shrink-0 justify-center items-center  mt-4 rounded-md">
                                <img
                                    alt="Your Company"
                                    src="src/assets/images/profile.jpg"
                                    className="h-18 w-auto rounded-md"

                                />
                            </div>
                            {/*endregion*/}
                            <SidebarItemsLinks itemsList={itemsList}/>
                        </div>
                        {/*endregion*/}


                    </DialogPanel>

                </div>
                {/*endregion*/}
            </Dialog>
            {/*endregion*/}

            {/*region static sidebar for desktop*/}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    {/*region logo*/}
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                        />
                    </div>
                    {/*endregion*/}
                    <SidebarItemsLinks itemsList={itemsList}/>

                </div>
            </div>
            {/*endregion*/}

        </>
    );
}
export default Sidebar;

