import React from 'react'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import ButtonMedium from "@/components/my-ui/ButtonMedium";
import {HomeIcon} from "lucide-react";

function HeaderGeneral() {
    return (
        <div className="border-2 w-full h-20 flex items-center">

            {/*logo*/}
            <div >
                <Image alt="" src={logo} style={{width: "20%", height: "70%"}}/>
            </div>

            {/*navigations*/}
            <div className="w-1/2 h-full">
                <ButtonMedium icon={<HomeIcon/>} text={"home"}/>

            </div>

        </div>
    )
}

export default HeaderGeneral
