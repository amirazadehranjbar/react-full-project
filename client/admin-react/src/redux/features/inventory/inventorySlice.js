import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getInventory = createAsyncThunk(
    "getInventory",
    async (arg, thunkAPI) => {

        try {
            const res = await axios.get("http://localhost:3500/api/admin/inventory");
            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "error");
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
        // filter products by ID
        filterProductByID:(state, action)=>{
            const categoryID = action.payload;

            // If no category selected, show all products
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
            state.error = action.payload;
        })
});

export const {filterProductByID} = inventorySlice.actions;
export default inventorySlice.reducer;
