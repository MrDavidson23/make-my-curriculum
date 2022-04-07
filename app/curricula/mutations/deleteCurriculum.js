import { resolver } from "blitz"
import db from "db"
import { DeleteCurriculum } from "../components/validations"

export default resolver.pipe(
  resolver.zod(DeleteCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    await db.skill.deleteMany({ where: { curriculumId: id } })
    await db.laboralExperience.deleteMany({ where: { curriculumId: id } })
    await db.academicEducation.deleteMany({ where: { curriculumId: id } })
    await db.technicalEducation.deleteMany({ where: { curriculumId: id } })
    await db.publication.deleteMany({ where: { curriculumId: id } })
    await db.reference.deleteMany({ where: { curriculumId: id } })

    const curriculum = await db.curriculum.delete({
      where: {
        id,
      },
    })
    return curriculum
  }
)
