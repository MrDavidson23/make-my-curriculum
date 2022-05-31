import { resolver } from "blitz"
import db from "db"
import { CloneCurriculum } from "../components/validations"

// Receives the section name and create the new ones on the curriculum with the list sections
const createNewSections = async (sections,sectionName,curriculumId) => {

    sections.forEach(async (section) => {
        const reference = await db[sectionName].create({
            data:section,
        })
        await db[sectionName+"OnCurriculum"].create({
            data:{
                [sectionName+"Id"]:reference.id,
                curriculumId:curriculumId
            },
        })
    })
    
}

export default resolver.pipe(
  //resolver.zod(CloneCurriculum),
  resolver.authorize(),
  async ({id, sections}, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // Gets the original curriculum
    const { id:original_id,...original } = await db.curriculum.findFirst({
        where: {
            id,
            userId: ctx.session.userId,
        },
    })

    // Creates the new one
    const curriculum = await db.curriculum.create({
        data:{
            ...original
        }
    })

    
    Object.getOwnPropertyNames(sections).forEach(async (name)=>{

        const sectionName = name.substring(0,name.length-1)

        // Creates the new sections
        await createNewSections(sections[name].new,sectionName,curriculum.id)

        // Gets the references 
        let list = await Promise.all(sections[name].add.map(async (section)=>{
            const reference = await db[sectionName+"OnCurriculum"].findUnique({
                where:{
                    [sectionName+"Id_curriculumId"] : 
                    {[sectionName+"Id"]: section.id,
                        curriculumId:original_id}
                }
            }) 
            reference.curriculumId = curriculum.id
            return reference
        }))
        
        // Inserts the references to new curriculum
        if(list.length !== 0){
            await db[sectionName+"OnCurriculum"].createMany({
                data:list,
                skipDuplicates: true,
            })
        }
    })
    
    return curriculum

  }
)
