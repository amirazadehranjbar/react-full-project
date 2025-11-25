// client/admin-react/src/pages/user/userBag/components/QuantitySelector.jsx
import {ChevronDownIcon} from '@heroicons/react/16/solid';

/**
 * QuantitySelector Component
 * Dropdown for selecting product quantity
 *
 * @param {Number} quantity - Current quantity
 * @param {Number} maxQuantity - Maximum available quantity (from inventory)
 * @param {Function} onChange - Callback when quantity changes
 * @param {Boolean} disabled - Whether selector is disabled
 * @param {Number} productIdx - Index for unique naming
 * @param {String} productName - Product name for accessibility
 */
function QuantitySelector({
                              quantity,
                              maxQuantity,
                              onChange,
                              disabled = false,
                              productIdx,
                              productName
                          }) {
    return (
        <div className="inline-grid w-full max-w-16 grid-cols-1">
            <select
                name={`quantity-${productIdx}`}
                aria-label={`Quantity, ${productName}`}
                value={quantity}
                onChange={onChange}
                disabled={disabled || maxQuantity === 0}
                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
                {[...Array(Math.min(10, maxQuantity))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
        </div>
    );
}

export default QuantitySelector;