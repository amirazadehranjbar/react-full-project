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
        images: product.images
    });

    //region✅ handle is On sale
    const [enabled, setEnabled] = useState(product.isOnSale);

    const handleSetEnabled = () => {
        setEnabled(!enabled)
    }
    //endregion


    //region✅ handle product new images and preview them
    const [prodImages, setProdImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    //endregion


    const handleSetNewProductInfo = (e) => {
        // Update product name/price as user types
        setNewProductInfo({
            ...newProductInfo,
            [e.target.name]: e.target.value
            // Images are handled separately in handleUploadAndUpdate function
        })
    };









    //region✅upload images to Supabase
    const uploadImagesToSupabase = (files) => {
        // Convert FileList to Array for easier manipulation
        const filesArray = Array.from(files);
        setProdImages(filesArray);

        // Create temporary preview URLs for admin review
        const urls = filesArray.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        console.log('Files selected:', filesArray.map(f => f.name));
    }

    const [isUploading , setIsUploading] = useState(false);

    const handleUploadAndUpdate = async () => {
        try {
            setIsUploading(true);
            // Step 1: Upload images to Supabase storage
            const uploadedUrls = [];


            // Upload each image file
            for (const file of prodImages) {

                // Generate unique filename with timestamp
                const fileName = `${Date.now()}_${file.name}`;

                // Use product ID as folder name (never changes even if product is renamed)
                const productFolderName = product._id; // MongoDB ID - always unique and stable

                // Path structure: products/categoryName/productName/fileName
                const filePath =  `products/${categoryName}/${productFolderName}/${fileName}`;

                // Upload file to Supabase storage bucket 'images'
                const { data, error } = await supabase.storage
                    .from('images')
                    .upload(filePath, file);

                if (error) {
                    console.error('Supabase upload error:', error);
                    throw error;
                }

                // Get public URL for the uploaded image
                const { data: urlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(filePath);

                uploadedUrls.push(urlData.publicUrl);
            }

            console.log('Images uploaded to Supabase:', uploadedUrls);

            // Step 2: Call backend API to update product with new image URLs
            const response = await fetch('http://localhost:3500/api/admin/product/update', {
                method: 'PUT',
                credentials: 'include', // ← Add this - sends httpOnly cookies automatically
                headers: {
                    'Content-Type': 'application/json'
                    // No Authorization header needed - cookie is sent automatically
                },
                body: JSON.stringify({
                    productID: product._id,
                    name: newProductInfo.name,
                    price: newProductInfo.price,
                    isOnSale: enabled,
                    imageUrls: uploadedUrls
                })
            });

            const result = await response.json();

            if (result.success) {
                console.log('Product updated successfully:', result.data);
                
                // Update state with fresh data from backend response
                // This ensures the UI shows the latest data from MongoDB after update
                setNewProductInfo({
                    name: result.data.name,           // Updated product name from database
                    price: result.data.price,         // Updated price from database
                    isOnSale: result.data.isOnSale,   // Updated sale status from database
                    images: result.data.images        // Fresh image URLs from database (the new uploaded images)
                });
                
                // Update the isOnSale toggle state to match the database value
                setEnabled(result.data.isOnSale);
                
                // Clear preview after successful upload
                setPreviewUrls([]);
                setProdImages([]);
                
                alert('Product updated successfully!');
            } else {
                console.error('Backend update error:', result.message);
                alert('Error updating product: ' + result.message);
            }

        } catch (error) {
            console.error('Upload and update error:', error);
            alert('Error: ' + error.message);
        }finally {
            setIsUploading(false);
        }
    }
    //endregion




    if (!product) return <div>Product not found</div>;


    return (
        <div className="flex flex-col items-center h-full w-full bg-slate-300">

            <h3 className="text-xl font-mono flex mt-3 mb-3">edite product information
                <p className="ml-2 font-bold text-sky-800">{product.name}</p>
            </h3>

            {/* Show images from state (updates after upload) instead of initial props */}
            {/* This allows the slider to display new images immediately after successful upload */}
            <SliderComp imagesList={newProductInfo.images}/>

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
                    <input type="number"
                           className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200"
                           defaultValue={product.price}
                           name="price"
                           onChange={(e) => handleSetNewProductInfo(e)}/>
                </div>


                <div className="flex-col flex">
                    <label>sale</label>
                    <ToggleSwitchWithIcon enabled={enabled} setEnabled={handleSetEnabled} name="isOnSale"/>
                </div>


            </div>

            <div className="mt-4 w-full px-4">
                {/* File input for selecting images */}
                <input

                    type="file"
                    multiple={true}
                    accept="image/*"
                    onChange={(e) => {
                        uploadImagesToSupabase(e.target.files);
                    }}
                    className="input cursor-pointer"
                />

                {/* Preview section - shows selected images before upload */}
                {previewUrls.length > 0 && (
                    <div className="mt-4 p-4 bg-white rounded-lg">
                        <h4 className="font-bold mb-3 text-slate-700">Preview Selected Images:</h4>
                        <div className="flex gap-3 flex-wrap">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded border-2 border-slate-300"
                                    />
                                    <span className="absolute top-1 right-1 bg-slate-700 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                        </span>
                                </div>
                            ))}
                        </div>

                        {/* Confirm and upload button */}
                        <button
                            disabled={isUploading}
                            onClick={handleUploadAndUpdate}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isUploading ? "⏳ Uploading images..." :"✓ Confirm & Upload to Supabase"}
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default EditeProductsInfo
