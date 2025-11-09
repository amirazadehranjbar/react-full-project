import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// region user register
export const userRegister = createAsyncThunk(
    "userRegister",
    async ({userName, email, password}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/users/register", {
                userName,
                email,
                password,
            });

            console.log(res.data);
            return res.data;

        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e.response?.categories || e.message || "Registration error");
        }
    }
);
// endregion

// region login
export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({email, password}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/users/login", {
                email,
                password
            }, {
                withCredentials: true // ✅ Important for cookies
            });

            return res.data;

        } catch (e) {
            console.error("❌ Login error:", e.response?.categories || e.message);
            return thunkAPI.rejectWithValue(e.response?.categories || e.message || "Login error");
        }
    }
);
//endregion

//region ✅ user profile - ME
export const userProfile = createAsyncThunk(
    "userProfile",
    async (_, thunkAPI) => {
        try {

            const res = await axios.get("http://localhost:3500/api/users/me",{
                withCredentials:true,
            });

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "can`t get profile data");
        }
    }
)
// endregion

const initialState = {
    userName: "",
    email: "",
    profileImg: "",
    message: null,
    isLoading: false,
    isError: false,
    success: false,
}

const AuthUserSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        // Add user logout action
        userLogout: (state) => {
            state.userName = "";
            state.email = "";
            state.role = null;
            state.message = null;
        }
    },

    extraReducers: (builder) => builder

        //region LOGIN
        .addCase(userLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.message = null;
            state.success = false;
        })

        .addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userName = action.payload.data.userName;
            state.email = action.payload.data.email;
            state.profileImg = action.payload.data.profileImg || "";
            state.message = action.payload.message;
            state.success = action.payload.success;
        })

        .addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Login failed";
            state.success = false;
        })
        // endregion

        //region REGISTER
        .addCase(userRegister.pending, (state ,action) => {
            state.isLoading = true;
            state.isError = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        })

        .addCase(userRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            console.log(state.data)
            state.userName = action.payload.data.userName;
            state.email = action.payload.data.email;
            state.password = action.payload.password;
            state.message = action.payload.message;
            state.success = action.payload.success;
        })

        .addCase(userRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "User Registration failed";
            state.success = false;
        })
        //endregion

        //region profile data
        .addCase(userProfile.pending, state => {
            state.isLoading = true;
            state.isError = false;
            state.success = false;
        })

        .addCase(userProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.success = action.payload.success;
            state.data = action.payload.data;
        })

        .addCase(userProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.success = action.payload.success;
            state.message = action.payload.message;
        })

    //endregion
});


export const {userLogout} = AuthUserSlice.actions;
export default AuthUserSlice.reducer;