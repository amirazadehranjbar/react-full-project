export const ProductDetailsComp = {

//1️⃣===========================================================================================
// Changed from standalone function to object method for proper export structure
MissingProductComp: function(props) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <button
                onClick={props.onClick}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
                Back to Categories
            </button>
        </div>
    </div>;
},
// PropTypes removed from here as they should be defined outside the object or attached differently
//=============================================================================================

//2️⃣===========================================================================================
// Changed from standalone function to object method for proper export structure
BreadCrumbComp: function(props) {
    return <nav className="mb-8 flex items-center gap-2 text-sm">
        <button
            onClick={props.onClick}
            className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
            Categories
        </button>
        <span className="text-gray-400">›</span>
        <button
            onClick={props.onClick1}
            className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
            Products
        </button>
        <span className="text-gray-400">›</span>
        <span className="text-gray-600">{props.product.name}</span>
    </nav>;
},
// PropTypes removed from here as they should be defined outside the object or attached differently
//==============================================================================================

//3️⃣ ===========================================================================================
// Changed from standalone function to object method for proper export structure
ImageGalleryComp: function(props) {
    return <div>
        {/* Main Image */}
        <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-2xl mb-4 group">
            <img
                src={props.images[props.currentImageIndex] || "/placeholder.png"}
                alt={props.product.name}
                className="w-full h-full object-cover"
            />

            {/* Sale Badge */}
            {props.product.isOnSale && (
                <div
                    className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                    🔥 ON SALE
                </div>
            )}

            {/* Navigation Arrows */}
            {props.images.length > 1 && (
                <>
                    <button
                        onClick={props.onClick}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                    >
                        ←
                    </button>
                    <button
                        onClick={props.onClick1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                    >
                        →
                    </button>
                </>
            )}

            {/* Image Counter */}
            {props.images.length > 1 && (
                <div
                    className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {props.currentImageIndex + 1} / {props.images.length}
                </div>
            )}
        </div>

        {/* Thumbnail Gallery */}
        {props.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
                {props.images.map(props.callbackfn)}
            </div>
        )}
    </div>;
},
// Added comma after the component to separate it from the next component in the object
// PropTypes removed from here as they should be defined outside the object or attached differently
//==============================================================================================

//4️⃣==============================================================================================
// Changed from standalone function to object method for proper export structure
QuantitySelectorComp: function(props) {
    return <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Quantity</h3>
        <div className="flex items-center gap-4">
            <button
                onClick={props.onClick}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition"
            >
                −
            </button>
            <span className="text-2xl font-semibold w-16 text-center">
                                    {props.quantity}
                                </span>
            <button
                onClick={props.onClick1}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition"
            >
                +
            </button>
        </div>
    </div>;
},
// Added comma after the component to separate it from the next component in the object
// PropTypes removed from here as they should be defined outside the object or attached differently
//==============================================================================================

//5️⃣==============================================================================================
// Changed from standalone function to object method for proper export structure
// This is the last component so NO comma after it
AdditionalInfoComp: function() {
    return <div className="mt-6 space-y-3 text-sm text-gray-600">
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
    </div>;
}
//==============================================================================================

}; // Closing brace for the ProductDetailsComp object

// ===========================================================================================
// PropTypes Definitions - Adding type validation for all component props
// These validate prop types during development and provide documentation
// ===========================================================================================

// Import PropTypes library for type checking
import PropTypes from 'prop-types';

// PropTypes for MissingProductComp - validates onClick callback function
ProductDetailsComp.MissingProductComp.propTypes = {
    onClick: PropTypes.func  // Function to handle click event for "Back to Categories" button
};

// PropTypes for BreadCrumbComp - validates navigation callback functions and product object
ProductDetailsComp.BreadCrumbComp.propTypes = {
    onClick: PropTypes.func,   // Function to handle click on "Categories" breadcrumb
    onClick1: PropTypes.func,  // Function to handle click on "Products" breadcrumb
    product: PropTypes.any     // Product object containing at minimum a 'name' property
};

// PropTypes for ImageGalleryComp - validates image array, index, product, callbacks, and map function
ProductDetailsComp.ImageGalleryComp.propTypes = {
    images: PropTypes.arrayOf(PropTypes.any),  // Array of image URLs or image objects
    currentImageIndex: PropTypes.number,        // Current index of displayed image (0-based)
    product: PropTypes.any,                     // Product object with 'name' and 'isOnSale' properties
    onClick: PropTypes.func,                    // Function to handle previous image navigation
    onClick1: PropTypes.func,                   // Function to handle next image navigation
    callbackfn: PropTypes.func                  // Callback function for mapping thumbnail images
};

// PropTypes for QuantitySelectorComp - validates quantity number and increment/decrement callbacks
ProductDetailsComp.QuantitySelectorComp.propTypes = {
    onClick: PropTypes.func,   // Function to decrease quantity (minus button)
    quantity: PropTypes.number, // Current quantity value to display
    onClick1: PropTypes.func   // Function to increase quantity (plus button)
};

// AdditionalInfoComp has no props, so no PropTypes needed
