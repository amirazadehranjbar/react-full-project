// client/admin-react/src/pages/user/userBag/components/CartItem.jsx
import {CheckIcon, ClockIcon, TrashIcon} from '@heroicons/react/20/solid';
import QuantitySelector from './QuantitySelector';

/**
 * CartItem Component
 * Displays individual cart item with image, details, quantity selector, and remove button
 *
 * @param {Object} item - Cart item object
 * @param {Number} itemInventory - Available inventory for this product
 * @param {Number} productIdx - Index of item in cart
 * @param {Function} onQuantityChange - Callback when quantity changes
 * @param {Function} onRemove - Callback when remove button is clicked
 */
function CartItem({ item, itemInventory, productIdx, onQuantityChange, onRemove }) {
    const itemTotal = (Number(item?.price) || 0) * (Number(item.quantity) || 0);

    return (
        <li className="flex py-6 sm:py-10">
            {/* Product Image */}
            <div className="shrink-0">
                <img
                    alt={item.productName || "Product"}
                    src={Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : '/placeholder.png'}
                    className="size-24 rounded-lg object-cover sm:size-32"
                />
            </div>

            {/* Product Details */}
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div>
                    {/* Product Name and Price */}
                    <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                            <h3 className="text-sm">
                                <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                    {item.productName || "Unknown Product"}
                                </a>
                            </h3>

                            {/* Sale Badge */}
                            {item.isOnSale && (
                                <p className="mt-1 text-sm text-red-600 font-semibold">
                                    ON SALE
                                </p>
                            )}

                            {/* Price Calculation */}
                            <p className="mt-1 text-sm text-gray-600">
                                ${item.price} × {item.quantity} = ${itemTotal.toFixed(2)}
                            </p>
                        </div>

                        {/* Item Total */}
                        <p className="text-right text-sm font-medium text-gray-900">
                            ${itemTotal.toFixed(2)}
                        </p>
                    </div>

                    {/* Quantity Selector and Remove Button */}
                    <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                        {/* Quantity Selector */}
                        <QuantitySelector
                            quantity={item.quantity}
                            maxQuantity={itemInventory}
                            onChange={(e) => onQuantityChange(item.productID, Number(e.target.value))}
                            disabled={itemInventory === 0}
                            productIdx={productIdx}
                            productName={item.productName}
                        />

                        {/* Remove Button */}
                        <div className="flex items-center justify-center border-1 border-slate-200 p-2 rounded-md mt-2 cursor-pointer hover:bg-gray-600 hover:text-slate-300">
                            <TrashIcon className="size-4 cursor-pointer"/>
                            <button
                                type="button"
                                onClick={() => onRemove(item.productID)}
                                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-slate-300"
                            >
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Inventory Status */}
                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                    {itemInventory > 0 ? (
                        <>
                            <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500"/>
                            <span>In stock ({itemInventory} available)</span>
                        </>
                    ) : (
                        <>
                            <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300"/>
                            <span>Out of stock</span>
                        </>
                    )}
                </p>
            </div>
        </li>
    );
}

export default CartItem;