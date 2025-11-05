import React from 'react'
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import MainContent from "../components/MainContent.jsx";
import {Outlet} from "react-router-dom";
import InventoryHeaderChildren from "../components/headerChildren/InventoryHeaderChildren.jsx";

function InventoryLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 lg:pl-72 flex flex-col">
                <Header children={<InventoryHeaderChildren/>}/>
                <MainContent>
                    <Outlet />
                </MainContent>
            </div>
        </div>
    )
}


















export default InventoryLayout
