import { resolver } from "blitz"
import db from "db"
import {UpdateCurriculum} from "../components/validations"

export default resolver.pipe(
  resolver.zod(UpdateCurriculum),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const curriculum = await db.curriculum.update({
      where: {
        id,
      },
      data,
    })
    return curriculum
  }
)
