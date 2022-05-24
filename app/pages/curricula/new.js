import { useRouter, useMutation, Routes } from "blitz"
import { useEffect, Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import CustomSpinner from "app/core/components/CustomSpinner"
import createCurriculum from "app/curricula/mutations/createCurriculum"

const NewCurriculumPage = () => {
  const router = useRouter()
  const [createCurriculumMutation] = useMutation(createCurriculum)
  useEffect(() => {
    const createNewCurriculum = async () => {
      try {
        const curriculum = await createCurriculumMutation({ name:"Curriculum", languageId: 1, templateId: 1 })
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
    createNewCurriculum()
  }, [createCurriculumMutation,router]);
  return (
    <Suspense fallback={<CustomSpinner />} />
  )
}

NewCurriculumPage.authenticate = true

NewCurriculumPage.getLayout = (page) => <Layout title={"Create New Curriculum"}>{page}</Layout>

export default NewCurriculumPage
