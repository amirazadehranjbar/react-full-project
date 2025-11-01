import {createSlice} from "@reduxjs/toolkit";

const initialState={
    isLoggedIn : false,
    isRegister:false,
    userName :"",
    email:"",
    profileImage:"",
    role:"",
    password:"",
    token:"",
}


const AuthSlice = createSlice({
    name:"auth",
    initialState,

});


export default AuthSlice.reducer;


