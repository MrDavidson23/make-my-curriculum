import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSkill from "app/skills/mutations/createSkill"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreateSkill } from "app/skills/components/validations"

const NewSkillPage = () => {
  const router = useRouter()
  const { curriculumId } = useRouterQuery()
  const [createSkillMutation] = useMutation(createSkill)
  return (
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
            Create New Skill
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SkillForm
            submitText="Save" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateSkill}
            initialValues={{ curriculumId: parseInt(curriculumId) }}
            onSubmit={async (values) => {
              try {
                await createSkillMutation(values)
                router.push(Routes.EditCurriculumPage({ curriculumId }))
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
            <Link href={Routes.SkillsPage()}>
              <Button variant="outlined"> Return </Button>
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

NewSkillPage.authenticate = true

NewSkillPage.getLayout = (page) => <Layout title={"Create New Skill"}>{page}</Layout>

export default NewSkillPage
