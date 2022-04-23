import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteAcademicEducation } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(DeleteAcademicEducation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducationOnCurriculum = await db.academicEducationOnCurriculum.deleteMany({
      where: {
        id,
      },
    })
    return academicEducationOnCurriculum
  }
)
