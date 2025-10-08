import {BadgeDollarSignIcon} from "lucide-react"


function Card() {
    return (
        <div className="lg:w-1/5 max-sm:w-full p-2 flex-col items-center border-2 bg-slate-800 rounded-md">

            {/*region top*/}
            <div className="flex justify-between items-center h-full w-auto p-2">

                <div className="flex-col items-center">
                    <p className="text-gray-400 font-bold">1,8000,000 $</p>
                    <p className="text-gray-400 font-bold">Today's income </p>
                    <p className="text-gray-400 font-bold">1,8000,000 $</p>
                </div>


                <div className="w-1/5 h-full">
                    <BadgeDollarSignIcon className="w-full h-full text-gray-400"/>
                </div>
            </div>
            {/*endregion*/}

            <div className="h-0.5 bg-slate-400 rounded-md"></div>

            {/*region bottom*/}
            <div>
                <p className="text-gray-400 font-bold">4,500,000 $ in last week</p>
                <p className="text-gray-400 font-bold">4,500,000 $ in last week</p>
            </div>
            {/*endregion*/}

        </div>
    )
}

export default Card
