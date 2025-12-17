import {Tabs} from "@heroui/react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProductsByCategory} from "../../../../redux/features/product/productSlice.js";
import {getCategory} from "../../../../redux/features/category/categoryReducer.js";
import {Link} from "react-router-dom";


export default function TabsComp() {

    const {isLoadingCategory, isErrorCategory, categories} = useSelector(state => state.categoryReducer);

    const {data, isLoading, isError} = useSelector(state => state.productReducer);
    const [categoryID, setCategoryID] = useState("");


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductsByCategory({categoryID}))
    }, [categoryID, dispatch]);


    return (
        <Tabs className="w-full bg-transparent h-screen" orientation="vertical">
            <Tabs.ListContainer className="h-screen">


                <Tabs.List aria-label="Vertical tabs" className="bg-gray-300 rounded-none h-full">

                    {isLoadingCategory && <div>is loading ...</div>}

                    {isErrorCategory && <div>Error</div>}

                    {categories && categories.length > 0 && (<>
                        {categories.map(category => {

                            return (
                                <Tabs.Tab id={category.name} className="text-lg" key={category._id} onClick={() => {
                                    setCategoryID(category._id);
                                }}>
                                    <div className="flex w-full justify-between items-center">
                                        {<img alt="icon" src={category.icon} className="w-1/5" color={`#6a7282`}/>}
                                        {category.name}
                                    </div>
                                    <Tabs.Indicator className="rounded-md"/>
                                </Tabs.Tab>
                            );
                        })}
                    </>)}


                </Tabs.List>
            </Tabs.ListContainer>
            {isLoadingCategory && <div>is loading ...</div>}

            {isErrorCategory && <div>Error</div>}

            {categories && categories.length > 0 && (<>
                {categories.map(category => {
                    return (
                        <Tabs.Panel className="w-full" id={category.name} key={category._id}>
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-6 pr-6 pb-6">

                                {isLoading && (<div>loading....</div>)}

                                {isError && (<div>Error</div>)}

                                {data && data.length > 0 && (<>
                                    {data.map(item => {
                                        return (<Link
                                            key={item._id}
                                            className="border-2 border-gray-400 h-fit p-4 rounded-lg hover:shadow-lg hover:scale-105 hover:shadow-gray-800 transition-all duration-300 cursor-pointer bg-white"
                                            to="/edite-products-info" state={{item: item , category:category}}>
                                            <div className="text-center font-bold text-gray-800 ">
                                                {item.name}
                                            </div>
                                        </Link>);
                                    })}
                                </>)}


                            </div>
                        </Tabs.Panel>
                    );
                })}
            </>)}

        </Tabs>
    );
}