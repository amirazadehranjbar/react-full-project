import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";
import {CheckIcon} from "lucide-react";
import {Label} from "flowbite-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../redux/features/category/categoryReducer.js";
import {ChevronUpDownIcon} from "@heroicons/react/20/solid"

export default function ComboBoxWithImage({ onCategoryChange }) { // ✅ Add prop
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const {categories, isLoadingCategory, isErrorCategory, errorCategory} = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const filteredCategory =
        query === ''
            ? categories
            : categories.filter((category) => {
                return category.name.toLowerCase().includes(query.toLowerCase())
            })

    // ✅ Handle category selection
    const handleCategoryChange = (category) => {
        setQuery('');
        setSelectedCategory(category);

        // Call parent callback with category ID
        if (onCategoryChange) {
            onCategoryChange(category?._id || null);
        }
    };

    return (
        <Combobox
            as="div"
            value={selectedCategory}
            onChange={handleCategoryChange} // ✅ Use handler
        >
            <Label className="block text-sm/6 font-medium text-gray-900">Filter by Category</Label>
            <div className="relative mt-2">
                <ComboboxInput
                    className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(category) => category?.name || "All Categories"}
                    placeholder="Select category..."
                />
                <ComboboxButton
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                    <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true"/>
                </ComboboxButton>

                {filteredCategory.length > 0 && (
                    <ComboboxOptions
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-gray-600 py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm">
                        {/* ✅ Add "All Categories" option */}
                        <ComboboxOption
                            value={null}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                        >
                            <div className="flex items-center">
                                <span className="ml-3 truncate group-data-selected:font-semibold">All Categories</span>
                            </div>
                        </ComboboxOption>

                        {filteredCategory.map((category, index) => (
                            <ComboboxOption
                                key={category._id || index}
                                value={category}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                            >
                                <div className="flex items-center">
                                    <img src={category.icon} alt="" className="size-6 shrink-0 rounded-full"/>
                                    <span className="ml-3 truncate group-data-selected:font-semibold">{category.name}</span>
                                </div>

                                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                                    <CheckIcon className="size-5" aria-hidden="true"/>
                                </span>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    )
}