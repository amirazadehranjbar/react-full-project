import * as z from "zod";

const UserSighUpSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be less than 20 characters"),
    email: z.string()
        .email("Invalid email address"),
    password: z.string()
        .min(10, "Password must be at least 10 characters")
});

type UserSighUpType = z.infer<typeof UserSighUpSchema>

export { UserSighUpSchema };
export type { UserSighUpType };
