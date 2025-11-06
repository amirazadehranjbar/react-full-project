// frontend/src/pages/store/manageProductGroup/AddPg.jsx
import React, { useState, useEffect } from "react";
import { PlusSquare, X, Upload } from "lucide-react";
import { DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/features/category/categoryReducer.js";

function AddPg({ onClose }) {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categoryReducer);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        inventory: "",
        targetInventory: "",
        categoryID: "",
        isOnSale: false
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    // Handle image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + images.length > 5) {
            setError("Maximum 5 images allowed");
            return;
        }

        setImages(prev => [...prev, ...files]);

        // Create preview URLs
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    // Remove image
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            URL.revokeObjectURL(prev[index]); // Clean up URL
            return prev.filter((_, i) => i !== index);
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Create FormData
            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formData.price);
            data.append('inventory', formData.inventory);
            data.append('targetInventory', formData.targetInventory);
            data.append('categoryID', formData.categoryID);
            data.append('isOnSale', formData.isOnSale);

            // Append images
            images.forEach(image => {
                data.append('images', image);
            });

            const response = await fetch('http://localhost:3500/api/admin/product', {
                method: 'POST',
                credentials: 'include',
                body: data
            });

            const result = await response.json();

            if (result.success) {
                alert('Product added successfully!');
                onClose();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || 'Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-2">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <PlusSquare aria-hidden="true" className="size-6 text-green-600" />
            </div>

            <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Add New Product
                </DialogTitle>

                {error && (
                    <div className="mt-2 text-red-600 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* Product Name */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                            Product Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter product name"
                            className="w-full bg-white border border-gray-300 py-2 px-3 text-base text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-800 mb-1">
                            Price *
                        </label>
                        <input
                            id="price"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="0.00"
                            className="w-full bg-white border border-gray-300 py-2 px-3 text-base text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Inventory */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="inventory" className="block text-sm font-medium text-gray-800 mb-1">
                            Current Inventory *
                        </label>
                        <input
                            id="inventory"
                            type="number"
                            required
                            min="0"
                            value={formData.inventory}
                            onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                            placeholder="0"
                            className="w-full bg-white border border-gray-300 py-2 px-3 text-base text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Target Inventory */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="targetInventory" className="block text-sm font-medium text-gray-800 mb-1">
                            Target Inventory *
                        </label>
                        <input
                            id="targetInventory"
                            type="number"
                            required
                            min="0"
                            value={formData.targetInventory}
                            onChange={(e) => setFormData({ ...formData, targetInventory: e.target.value })}
                            placeholder="0"
                            className="w-full bg-white border border-gray-300 py-2 px-3 text-base text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="categoryID" className="block text-sm font-medium text-gray-800 mb-1">
                            Category *
                        </label>
                        <select
                            id="categoryID"
                            required
                            value={formData.categoryID}
                            onChange={(e) => setFormData({ ...formData, categoryID: e.target.value })}
                            className="w-full bg-white border border-gray-300 py-2 px-3 text-base text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Is On Sale */}
                    <div className="flex items-center">
                        <input
                            id="isOnSale"
                            type="checkbox"
                            checked={formData.isOnSale}
                            onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="isOnSale" className="ml-2 text-sm font-medium text-gray-800">
                            On Sale
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col items-start">
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                            Product Images * (Max 5)
                        </label>

                        <div className="w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-5 gap-2 mt-2 w-full">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-20 object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-5">
                        <button
                            type="submit"
                            disabled={isLoading || images.length === 0}
                            className="w-full inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPg;