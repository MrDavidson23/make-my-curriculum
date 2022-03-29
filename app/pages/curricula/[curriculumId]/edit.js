import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurriculum from "app/curricula/queries/getCurriculum"
import updateCurriculum from "app/curricula/mutations/updateCurriculum"
import { UpdateCurriculum } from "app/curricula/components/validations"
import { CurriculumForm, FORM_ERROR } from "app/curricula/components/CurriculumForm"

import AcademicEducationsPage from "app/pages/academic-educations/index"
import PublicationsPage from "app/pages/publications/index"
import TechnicalEducationsPage from "app/pages/technical-educations/index"
import ReferencesPage from "app/pages/references/index"

export const EditCurriculum = () => {
  const router = useRouter()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum, { setQueryData }] = useQuery(
    getCurriculum,
    {
      id: curriculumId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCurriculumMutation] = useMutation(updateCurriculum)
  return (
    <>

      <div>
        <h1>Edit Curriculum {curriculum.name}</h1>
        <pre>{JSON.stringify(curriculum, null, 2)}</pre>

        <CurriculumForm
          submitText="Update Curriculum" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateCurriculum}
          initialValues={curriculum}
          onSubmit={async (values) => {
            try {
              const updated = await updateCurriculumMutation({
                id: curriculum.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.EditCurriculumPage({
                  curriculumId: updated.id,
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
        <AcademicEducationsPage curriculumId={curriculumId}/>
        <TechnicalEducationsPage curriculumId={curriculumId}/>
        <PublicationsPage curriculumId={curriculumId}/>
        <ReferencesPage curriculumId={curriculumId}/>
      <Head>
        <title>Edit Curriculum {curriculum.name}</title>
      </Head>

      </div>
    </>
  )
}

const EditCurriculumPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCurriculum />
      </Suspense>

      <p>
        <Link href={Routes.CurriculaPage()}>
          <a>Curricula</a>
        </Link>
      </p>
    </div>
  )
}

EditCurriculumPage.authenticate = true

EditCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCurriculumPage
