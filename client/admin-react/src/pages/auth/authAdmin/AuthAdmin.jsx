import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../../redux/features/auth/authUserSlice.js";
import {useNavigate} from "react-router";

function AuthAdmin() {

    const [inputs, setInputs] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {message, isLoading, isError} = useSelector(state => state.authUserReducer);

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ Fixed: Added parentheses

        await dispatch(userLogin({
            email: inputs.email,
            password: inputs.password
        }));
    }

    useEffect(() => {
        if (message === "Login successful") {
            navigate("/admin-dashboard")
        }
    }, [message, navigate]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt="Your Company"
                        src="/src/assets/images/logo.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your Admin account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                        {/* ✅ Fixed: Changed action to onSubmit */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={inputs.email}
                                        onChange={(e) => setInputs({...inputs, email: e.target.value})}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={inputs.password}
                                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="text-sm/6">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            {/* ✅ Show error message */}
                            {isError && (
                                <div className="text-red-600 text-sm text-center">
                                    Login failed. Please check your credentials.
                                </div>
                            )}

                            <div>
                                <button
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthAdmin