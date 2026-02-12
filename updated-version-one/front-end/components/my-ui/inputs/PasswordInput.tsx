"use client"
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Progress} from "@radix-ui/react-progress";

// Accept register and password from parent
function PasswordInput({
                           label,
                           register,
                           password
                       }: {
    label: string;
    register: any;
    password: string;
}) {
    const calculateStrong = (pas: string): { percentage: number, label: string } => {
        const minPasswordLength = 8;
        const inputPassLength = pas ? pas.length : 0;

        const percentage = Math.max(0, 100 - ((inputPassLength / minPasswordLength) * 100));
        const label = percentage > 50 ? "weak" : "strong";

        return { percentage, label }
    }

    const strength = calculateStrong(password);

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

            <Input
                id="password"
                type="password"
                required
                {...register("password")}
            />

            {password && (
                <>
                    <label className={strength.label === "weak" ? "text-red-500" : "text-green-500"}>
                        {strength.label}
                    </label>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-800">
                        <div
                            className={`h-full transition-all duration-500 ${
                                strength.label === "weak" ? "bg-red-500" : "bg-green-500"
                            }`}
                            style={{width: `${100 - strength.percentage}%`}}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default PasswordInput;