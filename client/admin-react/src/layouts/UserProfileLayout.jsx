import MainContent from "../components/MainContent.jsx";
import {Outlet} from "react-router-dom";

function UserProfileLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            <div className="flex-1 flex flex-col">
                <MainContent>
                    <Outlet />
                </MainContent>
            </div>
        </div>
    )
}

export default UserProfileLayout
