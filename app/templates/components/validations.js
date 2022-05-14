import {z} from "zod"

const max = 50

const model = {
    name: z.string().min(1).max(max),
    isPremium: z.boolean(),
    design: z.string(),
    /*
    z.object()
    .or(z.string()
    .transform((value => {
        try{
            return JSON.parse(value)
        }catch(error){
            return {}
        }
    }))
    .or(z.object({
        container: z.object({
            required_error: "container is needed",
          }),
        left: z.object({
            container: z.object({
                required_error: "left container is needed",
              })
        }),
        right: z.object({
            container: z.object({
                required_error: "right container is needed",
              })
        }),
    }))),
    */
}

export const CreateTemplate = z.object(model)

export const UpdateTemplate = z.object(model).extend({
    id: z.number(),
})

export const DeleteTemplate = z.object({
    id: z.number(),
})