import CardsList from "./CardsList.jsx";
import Chart from "./Chart.jsx";
import InventoryTableMy from "../../components/table/InventoryTableMy.jsx";
import {useSelector} from "react-redux";
import TableComponent from "../../components/table/TableComponent.jsx";

function Index() {

    const {data, dataHeaders, isLoading, isError} = useSelector(
        (state) => state.inventoryReducer
    );


    return (
        <div className="w-full flex flex-col items-center overflow-hidden">
            <div className="flex flex-col w-full space-y-10">
                <CardsList />

                <div className="flex w-full gap-5">
                    {/* Chart takes 2/3 */}
                    <div className="flex-2/3">
                        <Chart />
                    </div>

                    {/* Table takes 1/3 and can shrink */}
                    <div className="w-1/3 min-w-0">
                        <TableComponent data={data} isError={isError} dataHeaders={dataHeaders} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;


