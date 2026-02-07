import {configureStore} from "@reduxjs/toolkit";
import GeneralDataReducer from "@/redux/features/GeneralDataReducer";


const  store = configureStore(
    {
        reducer:{
            GeneralDataReducer : GeneralDataReducer,
        }
    }
)

export default store;