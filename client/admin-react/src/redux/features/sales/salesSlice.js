import {createSlice} from "@reduxjs/toolkit";


// region Initial State
const initialState = {

    isLoading:false,
    isError:false,
    dataHeaders:[
        "category",
        "title",
        "status",
        "operation",
    ],
    data: [
        {
            category: "cat 1",
            title: "title 1",
            status: "20%",
            operation: "/src/assets/icons/inventory/reorder.png"
        },
        {
            category: "cat 2",
            title: "title 1",
            status: "45%",
            operation: "/src/assets/icons/inventory/reorder.png"
        },
        {
            category: "cat 3",
            title: "title 1",
            status: "70%",
            operation: "/src/assets/icons/inventory/reorder.png"
        },
        {
            category: "cat 4",
            title: "title 1",
            status: "95%",
            operation: "/src/assets/icons/inventory/reorder.png"
        },
        {
            category: "cat 5",
            title: "title 1",
            status: "3%",
            operation: "/src/assets/icons/inventory/reorder.png"
        },
    ]

};
// endregion

const SalesSlice = createSlice({
    name: "Sales",
    initialState: initialState,

    reducers:{



    }
});


export default SalesSlice.reducer;