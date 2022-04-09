import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurriculum from "app/curricula/queries/getCurriculum"
import updateCurriculum from "app/curricula/mutations/updateCurriculum"
import { UpdateCurriculum } from "app/curricula/components/validations"
import { CurriculumForm, FORM_ERROR } from "app/curricula/components/CurriculumForm"
import { Button, Grid, Typography } from "@mui/material"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import AcademicEducationsPage from "app/pages/academic-educations/index"
import PublicationsPage from "app/pages/publications/index"
import TechnicalEducationsPage from "app/pages/technical-educations/index"
import ReferencesPage from "app/pages/references/index"
import SkillsPage from "app/pages/skills/index"
import LaboralExperiencesPage from "app/pages/laboral-experiences/index"

import { EditableTitleText } from "app/core/components/EditableTitleText"

export const EditCurriculum = () => {
  const router = useRouter()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum, { setQueryData }] = useQuery(
    getCurriculum,
    {
      id: curriculumId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCurriculumMutation] = useMutation(updateCurriculum)
  const currentUser = useCurrentUser()
  const {
    skillLabel,
    laboralExperienceLabel,
    academicEducationLabel,
    technicalEducationLabel,
    publicationLabel,
    referenceLabel
  } = curriculum  
  const [labels, setLabels] = useState({
    skillLabel,
    laboralExperienceLabel,
    academicEducationLabel,
    technicalEducationLabel,
    publicationLabel,
    referenceLabel
  })

  const updateState = (event) => {
    const target = event.target
    setLabels({...labels, [target.name]:target.value})
  }

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
        <Grid item xs={12}>
          {currentUser && (
            <div>
              <p>
                <Link href={Routes.PDFViewPage({ curriculumId: curriculumId })}>
                  <Button variant="outlined">Generar PDF</Button>
                </Link>
              </p>

              <h1>Editar el curriculum: {curriculum.name}</h1>

              {/*<pre>{JSON.stringify(curriculum, null, 2)}</pre>*/}

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
                submitText="Update Curriculum" // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                schema={UpdateCurriculum}
                initialValues={curriculum}
                onSubmit={async (values) => {  
                const newValues = {...values,...labels}       
                  try {
                    const updated = await updateCurriculumMutation({
                      id: curriculum.id,
                      ...newValues,
                    })
                    await setQueryData(updated)
                    router.push(
                      Routes.EditCurriculumPage({
                        curriculumId: updated.id,
                      })
                    )
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
              <EditableTitleText name="skillLabel" title={curriculum.skillLabel} updateState={updateState}/>
              <SkillsPage curriculumId={curriculumId}/>
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <EditableTitleText name="laboralExperienceLabel" title={curriculum.laboralExperienceLabel} updateState={updateState}/>
              <LaboralExperiencesPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <EditableTitleText name="academicEducationLabel" title={curriculum.academicEducationLabel} updateState={updateState}/>
              <AcademicEducationsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <EditableTitleText name="technicalEducationLabel" title={curriculum.technicalEducationLabel} updateState={updateState}/>
              <TechnicalEducationsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <EditableTitleText name="publicationLabel" title={curriculum.publicationLabel} updateState={updateState}/>
              <PublicationsPage curriculumId={curriculumId} />
              <hr
                style={{
                  marginTop: "3rem",

                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
              <EditableTitleText name="referenceLabel" title={curriculum.referenceLabel} updateState={updateState}/>
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
