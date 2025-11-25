import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategory} from "../../redux/features/category/categoryReducer.js";
import {useNavigate} from "react-router";


function UserMainPage() {

    const {isLoadingCategory, isErrorCategory, errorCategory, categories} = useSelector(state => state.categoryReducer);



    const dispatch = useDispatch();

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getCategory());

    }, [dispatch]);

    return (
        <div className="bg-gray-400 py-24 md:py-32">


            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-5">


                <div className="max-w-12xl xl:col-span-2 bg-gray-200 p-2 rounded-md shadow-md shadow-gray-500">


                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                        Our Categories
                    </h2>

                    <p className="mt-6 text-lg/8 text-gray-600">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam vo
                    </p>

                </div>


                <ul role="list"
                    className="divide-y divide-gray-200 xl:col-span-3 space-y-10 lg:w-1/2 sm:w-full bg-gray-100 rounded-md">
                    {categories.map((category) => (
                        <li key={category.name}
                            className="flex shadow-md shadow-gray-400 rounded-md flex-col gap-10 py-8 first:pt-0 last:pb-0 sm:flex-row">
                            <img alt="" src={category.icon}
                                 className="w-30 flex-none rounded-2xl object-cover hover:animate-bounce cursor-pointer"
                            onClick={ ()=>{
                                navigate("/api/user/products-in-category" , {state:{categoryID:category._id}});

                            }}/>
                            <div className="max-w-xl flex-auto">
                                <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{category.name}</h3>
                                <ul role="list" className="mt-6 flex gap-x-6">
                                    <li>
                                        <a href={category.name} className="text-gray-400 hover:text-gray-500">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserMainPage
