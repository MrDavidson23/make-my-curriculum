import { resolver } from "blitz"
import db from "db"
import { CreateTemplate } from "../components/validations"

export default resolver.pipe(resolver.zod(CreateTemplate), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const template = await db.template.create({
    data: input,
  })
  return template
})
