import React from 'react'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import ButtonMedium from "@/components/my-ui/ButtonMedium";
import {HomeIcon, PackageSearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ToggleTheme} from "@/components/my-ui/ToggleTheme";

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
                    <ButtonMedium icon={<HomeIcon/>} text={"home"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>
                    <ButtonMedium icon={<PackageSearchIcon/>} text={"products"}/>

                </div>
            </div>

            <div className="flex items-center justify-center gap-x-5 ml-4 mr-4">
                <Button className="font-bold font-mono cursor-pointer">login</Button>
                <Button variant="outline" className="font-bold font-mono border-2 border-gray-400 cursor-pointer">sign in</Button>
                <ToggleTheme/>

            </div>

        </div>
    )
}

export default HeaderGeneral
