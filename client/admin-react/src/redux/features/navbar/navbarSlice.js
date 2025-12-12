import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    itemsList: [
        {name: 'Dashboard', href: "/admin-dashboard", icon: "TableCellsIcon"}, // ✅ String, not component

        {
            name: 'Store',
            href: '/store',
            icon: "BuildingStorefrontIcon",
        },
        {
            name: 'Manage products images',
            href:'/manage-products-images',
            icon: "PhotoIcon"
        },

        {name: 'Orders', href: '/orders', icon: "ShoppingCartIcon"},

        {
            name: 'Users', href: '/users', icon: "UsersIcon"
        },

        {
            name: 'Contact', href: '/contact', icon: "RocketLaunchIcon"
        },

        {
            name: 'Reports', href: '/reports', icon: "ChartPieIcon"
        },
    ],

    sidebarOpen: false,
}

const NavbarSlice = createSlice({
    name: "navbar",
    initialState: initialState,

    reducers: {
        setSidebarOpen: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }
});

export const {setSidebarOpen} = NavbarSlice.actions;
export default NavbarSlice.reducer;