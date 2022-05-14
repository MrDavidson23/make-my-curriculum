import {z} from "zod"

const max = 50

const model = {
    name: z.string().min(1).max(max),
    isPremium: z.boolean(),
    design: z.object({
        container: z.object({
            required_message: "The container is needed"
        }),
        left: z.object({
            required_message: "The left is needed",
            container: z.object({
                required_message: "The left container is needed"
            }),
            text: z.object({
                required_message: "The left text is needed"
            }),
            title: z.object({
                required_message: "The left title is needed"
            })
        }),
        right: z.object({
            required_message: "The right is needed",
            container: z.object({
                required_message: "The right container is needed"
            }),
            text: z.object({
                required_message: "The right text is needed"
            }),
            title: z.object({
                required_message: "The right title is needed"
            })
        })
    })
}

export const CreateTemplate = z.object(model)

export const UpdateTemplate = z.object(model).extend({
    id: z.number(),
})

export const DeleteTemplate = z.object({
    id: z.number(),
})