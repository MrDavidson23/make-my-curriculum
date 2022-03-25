import { resolver } from "blitz"
import db from "db"
import { UpdateLaboralExperience } from "../components/validations"

export default resolver.pipe(
  resolver.zod(UpdateLaboralExperience),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperience = await db.laboralExperience.update({
      where: {
        id,
      },
      data,
    })
    return laboralExperience
  }
)
