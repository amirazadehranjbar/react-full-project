// frontend/src/pages/products/ProductDetails.jsx
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/features/auth/authUserSlice.js";

function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { product } = location.state || {};
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    // ✅ Debugging
    useEffect(() => {
        console.log("Location state:", location.state);
        console.log("Product:", product);
    }, [location.state, product]);

    // ✅ Handle missing product (if user navigates directly to URL)
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate("/api/user")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Back to Categories
                    </button>
                </div>
            </div>
        );
    }

    const images = product.images || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            await dispatch(addToCart({productID: product._id, quantity: quantity})).unwrap();
            alert(`Added ${quantity} item(s) to cart!`);
        } catch (error) {
            alert("Failed to add to cart: " + (error.message || "Please try again"));
        } finally {
            setIsAdding(false);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm">
                    <button 
                        onClick={() => navigate("/api/user")}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                        Categories
                    </button>
                    <span className="text-gray-400">›</span>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                        Products
                    </button>
                    <span className="text-gray-400">›</span>
                    <span className="text-gray-600">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-8">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-2xl mb-4 group">
                            <img
                                src={images[currentImageIndex] || '/placeholder.png'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Sale Badge */}
                            {product.isOnSale && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    🔥 ON SALE
                                </div>
                            )}

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                                    >
                                        →
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {images.length}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {images.map((img, idx) => (
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
                                ))}
                            </div>
                        )}
                    </div>

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

                        {/* Specifications */}
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

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={decrementQuantity}
                                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition"
                                >
                                    −
                                </button>
                                <span className="text-2xl font-semibold w-16 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={incrementQuantity}
                                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            {isAdding ? "Adding to Cart..." : `Add ${quantity} to Cart`}
                        </button>

                        {/* Buy Now Button */}
                        <button className="w-full bg-gray-200 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition">
                            Buy Now
                        </button>

                        {/* Additional Info */}
                        <div className="mt-6 space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span>🚚</span>
                                <span>Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>↩️</span>
                                <span>30-day return policy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>🔒</span>
                                <span>Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
