import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCurriculum from "app/curricula/mutations/createCurriculum"
import { CurriculumForm, FORM_ERROR } from "app/curricula/components/CurriculumForm"
import { CreateCurriculum } from "app/curricula/components/validations"
import { Grid } from "@mui/material"

const NewCurriculumPage = () => {
  const router = useRouter()
  const [createCurriculumMutation] = useMutation(createCurriculum)
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      textAlign={"center"}
      justifyContent={"center"}
      sx={{ mx: "auto", width: "100%" }}
    >
      <Grid item xs={12}>
        <div>
          <h1>Crear Curriculum</h1>

          <CurriculumForm
            submitText="Crear Curriculum" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreateCurriculum}
            initialValues={{ languageId: 1, templateId: 1 }}
            onSubmit={async (values) => {
              try {
                const curriculum = await createCurriculumMutation(values)
                router.push(
                  Routes.EditCurriculumPage({
                    curriculumId: curriculum.id,
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
        </div>
      </Grid>
    </Grid>
  )
}

NewCurriculumPage.authenticate = true

NewCurriculumPage.getLayout = (page) => <Layout title={"Create New Curriculum"}>{page}</Layout>

export default NewCurriculumPage
