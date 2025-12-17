import React, {useState} from 'react'
import {useLocation} from "react-router-dom";
import SliderComp from "../../../components/slider/SliderComp.jsx";
import ToggleSwitchWithIcon from "../../../components/toggleSwitch/ToggleSwitchWithIcon.jsx";
import supabase from "../../../utilities/supabaseConfig.js";

function EditeProductsInfo() {

    const location = useLocation();


    const product = location.state?.item;
    const categoryName = location.state?.category.name;



    const [newProductInfo, setNewProductInfo] = useState({
        name: product.name,
        price: product.price,
        isOnSale: product.isOnSale,
        images: []
    });

    //✅ handle is On sale
    const [enabled, setEnabled] = useState(product.isOnSale);

    const handleSetEnabled = () => {
        setEnabled(!enabled)
    }


    //✅ handle product new images
    const [prodImages, setProdImages] = useState([]);

    const handleSetProdImages = (e) => {
        setProdImages([prodImages.push(e.target.files)])
    }


    const handleSetNewProductInfo = (e) => {

        setNewProductInfo({
            ...newProductInfo,
            [e.target.name]: e.target.value,
            images: prodImages
        })

    };

    const getAllCategoryImages = async () => {

        const { data } = supabase.storage.from('images').getPublicUrl('filePath.jpg')

        console.log(data.publicUrl)

    }


    if (!product) return <div>Product not found</div>;


    return (
        <div className="flex flex-col items-center h-full w-full bg-slate-300">

            <h3 className="text-xl font-mono flex mt-3 mb-3">edite product information
                <p className="ml-2 font-bold text-sky-800">{product.name}</p>
            </h3>

            <SliderComp imagesList={product.images}/>

            <div className="flex justify-center items-center p-2 space-x-3 w-full">

                <div className="flex-col flex">
                    <label>name</label>
                    <input className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200"
                           defaultValue={product.name} name="name" onChange={(e) => {
                        handleSetNewProductInfo(e);
                        console.log(newProductInfo)
                    }}/>
                </div>


                <div className="flex-col flex">
                    <label>price</label>
                    <input type="number" className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200"
                           defaultValue={product.price} name="price"/>
                </div>


                <div className="flex-col flex">
                    <label>sale</label>
                    <ToggleSwitchWithIcon enabled={enabled} setEnabled={handleSetEnabled} name="isOnSale"/>
                </div>


            </div>




        </div>
    )
}

export default EditeProductsInfo
