import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import AdminDashboardHeaderChildren from "../components/headerChildren/AdminDashboardHeaderChildren.jsx";

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 lg:pl-72 flex flex-col">
                <Header children={<AdminDashboardHeaderChildren/>}/>
                <MainContent>
                    <Outlet />
                </MainContent>
            </div>
        </div>
    );
}

export default DashboardLayout;

// App.jsx
// ├── AuthLayout (no sidebar/headerChildren)
// │   └── / → AuthSelection
// │   └── /login → Login (when you create it)
// │   └── /register → Register (when you create it)
// │
// └── DashboardLayout (with sidebar/headerChildren)
//     └── /admin-dashboard → SalesReport
//     └── /store/managePG → ManagePg
//     └── /store/manageColors → ManageColors
//     └── /store/manageGuaranties → ManageGuaranties