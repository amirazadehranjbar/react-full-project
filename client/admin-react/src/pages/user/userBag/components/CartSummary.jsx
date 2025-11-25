// client/admin-react/src/pages/user/userBag/components/CartSummary.jsx

/**
 * CartSummary Component
 * Displays order totals and checkout button
 *
 * @param {Object} totals - Object containing subtotal, shipping, tax, total
 * @param {Number} itemCount - Total number of items in cart
 */
function CartSummary({ totals, itemCount }) {
    return (
        <div className="mt-10 sm:ml-32 sm:pl-6">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="sr-only">Order summary</h2>

                <div className="flow-root">
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-600">Subtotal</dt>
                            <dd className="font-medium text-gray-900">${totals.subtotal}</dd>
                        </div>

                        {/* Shipping */}
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-600">
                                Shipping
                                {Number(totals.shipping) === 0 && (
                                    <span className="text-green-600 ml-2">(Free!)</span>
                                )}
                            </dt>
                            <dd className="font-medium text-gray-900">${totals.shipping}</dd>
                        </div>

                        {/* Tax */}
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-600">Tax (8%)</dt>
                            <dd className="font-medium text-gray-900">${totals.tax}</dd>
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between py-4">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">${totals.total}</dd>
                        </div>
                    </dl>
                </div>

                {/* Item count */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    Total items: {itemCount}
                </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-10">
                <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                >
                    Checkout
                </button>
            </div>

            {/* Continue Shopping Link */}
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
    );
}

export default CartSummary;