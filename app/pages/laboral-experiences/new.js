import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLaboralExperience from "app/laboral-experiences/mutations/createLaboralExperience"
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
            Create New Laboral Experience
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LaboralExperienceForm
            submitText="Save" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateLaboralExperience}
            initialValues={{ curriculumId: parseInt(curriculumId) }}
            onSubmit={async (values) => {
              try {
                await createLaboralExperienceMutation(values)
                router.push(Routes.EditCurriculumPage({ curriculumId }))
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
            <Link href={Routes.LaboralExperiencesPage()}>
              <Button variant="outlined"> Return </Button>
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
