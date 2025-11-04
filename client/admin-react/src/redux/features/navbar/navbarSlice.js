import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    itemsList: [
        {name: 'Dashboard', href: "/admin-dashboard", icon: "TableCellsIcon"}, // ✅ String, not component

        {
            name: 'Store',
            href: '/store',
            icon: "BuildingStorefrontIcon", // ✅ String
            subItems: [
                {name: "manage product group", href: '/store/managePG'},
                {name: "manage product", href: '/store'},
                {name: "manage brands", href: '/store'},
                {name: "mange garanties", href: '/store/manageGuaranties'},
                {name: "mange colors", href: '/store/manageColors'},
                {name: "mange discounts", href: '/team'},
            ]
        },

        {name: 'Orders', href: '/orders', icon: "ShoppingCartIcon", subItems: [
                {name: "manage baskets", href: '/orders'},
                {name: "manage orders", href: '/orders'},
                {name: "manage send", href: '/orders'},
            ]},

        {name: 'Users', href: '/users', icon: "UsersIcon", subItems: [
                {name: "see users", href: '/users'},
                {name: "roles", href: '/users'},
                {name: "partners", href: '/users'},
            ]},

        {name: 'Contact', href: '/contact', icon: "RocketLaunchIcon", subItems: [
                {name: "questions", href: '/contact'},
                {name: "comments", href: '/contact'},
            ]},

        {name: 'Reports', href: '/reports', icon: "ChartPieIcon", subItems: [
                {name: "reports 1", href: '/reports'},
                {name: "reports 2", href: '/reports'},
            ]},
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