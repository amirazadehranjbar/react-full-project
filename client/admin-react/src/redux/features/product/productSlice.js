// src/redux/features/product/productSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsByCategory = createAsyncThunk(
    "getProductsByCategory",

    async ({categoryID} , thunkAPI)=>{

        try {
            const res = await axios.post("http://localhost:3500/api/user/products-in-category", {categoryID});

            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }

    }
)




const initialState = {
    isOpenAddProductModal: false,
    isLoading:false,
    isError:false,
    message:null,
    categoryName:"",
    data:[]
};

const ProductSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        // payload will be a boolean: true | false
        setIsOpenAddProductModal: (state, action) => {
            state.isOpenAddProductModal = action.payload;
        },


    },

    extraReducers:(builder)=>builder

        .addCase(getProductsByCategory.pending , state=>{
            state.isLoading=true;
            state.isError=false;
            state.message=null;
        })

        .addCase(getProductsByCategory.fulfilled , (state , action)=>{
            state.isLoading=false;
            state.isError=false;
            state.message=null;
            state.data = action.payload.data;
            state.categoryName = action.payload.categoryName;
        })
});

export const { setIsOpenAddProductModal} = ProductSlice.actions;
export default ProductSlice.reducer;
