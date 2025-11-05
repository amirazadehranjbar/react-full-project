import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {Navigate} from "react-router";

function ProtectedRoute() {

    const {isLoggedIn, role} = useSelector(state => state.authUserReducer);

    // Step 1: Check if user is logged in
    if (!isLoggedIn) {
        return <Navigate to="/auth/admin/login" replace />;
    }

    // Step 2: Check if user has admin role
    if (role !== "admin") {
        return <Navigate to="/" replace />; // Send regular users back to selection page
    }

    // ✅ User is logged in AND is an admin
    return <Outlet/>;
}

export default ProtectedRoute;