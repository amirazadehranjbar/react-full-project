// src/pages/user/UserMainPage.jsx
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategory} from "../../redux/features/category/categoryReducer.js";
import {useNavigate} from "react-router";
import CategoryCard3D from "../../components/CategoryCard3D";
import Galaxy from "../../components/backgrounds/Galaxy.jsx";

function UserMainPage() {
    const {isLoadingCategory, categories} = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleCategoryClick = (categoryID) => {
        navigate("/api/user/products-in-category", {
            state: {categoryID}
        });
    };

    return (
        <div className="relative min-h-screen py-24 md:py-32">
            {/* Galaxy Background - Fixed behind everything */}
            <div className="fixed inset-0 w-full h-full z-0 bg-gray-800">
                <Galaxy
                    transparent={true}
                    hueShift={140}
                    density={1.2}
                    speed={0.5}
                    glowIntensity={0.4}
                    saturation={0.3}
                    twinkleIntensity={0.4}
                    rotationSpeed={0.05}
                    mouseInteraction={true}
                    mouseRepulsion={false}
                />
            </div>

            {/* Content - Above galaxy background */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Our Categories
                    </h2>
                    <p className="text-xl text-gray-200 drop-shadow-md">
                        Explore our collection with interactive 3D models
                    </p>
                </div>

                {/* Loading State */}
                {isLoadingCategory && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                    </div>
                )}

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-8 lg:gap-12">
                    {categories.map((category) => (
                        <CategoryCard3D
                            key={category._id}
                            category={category}
                            onClick={() => handleCategoryClick(category._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserMainPage;