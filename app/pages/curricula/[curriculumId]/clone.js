import { useEffect } from "react"
import { useRouter, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import cloneCurriculum from "app/curricula/mutations/cloneCurriculum"

const CloneCurriculumPage = () => {
    const router = useRouter()
    const curriculumId = useParam("curriculumId", "number")
    const [cloneCurriculumMutation] = useMutation(cloneCurriculum)
    const cloneFunction = async () => {
        try {
            const curriculum = await cloneCurriculumMutation({id:curriculumId})
            router.push(
              Routes.EditCurriculumPage({
                curriculumId: curriculum.id,
              })
            )
          } catch (error) {
            console.error(error)
            router.push(
              Routes.CurriculaPage({})
            )
          }
    }
    useEffect(() => {
        cloneFunction()
    }, []);
    return (null)
}
  
CloneCurriculumPage.authenticate = true
  
CloneCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>
  
export default CloneCurriculumPage