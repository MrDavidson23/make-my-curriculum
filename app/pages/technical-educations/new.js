import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTechnicalEducation from "app/technical-educations/mutations/createTechnicalEducation"
import {
  TechnicalEducationForm,
  FORM_ERROR,
} from "app/technical-educations/components/TechnicalEducationForm"

const NewTechnicalEducationPage = () => {
  const router = useRouter()
  const [createTechnicalEducationMutation] = useMutation(createTechnicalEducation)
  return (
    <div>
      <h1>Create New TechnicalEducation</h1>

      <TechnicalEducationForm
        submitText="Create TechnicalEducation" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTechnicalEducation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const technicalEducation = await createTechnicalEducationMutation(values)
            router.push(
              Routes.ShowTechnicalEducationPage({
                technicalEducationId: technicalEducation.id,
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
        <Link href={Routes.TechnicalEducationsPage()}>
          <a>TechnicalEducations</a>
        </Link>
      </p>
    </div>
  )
}

NewTechnicalEducationPage.authenticate = true

NewTechnicalEducationPage.getLayout = (page) => (
  <Layout title={"Create New TechnicalEducation"}>{page}</Layout>
)

export default NewTechnicalEducationPage
