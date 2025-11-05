//region imports
import {Bars3Icon, BellIcon} from '@heroicons/react/24/outline'
import {useDispatch} from "react-redux";
import {setSidebarOpen} from "../redux/features/navbar/navbarSlice.js";
//endregion

//region Header component
const Header = ({children}) => {

    const dispatch = useDispatch();

    return (
        <div
            className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white shadow-xs sm:gap-x-6 sm:px-6 justify-center mt-2">
            {/*region open sidebar button (mobile)*/}
            <button type="button" onClick={() => dispatch(setSidebarOpen(true))}
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6"/>
            </button>
            {/*endregion*/}
            {/*region separator*/}
            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden"/>
            {/*endregion*/}
            {/*region Header Children & Actions*/}
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-center items-center">
                {children}
                {/*region headerChildren actions*/}
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/*region notifications button*/}
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6"/>
                    </button>
                    {/*endregion*/}
                    {/*region separator*/}
                    <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"/>
                    {/*endregion*/}


                    {/*region profile image menu*/}

                    <img
                        alt=""
                        src="/src/assets/images/profile.jpg"
                        className="inline-block size-14 rounded-full"
                    />

                    {/*endregion*/}





                </div>
                {/*endregion*/}
            </div>
            {/*endregion*/}
        </div>
    );
}
//endregion

export default Header;

