import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateAcademicEducation } from "../mutations/validations"

export default resolver.pipe(
  resolver.zod(CreateAcademicEducation),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducationOnCurriculum = await db.academicEducationOnCurriculum.create({
      data: input,
    })
    return academicEducationOnCurriculum
  }
)
