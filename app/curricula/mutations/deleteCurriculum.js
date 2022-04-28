import { resolver } from "blitz"
import db from "db"
import { DeleteCurriculum } from "../components/validations"

export default resolver.pipe(
  resolver.zod(DeleteCurriculum),
  resolver.authorize(),
  async ({ id }) => {

    // Deletes Many to Many relations
    await db.skillOnCurriculum.deleteMany({ where: { curriculumId: id } })
    await db.laboralExperienceOnCurriculum.deleteMany({ where: { curriculumId: id } })
    await db.academicEducationOnCurriculum.deleteMany({ where: { curriculumId: id } })
    await db.technicalEducationOnCurriculum.deleteMany({ where: { curriculumId: id } })
    await db.publicationOnCurriculum.deleteMany({ where: { curriculumId: id } })
    await db.referenceOnCurriculum.deleteMany({ where: { curriculumId: id } })

    const curriculum = await db.curriculum.delete({
      where: {
        id,
      },
    })
    return curriculum
  }
)
