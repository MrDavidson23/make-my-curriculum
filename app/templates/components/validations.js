import {z} from "zod"

const max = 50

const model = {
    name: z.string().min(1).max(max),
    isPremium: z.boolean(),
    design: z.object({
        left: z.object({
            text: z.object({
                color: z.string(),
                fontSize: z.string(),
                fontFamily: z.string(),
                fontWeight: z.string(),
            }),
            title: z.object({
                color: z.string(),
                fontSize: z.string(),
                fontFamily: z.string(),
                fontWeight: z.string(),
            }),
            container: z.object({
                width: z.number(),
                paddingTop: z.number(),
                paddingLeft: z.number(),
                paddingRight: z.number(),
                flexDirection: z.string(),
                backgroundColor: z.string(),
            }),
        }),
        right: z.object({
            text: z.object({
                color: z.string(),
                fontSize: z.string(),
                fontFamily: z.string(),
                fontWeight: z.string(),
            }),
            title: z.object({
                color: z.string(),
                fontSize: z.string(),
                fontFamily: z.string(),
                fontWeight: z.string(),
            }),
            container: z.object({
                paddingTop: z.number(),
                paddingLeft: z.number(),
                paddingRight: z.number(),
                backgroundColor: z.string(),
            }),
        }),
        container: z.object({
        flex: z.number(),
        margin: z.string(),
        flexDirection: z.string(),
        }),
    })
}

export const CreateTemplate = z.object(model)

export const UpdateTemplate = z.object(model).extend({
    id: z.number(),
})

export const DeleteTemplate = z.object({
    id: z.number(),
})