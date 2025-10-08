import SearchPg from "../manageProductGroup/SearchPg.jsx";
import {SquarePlus} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenAddGuaranties} from "../../../redux/features/guaranties/guarantiesSlice.js";
import TableGuaranties from "./TableGuaranties.jsx";
import ModalComponent from "../../../components/modals/ModalComponent.jsx";
import AddGuaranty from "./AddGuaranty.jsx";

function ManageGuaranties() {

    const {data, isLoading, isError, dataHeaders, isOpenAddGuaranties} = useSelector(state => state.guarantiesReducer);

    const dispatch = useDispatch();

    return (
        <>
            <div
                className={`h-full w-full flex flex-col items-center overflow-visible transition-filter duration-200 ${
                    isOpenAddGuaranties ? "blur-sm" : ""
                }`}
                aria-hidden={isOpenAddGuaranties ? "true" : "false"}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-500  shadow-xl tracking-tight p-2 rounded-md">
                    Manage Guarantees
                </h1>

                <div className="flex justify-between items-center w-full mb-4">
                    <SearchPg/>
                    <div
                        className="text-gray-400 cursor-pointer p-2 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        onClick={() => dispatch(setIsOpenAddGuaranties(true))}
                        aria-label="Add guaranty"
                    >
                        <SquarePlus size={"2.2rem"}/>
                    </div>
                </div>

                <div className="w-full">
                    <TableGuaranties data={data} dataHeaders={dataHeaders}/>
                </div>

                <ModalComponent isOpen={isOpenAddGuaranties} onClose={() => dispatch(setIsOpenAddGuaranties(false))}>
                    <AddGuaranty/>
                </ModalComponent>
            </div>
        </>
    )
}

export default ManageGuaranties
