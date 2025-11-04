import {configureStore} from "@reduxjs/toolkit";
import NavbarSlice from "./features/navbar/navbarSlice.js";
import ProductSlice from "./features/product/productSlice.js";
import ColorsSlice from "./features/colors/colorsSlice.js";
import GuarantiesSlice from "./features/guaranties/guarantiesSlice.js";
import AuthSlice from "./features/auth/authSlice.js";
import SalesSlice from "./features/sales/salesSlice.js";
import inventorySlice from "./features/inventory/inventorySlice.js";
import categoryReducer from "./features/category/categoryReducer.js";



const store = configureStore({
    reducer:{
        navbarReducer : NavbarSlice,
        salesReducer:SalesSlice,
        productReducer:ProductSlice,
        colorsReducer:ColorsSlice,
        guarantiesReducer:GuarantiesSlice,
        authReducer : AuthSlice,
        inventoryReducer:inventorySlice,
        categoryReducer:categoryReducer,
    }
});

export default store;