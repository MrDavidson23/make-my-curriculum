import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAcademicEducation from "app/academic-educations/mutations/createAcademicEducation"
import {
  AcademicEducationForm,
  FORM_ERROR,
} from "app/academic-educations/components/AcademicEducationForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreateAcademicEducation } from "app/academic-educations/components/validations"

const NewAcademicEducationPage = () => {
  const router = useRouter()
  const {curriculumId} = useRouterQuery()
  const [createAcademicEducationMutation] = useMutation(createAcademicEducation)
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
          Crear nueva Educación Académica
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <AcademicEducationForm
        submitText="Guardar" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateAcademicEducation}
        initialValues={{curriculumId:parseInt(curriculumId)}}
        onSubmit={async (values) => {
          
          try {
            await createAcademicEducationMutation(values)
            router.push(
              Routes.EditCurriculumPage({curriculumId})
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
      <Grid item xs={12}>
      <p>
          <Link href={Routes.EditCurriculumPage({curriculumId})}>
            <Button variant="outlined">  Regresar </Button>
          </Link>
      </p>
      </Grid>
      </Grid>
    </div>
  )
}

NewAcademicEducationPage.authenticate = true

NewAcademicEducationPage.getLayout = (page) => (
  <Layout title={"Crear nueva Educación Académica"}>{page}</Layout>
)

export default NewAcademicEducationPage
