import {useSelector} from "react-redux";

function RegisterLoginComponent() {

    const {isLogedIn , isRegister} = useSelector(state => state.authReducer);

    return (


        <button className="border-2 border-blue-900 p-1 rounded-md cursor-pointer text-gray-800 font-mono font-bold bg-slate-300 hover:bg-slate-400 shadow-sm shadow-gray-600">{isLogedIn ? "login" : "register" }</button>

    )
}

export default RegisterLoginComponent
