"use client"

import React from 'react'
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Progress} from "@radix-ui/react-progress";


function PasswordInput({label}: { label: string }) {


    const {watch, register} = useForm();

    const password = watch("password");


    const calculateStrong = (pas: string): { percentage: number, label: string } => {


        const minPasswordLenthg = 6;
        const percentage: number = 100 - ( (pas.length / minPasswordLenthg) * 100);

        const label: string = percentage > 50 ? "weak" : "strong"

        return {
            percentage: percentage,
            label: label
        }

    }

    return (
        <div className="grid gap-2">
            <div className="flex items-center">
                <Label htmlFor="password">{label}</Label>
                <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                    Forgot your password?
                </Link>
            </div>
            <Input id="password" required
                   {...register("password")}
            />


            <label>{calculateStrong(password).label}</label>
            <Progress
                className="relative h-6.25 w-full overflow-hidden rounded-full bg-gray-800"
                style={{
                    transform: "translateZ(0)",
                }}

            >
                <Progress
                    className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-white transition-transform duration-660"
                    style={{transform: `translateX(-${calculateStrong(password).percentage}%)`}}
                />
            </Progress>

        </div>
    )
}

export default PasswordInput
