import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLaboralExperience from "app/laboral-experiences/mutations/createLaboralExperience"
import createLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/createLaboralExperienceOnCurriculum"
import {
  LaboralExperienceForm,
  FORM_ERROR,
} from "app/laboral-experiences/components/LaboralExperienceForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreateLaboralExperience } from "app/laboral-experiences/components/validations"

const NewLaboralExperiencePage = () => {
  const router = useRouter()
  const { curriculumId } = useRouterQuery()
  const [createLaboralExperienceMutation] = useMutation(createLaboralExperience)
  const [createLaboralExperienceOnCurriculumMutation] = useMutation(
    createLaboralExperienceOnCurriculum
  )

  const returnPage = (
    curriculumId !== '' ?
      Routes.EditCurriculumPage({ curriculumId }) : Routes.LaboralExperiencesPage()
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
          <Typography variant="h6" component="div" gutterBottom>
            <h1> Crear nueva Experiencia Laboral </h1>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LaboralExperienceForm
            submitText="Guardar" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateLaboralExperience}
            initialValues={{ curriculumId: parseInt(curriculumId) }}
            onSubmit={async (values) => {
              try {
                const laboralObject = await createLaboralExperienceMutation(values)
                if (curriculumId !== undefined && curriculumId !== "") {
                  await createLaboralExperienceOnCurriculumMutation({
                    curriculumId: parseInt(curriculumId),
                    laboralExperienceId: laboralObject.id,
                  })
                  router.push(Routes.EditCurriculumPage({ curriculumId }))
                } else {
                  router.push(Routes.LaboralExperiencesPage())
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

NewLaboralExperiencePage.authenticate = true

NewLaboralExperiencePage.getLayout = (page) => (
  <Layout title={"Create New LaboralExperience"}>{page}</Layout>
)

export default NewLaboralExperiencePage
