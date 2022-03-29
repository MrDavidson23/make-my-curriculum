import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTechnicalEducation from "app/technical-educations/mutations/createTechnicalEducation"
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
            Create New Technical Education
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
                await createTechnicalEducationMutation(values)
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
            <Link href={Routes.TechnicalEducationsPage()}>
              <Button variant="outlined"> Return </Button>
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
