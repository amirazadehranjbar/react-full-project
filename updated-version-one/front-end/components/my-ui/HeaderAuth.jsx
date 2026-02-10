import React from 'react'
import Link from "next/link";
import {ArrowBigLeft} from "lucide-react";

function HeaderAuth() {
    return (
        <div className="absolute top-3 left-9 border-2 p-2 rounded-md">
            <Link href="/">
                <ArrowBigLeft className="size-8"/>
            </Link>
        </div>
    )
}

export default HeaderAuth
