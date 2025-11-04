import {ClimbingBoxLoader} from "react-spinners";
import {useSelector} from "react-redux";
import {colorStatus} from "../../utilities/colorStatus.js";


function InventoryTableMy() {



    const {data, dataHeaders, isLoading, isError} = useSelector(
        (state) => state.salesReducer
    );


    const lastRowIndex = data.length - 1;

    return (
        <div className="p-4 flex-1 min-w-0">
            {isLoading && (
                <div className="flex justify-center items-center py-8">
                    <ClimbingBoxLoader/>
                </div>
            )}

            {isError && (
                <div className="text-4xl text-red-500 font-bold font-mono">Error</div>
            )}

            {data.length > 0 && (
                <div className="rounded-md overflow-hidden shadow-md shadow-slate-800 border border-gray-200 bg-white">
                    {/* table must contain caption as its direct child */}
                    <table
                        style={{borderCollapse: "separate"}} // force separate in case global CSS overrides
                        className="table-auto w-full border-separate border-spacing-0"
                    >
                        <caption className="text-lg font-bold text-gray-700 text-center py-4">
                            <div>
                                reports
                            </div>
                        </caption>

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
                        {data.map((d, rowIndex) => {
                            const isLastRow = rowIndex === lastRowIndex;
                            return (
                                <tr
                                    key={rowIndex}
                                    className={`hover:bg-gray-50 ${rowIndex !== lastRowIndex ? "border-b border-gray-200" : ""}`}
                                >
                                    <td className={`py-2 px-4 whitespace-nowrap border-r 
                                    border-b-2 border-gray-300 ${isLastRow ? "rounded-bl-md" : ""}`}>
                                        {d.category}
                                    </td>

                                    <td className="py-2 px-4 max-w-[220px] truncate whitespace-nowrap overflow-hidden border-r
                                    border-b-2 border-gray-300">
                                        {d.title}
                                    </td>

                                    <td className="py-2 px-4 whitespace-nowrap border border-gray-300">


                                        <div className="bg-gray-200 rounded-lg dark:bg-gray-700 text-center">
                                            <div
                                                className={`${colorStatus(d.status)} text-xs font-normal text-blue-100 text-center pr-2 pt-1 pb-1 leading-none rounded-md`}

                                                style={{width: `${d.status}`}}
                                            > {d.status}
                                            </div>
                                        </div>
                                    </td>

                                    <td className={`py-2 px-4 flex justify-center items-center ${isLastRow ? "rounded-br-md" : ""} border-b-2 border-gray-300`}>
                                        <img src={d.operation} alt="" className="w-6 h-6 object-contain"/>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default InventoryTableMy;
