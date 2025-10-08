import {configureStore} from "@reduxjs/toolkit";
import NavbarSlice from "./features/navbar/navbarSlice.js";
import InventorySlice from "./features/inventory/inventorySlice.js";
import ProductSlice from "./features/product/productSlice.js";
import ColorsSlice from "./features/colors/colorsSlice.js";
import GuarantiesSlice from "./features/guaranties/guarantiesSlice.js";
import AuthSlice from "./features/auth/authSlice.js";


const store = configureStore({
    reducer:{
        navbarReducer : NavbarSlice,
        inventoryReducer:InventorySlice,
        productReducer:ProductSlice,
        colorsReducer:ColorsSlice,
        guarantiesReducer:GuarantiesSlice,
        authReducer : AuthSlice,
    }
});

export default store;