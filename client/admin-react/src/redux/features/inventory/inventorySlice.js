// src/redux/features/inventory/inventorySlice.js

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getInventory = createAsyncThunk(
    "getInventory",
    async (arg, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3500/api/admin/inventory", {
                withCredentials: true  // ✅ Send cookies with request
            });
            return res.data;
        } catch (e) {
            // ✅ Handle authentication errors
            if (e.response?.status === 401 || e.response?.status === 403) {
                return thunkAPI.rejectWithValue({
                    message: e.response.data.message || "Unauthorized",
                    shouldLogout: true
                });
            }
            return thunkAPI.rejectWithValue({
                message: e.message || "error",
                shouldLogout: false
            });
        }
    }
);

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    data: [],
    filteredData:[],
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers:{
        filterProductByID:(state, action)=>{
            const categoryID = action.payload;

            if (!categoryID) {
                state.filteredData = state.data;
                return;
            }

            state.filteredData = state.data.filter(product => {
                return product.categoryID === categoryID;
            });
        }
    },
    extraReducers: (builder) => builder
        .addCase(getInventory.pending, state => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        })
        .addCase(getInventory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(getInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload?.message || action.payload;
        })
});

export const {filterProductByID} = inventorySlice.actions;
export default inventorySlice.reducer;