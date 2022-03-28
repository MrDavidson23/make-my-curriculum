import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducation from "app/academic-educations/queries/getAcademicEducation"
import updateAcademicEducation from "app/academic-educations/mutations/updateAcademicEducation"
import { UpdateAcademicEducation } from "app/academic-educations/components/validations"
import { Grid, Button, Typography } from "@mui/material"

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
        <title>Edit AcademicEducation {academicEducation.studies}</title>
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
            Editar Educación Académica {academicEducation.studies}
          </Typography>
        </Grid>

        <pre>{JSON.stringify(academicEducation, null, 2)}</pre>
        
        <Grid item xs={12}>
        <AcademicEducationForm
          submitText="Guardar" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateAcademicEducation}
          initialValues={academicEducation}
          onSubmit={async (values) => {
            try {
              const updated = await updateAcademicEducationMutation({
                id: academicEducation.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.EditCurriculumPage({curriculumId:academicEducation.curriculumId})
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

const EditAcademicEducationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAcademicEducation />
      </Suspense>

      <Grid item xs={12}>
        <p>
          <Link href={Routes.AcademicEducationsPage()}>
            <Button variant="outlined"> AcademicEducations </Button>
          </Link>
        </p>
      </Grid>
    </div>
  )
}

EditAcademicEducationPage.authenticate = true

EditAcademicEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAcademicEducationPage
