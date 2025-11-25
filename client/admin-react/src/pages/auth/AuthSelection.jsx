// client/admin-react/src/pages/auth/AuthSelection.jsx
import React from 'react'
import {LucideShieldUser, CircleUserRoundIcon} from "lucide-react";
import {useNavigate} from "react-router";
import LiquidEther from "../../utilities/LiquidEther.jsx";

function AuthSelection() {

    const navigation = useNavigate();

    return (
        <div className="relative w-full min-h-screen bg-gray-400 overflow-hidden">

            {/* ✅ Background Effect Layer */}
            <div className="absolute inset-0 w-full h-full">
                <LiquidEther
                    colors={['#277dff', '#9fddff', '#B19EEF']}
                    mouseForce={15}
                    cursorSize={50}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            {/* ✅ Foreground Content Layer */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">

                {/* Logo */}
                <div className="mb-12">
                    <img
                        src="/src/assets/images/logo.png"
                        alt="logo"
                        className="h-24 w-auto drop-shadow-2xl"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto">
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-indigo-500 hover:scale-105 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        onClick={() => navigation("/api/admin/login")}
                    >
                        <LucideShieldUser aria-hidden="true" className="-ml-0.5 size-5"/>
                        Login as Admin
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-indigo-500 hover:scale-105 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        onClick={() => navigation("/api/users/register")}
                    >
                        <CircleUserRoundIcon aria-hidden="true" className="-ml-0.5 size-5"/>
                        Login as User
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AuthSelection

// 🎯 What Changed:
//
// **1. Structure:**
// ```
// <div relative>                      ← Main container
// <div absolute inset-0>            ← Background layer
// <LiquidEther />                 ← Effect fills entire background
// </div>
//
// <div relative z-10>               ← Foreground layer (above effect)
//     <logo />
//     <buttons pointer-events-auto /> ← Clickable buttons
// </div>
// </div>