import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateAcademicEducation } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(UpdateAcademicEducation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducationOnCurriculum = await db.academicEducationOnCurriculum.update({
      where: {
        id,
      },
      data,
    })
    return academicEducationOnCurriculum
  }
)
