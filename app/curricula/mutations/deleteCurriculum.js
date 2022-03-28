import { resolver } from "blitz"
import db from "db"
import { DeleteCurriculum } from "../components/validations"

export default resolver.pipe(
  resolver.zod(DeleteCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const curriculum = await db.curriculum.deleteMany({
      where: {
        id,
      },
    })
    return curriculum
  }
)
