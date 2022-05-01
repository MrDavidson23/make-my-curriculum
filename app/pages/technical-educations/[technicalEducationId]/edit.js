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
import getTechnicalEducation from "app/technical-educations/queries/getTechnicalEducation"
import updateTechnicalEducation from "app/technical-educations/mutations/updateTechnicalEducation"
import getTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/queries/getTechnicalEducationOnCurriculum"
import createTechnicalEducationOnCurriculumMutation from "app/technical-education-on-curricula/mutations/createTechnicalEducationOnCurriculum"
import deleteTechnicalEducationOnCurriculumMutation from "app/technical-education-on-curricula/mutations/deleteTechnicalEducationOnCurriculum"
import { UpdateTechnicalEducation } from "app/technical-educations/components/validations"
import { Grid, Button, Typography } from "@mui/material"

import {
  TechnicalEducationForm,
  FORM_ERROR,
} from "app/technical-educations/components/TechnicalEducationForm"
import CustomSpinner from "app/core/components/CustomSpinner"
export const EditTechnicalEducation = () => {
  const router = useRouter()
  const technicalEducationId = useParam("technicalEducationId", "number")
  const { curriculumId } = useRouterQuery()
  const [technicalEducation, { setQueryData }] = useQuery(
    getTechnicalEducation,
    {
      id: technicalEducationId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTechnicalEducationMutation] = useMutation(updateTechnicalEducation)
  return (
    <>
      <Head>
        <title>Edit Technical Education {technicalEducation.studies}</title>
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
              <h1> Editar Educación Técnica {technicalEducation.studies} </h1>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TechnicalEducationForm
              submitText="Actualizar Educación Técnica" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={UpdateTechnicalEducation}
              initialValues={technicalEducation}
              onSubmit={async (values) => {
                try {
                  const updated = await updateTechnicalEducationMutation({
                    id: technicalEducation.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  if (curriculumId !== undefined && curriculumId !== "") {
                    router.push(Routes.EditCurriculumPage({ curriculumId }))
                  } else {
                    router.push(Routes.TechnicalEducationsPage())
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

const EditTechnicalEducationPage = () => {
  const { curriculumId } = useRouterQuery()
  const technicalEducationId = useParam("technicalEducationId", "number")
  const returnPage =
    curriculumId !== ""
      ? Routes.EditCurriculumPage({ curriculumId })
      : Routes.TechnicalEducationsPage()
  const [technicalEducationOnCurriculum] = useQuery(getTechnicalEducationOnCurriculum, {
    id: technicalEducationId,
  })
  const [createTechnicalEducationOnCurriculum] = useMutation(
    createTechnicalEducationOnCurriculumMutation
  )
  const [deleteTechnicalEducationOnCurriculum] = useMutation(
    deleteTechnicalEducationOnCurriculumMutation
  )
  const onChange = async (_event, isOnCV, curriculumId) => {
    if (isOnCV) {
      await deleteTechnicalEducationOnCurriculum({
        curriculumId: curriculumId,
        technicalEducationId,
      })
    } else {
      await createTechnicalEducationOnCurriculum({
        curriculumId: curriculumId,
        technicalEducationId,
      })
    }
  }
  return (
    <div>
      <Suspense fallback={<CustomSpinner />}>
        <EditTechnicalEducation />
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
          curriculumsHighlight={technicalEducationOnCurriculum.map((cv) => {
            return cv.curriculumId
          })}
          onChangeCurriculumHighlight={onChange}
        />
      </Suspense>
    </div>
  )
}

EditTechnicalEducationPage.authenticate = true

EditTechnicalEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTechnicalEducationPage
