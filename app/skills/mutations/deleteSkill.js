import { resolver } from "blitz"
import db from "db"
import { DeleteSkill } from "../components/validations"

export default resolver.pipe(resolver.zod(DeleteSkill), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const skill = await db.skill.deleteMany({
    where: {
      id,
    },
  })
  return skill
})
