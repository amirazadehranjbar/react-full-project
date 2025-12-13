// src/redux/features/auth/authAdminSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// region login
export const adminLogin = createAsyncThunk(
    "auth/adminLogin",  // ✅ Changed to unique name
    async ({email, password}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/admin/login", {
                email,
                password
            }, {
                withCredentials: true
            });

            return res.data;

        } catch (e) {
            console.error("❌ Admin Login error:", e.response?.data || e.message);
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Admin Login error");
        }
    }
);
//endregion

const initialState = {
    userName: "",
    email: "",
    profileImg: "",
    role: "admin",
    message: null,
    isLoading: false,
    isError: false,
    isAuthenticated: false,  // ✅ Added
}

const AuthAdminSlice = createSlice({
    name: "AuthAdminSlice",
    initialState,

    reducers: {
        adminLogout: () => {
            return { ...initialState };  // ✅ Reset to initial state
        }
    },

    extraReducers: (builder) => builder

        .addCase(adminLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.message = null;
        })

        .addCase(adminLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isAuthenticated = true;  // ✅ Added
            state.userName = action.payload.data.username;  // ✅ Match backend response
            state.email = action.payload.data.email;
            state.role = action.payload.data.role;  // ✅ Get role from response
            state.profileImg = action.payload.data.profileImg || "";
            state.message = action.payload.message;
        })

        .addCase(adminLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isAuthenticated = false;  // ✅ Added
            state.message = action.payload?.message || "Login failed";
            console.log("Admin login rejected:", action.payload);
        })

});

export const {adminLogout} = AuthAdminSlice.actions;
export default AuthAdminSlice.reducer;