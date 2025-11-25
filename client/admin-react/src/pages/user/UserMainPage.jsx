// src/pages/user/UserMainPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../redux/features/category/categoryReducer.js";
import { useNavigate } from "react-router";
import CategoryCard3D from "../../components/CategoryCard3D";

function UserMainPage() {
    const { isLoadingCategory, isErrorCategory, errorCategory, categories } = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleCategoryClick = (categoryID) => {
        navigate("/api/user/products-in-category", {
            state: { categoryID }
        });
    };

    return (
        <div className="bg-gray-400 py-24 md:py-32">
            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">

                {/* Header Section */}
                <div className="max-w-12xl xl:col-span-2 bg-gray-200 p-2 rounded-md shadow-md shadow-gray-500">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                        Our Categories
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        Explore our collection with interactive 3D models
                    </p>
                </div>

                {/* Categories List with 3D Models */}
                <ul
                    role="list"
                    className="divide-y divide-gray-200 xl:col-span-3 space-y-10 lg:w-full sm:w-full bg-gray-100 rounded-md p-4"
                >
                    {isLoadingCategory && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    )}

                    {categories.map((category) => (
                        <CategoryCard3D
                            key={category._id}
                            category={category}
                            onClick={() => handleCategoryClick(category._id)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserMainPage;