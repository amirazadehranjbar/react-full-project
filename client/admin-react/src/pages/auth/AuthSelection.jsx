import React from 'react'
import {LucideShieldUser, CircleUserRoundIcon} from "lucide-react";
import {useNavigate} from "react-router";

function AuthSelection() {

    const navigation = useNavigate();

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-400 flex flex-col items-center min-h-screen ">

            <div className="">
                <img src="/src/assets/images/logo.png" alt="logo"/>
            </div>

            <div className="flex justify-center items-center space-x-2">
                <button
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    onClick={()=>navigation("/api/admin/login")}
                >
                    <LucideShieldUser aria-hidden="true" className="-ml-0.5 size-5"/>
                    login as admin
                </button>

                <button
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                      onClick={()=>navigation("/api/users/register")}
                >
                    <CircleUserRoundIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                    login as user
                </button>
            </div>
        </div>
    )
}

export default AuthSelection
