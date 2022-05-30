import { Suspense, Redirect } from "react"
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
import getLaboralExperience from "app/laboral-experiences/queries/getLaboralExperience"
import updateLaboralExperience from "app/laboral-experiences/mutations/updateLaboralExperience"
import getLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/queries/getLaboralExperienceOnCurriculum"
import createLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/createLaboralExperienceOnCurriculum"
import deleteLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/deleteLaboralExperienceOnCurriculum"
import { UpdateLaboralExperience } from "app/laboral-experiences/components/validations"
import { Grid, Button, Typography } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import {
  LaboralExperienceForm,
  FORM_ERROR,
} from "app/laboral-experiences/components/LaboralExperienceForm"
import CustomSpinner from "app/core/components/CustomSpinner"
export const EditLaboralExperience = () => {
  const router = useRouter()
  const laboralExperienceId = useParam("laboralExperienceId", "number")
  const { curriculumId } = useRouterQuery()
  const [laboralExperience, { setQueryData }] = useQuery(
    getLaboralExperience,
    {
      id: laboralExperienceId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateLaboralExperienceMutation] = useMutation(updateLaboralExperience)
  return (
    <>
      <Head>
        <title>Edit LaboralExperience {laboralExperience.position}</title>
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
              <h1> Editar Experiencia Laboral {laboralExperience.position} </h1>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <LaboralExperienceForm
              submitText="Actualizar Experiencia Laboral" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={UpdateLaboralExperience}
              initialValues={laboralExperience}
              onSubmit={async (values) => {
                try {
                  const updated = await updateLaboralExperienceMutation({
                    id: laboralExperience.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  if (curriculumId !== undefined && curriculumId !== "") {
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
        </Grid>
      </div>
    </>
  )
}

const EditLaboralExperiencePage = () => {
  const { curriculumId } = useRouterQuery()
  const laboralExperienceId = useParam("laboralExperienceId", "number")
  const returnPage =
    curriculumId !== ""
      ? Routes.EditCurriculumPage({ curriculumId })
      : Routes.LaboralExperiencesPage()
  const [laboralExperienceOnCurriculum] = useQuery(getLaboralExperienceOnCurriculum, {
    id: laboralExperienceId,
  })
  const [createLaboralExperienceMutation] = useMutation(createLaboralExperienceOnCurriculum)
  const [deleteLaboralExperienceMutation] = useMutation(deleteLaboralExperienceOnCurriculum)
  const onChange = async (_event, isOnCV, curriculumId) => {
    if (isOnCV) {
      await deleteLaboralExperienceMutation({
        curriculumId: curriculumId,
        laboralExperienceId,
      })
    } else {
      await createLaboralExperienceMutation({
        curriculumId: curriculumId,
        laboralExperienceId,
      })
    }
  }

  const currentUser = useCurrentUser()
  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }

  return (
    <div>
      <Suspense fallback={<CustomSpinner />}>
        <EditLaboralExperience />
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
          curriculumsHighlight={laboralExperienceOnCurriculum.map((cv) => {
            return cv.curriculumId
          })}
          onChangeCurriculumHighlight={onChange}
        />
      </Suspense>
    </div>
  )
}

EditLaboralExperiencePage.authenticate = true

EditLaboralExperiencePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLaboralExperiencePage
