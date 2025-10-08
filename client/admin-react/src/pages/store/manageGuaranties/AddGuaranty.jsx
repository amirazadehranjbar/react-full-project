import {PlusSquare} from "lucide-react";
import {DialogTitle} from "@headlessui/react";
import React from "react";

function AddGuaranty() {
    return (
        <div>


            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <PlusSquare aria-hidden="true" className="size-6 text-green-600"/>
            </div>


            <div className="mt-3 text-center sm:mt-5">


                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    add guaranty
                </DialogTitle>


                {/*region input*/}
                <div className="flex justify-center items-center mt-2">

                    <label htmlFor="name"
                           className="block text-sm/6 font-medium text-gray-800 mr-2">guaranty title</label>


                    <input id="name" type="text" name="name" placeholder="guaranty title"
                           className="block min-w-0 grow bg-gray-700 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 rounded-md"/>

                </div>

                <div className="flex justify-center items-center mt-2">

                    <label htmlFor="name"
                           className="block text-sm/6 font-medium text-gray-800 mr-2">guaranty period</label>


                    <input id="name" type="text" name="name" placeholder="guaranty period"
                           className="block min-w-0 grow bg-gray-700 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 rounded-md"/>

                </div>

                <div className="flex justify-center items-center mt-2">

                    <label htmlFor="name"
                           className="block text-sm/6 font-medium text-gray-800 mr-2">description</label>


                    <input id="name" type="text" name="name" placeholder="description"
                           className="block min-w-0 grow bg-gray-700 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 rounded-md"/>

                </div>
                {/*endregion*/}
            </div>
        </div>
    )
}

export default AddGuaranty
