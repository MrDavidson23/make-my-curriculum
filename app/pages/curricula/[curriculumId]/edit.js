import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurriculum from "app/curricula/queries/getCurriculum"
import updateCurriculum from "app/curricula/mutations/updateCurriculum"
import { UpdateCurriculum } from "app/curricula/components/validations"
import { CurriculumForm, FORM_ERROR } from "app/curricula/components/CurriculumForm"
import { Button, Grid, Typography } from "@mui/material"
import PDFViewPage from "./pdf-view"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import AcademicEducationsPage from "app/pages/academic-educations/index"
import PublicationsPage from "app/pages/publications/index"
import TechnicalEducationsPage from "app/pages/technical-educations/index"
import ReferencesPage from "app/pages/references/index"
import SkillsPage from "app/pages/skills/index"
import LaboralExperiencesPage from "app/pages/laboral-experiences/index"

export const EditCurriculum = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum, { setQueryData }] = useQuery(getCurriculum, {
    id: curriculumId,
  })
  const [updateCurriculumMutation] = useMutation(updateCurriculum)
  const currentUser = useCurrentUser()
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justify={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={4}>
          {currentUser && (
            <div>
              <p>
                <Link href={Routes.PDFViewPage({ curriculumId: curriculumId })}>
                  <Button variant="outlined">Generar PDF</Button>
                </Link>
              </p>

              <h1>Editar el curriculum: {curriculum.name}</h1>

              <Typography variant="h6" gutterBottom>
                {currentUser.name} {currentUser.lastName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {currentUser.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {currentUser.phone}
              </Typography>

              <CurriculumForm
                submitText="Actualizar Currículum" // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                schema={UpdateCurriculum}
                initialValues={curriculum}
                onSubmit={async (values) => {
                  try {
                    setIsLoading(true)
                    const updated = await updateCurriculumMutation({
                      id: curriculum.id,
                      ...values,
                    })
                    await setQueryData(updated)
                    router.push(
                      Routes.EditCurriculumPage({
                        curriculumId: updated.id,
                      })
                    )
                    setIsLoading(false)
                  } catch (error) {
                    console.error(error)
                    return {
                      [FORM_ERROR]: error.toString(),
                    }
                  }
                }}
              />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <SkillsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <LaboralExperiencesPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <AcademicEducationsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <TechnicalEducationsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <PublicationsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <ReferencesPage curriculumId={curriculumId} />

              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />

              <Head>
                <title>Edit Curriculum {curriculum.name}</title>
              </Head>
            </div>
          )}
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              {isLoading ? (
                <Box sx={{ width: "100%", height: 1000, paddingTop: 50 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <PDFViewPage />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Templates
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const EditCurriculumPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCurriculum />
      </Suspense>

      <p>
        <Link href={Routes.CurriculaPage()}>
          <a>Curricula</a>
        </Link>
      </p>
    </div>
  )
}

EditCurriculumPage.authenticate = true

EditCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>

// EditCurriculumPage.redirectAuthenticatedTo = ({ session }) =>
//   session.role === "admin" ? "/admin" : Routes.Home()

export default EditCurriculumPage
