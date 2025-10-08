// App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Index from "./pages/adminDashboard/Index.jsx";
import ManagePg from "./pages/store/manageProductGroup/ManagePg.jsx";
import ManageColors from "./pages/store/manageColors/ManageColors.jsx";
import ManageGuaranties from "./pages/store/manageGuaranties/ManageGuaranties.jsx";

function App() {
    const location = useLocation();
    // if location.state.background exists, it means we navigated here as a modal
    const backgroundLocation = location.state && location.state.background;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            {/* main area */}
            <div className="flex-1 lg:pl-72 flex flex-col">
                <Header />
                {/* Here: pass location to Routes so page behind modal keeps backgroundLocation */}
                <MainContent className={backgroundLocation ? "blur-sm" : ""}>
                    <Routes location={backgroundLocation || location}>
                        <Route path="/admin-dashboard" element={<Index />} />
                        <Route path="/store/managePG" element={<ManagePg />} />
                        <Route path="/store/manageColors" element={<ManageColors />} />
                        <Route path="/store/manageGuaranties" element={<ManageGuaranties />} />
                        {/* other non-modal routes */}
                    </Routes>

                    {/* If we have a backgroundLocation, render the modal route on top */}
                    {backgroundLocation && (
                        <Routes>
                            <Route
                                path="/store/managePG/addProduct"
                                element={<AddProductModal />}
                            />
                        </Routes>
                    )}
                </MainContent>
            </div>
        </div>
    );
}

export default App;
