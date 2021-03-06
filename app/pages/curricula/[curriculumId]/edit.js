import { Suspense, useState } from "react"

import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurriculum from "app/curricula/queries/getCurriculum"
import updateCurriculum from "app/curricula/mutations/updateCurriculum"
import { UpdateCurriculum } from "app/curricula/components/validations"
import { CurriculumForm, FORM_ERROR } from "app/curricula/components/CurriculumForm"
import { Button, Grid, Typography } from "@mui/material"
import PDFViewPage from "./pdf-view"
import CloneCurriculumPage from "./clone"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import AcademicEducationsPage from "app/pages/academic-educations/index"
import PublicationsPage from "app/pages/publications/index"
import TechnicalEducationsPage from "app/pages/technical-educations/index"
import ReferencesPage from "app/pages/references/index"
import SkillsPage from "app/pages/skills/index"
import LaboralExperiencesPage from "app/pages/laboral-experiences/index"

import { EditableTitleText } from "app/core/components/EditableTitleText"
import CustomSpinner from "app/core/components/CustomSpinner"

import TemplateList from "app/templates/components/TemplateList"

export const EditCurriculum = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum, { setQueryData }] = useQuery(getCurriculum, {
    id: curriculumId,
  })
  const [updateCurriculumMutation] = useMutation(updateCurriculum)
  const currentUser = useCurrentUser()

  curriculum.profession = (curriculum.profession === null ? "" : curriculum.profession)
  curriculum.description = (curriculum.description === null ? "" : curriculum.description)

  const [templateId, setTemplateId] = useState(curriculum.templateId)

  const {
    skillLabel,
    laboralExperienceLabel,
    academicEducationLabel,
    technicalEducationLabel,
    publicationLabel,
    referenceLabel,
  } = curriculum
  const [labels, setLabels] = useState({
    skillLabel,
    laboralExperienceLabel,
    academicEducationLabel,
    technicalEducationLabel,
    publicationLabel,
    referenceLabel,
  })

  const updateState = (event) => {
    const target = event.target
    setLabels({ ...labels, [target.name]: target.value })
  }

  const style = {
    hr: {
      marginTop: "3rem",
      color: "black",
      backgroundColor: "black",
      height: 1,
    },
  }

  const submitChange = async (values) => {
    const newValues = values === undefined ? curriculum : values
    newValues.templateId = templateId
    try {
      setIsLoading(true)
      const updated = await updateCurriculumMutation({
        id: curriculum.id,
        ...newValues,
        ...labels,
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
        <Grid item xs={4}>
          {currentUser && (
            <div>
              <Head>
                <title>Edit Curriculum {curriculum.name}</title>
              </Head>
              <p>
                <Link href={Routes.PDFViewPage({ curriculumId: curriculumId })}>
                  <Button variant="outlined">Generar PDF</Button>
                </Link>
              </p>
              <p>
                <Link href={Routes.CloneCurriculumPage({ curriculumId: curriculumId })}>
                  <Button variant="outlined">Clonar Curr??culum</Button>
                </Link>
              </p>

              <h1>Editar el curr??culum: {curriculum.name}</h1>

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
                submitText="Actualizar Curr??culum" // TODO use a zod schema for form validation
                //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                //         then import and use it here
                schema={UpdateCurriculum}
                initialValues={{ ...curriculum, ...labels }}
                onSubmit={submitChange}
              />
              <hr style={style.hr} />
              <EditableTitleText
                name="skillLabel"
                title={curriculum.skillLabel}
                updateState={updateState}
                submitChange={submitChange}
                onCurriculum
              />
              <SkillsPage curriculumId={curriculumId} onCurriculum />
              <hr style={style.hr} />
              <EditableTitleText
                name="laboralExperienceLabel"
                title={curriculum.laboralExperienceLabel}
                updateState={updateState}
                submitChange={submitChange}
              />
              <LaboralExperiencesPage curriculumId={curriculumId} onCurriculum />
              <hr style={style.hr} />
              <EditableTitleText
                name="academicEducationLabel"
                title={curriculum.academicEducationLabel}
                updateState={updateState}
                submitChange={submitChange}
              />
              <AcademicEducationsPage curriculumId={curriculumId} onCurriculum />
              <hr style={style.hr} />
              <EditableTitleText
                name="technicalEducationLabel"
                title={curriculum.technicalEducationLabel}
                updateState={updateState}
                submitChange={submitChange}
              />
              <TechnicalEducationsPage curriculumId={curriculumId} onCurriculum />
              <hr style={style.hr} />
              <EditableTitleText
                name="publicationLabel"
                title={curriculum.publicationLabel}
                updateState={updateState}
                submitChange={submitChange}
              />
              <PublicationsPage curriculumId={curriculumId} onCurriculum />
              <hr style={style.hr} />
              <EditableTitleText
                name="referenceLabel"
                title={curriculum.referenceLabel}
                updateState={updateState}
                submitChange={submitChange}
              />
              <ReferencesPage curriculumId={curriculumId} onCurriculum />
              <hr style={style.hr} />
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
                Seleccione una plantilla
              </Typography>
              <Suspense fallback={<CustomSpinner />}>
                <TemplateList 
                  showName={false} 
                  onClick={ async (template) => {
                    if (curriculum.templateId !== template.id){
                      curriculum.templateId = template.id
                      setTemplateId(template.id)
                      await submitChange()
                  }
                }}/>
              </Suspense>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const EditCurriculumPage = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <Suspense fallback={<CustomSpinner />}>
          <EditCurriculum />
        </Suspense>
      </div>
    )
  }
}

EditCurriculumPage.authenticate = true

EditCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>

// EditCurriculumPage.NavigateAuthenticatedTo = ({ session }) =>
//   session.role === "admin" ? "/admin" : Routes.Home()

export default EditCurriculumPage
