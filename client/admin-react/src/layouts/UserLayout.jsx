import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import MainContent from "../components/MainContent.jsx";
import {Outlet} from "react-router-dom";
import UserHeaderChildren from "../components/headerChildren/UserHeaderChildren.jsx";

function UserLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            <div className="flex-1 flex flex-col">
                <Header children={<UserHeaderChildren/>}/>
                <MainContent>
                    <Outlet />
                </MainContent>
            </div>
        </div>
    )
}

export default UserLayout
