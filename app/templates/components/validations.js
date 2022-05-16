import {z} from "zod"

const max = 50

const model = {
    name: z.string().min(1).max(max),
    isPremium: z.boolean(),
    design: z.object()
}

export const CreateTemplate = z.object(model)

export const UpdateTemplate = z.object(model).extend({
    id: z.number(),
})

export const DeleteTemplate = z.object({
    id: z.number(),
})