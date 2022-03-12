import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducation from "app/academic-educations/queries/getAcademicEducation"
import updateAcademicEducation from "app/academic-educations/mutations/updateAcademicEducation"
import {
  AcademicEducationForm,
  FORM_ERROR,
} from "app/academic-educations/components/AcademicEducationForm"
export const EditAcademicEducation = () => {
  const router = useRouter()
  const academicEducationId = useParam("academicEducationId", "number")
  const [academicEducation, { setQueryData }] = useQuery(
    getAcademicEducation,
    {
      id: academicEducationId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAcademicEducationMutation] = useMutation(updateAcademicEducation)
  return (
    <>
      <Head>
        <title>Edit AcademicEducation {academicEducation.id}</title>
      </Head>

      <div>
        <h1>Edit AcademicEducation {academicEducation.id}</h1>
        <pre>{JSON.stringify(academicEducation, null, 2)}</pre>

        <AcademicEducationForm
          submitText="Update AcademicEducation" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAcademicEducation}
          initialValues={academicEducation}
          onSubmit={async (values) => {
            try {
              const updated = await updateAcademicEducationMutation({
                id: academicEducation.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowAcademicEducationPage({
                  academicEducationId: updated.id,
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
      </div>
    </>
  )
}

const EditAcademicEducationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAcademicEducation />
      </Suspense>

      <p>
        <Link href={Routes.AcademicEducationsPage()}>
          <a>AcademicEducations</a>
        </Link>
      </p>
    </div>
  )
}

EditAcademicEducationPage.authenticate = true

EditAcademicEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAcademicEducationPage
