// src/redux/features/product/productSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import supabase from "../../../utilities/supabaseConfig.js";

//region✅ get Products By Category
export const getProductsByCategory = createAsyncThunk(
    "getProductsByCategory",

    async ({categoryID}, thunkAPI) => {

        try {
            const res = await axios.post("http://localhost:3500/api/user/products-in-category", {categoryID});

            return res.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "Error");
        }

    }
);
//endregion

//region✅ get Products Images From Supabase Database
export const getProductsImagesFromSupabase = createAsyncThunk(
    "getProductsImagesFromSupabase",

    async ({category}, thunkAPI) => {

        try {
            const filePath = `products/${category}/`;

            const {data, error} = supabase.storage
                .from('images')
                .getPublicUrl(filePath, {
                    cacheControl: '3600', // Cache for 1 hour

                });

            return {data, error};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || e);
        }

    }
)
//endregion

//region✅ product details

//endregion


const initialState = {
    isOpenAddProductModal: false,
    isLoading: false,
    isError: false,
    message: null,
    categoryName: "",
    data: [],
    imagesSupabase: [],
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

    extraReducers: (builder) => builder


        //
        .addCase(getProductsByCategory.pending, state => {
            state.isLoading = true;
            state.isError = false;
            state.message = null;
        })

        .addCase(getProductsByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = null;
            state.data = action.payload.data;
            state.categoryName = action.payload.categoryName;
        })
        //✅ get Products By Category

        //
        .addCase(getProductsImagesFromSupabase.pending, state => {
            state.isLoading = true;
            state.isError = false;
        })

        .addCase(getProductsImagesFromSupabase.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.isError = false;
            state.imagesSupabase = action.payload.data;
        })

        .addCase(getProductsImagesFromSupabase.rejected, (state , action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.error || "error";
        })
        //✅ get Products Images From Supabase
});

export const {setIsOpenAddProductModal} = ProductSlice.actions;
export default ProductSlice.reducer;
