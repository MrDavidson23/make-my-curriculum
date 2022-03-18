import { resolver } from "blitz"
import db from "db"
import { CreateReference } from "../components/validaciones"

export default resolver.pipe(
  resolver.zod(CreateReference),
  resolver.authorize(),
  async (input, context) => {
    //console.log(context.session.userId)
    console.log(input)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reference = await db.reference.create({
      data: {
        ...input,
        userId: context.session.userId,
      },
    })
    return reference
  }
)
