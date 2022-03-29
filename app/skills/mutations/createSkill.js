import { resolver } from "blitz"
import db from "db"
import { CreateSkill } from "../components/validations"

export default resolver.pipe(resolver.zod(CreateSkill), resolver.authorize(), async (input) => {
  const { curriculumId, ...data } = input
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const skill = await db.skill.create({
    data: {
      ...data,
      curriculum: { connect: { id: curriculumId } },
    },
  })
  return skill
})
