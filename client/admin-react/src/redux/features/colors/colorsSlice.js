import {createSlice} from "@reduxjs/toolkit";
import {SquarePen} from "lucide-react";


const initialState = {
    isOpenAddColors: false,
    colors:[
        {colorName:"black", colorCode:"#262626", color:"#262626", operation:"SquarePen"}, // ✅ String
        {colorName:"yellow", colorCode:"#fdd406", color:"#fdd406", operation:"SquarePen"},
        {colorName:"green", colorCode:"#218d01", color:"#218d01", operation:"SquarePen"},
        {colorName:"blue", colorCode:"#1e52c2", color:"#1e52c2", operation:"SquarePen"},
        {colorName:"red", colorCode:"#d21414", color:"#d21414", operation:"SquarePen"},
    ],
    dataHeaders:["color name", "color code", "color", "operation"],
    isLoading: false,
    isError: false,
}

const ColorsSlice = createSlice({
    name: "colors",
    initialState: initialState,

    reducers:{

        setIsOpenAddColors: (state, action) => {
            state.isOpenAddColors = action.payload;
        },
    }
});


export const {setIsOpenAddColors} = ColorsSlice.actions;
export default ColorsSlice.reducer;