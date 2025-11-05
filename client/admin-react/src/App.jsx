// App.jsx
import React from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import SalesReport from "./pages/adminDashboard/salesReport/salesReport.jsx";
import ManagePg from "./pages/store/manageProductGroup/ManagePg.jsx";
import ManageColors from "./pages/store/manageColors/ManageColors.jsx";
import ManageGuaranties from "./pages/store/manageGuaranties/ManageGuaranties.jsx";
import AuthSelection from "./pages/auth/AuthSelection.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import AuthAdmin from "./pages/auth/authAdmin/AuthAdmin.jsx";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute.jsx";
import SelectReportAdminDashboard from "./pages/adminDashboard/SelectReportAdminDashboard.jsx";
import Inventory from "./pages/adminDashboard/inventory/Inventory.jsx";
import InventoryLayout from "./layouts/InventoryLayout.jsx";
import AuthUser from "./pages/auth/authUser/AuthUser.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import UserMainPage from "./pages/user/UserMainPage.jsx";

function App() {
    const location = useLocation();
    const backgroundLocation = location.state && location.state.background;

    return (
        <Routes location={backgroundLocation || location}>
            {/* Auth Routes - NO Sidebar/Header */}
            <Route element={<AuthLayout/>}>
                <Route path="/" element={<AuthSelection/>}/>
                <Route path="/api/admin/login" element={<AuthAdmin/>}/>
                <Route path="/api/user/register" element={<AuthUser/>}></Route>
            </Route>

            {/*region user Routes*/}
            <Route element={<UserLayout/>}>
                <Route path="/api/user" element={<UserMainPage/>}/>
            </Route>
            {/*endregion*/}

            {/* Dashboard Routes - WITH Sidebar/Header */}
            <Route element={<ProtectedRoute/>}>


                <Route element={<InventoryLayout/>}>
                    <Route path="/admin/inventory" element={<Inventory/>}></Route>
                </Route>



                <Route element={<DashboardLayout/>}>
                    <Route path="/admin-dashboard" element={<SelectReportAdminDashboard/>}/>
                    <Route path="/admin/sales-report" element={<SalesReport/>}></Route>
                    <Route path="/store/managePG" element={<ManagePg/>}/>
                    <Route path="/store/manageColors" element={<ManageColors/>}/>
                    <Route path="/store/manageGuaranties" element={<ManageGuaranties/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;