// src/redux/features/product/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenAddProductModal: false,

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
});

export const { setIsOpenAddProductModal} = ProductSlice.actions;
export default ProductSlice.reducer;
