import React, {useState} from 'react'
import {useLocation} from "react-router-dom";
import SliderComp from "../../../components/slider/SliderComp.jsx";
import ToggleSwitchWithIcon from "../../../components/toggleSwitch/ToggleSwitchWithIcon.jsx";

function EditeProductsInfo() {

    const location = useLocation();


    const product = location.state?.item;

    const [enabled, setEnabled] = useState(product.isOnSale);

    console.log(enabled)

    const handleSetEnabled = ()=>{
        setEnabled(!product.isOnSale)
    }

    if (!product) return <div>Product not found</div>;




    return (
        <div className="flex flex-col items-center h-full w-full bg-slate-300">

            <h3 className="text-xl font-mono flex">edite product information
                <p className="ml-2 font-bold text-sky-800">{product.name}</p>
            </h3>

            <SliderComp imagesList={product.images}/>

            <div className="flex justify-center items-center p-2 space-x-3 w-full">

                <div className="flex-col flex">
                    <label>name</label>
                    <input className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200" value={product.name}/>
                </div>

                <div className="flex-col flex">
                    <label>price</label>
                    <input type="number" className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200" value={product.price}/>
                </div>
                <div className="flex-col flex">
                    <label>sale</label>
                    <ToggleSwitchWithIcon enabled={product.isOnSale} setEnabled={handleSetEnabled}/>
                </div>
            </div>




        </div>
    )
}

export default EditeProductsInfo
