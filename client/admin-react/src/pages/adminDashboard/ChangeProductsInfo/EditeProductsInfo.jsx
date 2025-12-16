import React from 'react'
import {useLocation} from "react-router-dom";
import SliderComp from "../../../components/slider/SliderComp.jsx";

function EditeProductsInfo() {

    const location = useLocation();


    const product = location.state?.item;

    if (!product) return <div>Product not found</div>;

    console.log(product.images);


    return (
        <div className="flex flex-col items-center h-full w-full bg-slate-300">

            <h3 className="text-xl font-mono flex">edite product information
                <p className="ml-2 font-bold text-sky-800">{product.name}</p>
            </h3>

            <SliderComp imagesList={product.images}/>


        </div>
    )
}

export default EditeProductsInfo
