import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducation from "app/technical-educations/queries/getTechnicalEducation"
import updateTechnicalEducation from "app/technical-educations/mutations/updateTechnicalEducation"
import {
  TechnicalEducationForm,
  FORM_ERROR,
} from "app/technical-educations/components/TechnicalEducationForm"
export const EditTechnicalEducation = () => {
  const router = useRouter()
  const technicalEducationId = useParam("technicalEducationId", "number")
  const [technicalEducation, { setQueryData }] = useQuery(
    getTechnicalEducation,
    {
      id: technicalEducationId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTechnicalEducationMutation] = useMutation(updateTechnicalEducation)
  return (
    <>
      <Head>
        <title>Edit TechnicalEducation {technicalEducation.id}</title>
      </Head>

      <div>
        <h1>Edit TechnicalEducation {technicalEducation.id}</h1>
        <pre>{JSON.stringify(technicalEducation, null, 2)}</pre>

        <TechnicalEducationForm
          submitText="Update TechnicalEducation" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTechnicalEducation}
          initialValues={technicalEducation}
          onSubmit={async (values) => {
            try {
              const updated = await updateTechnicalEducationMutation({
                id: technicalEducation.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowTechnicalEducationPage({
                  technicalEducationId: updated.id,
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

const EditTechnicalEducationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTechnicalEducation />
      </Suspense>

      <p>
        <Link href={Routes.TechnicalEducationsPage()}>
          <a>TechnicalEducations</a>
        </Link>
      </p>
    </div>
  )
}

EditTechnicalEducationPage.authenticate = true

EditTechnicalEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTechnicalEducationPage
