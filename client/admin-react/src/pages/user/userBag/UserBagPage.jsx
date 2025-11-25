// client/admin-react/src/pages/user/userBag/UserBagPage.jsx
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {removeFromCart, updateCartItem, userProfile} from "../../../redux/features/auth/authUserSlice.js";
import Swal from "sweetalert2";
import {getInventory} from "../../../redux/features/inventory/inventorySlice.js";

// Import sub-components
import EmptyCart from './components/EmptyCart';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

/**
 * UserBagPage Component
 * Main shopping cart page
 * Manages cart state, inventory, and user interactions
 */
function UserBagPage() {
    const {isLoading, isError, data} = useSelector(state => state.authUserReducer);
    const {inventoryData} = useSelector(state => state.inventoryReducer);
    const dispatch = useDispatch();

    // Fetch inventory and user profile on mount
    useEffect(() => {
        dispatch(getInventory());
        dispatch(userProfile());
    }, [dispatch]);

    /**
     * Get inventory amount for a specific product
     * @param {String} productID - Product ID to lookup
     * @returns {Number} - Available inventory amount
     */
    const getInventoryAmount = (productID) => {
        if (!inventoryData || inventoryData.length === 0) {
            return 0;
        }

        const inventoryItem = inventoryData.find(
            item => item.productID.toString() === productID.toString()
        );

        return inventoryItem?.inventory || 0;
    };

    /**
     * Calculate cart totals
     * Memoized for performance
     */
    const cartTotals = useMemo(() => {
        if (!data?.cart?.items || data.cart.items.length === 0) {
            return {
                subtotal: 0,
                shipping: 0,
                tax: 0,
                total: 0
            };
        }

        const subtotal = data.cart.items.reduce((sum, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);

        const shipping = subtotal > 50 ? 0 : 5;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        return {
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };
    }, [data?.cart?.items]);

    /**
     * Calculate total number of items in cart
     */
    const totalItems = useMemo(() => {
        if (!data?.cart?.items) return 0;
        return data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }, [data?.cart?.items]);

    /**
     * Handle quantity change for cart item
     * @param {String} productID - Product ID to update
     * @param {Number} amount - New quantity amount
     */
    const handleQuantityChange = async (productID, amount) => {
        try {
            await dispatch(updateCartItem({
                productID,
                amount: parseInt(amount)
            })).unwrap();
        } catch (error) {
            console.error("Failed to update quantity:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to update quantity',
                text: error.message || 'Please try again'
            });
        }
    };

    /**
     * Handle remove item from cart
     * @param {String} productID - Product ID to remove
     */
    const handleRemoveItem = async (productID) => {
        Swal.fire({
            title: "Do you want to delete this product?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await dispatch(removeFromCart({productID}));
                    dispatch(userProfile());
                    Swal.fire("Deleted!", "", "success");
                } catch (error) {
                    console.error("Failed to remove item:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to remove item',
                        text: error.message || 'Please try again'
                    });
                }
            } else if (result.isDenied) {
                Swal.fire("Delete cancelled", "", "info");
            }
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600 text-xl">Error loading cart. Please try again.</div>
            </div>
        );
    }

    // Empty cart state
    if (!data?.cart?.items || data.cart.items.length === 0) {
        return <EmptyCart />;
    }

    // Main cart display
    return (
        <div className="bg-gray-400 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-300 font-mono">
                    Shopping Cart
                </h1>

                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        {/* Cart Items List */}
                        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                            {data.cart.items.map((item, productIdx) => (
                                <CartItem
                                    key={item._id || productIdx}
                                    item={item}
                                    itemInventory={getInventoryAmount(item.productID)}
                                    productIdx={productIdx}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Order Summary */}
                    <CartSummary totals={cartTotals} itemCount={totalItems} />
                </form>
            </div>
        </div>
    );
}

export default UserBagPage;
