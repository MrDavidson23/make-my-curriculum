import { useRouter, useMutation, Routes, Redirect } from "blitz"
import { useEffect, Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import CustomSpinner from "app/core/components/CustomSpinner"
import createCurriculum from "app/curricula/mutations/createCurriculum"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewCurriculumPage = () => {
  const router = useRouter()
  const [createCurriculumMutation] = useMutation(createCurriculum)
  useEffect(() => {
    const createCurriculum = async () => {
      try {
        const curriculum = await createCurriculumMutation({
          name: "Curriculum",
          languageId: 1,
          templateId: 1,
        })
        router.push(
          Routes.EditCurriculumPage({
            curriculumId: curriculum.id,
          })
        )
      } catch (error) {
        console.error(error)
        router.push(Routes.CurriculaPage({}))
      }
    }
    createCurriculum()
  }, [])
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }
  return <Suspense fallback={<CustomSpinner />} />
}

NewCurriculumPage.authenticate = true

NewCurriculumPage.getLayout = (page) => <Layout title={"Create New Curriculum"}>{page}</Layout>

export default NewCurriculumPage
