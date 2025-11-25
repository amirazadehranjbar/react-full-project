// frontend/src/pages/products/ProductsInCategory.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../redux/features/product/productSlice.js";
import { useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import {addToCart} from "../../redux/features/auth/authUserSlice.js";

function ProductsInCategory() {
    const location = useLocation();
    const categoryID = location.state.categoryID;


    const { isLoading, isError, message, categoryName, data } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsByCategory({ categoryID }));
    }, [categoryID, dispatch]);


    return (
        <div className="bg-white">
            {isError && (<div className="text-red-600 p-4">Error: {message}</div>)}

            {isLoading && (
                <div className="flex justify-center items-center h-full py-20">
                    <RingLoader color="#4F46E5" />
                </div>
            )}

            {data && data.length > 0 && (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>

                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {data.map((product, index) => (
                            <ProductCard key={product._id || index} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

//region ✅ Separate Product Card Component
function ProductCard({ product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const images = product.images || [];
    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            await dispatch(addToCart({ productID: product._id, quantity: 1 }));
            alert("Product added to cart!"); // Or use a toast notification
        } catch (error) {
            alert("Failed to add to cart: " + (error.message || "Please try again"));
        } finally {
            setIsAdding(false);
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };


    return (
        <div>
            <div className="relative">
                {/* Main Image */}
                <div className="relative h-72 w-full overflow-hidden rounded-lg group shadow-xl ring-slate-200 ring-1">
                    <img
                        alt={product.name}
                        src={images[currentImageIndex] || '/placeholder.png'}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Image Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ←
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                →
                            </button>

                            {/* Image Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            idx === currentImageIndex
                                                ? 'bg-white w-4'
                                                : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Product Info */}
                <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">${product.price}</p>
                </div>

                {/* Sale Badge */}
                {product.isOnSale && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        SALE
                    </div>
                )}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
                <button
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 w-full shadow-md shadow-gray-400 cursor-pointer hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? "Adding..." : "Add to bag"}
                </button>
            </div>
        </div>
    );
}
// endregion

export default ProductsInCategory;





















