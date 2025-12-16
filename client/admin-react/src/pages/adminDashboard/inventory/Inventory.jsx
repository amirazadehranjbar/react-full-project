import {useDispatch, useSelector} from "react-redux";
import {RingLoader} from "react-spinners";
import {useEffect} from "react";
import {filterProductByID, getInventory} from "../../../redux/features/inventory/inventorySlice.js";
import {getCategory} from "../../../redux/features/category/categoryReducer.js";
import FlowBitProgress from "../../../components/progressbar/FlowBitProgress.jsx";
import ComboBoxWithImage from "../../../components/comboBox/ComboBoxWithImage.jsx";

function Inventory() {


    const {data, filteredData, isLoading, isError, error} = useSelector(state => state.inventoryReducer);
    const {categories, isLoadingCategory} = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();

    // ✅ Fetch data on mount
    useEffect(() => {
        dispatch(getInventory());
        dispatch(getCategory());
    }, [dispatch]);

    // // ✅ Initialize filteredData when data loads
    useEffect(() => {
        if (data.length > 0 && filteredData.length === 0) {
            dispatch(filterProductByID(null)); // Show all initially
        }
    }, [data, filteredData.length, dispatch]);

    // ✅ Helper function to get category name
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : "Unknown";
    };

    // ✅ Handle category filter change
    const handleCategoryChange = (categoryID) => {
        dispatch(filterProductByID(categoryID));
    };

    // ✅ Decide which data to display
    const displayData = filteredData.length > 0 ? filteredData : data;

    return (
        <div className="px-4 sm:px-6 lg:px-8 h-full w-full bg-gray-500 mt-2 ">
            {(isLoading || isLoadingCategory) && (
                <div className="flex justify-center items-center h-full">
                    <RingLoader color="#4F46E5"/>
                </div>
            )}

            {isError && (
                <div
                    className="text-4xl text-red-600 text-center flex justify-center items-center w-full h-full font-bold font-mono">
                    Error: {error}
                </div>
            )}

            {data && data.length > 0 && categories.length > 0 && (
                <>
                    {/* ✅ Filter Section */}
                    <div
                        className="sm:flex sm:items-center sm:justify-between shadow-md p-4 bg-gray-400 rounded-md mb-8">
                        <ComboBoxWithImage onCategoryChange={handleCategoryChange}/>

                        {/* ✅ Show filter status */}
                        <div className="mt-2 sm:mt-0 text-sm text-gray-700">
                            Showing {displayData.length} of {data.length} products
                        </div>
                    </div>

                    {/* ✅ Table Section */}
                    <div className="-mx-4 sm:mx-0 bg-gray-400 rounded-md">
                        {displayData.length === 0 ? (
                            <div className="text-center py-8 text-gray-600">
                                No products found in this category
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th className="py-3.5 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell">
                                        Category
                                    </th>
                                    <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                        Current Stock
                                    </th>
                                    <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                        Target Stock
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-400 bg-gray-300">
                                {displayData.map((product, index) => {
                                    const stockPercentage = ((product.inventory / product.targetInventory) * 100).toFixed(0);
                                    const stockStatus = stockPercentage < 25 ? 'Low Stock' :
                                        stockPercentage < 50 ? 'Medium Stock' : 'Good Stock';
                                    const statusColor = stockPercentage < 25 ? 'text-red-600' :
                                        stockPercentage < 50 ? 'text-orange-600' : 'text-green-600';

                                    return (
                                        <tr key={product._id || index}>
                                            <td className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 text-center">
                                                {product.name}
                                                <dl className="font-normal lg:hidden">
                                                    <dt className="sr-only">Category</dt>
                                                    <dd className="mt-1 truncate text-gray-700">
                                                        {getCategoryName(product.categoryID)}
                                                    </dd>
                                                </dl>
                                            </td>

                                            <td className="hidden px-3 py-4 text-sm text-gray-900 lg:table-cell font-medium text-center">
                                                {getCategoryName(product.categoryID)}
                                            </td>

                                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                {product.inventory}
                                            </td>

                                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                {product.targetInventory}
                                            </td>

                                            <td className={`px-3 py-4 text-sm font-semibold ${statusColor}`}>
                                                {stockStatus} ({stockPercentage}%)
                                            </td>

                                            <td className="px-3 py-4 text-sm font-semibold">
                                                <FlowBitProgress percent={stockPercentage}/>
                                            </td>

                                            <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
                                                <a href="#"
                                                   className="text-indigo-600 hover:text-indigo-900 text-center pr-2">
                                                    Details
                                                    <span className="sr-only">, {product.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Inventory;