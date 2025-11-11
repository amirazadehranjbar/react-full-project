// client/admin-react/src/protectedRoutes/AdminProtectedRoutes.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userProfile } from "../redux/features/auth/authUserSlice";

function AdminProtectedRoutes() {
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(true);
    const { isAuthenticated, role, userName } = useSelector(state => state.authUserReducer);

    useEffect(() => {
        // ✅ Verify authentication on mount by calling API
        const checkAuth = async () => {
            if (!userName) {
                try {
                    await dispatch(userProfile()).unwrap();
                } catch (error) {
                    console.log("❌ Admin authentication failed:", error);
                }
            }
            setIsChecking(false);
        };

        checkAuth();
    }, [dispatch, userName]);

    // Show loading spinner while checking authentication
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700"></div>
            </div>
        );
    }

    // ✅ Step 1: Check if user is logged in
    if (!isAuthenticated) {
        console.log("❌ Not authenticated, redirecting to admin login");
        return <Navigate to="/api/admin/login" replace />;
    }

    // ✅ Step 2: Check if user has admin role
    if (role !== "admin") {
        console.log("❌ Not admin role, redirecting to home");
        return <Navigate to="/" replace />;
    }

    console.log("✅ Admin authenticated, rendering protected route");
    // ✅ User is authenticated AND is an admin
    return <Outlet />;
}

export default AdminProtectedRoutes;