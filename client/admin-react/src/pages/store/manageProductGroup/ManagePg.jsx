// src/pages/store/manageProductGroup/ManagePg.jsx
import React from "react";
import SearchPg from "./SearchPg.jsx";
import { SquarePlus } from "lucide-react";
import TablePg from "./TablePg.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenAddProductModal } from "../../../redux/features/product/productSlice.js";
import ModalComponent from "../../../components/modals/ModalComponent.jsx";
import AddPg from "./AddPg.jsx";


function ManagePg() {


    const {isOpenAddProductModal} = useSelector((state) => state.productReducer);
    const dispatch = useDispatch();

    return (
        <>
            <div
                className={`h-full w-full flex flex-col items-center overflow-visible transition-filter duration-200 ${
                    isOpenAddProductModal ? "blur-sm" : ""
                }`}
                aria-hidden={isOpenAddProductModal ? "true" : "false"}
            >
                <h1 className="text-2xl font-bold text-gray-400 font-mono mb-4">manage products group</h1>

                <div className="flex justify-between items-center w-full mb-4">
                    <SearchPg />
                    <div
                        className="text-gray-400 cursor-pointer p-2 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors"
                         onClick={() => dispatch(setIsOpenAddProductModal(true))}
                        aria-label="Add product group"
                    >
                        <SquarePlus size={"2.2rem"} />
                    </div>
                </div>

                <div className="w-full">
                    <TablePg />
                </div>
            </div>

            {/* modal mounted here */}
            <ModalComponent isOpen={isOpenAddProductModal} onClose={()=>dispatch(setIsOpenAddProductModal(false))}>
                <AddPg/>
            </ModalComponent>
        </>
    );
}

export default ManagePg;
