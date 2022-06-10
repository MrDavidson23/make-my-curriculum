import { resolver } from "blitz"
import db from "db"
import { CreateTemplate } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateTemplate),
  resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenan
  // Is a user template
  if(ctx.session.$publicData.role === "USER"){
    input.user = { connect: { id: ctx.session.userId } }
  }
  const template = await db.template.create({
    data: input,
  })
  return template
})
