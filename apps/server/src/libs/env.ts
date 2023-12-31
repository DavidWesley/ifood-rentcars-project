import { z } from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().positive().min(80).max(65_000),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    ACCESS_TOKEN_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
})

export const ENV = envSchema.parse(process.env)
