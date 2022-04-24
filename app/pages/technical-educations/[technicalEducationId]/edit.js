import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useRouterQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducation from "app/technical-educations/queries/getTechnicalEducation"
import updateTechnicalEducation from "app/technical-educations/mutations/updateTechnicalEducation"
import { UpdateTechnicalEducation } from "app/technical-educations/components/validations"
import { Grid, Button, Typography } from "@mui/material"

import {
  TechnicalEducationForm,
  FORM_ERROR,
} from "app/technical-educations/components/TechnicalEducationForm"
export const EditTechnicalEducation = () => {
  const router = useRouter()
  const technicalEducationId = useParam("technicalEducationId", "number")
  const { curriculumId } = useRouterQuery()
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
        <title>Edit Technical Education {technicalEducation.studies}</title>
      </Head>

      <div>
        <Grid
          container
          direction="row"
          spacing={2}
          textAlign={"center"}
          sx={{ mx: "auto", width: "100%" }}
        >
          <Grid item xs={12}>
            <Typography variant="h3" component="div" gutterBottom>
              Edit Technical Education {technicalEducation.studies}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TechnicalEducationForm
              submitText="Save" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={UpdateTechnicalEducation}
              initialValues={technicalEducation}
              onSubmit={async (values) => {
                try {
                  const updated = await updateTechnicalEducationMutation({
                    id: technicalEducation.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  if (curriculumId !== undefined && curriculumId !== "") {
                    router.push(Routes.EditCurriculumPage({curriculumId}))
                  }else{
                    router.push(Routes.TechnicalEducationsPage())
                  }
                } catch (error) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

const EditTechnicalEducationPage = () => {
  const { curriculumId } = useRouterQuery()
  const returnPage = (
    curriculumId !== '' ?
      Routes.EditCurriculumPage({ curriculumId }) : Routes.TechnicalEducationsPage()
  )
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTechnicalEducation />
      </Suspense>

      <Grid item xs={12}>
        <p>
          <Link href={returnPage}>
            <Button variant="outlined"> Regresar </Button>
          </Link>
        </p>
      </Grid>
    </div>
  )
}

EditTechnicalEducationPage.authenticate = true

EditTechnicalEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTechnicalEducationPage
