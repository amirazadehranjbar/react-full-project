import {createSlice} from "@reduxjs/toolkit";

const operations = ["Trash2","Pencil"];

const initialState={
    isOpenAddGuaranties: false,
    data:[

        {guarantyTitle: "title 1" , guarantyPeriod:"15 month",
        description:"description 1" , operation:operations},

        {guarantyTitle: "title 2" , guarantyPeriod:"5 month",
            description:"description 2" , operation:operations},

        {guarantyTitle: "title 3" , guarantyPeriod:"24 month",
            description:"description 3" , operation:operations},

        {guarantyTitle: "title 4" , guarantyPeriod:"4 month",
            description:"description 4" , operation:operations},
    ],
    dataHeaders:["guaranty title" , "guaranty period" , "description" , "operation"],
    isLoading: false,
    isError: false,
}


const GuarantiesSlice = createSlice({
    name:"guaranties",
    initialState:initialState,

    reducers:{

        setIsOpenAddGuaranties:(state , action)=>{
            state.isOpenAddGuaranties = action.payload;
        }
    }
});

export const {setIsOpenAddGuaranties} = GuarantiesSlice.actions;
export default GuarantiesSlice.reducer;