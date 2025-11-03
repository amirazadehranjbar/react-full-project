import {Outlet} from "react-router-dom";

function AuthLayout() {
    return (
        <>
            {/* No Sidebar, No Header */}
            <Outlet/>
        </>
    );
}

export default AuthLayout;