import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {userRegister} from "../../../redux/features/auth/authUserSlice.js";


function RegisterUser() {

    const [inputs, setInputs] = useState({email: "", password: "", repeatedPassword: ""});
    const [messageToShow, setMessageToShow] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, isError, success, message} = useSelector(state => state.authUserReducer);

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ Fixed: Added parentheses

        console.log(message)
        if (inputs.password !== inputs.repeatedPassword) {
            setMessageToShow("password not match")
            return
        }

        await dispatch(userRegister({
            userName:inputs.userName,
            email: inputs.email,
            password: inputs.password
        }));
    };

    const handleMessageText = ()=>{

        let finalText="";

        if(isError) {
            finalText=message;
        }else {
            finalText = messageToShow;
        }

        return (
            (<div className="text-red-600 text-sm text-center">
                {finalText}
            </div>)
        )
    }

    useEffect(() => {


        if (success) {
            navigate("/api/user")
        }
    }, [navigate, success]);


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt="Your Company"
                        src="/src/assets/images/logo.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create your first account ⭐
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                        {/* ✅ Fixed: Changed action to onSubmit */}
                        <form onSubmit={handleSubmit} className="space-y-6">


                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    user name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        value={inputs.userName}
                                        onChange={(e) => setInputs({...inputs, userName: e.target.value})}
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>





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

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Repeate password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="repeatedPassword"
                                        name="repeatedPassword"
                                        type="password"
                                        value={inputs.repeatedPassword}
                                        onChange={(e) => setInputs({...inputs, repeatedPassword: e.target.value})}
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm/6">
                                    <button className="font-semibold text-indigo-600 hover:text-indigo-500"
                                            onClick={() => {
                                                navigate("/api/users/login")
                                            }}>
                                        are you have an account?
                                    </button>
                                </div>
                            </div>

                            {/* ✅ Show error message */}
                            {handleMessageText()}

                            <div>
                                <button
                                    className="flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex w-1/3">

                    <button
                        type="button"
                        className="text-white bg-sky-700 hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full"
                        onClick={() => {
                            // ✅ Redirect to BACKEND, not frontend route
                            window.location.href = "http://localhost:3000/api/users/auth/google";
                        }}
                    >
                        <svg className="w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 18 19">
                            <path fillRule="evenodd"
                                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                  clipRule="evenodd"/>
                        </svg>
                        Sign in with Google
                    </button>
                </div>

            </div>
        </>
    )
}

export default RegisterUser
