import {createSlice} from "@reduxjs/toolkit";

const initialState={
    isLogedIn : false,
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


