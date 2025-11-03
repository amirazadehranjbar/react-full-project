import {ContainerIcon , BadgeDollarSignIcon , UsersRoundIcon} from "lucide-react";
import {useNavigate} from "react-router";

function SelectReportAdminDashboard() {

    const navigation = useNavigate();

    return (
        <div className="bg-gray-700 py-24 sm:py-32 h-full flex justify-center items-center">
            <div className="mx-auto max-w-7xl lg:px-8 h-full flex items-center justify-center shadow-xl rounded-md">
                <div className="-mx-6 grid grid-cols-2 gap-2 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">


                    {/*inventory reports*/}
                    <div className="bg-gray-400/5 p-8 cursor-pointer sm:p-10 flex items-center justify-center" onClick={()=>{navigation("/admin/inventory")}}>
                        <ContainerIcon width={158} height={48}/>
                        <p className="text-center font-bold text-gray-400">Inventory</p>
                    </div>

                    {/*sales reports*/}
                    <div className="bg-gray-400/5 p-8 cursor-pointer sm:p-10 flex items-center justify-center">
                        <BadgeDollarSignIcon width={158} height={48}/>
                        <p className="text-center font-bold text-gray-400">Sales Reports</p>
                    </div>

                    {/*user reports*/}
                    <div className="bg-gray-400/5 p-8 cursor-pointer sm:p-10 flex items-center justify-center">
                        <UsersRoundIcon width={158} height={48}/>
                        <p className="text-center font-bold text-gray-400">Users Reports</p>
                    </div>







                </div>
            </div>
        </div>
    )
}

export default SelectReportAdminDashboard
