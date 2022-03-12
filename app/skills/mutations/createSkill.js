import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateSkill = z.object({
  name: z.string(),
})
export default resolver.pipe(resolver.zod(CreateSkill), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const skill = await db.skill.create({
    data: input,
  })
  return skill
})
