import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteAcademicEducation } from "../validations"
export default resolver.pipe(
  resolver.zod(DeleteAcademicEducation),
  resolver.authorize(),
  async ({ curriculumId, academicEducationId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducationOnCurriculum = await db.academicEducationOnCurriculum.deleteMany({
      where: {
        curriculumId,
        academicEducationId,
      },
    })
    return academicEducationOnCurriculum
  }
)
