import { resolver } from "blitz"
import db from "db"
import { CreateLaboralExperience } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateLaboralExperience),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperience = await db.laboralExperience.create({
      data: input,
    })
    return laboralExperience
  }
)
