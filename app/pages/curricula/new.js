import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCurriculum from "app/curricula/mutations/createCurriculum"
import { CurriculumForm, FORM_ERROR } from "app/curricula/components/CurriculumForm"
import { CreateCurriculum } from "app/curricula/components/validations"

const NewCurriculumPage = () => {
  const router = useRouter()
  const [createCurriculumMutation] = useMutation(createCurriculum)
  return (
    <div>
      <h1>Create New Curriculum</h1>

      <CurriculumForm
        submitText="Create Curriculum" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateCurriculum}
        initialValues={{languageId:1,templateId:1}}
        onSubmit={async (values) => {
          try {
            const curriculum = await createCurriculumMutation(values)
            router.push(
              Routes.ShowCurriculumPage({
                curriculumId: curriculum.id,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CurriculaPage()}>
          <a>Curricula</a>
        </Link>
      </p>
    </div>
  )
}

NewCurriculumPage.authenticate = true

NewCurriculumPage.getLayout = (page) => <Layout title={"Create New Curriculum"}>{page}</Layout>

export default NewCurriculumPage
