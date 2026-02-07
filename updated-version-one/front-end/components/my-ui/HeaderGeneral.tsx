import React from 'react'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import {HomeIcon, PackageSearchIcon} from "lucide-react";
import {ToggleTheme} from "@/components/my-ui/ToggleTheme";
import AuthButtons from "@/components/my-ui/AuthButtons";
import ButtonMedium from "@/components/my-ui/ButtonMedium";


function HeaderGeneral() {
    return (
        <div className="border-2 w-full h-20 flex items-center justify-between">

            <div className="flex items-center justify-between h-full w-full">
                {/*logo*/}
                <div className="max-w-1/20 h-full border-r-2 content-center">
                    <Image alt="" src={logo} style={{}}/>
                </div>

                {/*navigations*/}
                <div className="w-full h-full flex items-center justify-center gap-x-4 border-r-2 ">

                    <ButtonMedium icon={<HomeIcon/>} text={"main"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>

                </div>
            </div>

            <div className="flex items-center justify-center gap-x-5 ml-4 mr-4">

                <AuthButtons/>
                <ToggleTheme/>

            </div>

        </div>
    )
}

export default HeaderGeneral
