import {BadgeDollarSignIcon} from "lucide-react"


function Card() {
    return (
        // Removed fixed width classes, now responsive with grid parent container
        <div className="w-full p-3 flex flex-col border-2 bg-slate-800 rounded-md">

            {/*region top*/}
            <div className="flex justify-between items-center p-2 gap-2">

                <div className="flex-1 flex flex-col space-y-1">
                    <p className="text-gray-400 font-bold text-sm sm:text-base">1,8000,000 $</p>
                    <p className="text-gray-400 font-bold text-xs sm:text-sm">Today's income</p>
                    <p className="text-gray-400 font-bold text-sm sm:text-base">1,8000,000 $</p>
                </div>


                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                    <BadgeDollarSignIcon className="w-full h-full text-gray-400"/>
                </div>
            </div>
            {/*endregion*/}

            <div className="h-0.5 bg-slate-400 rounded-md my-2"></div>

            {/*region bottom*/}
            <div className="space-y-1">
                <p className="text-gray-400 font-bold text-xs sm:text-sm">4,500,000 $ in last week</p>
                <p className="text-gray-400 font-bold text-xs sm:text-sm">4,500,000 $ in last week</p>
            </div>
            {/*endregion*/}

        </div>
    )
}

export default Card
