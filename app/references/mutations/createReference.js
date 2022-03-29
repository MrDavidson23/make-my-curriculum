import { resolver } from "blitz"
import db from "db"
import { CreateReference } from "../components/validaciones"

export default resolver.pipe(
  resolver.zod(CreateReference),
  resolver.authorize(),
  async (input) => {
    const { curriculumId, ...data } = input
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reference = await db.reference.create({
      data: {
        ...data,
        curriculum: { connect: { id: curriculumId } },
      },
    })
    return reference
  }
)
