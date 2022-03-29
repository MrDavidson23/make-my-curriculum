import { resolver } from "blitz"
import db from "db"
import { CreatePublication } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreatePublication),
  resolver.authorize(),
  async (input) => {
    const {curriculumId, ...data} = input
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publication = await db.publication.create({
      data: {
        ...data,
        curriculum:{ connect: { id: curriculumId} },
      }
    })
    return publication
  }
)
