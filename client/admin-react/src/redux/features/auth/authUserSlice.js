// src/redux/features/auth/authUserSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// region ✅ user register
export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async ({userName, email, password}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/users/register", {
                userName,
                email,
                password,
            }, {
                withCredentials: true
            });

            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Registration error");
        }
    }
);
// endregion

// region ✅ user login
export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({email, password}, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:3500/api/users/login", {
                email,
                password
            }, {
                withCredentials: true
            });

            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Login error");
        }
    }
);
//endregion

// region ✅ admin login
export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
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
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Admin login error");
        }
    }
);
//endregion

//region ✅ user profile - ME
export const userProfile = createAsyncThunk(
    "auth/userProfile",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3500/api/users/me", {
                withCredentials: true,
            });

            //console.log(`result data from api = ${JSON.stringify(res.data)}`)

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Can't get profile data");
        }
    }
)
// endregion

//region ✅ google auth user (RESTORED)
export const authGoogle = createAsyncThunk(
    "auth/authGoogle",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3500/api/users/auth/google/callback", {
                withCredentials: true
            });
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Google auth failed");
        }
    }
)
//endregion

//region ✅ logout
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const res = await axios.get("http://localhost:3500/api/users/logout", {
                withCredentials: true
            });

            return res.data;

        } catch (e) {
            console.error("❌ Logout error:", e);
            return {success: true, message: "Logged out locally"};
        }
    }
)
// endregion

//region ✅ add to cart
export const addToCart = createAsyncThunk(
    "auth/addToCart",
    async ({productID, quantity = 1}, thunkAPI) => {
        try {
            const res = await axios.post(
                "http://localhost:3500/api/users/add-to-cart",
                {productID, quantity},
                {withCredentials: true}
            );

            console.log(`quantity = ${quantity}`)
            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Failed to add to cart");
        }
    }
);
//endregion

//region ✅ remove from cart
export const removeFromCart = createAsyncThunk(
    "auth/removeFromCart",
    async ({productID}, thunkAPI) => {
        try {
            const res = await axios.delete(
                `http://localhost:3500/api/users/cart/${productID}`,
                {withCredentials: true}
            );

            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response?.data || e.message || "Failed to remove from cart");
        }
    }
);
//endregion

//region✅ update cart data
export const updateCartItem = createAsyncThunk(
    "updateCartItem",
    async ({productID, amount}, thunkAPI) => {


        try {
            const res = await axios.put(
                "http://localhost:3500/api/users/cart/update-quantity",
                {productID, amount},
                {withCredentials: true},
            );

            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || e || "failed to update cart item data")
        }


    }
);
//endregion


const initialState = {
    message: null,
    isLoading: false,
    isError: false,
    success: false,
    isAuthenticated: false,
    data: null,  // ← ALL user info here (cart, email, userName, etc.)
}

const AuthUserSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        clearAuth: () => {
            return {...initialState};
        },

    },

    extraReducers: (builder) => builder


        //region✅ USER LOGIN
        .addCase(userLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload.data;
            state.isAuthenticated = true;
        })

        .addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Login failed";
            state.success = false;
            state.isAuthenticated = false;
        })
        //endregion

        //region ✅ ADMIN LOGIN
        .addCase(adminLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.message = null;
            state.success = false;
        })

        .addCase(adminLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userName = action.payload.data.username;
            state.email = action.payload.data.email;
            state.profileImg = action.payload.data.profileImg || "";
            state.role = action.payload.data.role;
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.isAuthenticated = true;
        })

        .addCase(adminLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Admin login failed";
            state.success = false;
            state.isAuthenticated = false;
        })
        // endregion

        //region ✅ REGISTER
        .addCase(userRegister.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.success = false;
        })

        .addCase(userRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userName = action.payload.data.userName;
            state.email = action.payload.data.email;
            state.role = action.payload.data.role || "user";
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.isAuthenticated = true;
        })

        .addCase(userRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "User Registration failed";
            state.success = false;
        })
        //endregion

        //region ✅ PROFILE DATA
        .addCase(userProfile.pending, state => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(userProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.success = action.payload.success;
            state.data = action.payload.data;
            state.role = action.payload.data.role || "user";
            state.isAuthenticated = true;
        })

        .addCase(userProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.success = false;
            state.message = action.payload?.message || "Failed to get profile";
            state.isAuthenticated = false;
        })
        //endregion

        //region ✅ GOOGLE AUTH (RESTORED)
        .addCase(authGoogle.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(authGoogle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userName = action.payload.data?.username || "";
            state.email = action.payload.data?.email || "";
            state.profileImg = action.payload.data?.profileImg || "";
            state.role = action.payload.data?.role || "user";
            state.isAuthenticated = true;
            state.success = action.payload.success;
        })

        .addCase(authGoogle.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Google auth failed";
            state.isAuthenticated = false;
        })
        //endregion

        //region ✅ LOGOUT
        .addCase(logout.pending, state => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(logout.fulfilled, () => {
            return {...initialState};
        })

        .addCase(logout.rejected, () => {
            return {...initialState};
        })
        //endregion

        //region ✅ add to cart
        .addCase(addToCart.pending, state => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;

            // ✅ Update cart inside data object
            if (state.data) {
                state.data.cart = action.payload.cart;
            }

            state.message = action.payload.message;
        })

        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || "Failed to add to cart";
        })
        //endregion

        //region✅ update cart item
        .addCase(updateCartItem.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(updateCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data.cart = action.payload.cart;
        })

        .addCase(updateCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message || "error";
        })
        //endregion

        //region ✅ remove from cart
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.data.cart = action.payload.cart;
            state.message = action.payload.message;
        })
    //endregion

});

export const {clearAuth} = AuthUserSlice.actions;
export default AuthUserSlice.reducer;