import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
    "getCategory",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:3500/api/user/category");
            if (!res.data) return "not category found";
            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message || "error");
        }
    }
);

const initialState = {
    isLoadingCategory: false,
    isErrorCategory: false,
    errorCategory: null,
    categories: []
};

const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    extraReducers: (builder) => builder

        .addCase(getCategory.pending, state => {
            state.isLoadingCategory = true;
            state.isErrorCategory = false;
            state.errorCategory = null;
        })

        .addCase(getCategory.fulfilled, (state, action) => {
            state.isLoadingCategory = false;
            state.isErrorCategory = false;
            state.errorCategory = null;
            state.categories = action.payload;
        })

        .addCase(getCategory.rejected, (state, action) => {
            state.isLoadingCategory = false;
            state.isErrorCategory = true;
            state.errorCategory = action.payload;
        })
});

// ✅ Add a selector function instead
export const selectCategoryNameById = (state, categoryId) => {
    const category = state.categoryReducer.categories.find(
        cat => cat._id === categoryId
    );
    return category ? category.name : "Unknown Category";
};

export default categorySlice.reducer;