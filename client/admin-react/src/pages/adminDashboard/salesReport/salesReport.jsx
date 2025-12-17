import CardsList from "./CardsList.jsx";
import Chart from "./Chart.jsx";
import InventoryTableMy from "../../../components/table/InventoryTableMy.jsx";
import {useSelector} from "react-redux";
import TableComponent from "../../../components/table/TableComponent.jsx";

function SalesReport() {

    const {data, dataHeaders, isLoading, isError} = useSelector(
        (state) => state.salesReducer
    );


    return (
        <div className="w-full flex flex-col items-center overflow-hidden">
            <div className="flex flex-col w-full space-y-6 sm:space-y-10">
                <CardsList />

                {/* Responsive layout: stack vertically on mobile, side-by-side on desktop */}
                <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-5">
                    {/* Chart takes full width on mobile, 2/3 on desktop */}
                    <div className="w-full lg:w-2/3">
                        <Chart />
                    </div>

                    {/* Table takes full width on mobile, 1/3 on desktop */}
                    <div className="w-full lg:w-1/3 min-w-0">
                        <TableComponent data={data} isError={isError} dataHeaders={dataHeaders} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesReport;


