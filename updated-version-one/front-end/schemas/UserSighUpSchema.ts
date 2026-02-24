import * as z from "zod";

const UserSighUpSchema = z.object(
    {
        name: z.string().min(3).max(20),
        email:z.email(),
        password:z.string().min(10)
    }
);

type FormData = z.infer<typeof UserSighUpSchema>

export {UserSighUpSchema};
export type { FormData };
