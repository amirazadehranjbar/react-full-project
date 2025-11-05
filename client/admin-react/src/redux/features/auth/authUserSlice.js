import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// region user register
export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async ({userName, role, email, password, repeat_password, phone, profileImg}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/users/register", {
                userName,
                role,
                email,
                password,
                repeat_password,
                phone,
                profileImg
            });

            console.log(res.data)

            return res.data;

        } catch (e) {
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

const initialState = {
    userName: "",
    email: "",
    profileImg: "",
    role: "user",
    phone: "",
    address: "",
    message: null,
    isLoading: false,
    isError: false,
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
        })

        .addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userName = action.payload.data.userName;
            state.email = action.payload.data.email;
            state.phone = action.payload.data.phone || "";
            state.address = action.payload.data.address || "";
            state.profileImg = action.payload.data.profileImg || "";
            state.message = action.payload.message;
        })

        .addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Login failed";
            console.log("Login rejected:", action.payload);
        })
        // endregion

        //region REGISTER
        .addCase(userRegister.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(userRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload.message;
        })

        .addCase(userRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "User Registration failed";
        })
        //endregion
});


export const {userLogout} = AuthUserSlice.actions;
export default AuthUserSlice.reducer;