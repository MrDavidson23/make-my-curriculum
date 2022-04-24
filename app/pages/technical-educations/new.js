import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTechnicalEducation from "app/technical-educations/mutations/createTechnicalEducation"
import createTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/mutations/createTechnicalEducationOnCurriculum"
import {
  TechnicalEducationForm,
  FORM_ERROR,
} from "app/technical-educations/components/TechnicalEducationForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreateTechnicalEducation } from "app/technical-educations/components/validations"

const NewTechnicalEducationPage = () => {
  const router = useRouter()
  const { curriculumId } = useRouterQuery()
  const [createTechnicalEducationMutation] = useMutation(createTechnicalEducation)
  const [createTechnicalEducationOnCurriculumMutation] = useMutation(
    createTechnicalEducationOnCurriculum
  )

  const returnPage = (
    curriculumId !== '' ?
      Routes.EditCurriculumPage({ curriculumId }) : Routes.TechnicalEducationsPage()
  )

  return (
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
            Crear nueva Educación Técnica
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TechnicalEducationForm
            submitText="Save" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateTechnicalEducation}
            initialValues={{ curriculumId: parseInt(curriculumId) }}
            onSubmit={async (values) => {
              try {
                const techObject = await createTechnicalEducationMutation(values)
                if (curriculumId !== undefined && curriculumId !== "") {
                  await createTechnicalEducationOnCurriculumMutation({
                    curriculumId: parseInt(curriculumId),
                    technicalEducationId: techObject.id,
                  })
                  router.push(Routes.EditCurriculumPage({ curriculumId }))
                } else {
                  router.push(Routes.TechnicalEducationsPage({ curriculumId }))
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
        <Grid item xs={12}>
          <p>
            <Link href={returnPage}>
              <Button variant="outlined"> Regresar </Button>
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

NewTechnicalEducationPage.authenticate = true

NewTechnicalEducationPage.getLayout = (page) => (
  <Layout title={"Create New TechnicalEducation"}>{page}</Layout>
)

export default NewTechnicalEducationPage
