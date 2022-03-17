import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAcademicEducation from "app/academic-educations/mutations/createAcademicEducation"
import {
  AcademicEducationForm,
  FORM_ERROR,
} from "app/academic-educations/components/AcademicEducationForm"
import { Grid, Button, Box, Typography } from "@mui/material"

const NewAcademicEducationPage = () => {
  const router = useRouter()
  const [createAcademicEducationMutation] = useMutation(createAcademicEducation)
  return (
    <div>
      
      <Box sx={{ width: "100%", maxWidth: 500 }}>

      <Grid container 
          direction="row"
          spacing={0}
          textAlign={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ mx: "auto", width: "100%" }}>

      <Typography variant="h6" component="div" gutterBottom>
        Crear nueva Educación Académica
      </Typography>

      <AcademicEducationForm
        submitText="Guardar" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAcademicEducation}
        // initialValues={{}}
        onSubmit={async (values) => {
          console.log(values)
          /*try {
            const academicEducation = await createAcademicEducationMutation(values)
            router.push(
              Routes.ShowAcademicEducationPage({
                academicEducationId: academicEducation.id,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }*/
        }}
      />
      <p>
          <Button variant="outlined">
            <Link href={Routes.AcademicEducationsPage()}>
              <a>Regresar</a>
            </Link>
          </Button>
      </p>
      </Grid>
      </Box>
    </div>
  )
}

NewAcademicEducationPage.authenticate = true

NewAcademicEducationPage.getLayout = (page) => (
  <Layout title={"Create New AcademicEducation"}>{page}</Layout>
)

export default NewAcademicEducationPage
