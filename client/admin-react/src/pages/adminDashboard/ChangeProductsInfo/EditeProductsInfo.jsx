import React, {useState, useEffect} from 'react'
import {useLocation, useParams, useNavigate} from "react-router-dom";
import SliderComp from "../../../components/slider/SliderComp.jsx";
import ToggleSwitchWithIcon from "../../../components/toggleSwitch/ToggleSwitchWithIcon.jsx";
import supabase from "../../../utilities/supabaseConfig.js";

function EditeProductsInfo() {

    const location = useLocation();
    const navigate = useNavigate();
    const initialProduct = location.state?.item;
    const initialCategory = location.state?.category;

    // State to hold current product data (will be updated from backend if needed)
    const [product, setProduct] = useState(initialProduct);
    const [categoryName, setCategoryName] = useState(initialCategory?.name);
    const [isLoading, setIsLoading] = useState(false);


    const [newProductInfo, setNewProductInfo] = useState({
        name: initialProduct?.name || '',
        price: initialProduct?.price || 0,
        isOnSale: initialProduct?.isOnSale || false,
        images: initialProduct?.images || []
    });

    //region✅ handle is On sale
    const [enabled, setEnabled] = useState(initialProduct?.isOnSale || false);

    const handleSetEnabled = () => {
        setEnabled(!enabled)
    }
    //endregion

    //region✅ Fetch product data from backend if location.state is missing (page refresh case)
    useEffect(() => {
        const fetchProductData = async () => {
            // If we don't have product data (page refresh), try to get product ID from URL or navigate back
            if (!initialProduct) {
                alert('Product data not found. Please select a product from the list.');
                navigate('/manage-products-images');
                return;
            }
            
            // Always fetch fresh data from backend to ensure we have latest
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3500/api/user/product/${initialProduct._id}`, {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                
                const result = await response.json();
                
                if (result.success && result.data) {
                    // Update all states with fresh data from database
                    setProduct(result.data);
                    setNewProductInfo({
                        name: result.data.name,
                        price: result.data.price,
                        isOnSale: result.data.isOnSale,
                        images: result.data.images
                    });
                    setEnabled(result.data.isOnSale);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Error loading product data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchProductData();
    }, [initialProduct?._id]); // Run when component mounts or product ID changes
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
                    isOnSale: enabled.toString(), // Convert boolean to string ('true' or 'false')
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

    //region✅ Helper function to upload new images to Supabase
    const uploadNewImages = async () => {
        const uploadedUrls = [];
        
        // Upload each selected image file to Supabase storage
        for (const file of prodImages) {
            // Generate unique filename with timestamp to avoid conflicts
            const fileName = `${Date.now()}_${file.name}`;
            
            // Use product ID as folder name (stable, never changes with product rename)
            const productFolderName = product._id;
            
            // Full path: products/categoryName/productID/filename
            const filePath = `products/${categoryName}/${productFolderName}/${fileName}`;
            
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
        
        return uploadedUrls;
    };
    //endregion

    //region✅ Save all product info (with or without new images)
    const handleSaveAllChanges = async () => {
        try {
            setIsUploading(true);
            
            // Determine which images to use:
            // If new images were selected (prodImages has files), upload them first
            // Otherwise, keep the existing images from newProductInfo.images
            let imagesToSave = newProductInfo.images;
            
            if (prodImages.length > 0) {
                // Upload new images to Supabase and get their URLs
                imagesToSave = await uploadNewImages();
                console.log('New images uploaded to Supabase:', imagesToSave);
            }
            
            // Call backend API to update product with all information
            const response = await fetch('http://localhost:3500/api/admin/product/update', {
                method: 'PUT',
                credentials: 'include', // Send httpOnly cookies automatically
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productID: product._id,
                    name: newProductInfo.name,      // Updated or original name
                    price: newProductInfo.price,    // Updated or original price
                    isOnSale: enabled.toString(),   // Convert boolean to string ('true' or 'false') for backend
                    imageUrls: imagesToSave         // New images or existing images
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('All changes saved successfully:', result.data);
                
                // Update state with fresh data from backend response
                // This ensures UI shows the latest data from MongoDB
                setNewProductInfo({
                    name: result.data.name,           // Updated product name from database
                    price: result.data.price,         // Updated price from database
                    isOnSale: result.data.isOnSale,   // Updated sale status from database
                    images: result.data.images        // Updated image URLs from database
                });
                
                // Update toggle state to match database
                setEnabled(result.data.isOnSale);
                
                // Clear preview and selected files after successful save
                setPreviewUrls([]);
                setProdImages([]);
                
                alert('All changes saved successfully! ✅');
            } else {
                console.error('Backend update error:', result.message);
                alert('Error saving changes: ' + result.message);
            }
            
        } catch (error) {
            console.error('Save error:', error);
            alert('Error: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };
    //endregion




    if (!product) return (
        <div className="flex items-center justify-center h-screen bg-slate-300">
            <div className="text-xl text-slate-700">
                {isLoading ? 'Loading product data...' : 'Product not found'}
            </div>
        </div>
    );


    return (
        <div className="flex flex-col items-center h-full w-full bg-slate-300">

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-lg">Loading...</p>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-mono flex mt-3 mb-3">edite product information
                <p className="ml-2 font-bold text-sky-800">{newProductInfo.name}</p>
            </h3>

            {/* Show images from state (updates after upload) instead of initial props */}
            {/* This allows the slider to display new images immediately after successful upload */}
            <SliderComp imagesList={newProductInfo.images}/>

            <div className="flex justify-center items-center p-2 space-x-3 w-full">

                <div className="flex-col flex">
                    <label>name</label>
                    {/* Controlled input - value from state, updates state on change */}
                    <input className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200"
                           value={newProductInfo.name}
                           name="name" 
                           onChange={(e) => handleSetNewProductInfo(e)}/>
                </div>


                <div className="flex-col flex">
                    <label>price</label>
                    {/* Controlled input - value from state, updates state on change */}
                    <input type="number"
                           className="bg-slate-500 p-1 rounded-md outline-none pl-2 text-slate-200"
                           value={newProductInfo.price}
                           name="price"
                           onChange={(e) => handleSetNewProductInfo(e)}/>
                </div>


                <div className="flex-col flex">
                    <label>sale</label>
                    <ToggleSwitchWithIcon enabled={enabled} setEnabled={handleSetEnabled} name="isOnSale"/>
                </div>


            </div>

            {/* Save All Changes button - always visible, works with or without new images */}
            <div className="mt-6 w-full px-4 flex justify-center">
                <button
                    onClick={handleSaveAllChanges}
                    disabled={isUploading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                    {isUploading ? "⏳ Saving..." : "💾 Save All Changes"}
                </button>
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
