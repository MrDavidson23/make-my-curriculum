import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useRouterQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkill from "app/skills/queries/getSkill"
import updateSkill from "app/skills/mutations/updateSkill"
import { UpdateSkill } from "app/skills/components/validations"
import { Grid, Button, Typography } from "@mui/material"

import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
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
  //const [updateSkillMutation] = useMutation(updateSkill)
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
            <Typography variant="h3" component="div" gutterBottom>
              Editar Habilidad {skill.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <SkillForm
              submitText="Save" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
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
                    router.push(Routes.EditCurriculumPage({curriculumId}))
                  }else{
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
  const returnPage = (
    curriculumId !== '' ?
      Routes.EditCurriculumPage({ curriculumId }) : Routes.SkillsPage()
  )
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSkill />
      </Suspense>

      <Grid item xs={12}>
        <p>
          <Link href={returnPage}>
            <Button variant="outlined"> Regresar </Button>
          </Link>
        </p>
      </Grid>
    </div>
  )
}

EditSkillPage.authenticate = true

EditSkillPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSkillPage
