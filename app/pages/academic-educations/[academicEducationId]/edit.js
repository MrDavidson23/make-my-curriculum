import { Suspense } from "react"

import {
  Head,
  Link,
  useRouter,
  useQuery,
  useRouterQuery,
  useMutation,
  useParam,
  Routes,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import { CurriculaList } from "app/pages/curricula"
import getAcademicEducation from "app/academic-educations/queries/getAcademicEducation"
import updateAcademicEducation from "app/academic-educations/mutations/updateAcademicEducation"
import getAcademicEducationOnCurriculum from "app/academic-education-on-curricula/queries/getAcademicEducationOnCurriculum"
import createAcademicEducationOnCurriculumMutation from "app/academic-education-on-curricula/mutations/createAcademicEducationOnCurriculum"
import deleteAcademicEducationOnCurriculumMutation from "app/academic-education-on-curricula/mutations/deleteAcademicEducationOnCurriculum"
import { UpdateAcademicEducation } from "app/academic-educations/components/validations"
import { Grid, Button, Typography } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import {
  AcademicEducationForm,
  FORM_ERROR,
} from "app/academic-educations/components/AcademicEducationForm"
import CustomSpinner from "app/core/components/CustomSpinner"
export const EditAcademicEducation = () => {
  const router = useRouter()
  const academicEducationId = useParam("academicEducationId", "number")
  const { curriculumId } = useRouterQuery()
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
            <Typography variant="h6" component="div" gutterBottom>
              <h1> Editar Educación Académica {academicEducation.studies} </h1>
            </Typography>
          </Grid>

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
                  if (curriculumId !== undefined && curriculumId !== "") {
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
        </Grid>
      </div>
    </>
  )
}

const EditAcademicEducationPage = () => {
  const { curriculumId } = useRouterQuery()
  const academicEducationId = useParam("academicEducationId", "number")
  const returnPage =
    curriculumId !== ""
      ? Routes.EditCurriculumPage({ curriculumId })
      : Routes.AcademicEducationsPage()
  const [academicEducationOnCurriculum] = useQuery(getAcademicEducationOnCurriculum, {
    id: academicEducationId,
  })
  const [createLaboralExperienceOnCurriculum] = useMutation(
    createAcademicEducationOnCurriculumMutation
  )
  const [deleteAcademicEducationOnCurriculum] = useMutation(
    deleteAcademicEducationOnCurriculumMutation
  )
  const onChange = async (_event, isOnCV, curriculumId) => {
    if (isOnCV) {
      await deleteAcademicEducationOnCurriculum({
        curriculumId: curriculumId,
        academicEducationId,
      })
    } else {
      await createLaboralExperienceOnCurriculum({
        curriculumId: curriculumId,
        academicEducationId,
      })
    }
  }
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <Suspense fallback={<CustomSpinner />}>
          <EditAcademicEducation />
        </Suspense>

        <Grid item xs={12}>
          <p>
            <Link href={returnPage}>
              <Button variant="outlined"> Regresar </Button>
            </Link>
          </p>
        </Grid>
        <Suspense fallback={<CustomSpinner />}>
          <CurriculaList
            curriculumsHighlight={academicEducationOnCurriculum.map((cv) => {
              return cv.curriculumId
            })}
            onChangeCurriculumHighlight={onChange}
          />
        </Suspense>
      </div>
    )
  }
}

EditAcademicEducationPage.authenticate = true

EditAcademicEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAcademicEducationPage
