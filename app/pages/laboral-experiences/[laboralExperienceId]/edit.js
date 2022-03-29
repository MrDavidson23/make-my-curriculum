import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperience from "app/laboral-experiences/queries/getLaboralExperience"
import updateLaboralExperience from "app/laboral-experiences/mutations/updateLaboralExperience"
import { UpdateLaboralExperience } from "app/laboral-experiences/components/validations"
import { Grid, Button, Typography } from "@mui/material"

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
        <title>Edit LaboralExperience {laboralExperience.position}</title>
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
              Edit Laboral Experience {laboralExperience.position}
            </Typography>
          </Grid>

          <pre>{JSON.stringify(laboralExperience, null, 2)}</pre>

          <Grid item xs={12}>
            <LaboralExperienceForm
              submitText="Save" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={UpdateLaboralExperience}
              initialValues={laboralExperience}
              onSubmit={async (values) => {
                try {
                  const updated = await updateLaboralExperienceMutation({
                    id: laboralExperience.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  router.push(
                    Routes.EditCurriculumPage({ curriculumId: laboralExperience.curriculumId })
                  )
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

const EditLaboralExperiencePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLaboralExperience />
      </Suspense>

      <Grid item xs={12}>
        <p>
          <Link href={Routes.LaboralExperiencesPage()}>
            <Button variant="outlined"> LaboralExperiences </Button>
          </Link>
        </p>
      </Grid>
    </div>
  )
}

EditLaboralExperiencePage.authenticate = true

EditLaboralExperiencePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLaboralExperiencePage
