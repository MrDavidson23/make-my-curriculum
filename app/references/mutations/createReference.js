import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateReference = z.object({
  name: z.string(), //
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  institution: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateReference),
  resolver.authorize(),
  async (input, context) => {
    console.log(context.session.userId)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reference = await db.reference.create({
      data: {
        ...input,
        userId: 1,
      },
    })
    return reference
  }
)
