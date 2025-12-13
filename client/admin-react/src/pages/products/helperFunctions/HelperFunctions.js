// Import necessary Redux action for cart functionality
import {addToCart} from "../../../redux/features/auth/authUserSlice.js";

// ===========================================================================================
// Helper Functions Object - Pure functions that accept all dependencies as parameters
// This approach makes functions predictable, testable, and reusable across components
// ===========================================================================================
export const HelperFunctions = {

    // ===========================================================================================
    // nextImage - Navigate to the next image in the gallery
    // Parameters:
    //   - setCurrentImageIndex: State setter function to update current image index
    //   - images: Array of image URLs or objects
    // Returns: void
    // ===========================================================================================
    nextImage: (setCurrentImageIndex, images) => {
        // Calculate next index using modulo to wrap around to first image after last
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    },

    // ===========================================================================================
    // prevImage - Navigate to the previous image in the gallery
    // Parameters:
    //   - setCurrentImageIndex: State setter function to update current image index
    //   - images: Array of image URLs or objects
    // Returns: void
    // ===========================================================================================
    prevImage: (setCurrentImageIndex, images) => {
        // Calculate previous index, adding images.length before modulo to handle negative values
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    },

    // ===========================================================================================
    // handleAddToCart - Add product to shopping cart with quantity
    // Parameters:
    //   - dispatch: Redux dispatch function to trigger actions
    //   - product: Product object containing product details (must have _id property)
    //   - quantity: Number of items to add to cart
    //   - setIsAdding: State setter function to manage loading state during API call
    // Returns: Promise<void>
    // ===========================================================================================
    handleAddToCart: async (dispatch, product, quantity, setIsAdding) => {
        // Set loading state to true to show loading indicator
        setIsAdding(true);
        try {
            // Dispatch Redux action to add product to cart, unwrap() throws error if action fails
            await dispatch(addToCart({productID: product._id, quantity: quantity})).unwrap();
            // Show success message to user
            alert(`Added ${quantity} item(s) to cart!`);
        } catch (error) {
            // Show error message if cart addition fails
            alert("Failed to add to cart: " + (error.message || "Please try again"));
        } finally {
            // Always reset loading state whether success or failure
            setIsAdding(false);
        }
    },

    // ===========================================================================================
    // incrementQuantity - Increase product quantity by 1
    // Parameters:
    //   - setQuantity: State setter function to update quantity value
    // Returns: void
    // ===========================================================================================
    incrementQuantity: (setQuantity) => {
        // Increment quantity by 1 using previous value
        setQuantity(prev => prev + 1);
    },

    // ===========================================================================================
    // decrementQuantity - Decrease product quantity by 1 (minimum 1)
    // Parameters:
    //   - setQuantity: State setter function to update quantity value
    // Returns: void
    // ===========================================================================================
    decrementQuantity: (setQuantity) => {
        // Decrement quantity but never go below 1 (minimum purchase quantity)
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
};
