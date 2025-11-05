import {configureStore} from "@reduxjs/toolkit";
import NavbarSlice from "./features/navbar/navbarSlice.js";
import ProductSlice from "./features/product/productSlice.js";
import ColorsSlice from "./features/colors/colorsSlice.js";
import GuarantiesSlice from "./features/guaranties/guarantiesSlice.js";
import SalesSlice from "./features/sales/salesSlice.js";
import inventorySlice from "./features/inventory/inventorySlice.js";
import categoryReducer from "./features/category/categoryReducer.js";
import AuthUserSlice from "./features/auth/authUserSlice.js";
import AuthAdminSlice from "./features/auth/authAdminSlice.js";



const store = configureStore({
    reducer:{
        navbarReducer : NavbarSlice,
        salesReducer:SalesSlice,
        productReducer:ProductSlice,
        colorsReducer:ColorsSlice,
        guarantiesReducer:GuarantiesSlice,
        authAdminReducer:AuthAdminSlice,
        authUserReducer : AuthUserSlice,
        inventoryReducer:inventorySlice,
        categoryReducer:categoryReducer,
    }
});

export default store;