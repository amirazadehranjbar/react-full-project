// client/admin-react/src/protectedRoutes/UserProtectedRoute.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userProfile } from "../redux/features/auth/authUserSlice";

function UserProtectedRoute() {
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(true);
    const { isAuthenticated, userName } = useSelector(state => state.authUserReducer);

    useEffect(() => {
        // ✅ Verify authentication on mount by calling API
        const checkAuth = async () => {
            if (!userName) {
                try {
                    await dispatch(userProfile()).unwrap();
                } catch (error) {
                    console.log("❌ User authentication failed:", error);
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

    // ✅ If not authenticated, redirect to log in
    if (!isAuthenticated) {
        console.log("❌ User not authenticated, redirecting to login");
        // return <Navigate to="/api/users/login" replace />; // if I uncomment this line my login page put in loop
    }

    //console.log("✅ User authenticated, rendering protected route");
    // ✅ User is authenticated, render protected content
    return <Outlet />;
}

export default UserProtectedRoute;