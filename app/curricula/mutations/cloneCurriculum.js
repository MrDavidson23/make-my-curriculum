import { resolver } from "blitz"
import db from "db"
import { CloneCurriculum } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CloneCurriculum),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const changeCurriculumId = (list,curriculumId) => {
        return list.map((x)=>{
            x.curriculumId=curriculumId;
            return x
        })
    }
    
    const { id:original_id,...original } = await db.curriculum.findFirst({
        where: {
            id,
            userId: ctx.session.userId,
        },
    })
    const curriculum = await db.curriculum.create({
        data:{
            ...original
        }
    })

    // All N:M relations with curriculum
    const models = [
        db.skillOnCurriculum,
        db.laboralExperienceOnCurriculum,
        db.academicEducationOnCurriculum,
        db.technicalEducationOnCurriculum,
        db.publicationOnCurriculum,
        db.referenceOnCurriculum,
    ]

    // Insert the references to new curriculum
    models.forEach(async (section)=>{
        let list = await section.findMany({
            where:{
                curriculumId: original_id
            }
        })
        if(list.length !== 0){
            await section.createMany({
                data:changeCurriculumId(list,curriculum.id),
                skipDuplicates: true,
            })
        }
    })
    
    return curriculum

  }
)
