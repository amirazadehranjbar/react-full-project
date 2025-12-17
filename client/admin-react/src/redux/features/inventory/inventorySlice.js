// src/redux/features/inventory/inventorySlice.js

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

//region✅ get inventory data
export const getInventory = createAsyncThunk(
    "getInventory",
    async (arg, thunkAPI) => {

        try {
            const res = await axios.get("http://localhost:3500/api/admin/inventory", {
                withCredentials: true  // ✅ Send cookies with request
            });

            console.log("🚀 ~  ~ res.data: ", res.data);

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
//endregion

//region✅ update product inventory
export const updateProductInventory = createAsyncThunk(
    "updateProductInventory",

    async ({productID, amount}, thunkAPI) => {

        try {

            const res = await axios.put(
                "http://localhost:3500/api/admin/inventory/update",
                {productID, amount},
                {withCredentials: true}
            );

            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message || "failed to update product inventory");
        }

    }
)
//endregion

// Initial state with corrected property names to match component expectations
const initialState = {
    isLoading: false,
    isError: false,
    success: false,
    message: "",
    data: [], // Changed from inventoryData to data for consistency with component
    filteredData: [], // Changed from filteredInventoryData to filteredData for consistency with component
};

const inventorySlice = createSlice({

    name: "inventory",

    initialState,

    reducers: {
        filterProductByID: (state, action) => {

            const categoryID = action.payload;

            // If no categoryID provided, show all data
            if (!categoryID) {
                state.filteredData = state.data;
                return;
            }

            // Filter products by categoryID (productID is now populated with product details)
            state.filteredData = state.data.filter(product => {
                // Access categoryID from the populated productID object
                const productCategoryID = product.productID?.categoryID;
                return productCategoryID === categoryID;
            });
        }
    },


    extraReducers: (builder) => builder

        //region ✅ get inventory data
        .addCase(getInventory.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(getInventory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            //console.log(`action.payload.data = ${JSON.stringify(action.payload.data)}`)
            state.data = action.payload.data; // Changed from inventoryData to data for consistency
        })
        .addCase(getInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message || "error";
        })
        //endregion

        //region✅ update product inventory
        .addCase(updateProductInventory.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(updateProductInventory.fulfilled, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.data = action.payload.data; // Changed from inventoryData to data for consistency

        })

        .addCase(updateProductInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message || "error";
        })
    //endregion
});

export const {filterProductByID} = inventorySlice.actions;
export default inventorySlice.reducer;