import {useDispatch, useSelector} from "react-redux";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import {useEffect, useMemo} from "react";
import {getCart, updateCartQuantity, removeFromCart} from "../../../redux/features/auth/authUserSlice.js";

function UserBagPage() {

    const {isLoading, isError, cart} = useSelector(state => state.authUserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    // ✅ Calculate totals using useMemo for performance
    const cartTotals = useMemo(() => {
        if (!cart?.items || cart.items.length === 0) {
            return {
                subtotal: 0,
                shipping: 0,
                tax: 0,
                total: 0
            };
        }

        // Calculate subtotal
        const subtotal = cart.items.reduce((sum, item) => {
            const price = Number(item.productID?.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);

        // Calculate shipping (free if over $50, otherwise $5)
        const shipping = subtotal > 50 ? 0 : 5;

        // Calculate tax (assuming 8% tax rate)
        const tax = subtotal * 0.08;

        // Calculate total
        const total = subtotal + shipping + tax;

        return {
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };
    }, [cart?.items]);

    // ✅ Handle quantity change
    const handleQuantityChange = async (productID, newQuantity) => {
        try {
            await dispatch(updateCartQuantity({
                productID,
                quantity: parseInt(newQuantity)
            })).unwrap();
        } catch (error) {
            console.error("Failed to update quantity:", error);
            alert("Failed to update quantity");
        }
    };

    // ✅ Handle remove item
    const handleRemoveItem = async (productID) => {
        try {
            await dispatch(removeFromCart({ productID })).unwrap();
        } catch (error) {
            console.error("Failed to remove item:", error);
            alert("Failed to remove item");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600 text-xl">Error loading cart. Please try again.</div>
            </div>
        );
    }

    if (!cart?.items || cart.items.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                <div className="text-2xl font-semibold text-gray-700 mb-4">Your bag is empty</div>
                <a
                    href="/api/user"
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                    Continue Shopping →
                </a>
            </div>
        );
    }

    return (
        <div className="bg-gray-400 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-300 font-mono">Shopping Cart</h1>

                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                            {cart.items.map((item, productIdx) => {
                                const product = item.productID;
                                const itemTotal = (Number(product?.price) || 0) * (Number(item.quantity) || 0);

                                return (
                                    <li key={item._id || productIdx} className="flex py-6 sm:py-10">
                                        <div className="shrink-0">
                                            <img
                                                alt={product?.name || "Product"}
                                                src={Array.isArray(product?.images) && product.images.length > 0
                                                    ? product.images[0]
                                                    : '/placeholder.png'}
                                                className="size-24 rounded-lg object-cover sm:size-32"
                                            />
                                        </div>

                                        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div>
                                                <div className="flex justify-between sm:grid sm:grid-cols-2">
                                                    <div className="pr-6">
                                                        <h3 className="text-sm">
                                                            <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product?.name || "Unknown Product"}
                                                            </a>
                                                        </h3>
                                                        {product?.isOnSale && (
                                                            <p className="mt-1 text-sm text-red-600 font-semibold">ON SALE</p>
                                                        )}
                                                        <p className="mt-1 text-sm text-gray-600">
                                                            ${product?.price} × {item.quantity} = ${itemTotal.toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <p className="text-right text-sm font-medium text-gray-900">
                                                        ${itemTotal.toFixed(2)}
                                                    </p>
                                                </div>

                                                <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                                                    <div className="inline-grid w-full max-w-16 grid-cols-1">
                                                        <select
                                                            name={`quantity-${productIdx}`}
                                                            aria-label={`Quantity, ${product?.name}`}
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                                            className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                        >
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                                <option key={num} value={num}>{num}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDownIcon
                                                            aria-hidden="true"
                                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                        />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(product._id)}
                                                        className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:mt-3 sm:ml-0"
                                                    >
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                {product?.inventory > 0 ? (
                                                    <>
                                                        <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
                                                        <span>In stock ({product.inventory} available)</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300" />
                                                        <span>Out of stock</span>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/*region Order summary */}
                    <div className="mt-10 sm:ml-32 sm:pl-6">
                        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="sr-only">Order summary</h2>

                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                    {/* Subtotal */}
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">${cartTotals.subtotal}</dd>
                                    </div>

                                    {/* Shipping */}
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">
                                            Shipping
                                            {Number(cartTotals.shipping) === 0 && (
                                                <span className="text-green-600 ml-2">(Free!)</span>
                                            )}
                                        </dt>
                                        <dd className="font-medium text-gray-900">${cartTotals.shipping}</dd>
                                    </div>

                                    {/* Tax */}
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Tax (8%)</dt>
                                        <dd className="font-medium text-gray-900">${cartTotals.tax}</dd>
                                    </div>

                                    {/* Total */}
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">${cartTotals.total}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Item count */}
                            <div className="mt-4 text-center text-sm text-gray-500">
                                Total items: {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                            >
                                Checkout
                            </button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <a href="/api/user" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </p>
                        </div>
                    </div>
                    {/*endregion*/}
                </form>
            </div>
        </div>
    );
}

export default UserBagPage