import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLaboralExperience from "app/laboral-experiences/mutations/createLaboralExperience"
import {
  LaboralExperienceForm,
  FORM_ERROR,
} from "app/laboral-experiences/components/LaboralExperienceForm"

const NewLaboralExperiencePage = () => {
  const router = useRouter()
  const [createLaboralExperienceMutation] = useMutation(createLaboralExperience)
  return (
    <div>
      <h1>Create New LaboralExperience</h1>

      <LaboralExperienceForm
        submitText="Create LaboralExperience" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLaboralExperience}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const laboralExperience = await createLaboralExperienceMutation(values)
            router.push(
              Routes.ShowLaboralExperiencePage({
                laboralExperienceId: laboralExperience.id,
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
        <Link href={Routes.LaboralExperiencesPage()}>
          <a>LaboralExperiences</a>
        </Link>
      </p>
    </div>
  )
}

NewLaboralExperiencePage.authenticate = true

NewLaboralExperiencePage.getLayout = (page) => (
  <Layout title={"Create New LaboralExperience"}>{page}</Layout>
)

export default NewLaboralExperiencePage
