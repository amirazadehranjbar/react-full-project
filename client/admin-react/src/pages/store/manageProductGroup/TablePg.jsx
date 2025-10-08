import {CogIcon, SquareMinus, SquarePen, SquarePlus} from "lucide-react";
import {useState} from "react";

function TablePg() {
    const dataHeaders = ["title", "status", "operation"];

    const data = [
        {
            title: "product group 1",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 2",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 3",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 4",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 5",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 6",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 7",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 8",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 9",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },
        {
            title: "product group 10",
            status: "active",
            opration: [SquarePlus, SquareMinus, SquarePen, CogIcon],
        },

    ];

    const lastRowIndex = data.length - 1;

    // region Indicator Parameters

      // Step 1️⃣ : state for save current page number
    const [currentPage, setCurrentPage] = useState(1);

      // Step 2️⃣ : number of rows in each page
    const pageSize = 5;

      // Step 3️⃣ : Calculate the number of rows that can be displayed on that page.
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleRows = data.slice(startIndex, endIndex);
    //endreion

    return (
        <div
            className="rounded-md overflow-hidden shadow-md shadow-slate-800 border border-gray-200 bg-white w-full mt-5">
            {/*region Table*/}
            <table
                style={{borderCollapse: "separate"}}
                className="table-auto w-full border-separate border-spacing-0"
            >
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
                        ]
                            .filter(Boolean)
                            .join(" ");
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
                    return (
                        <tr
                            key={rowIndex}
                            className={`hover:bg-gray-50 ${
                                rowIndex !== lastRowIndex ? "border-b border-gray-200" : ""
                            }`}
                        >
                            <td
                                className={`py-2 px-4 whitespace-nowrap border-r border-b-2 border-gray-300 ${
                                    isLastRow ? "rounded-bl-md" : ""
                                }`}
                            >
                                {d.title}
                            </td>

                            <td className="py-2 px-4 max-w-[220px] truncate whitespace-nowrap overflow-hidden border-r border-b-2 border-gray-300">
                                {d.status}
                            </td>

                            <td
                                className={`py-3 px-4 flex justify-evenly items-center ${
                                    isLastRow ? "rounded-br-md" : ""
                                } border-b-2 border-gray-300`}
                            >
                                {d.opration.map((Icon, index) => (
                                    <Icon
                                        key={index}
                                        className="w-5 h-5 text-gray-700 mx-1 cursor-pointer hover:text-blue-600 transition-colors"
                                    />
                                ))}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {/*endregion*/}

            {/*region Indicator*/}
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                >
                    &lt;&lt;
                </button>

                {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => i + 1)
                    .map(num => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`px-3 py-1 rounded ${
                                num === currentPage ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-600 border border-gray-500 hover:bg-gray-100 hover:text-gray-800 " : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            }`}
                        >
                            {num}
                        </button>
                    ))}

                <button
                    onClick={() =>
                        setCurrentPage(prev => Math.min(prev + 1, Math.ceil(data.length / pageSize)))
                    }
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                >
                    &gt;&gt;
                </button>
            </div>

            {/*endregion*/}

        </div>
    );
}

export default TablePg;
