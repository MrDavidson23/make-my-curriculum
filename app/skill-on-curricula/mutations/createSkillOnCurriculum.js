import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateSkill } from "../mutations/validations"
export default resolver.pipe(resolver.zod(CreateSkill), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const skillOnCurriculum = await db.skillOnCurriculum.create({
    data: input,
  })
  return skillOnCurriculum
})
