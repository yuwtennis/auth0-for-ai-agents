import * as z from "zod";

export const FgaConfig = z.object({
    apiUrl: z.string(),
    apiTokenIssuer: z.string(),
    apiAudience: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
    storeId: z.string(),
})

export const FgaCheckResponse = z.object({
    allowed: z.boolean().default(false),
})