import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAcademicEducation from "app/academic-educations/mutations/createAcademicEducation"
import {
  AcademicEducationForm,
  FORM_ERROR,
} from "app/academic-educations/components/AcademicEducationForm"

const NewAcademicEducationPage = () => {
  const router = useRouter()
  const [createAcademicEducationMutation] = useMutation(createAcademicEducation)
  return (
    <div>
      <h1>Create New AcademicEducation</h1>

      <AcademicEducationForm
        submitText="Create AcademicEducation" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAcademicEducation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const academicEducation = await createAcademicEducationMutation(values)
            router.push(
              Routes.ShowAcademicEducationPage({
                academicEducationId: academicEducation.id,
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
        <Link href={Routes.AcademicEducationsPage()}>
          <a>AcademicEducations</a>
        </Link>
      </p>
    </div>
  )
}

NewAcademicEducationPage.authenticate = true

NewAcademicEducationPage.getLayout = (page) => (
  <Layout title={"Create New AcademicEducation"}>{page}</Layout>
)

export default NewAcademicEducationPage
