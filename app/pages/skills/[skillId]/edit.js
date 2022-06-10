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
import { CurriculaList } from "app/pages/curricula"
import Layout from "app/core/layouts/Layout"
import getSkill from "app/skills/queries/getSkill"
import updateSkill from "app/skills/mutations/updateSkill"
import getSkillOnCurriculum from "app/skill-on-curricula/queries/getSkillOnCurriculum"
import createSkillOnCurriculum from "app/skill-on-curricula/mutations/createSkillOnCurriculum"
import deleteSkillOnCurriculum from "app/skill-on-curricula/mutations/deleteSkillOnCurriculum"
import { UpdateSkill } from "app/skills/components/validations"
import { Grid, Button, Typography } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
import CustomSpinner from "app/core/components/CustomSpinner"

export const EditSkill = () => {
  const router = useRouter()
  const skillId = useParam("skillId", "number")
  const { curriculumId } = useRouterQuery()
  const [skill, { setQueryData }] = useQuery(
    getSkill,
    {
      id: skillId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  return (
    <>
      <Head>
        <title> Edit Skills {skill.description}</title>
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
              <h1> Editar Habilidad {skill.description} </h1>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <SkillForm
              submitText=" Actualizar Habilidad "
              schema={UpdateSkill}
              initialValues={skill}
              onSubmit={async (values) => {
                try {
                  const updated = await updateSkill({
                    id: skill.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  if (curriculumId !== undefined && curriculumId !== "") {
                    router.push(Routes.EditCurriculumPage({ curriculumId }))
                  } else {
                    router.push(Routes.SkillsPage())
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

const EditSkillPage = () => {
  const { curriculumId } = useRouterQuery()
  const skillId = useParam("skillId", "number")
  const [skillOnCurriculum] = useQuery(getSkillOnCurriculum, {
    id: skillId,
  })
  const [createSkillOnCurriculumMutation] = useMutation(createSkillOnCurriculum)
  const [deleteSkillOnCurriculumMutation] = useMutation(deleteSkillOnCurriculum)
  const returnPage =
    curriculumId !== "" ? Routes.EditCurriculumPage({ curriculumId }) : Routes.SkillsPage()
  const onChange = async (_event, isOnCV, curriculumId) => {
    if (isOnCV) {
      await deleteSkillOnCurriculumMutation({
        curriculumId: curriculumId,
        skillId,
      })
    } else {
      await createSkillOnCurriculumMutation({
        curriculumId: curriculumId,
        skillId,
      })
    }
  }

  const currentUser = useCurrentUser()
  const router = useRouter()

  const [skill] = useQuery(getSkill, {
    id: skillId,
  })

  if (!currentUser || currentUser.id != skill.userId) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <Suspense fallback={<CustomSpinner />}>
          <EditSkill />
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
            curriculumsHighlight={skillOnCurriculum.map((cv) => {
              return cv.curriculumId
            })}
            onChangeCurriculumHighlight={onChange}
          />
        </Suspense>
      </div>
    )
  }
}

EditSkillPage.authenticate = true

EditSkillPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSkillPage
