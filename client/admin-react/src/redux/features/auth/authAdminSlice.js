import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// 🔐 admin don`t have registration

// region login
export const adminLogin = createAsyncThunk(
    "auth/userLogin",
    async ({email, password}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/admin/login", {
                email,
                password
            }, {
                withCredentials: true // ✅ Important for cookies
            });

            return res.data;

        } catch (e) {
            console.error("❌ Login error:", e.response?.categories || e.message);
            return thunkAPI.rejectWithValue(e.response?.categories || e.message || "Admin Login error");
        }
    }
);
//endregion

const initialState = {
    userName: "",
    email: "",
    profileImg: "",
    role: "admin",
    phone: "",
    address: "",
    message: null,
    isLoading: false,
    isError: false,
}

const AuthAdminSlice = createSlice({
    name: "AuthAdminSlice",
    initialState,

    reducers: {
        // Add admin logout action
        adminLogout: (state) => {
            state.userName = "";
            state.email = "";
            state.role = null;
            state.message = null;
        }
    },

    extraReducers: (builder) => builder

        // LOGIN
        .addCase(adminLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.message = null;
        })

        .addCase(adminLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isLoggedIn = action.payload.success;
            state.userName = action.payload.data.userName;
            state.email = action.payload.data.email;
            state.phone = action.payload.data.phone || "";
            state.address = action.payload.data.address || "";
            state.profileImg = action.payload.data.profileImg || "";
            state.message = action.payload.message;
        })

        .addCase(adminLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Login failed";
            console.log("Login rejected:", action.payload);
        })

});


export const {adminLogout} = AuthAdminSlice.actions;
export default AuthAdminSlice.reducer;