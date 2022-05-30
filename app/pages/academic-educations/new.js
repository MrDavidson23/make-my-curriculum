import { Link, useRouter, useMutation, useRouterQuery, Routes, Router, Redirect } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAcademicEducation from "app/academic-educations/mutations/createAcademicEducation"
import createAcademicEducationOnCurriculum from "app/academic-education-on-curricula/mutations/createAcademicEducationOnCurriculum"
import {
  AcademicEducationForm,
  FORM_ERROR,
} from "app/academic-educations/components/AcademicEducationForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreateAcademicEducation } from "app/academic-educations/components/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewAcademicEducationPage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const { curriculumId } = useRouterQuery()
  const [createAcademicEducationMutation] = useMutation(createAcademicEducation)
  const [createAcademicEducationOnCurriculumMutation] = useMutation(
    createAcademicEducationOnCurriculum
  )

  const returnPage =
    curriculumId !== ""
      ? Routes.EditCurriculumPage({ curriculumId })
      : Routes.AcademicEducationsPage()

  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="div" gutterBottom>
            <h1>Crear nueva Educación Académica</h1>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AcademicEducationForm
            submitText="Guardar" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateAcademicEducation}
            initialValues={{ curriculumId: parseInt(curriculumId) }}
            onSubmit={async (values) => {
              try {
                const academicObject = await createAcademicEducationMutation(values)
                if (curriculumId !== undefined && curriculumId !== "") {
                  await createAcademicEducationOnCurriculumMutation({
                    curriculumId: parseInt(curriculumId),
                    academicEducationId: academicObject.id,
                  })
                  router.push(Routes.EditCurriculumPage({ curriculumId }))
                } else {
                  router.push(Routes.AcademicEducationsPage())
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

NewAcademicEducationPage.authenticate = true

NewAcademicEducationPage.getLayout = (page) => (
  <Layout title={"Crear nueva Educación Académica"}>{page}</Layout>
)

export default NewAcademicEducationPage
