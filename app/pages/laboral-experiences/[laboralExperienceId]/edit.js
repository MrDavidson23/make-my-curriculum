import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperience from "app/laboral-experiences/queries/getLaboralExperience"
import updateLaboralExperience from "app/laboral-experiences/mutations/updateLaboralExperience"
import {
  LaboralExperienceForm,
  FORM_ERROR,
} from "app/laboral-experiences/components/LaboralExperienceForm"
export const EditLaboralExperience = () => {
  const router = useRouter()
  const laboralExperienceId = useParam("laboralExperienceId", "number")
  const [laboralExperience, { setQueryData }] = useQuery(
    getLaboralExperience,
    {
      id: laboralExperienceId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateLaboralExperienceMutation] = useMutation(updateLaboralExperience)
  return (
    <>
      <Head>
        <title>Edit LaboralExperience {laboralExperience.id}</title>
      </Head>

      <div>
        <h1>Edit LaboralExperience {laboralExperience.id}</h1>
        <pre>{JSON.stringify(laboralExperience, null, 2)}</pre>

        <LaboralExperienceForm
          submitText="Update LaboralExperience" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateLaboralExperience}
          initialValues={laboralExperience}
          onSubmit={async (values) => {
            try {
              const updated = await updateLaboralExperienceMutation({
                id: laboralExperience.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowLaboralExperiencePage({
                  laboralExperienceId: updated.id,
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

const EditLaboralExperiencePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLaboralExperience />
      </Suspense>

      <p>
        <Link href={Routes.LaboralExperiencesPage()}>
          <a>LaboralExperiences</a>
        </Link>
      </p>
    </div>
  )
}

EditLaboralExperiencePage.authenticate = true

EditLaboralExperiencePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLaboralExperiencePage
