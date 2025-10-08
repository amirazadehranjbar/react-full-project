import SearchPg from "../manageProductGroup/SearchPg.jsx";
import {SquarePlus} from "lucide-react";
import ModalComponent from "../../../components/modals/ModalComponent.jsx";
import TableComponent from "../../../components/table/TableComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenAddColors} from "../../../redux/features/colors/colorsSlice.js";
import AddColor from "./AddColor.jsx";
import TableColor from "./TableColor.jsx";


function ManageColors() {

    const {isLoading , isError, isOpenAddColors , colors , dataHeaders} = useSelector(state => state.colorsReducer);
    const dispatch = useDispatch();

    const onClose = ()=>dispatch(setIsOpenAddColors(false));

    return (
        <>
            <div
                className={`h-full w-full flex flex-col items-center overflow-visible transition-filter duration-200 ${
                    isOpenAddColors ? "blur-sm" : ""
                }`}
                aria-hidden={isOpenAddColors ? "true" : "false"}
            >
                <h1 className="text-2xl font-bold text-gray-400 font-mono mb-4">manage products group</h1>

                <div className="flex justify-between items-center w-full mb-4">
                    <SearchPg />
                    <div
                        className="text-gray-400 cursor-pointer p-2 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        onClick={() => dispatch(setIsOpenAddColors(true))}
                        aria-label="Add product group"
                    >
                        <SquarePlus size={"2.2rem"} />
                    </div>
                </div>

                <div className="w-full">
                    <TableColor data={colors} dataHeaders={dataHeaders}/>
                </div>
            </div>

            {/* modal mounted here */}
            <ModalComponent isOpen={isOpenAddColors} onClose={onClose}>
                <AddColor/>
            </ModalComponent>
        </>
    )
}

export default ManageColors
