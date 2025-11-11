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
import UserProtectedRoute from "./protectedRoutes/userProtectedRoute.jsx";
import SelectReportAdminDashboard from "./pages/adminDashboard/SelectReportAdminDashboard.jsx";
import Inventory from "./pages/adminDashboard/inventory/Inventory.jsx";
import InventoryLayout from "./layouts/InventoryLayout.jsx";
import LoginUser from "./pages/auth/authUser/LoginUser.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import UserMainPage from "./pages/user/UserMainPage.jsx";
import ProductsInCategory from "./pages/products/ProductsInCategory.jsx";
import RegisterUser from "./pages/auth/authUser/RegisterUser.jsx";
import UserProfile from "./pages/user/userProfile/UserProfile.jsx";
import UserProfileLayout from "./layouts/UserProfileLayout.jsx";
import AdminProtectedRoutes from "./protectedRoutes/AdminProtectedRoutes.jsx";

function App() {
    const location = useLocation();
    const backgroundLocation = location.state && location.state.background;

    return (
        <Routes location={backgroundLocation || location}>
            {/*region Publish Routes*/}
            <Route element={<AuthLayout/>}>
                <Route path="/" element={<AuthSelection/>}/>
                <Route path="/api/admin/login" element={<AuthAdmin/>}/>
                <Route path="/api/users/login" element={<LoginUser/>}></Route>
                <Route path="/api/users/register" element={<RegisterUser/>}></Route>
            </Route>
            {/*endregion*/}

            {/*region Protected User Routes*/}
            <Route element={<UserProtectedRoute/>}>
                <Route element={<UserLayout/>}>
                    <Route path="/api/user" element={<UserMainPage/>}/>
                    <Route path="/api/user/products-in-category" element={<ProductsInCategory/>}></Route>
                </Route>

                <Route element={<UserProfileLayout/>}>
                    <Route path="/api/users/me" element={<UserProfile/>}></Route>
                </Route>
            </Route>

            {/*endregion*/}

            {/*region Protected Admin Routes*/}
            <Route element={<AdminProtectedRoutes/>}>


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
            {/*endregion*/}


        </Routes>
    );
}

export default App;