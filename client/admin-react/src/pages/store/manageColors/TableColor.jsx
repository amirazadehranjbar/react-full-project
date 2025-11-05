import {SquarePen} from "lucide-react";
import {useState} from "react";

function TableColor({data, dataHeaders}) {
    // ✅ Icon mapping (like SidebarItemsLinksCard.jsx)
    const iconMap = {
        SquarePen: SquarePen,
        // Add other icons as needed
    };

    const lastRowIndex = data.length - 1;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleRows = data.slice(startIndex, endIndex);

    return (
        <div className="rounded-md overflow-hidden shadow-md shadow-slate-800 border border-gray-200 bg-white w-full mt-5">
            <table style={{borderCollapse: "separate"}} className="table-auto w-full border-separate border-spacing-0">
                <thead>
                <tr className="bg-slate-500">
                    {dataHeaders.map((h, idx) => {
                        const isLast = idx === dataHeaders.length - 1;
                        const isFirst = idx === 0;
                        const thClasses = [
                            "px-6 py-3 text-left font-semibold text-gray-100",
                            !isLast ? "border-r border-gray-300" : "",
                            isFirst ? "rounded-tl-md" : "",
                            isLast ? "rounded-tr-md" : "",
                        ].filter(Boolean).join(" ");
                        return (
                            <th key={idx} scope="col" className={thClasses}>
                                {h}
                            </th>
                        );
                    })}
                </tr>
                </thead>

                <tbody>
                {visibleRows.map((d, rowIndex) => {
                    const isLastRow = rowIndex === lastRowIndex;
                    // ✅ Get the icon component from the map
                    const IconComponent = iconMap[d.operation];

                    return (
                        <tr key={rowIndex} className={`hover:bg-gray-50 ${rowIndex !== lastRowIndex ? "border-b border-gray-200" : ""}`}>
                            <td className={`py-2 px-4 whitespace-nowrap border-r border-b-2 border-gray-300 ${isLastRow ? "rounded-bl-md" : ""}`}>
                                {d.colorName}
                            </td>

                            <td className={`py-2 px-4 whitespace-nowrap border-r border-b-2 border-gray-300 ${isLastRow ? "rounded-bl-md" : ""}`}>
                                {d.colorCode}
                            </td>

                            <td className="py-2 px-4 max-w-[220px] truncate whitespace-nowrap overflow-hidden border-r border-b-2 border-gray-300"
                                style={{backgroundColor: d.color}}>
                            </td>

                            <td className="text-center py-2 px-4 truncate whitespace-nowrap overflow-hidden border-r border-b-2 border-gray-300 flex justify-center items-center w-full">
                                {/* ✅ Render the icon component */}
                                {IconComponent && (
                                    <IconComponent className="bg-gray-600 rounded-md p-1 text-gray-400 cursor-pointer" />
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            {/* Pagination code remains the same */}
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                    &lt;&lt;
                </button>

                {Array.from({length: Math.ceil(data.length / pageSize)}, (_, i) => i + 1).map(num => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`px-3 py-1 rounded ${num === currentPage ? "bg-gray-600 text-gray-500 border border-gray-500" : "bg-gray-100 hover:bg-gray-200 cursor-pointer"}`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(data.length / pageSize)))}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default TableColor;