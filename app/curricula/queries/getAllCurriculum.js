import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetCurriculum),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const curriculum = await db.curriculum.findFirst({
      where: {
        id,
        userId: ctx.session.userId,
      },
    })

    if (!curriculum) throw new NotFoundError()
    curriculum["skills"] = await db.skill.findMany({
      where: {
        SkillOnCurriculum: {
          some: {
            curriculum: {
              id: curriculum.id,
            },
          },
        },
      },
    })
    curriculum["laboralExperiences"] = await db.laboralExperience.findMany({
      where: {
        LaboralExperienceOnCurriculum: {
          some: {
            curriculum: {
              id: curriculum.id,
            },
          },
        },
      },
    })
    curriculum["academicEducations"] = await db.academicEducation.findMany({
      where: {
        AcademicEducationOnCurriculum: {
          some: {
            curriculum: {
              id: curriculum.id,
            },
          },
        },
      },
    })
    curriculum["technicalEducations"] = await db.technicalEducation.findMany({
      where: {
        TechnicalEducationOnCurriculum: {
          some: {
            curriculum: {
              id: curriculum.id,
            },
          },
        },
      },
    })
    curriculum["publications"] = await db.publication.findMany({
      where: {
        PublicationOnCurriculum: {
          some: {
            curriculum: {
              id: curriculum.id,
            },
          },
        },
      },
    })
    curriculum["references"] = await db.reference.findMany({
      where: {
        ReferenceOnCurriculum: {
          some: {
            curriculum: {
              id: curriculum.id,
            },
          },
        },
      },
    })
    return curriculum
  }
)
