// frontend/src/pages/products/ProductDetails.jsx
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {ProductDetailsComp} from "./components/ProductDetailsComp.jsx"
import {HelperFunctions} from "./helperFunctions/HelperFunctions.js";

function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {product, adminMode} = location.state || {};

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    // ✅ Debugging
    useEffect(() => {
        console.log("Location state:", location.state);
    }, [location.state]);

    // ✅ Handle missing product (if user navigates directly to URL)
    if (!product) {
        return (
            <ProductDetailsComp.MissingProductComp onClick={() => navigate("/api/user")}/>
        );
    }

    const images = product.images || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <ProductDetailsComp.BreadCrumbComp onClick={() => navigate("/api/user")} onClick1={() => navigate(-1)} product={product}/>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-8">
                    {/* Image Gallery */}
                    {/* Passing wrapped helper functions with required parameters to ImageGalleryComp */}
                    {/* onClick: Previous image handler - wraps prevImage with setCurrentImageIndex and images array */}
                    {/* onClick1: Next image handler - wraps nextImage with setCurrentImageIndex and images array */}
                    <ProductDetailsComp.ImageGalleryComp images={images} currentImageIndex={currentImageIndex} product={product}
                                      onClick={() => HelperFunctions.prevImage(setCurrentImageIndex, images)} 
                                      onClick1={() => HelperFunctions.nextImage(setCurrentImageIndex, images)} 
                                      callbackfn={(img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-24 rounded-lg overflow-hidden transition-all ${
                                idx === currentImageIndex
                                    ? 'ring-4 ring-indigo-600 scale-105'
                                    : 'ring-2 ring-gray-300 hover:ring-indigo-400'
                            }`}
                        >
                            <img
                                src={img}
                                alt={`${product.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    )}/>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <p className="text-4xl font-bold text-indigo-600">
                                ${product.price}
                            </p>
                            {product.isOnSale && product.originalPrice && (
                                <p className="text-2xl text-gray-400 line-through">
                                    ${product.originalPrice}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="border-t border-b border-gray-200 py-6 mb-6">
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || "High-quality product with excellent features and performance."}
                            </p>
                        </div>

                        {/*region Specifications */}
                        {(product.brand || product.model || product.warranty) && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Specifications</h3>
                                <dl className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                    {product.brand && (
                                        <div className="flex justify-between">
                                            <dt className="font-medium text-gray-700">Brand:</dt>
                                            <dd className="text-gray-900">{product.brand}</dd>
                                        </div>
                                    )}
                                    {product.model && (
                                        <div className="flex justify-between">
                                            <dt className="font-medium text-gray-700">Model:</dt>
                                            <dd className="text-gray-900">{product.model}</dd>
                                        </div>
                                    )}
                                    {product.warranty && (
                                        <div className="flex justify-between">
                                            <dt className="font-medium text-gray-700">Warranty:</dt>
                                            <dd className="text-gray-900">{product.warranty}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        )}
                        {/*endregion*/}

                        {/* Quantity Selector */}
                        {/* Only shown when not in admin mode */}
                        {!adminMode
                            ? <ProductDetailsComp.QuantitySelectorComp 
                                    onClick={() => HelperFunctions.decrementQuantity(setQuantity)} 
                                    quantity={quantity}
                                    onClick1={() => HelperFunctions.incrementQuantity(setQuantity)}/>
                            : null}

                        {/* Add to Cart Button */}
                        {/* Only shown when not in admin mode */}
                        {/* onClick: Wrapped handleAddToCart with all required parameters: dispatch, product, quantity, setIsAdding */}
                        {!adminMode ? <button
                            onClick={() => HelperFunctions.handleAddToCart(dispatch, product, quantity, setIsAdding)}
                            disabled={isAdding}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            {isAdding ? "Adding to Cart..." : `Add ${quantity} to Cart`}
                        </button> : null}

                        {/* Buy Now Button */}
                        {!adminMode ? <button
                            className="w-full bg-gray-200 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition">
                            Buy Now
                        </button> : null}

                        {/* Additional Info */}
                        {!adminMode
                            ? <ProductDetailsComp.AdditionalInfoComp/>
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
