import {Tabs} from "@heroui/react";
import {Keyboard, Monitor, Mouse, SpeakerIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProductsByCategory} from "../../../../redux/features/product/productSlice.js";
import {getCategory} from "../../../../redux/features/category/categoryReducer.js";


export default function TabsComp() {

    const {isLoadingCategory, isErrorCategory, errorCategory, categories} = useSelector(state => state.categoryReducer);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);


    return (
        <Tabs className="w-full max-w-lg bg-gray-500 h-screen" orientation="vertical">
            <Tabs.ListContainer className="w-full h-screen">


                <Tabs.List aria-label="Vertical tabs" className="bg-gray-300 rounded-none h-full">

                    {isLoadingCategory && <div>is loading ...</div>}

                    {isErrorCategory && <div>Error</div>}

                    {categories && categories.length > 0 && (<>
                        {categories.map(category => {
                            return (
                                <Tabs.Tab id={category.name} className="text-lg" key={category._id}>
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
                        <Tabs.Panel className="px-4" id={category.name} key={category._id}>

                            <h3 className="mb-2 font-semibold">{category.name}</h3>

                        </Tabs.Panel>
                    );
                })}
            </>)}

        </Tabs>
    );
}