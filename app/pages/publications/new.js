import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPublication from "app/publications/mutations/createPublication"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreatePublication } from "app/publications/components/validations"

const NewPublicationPage = () => {
  const router = useRouter()
  const {curriculumId} = useRouterQuery()
  const [createPublicationMutation] = useMutation(createPublication)
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
          Crear nueva Publicación
        </Typography>
      </Grid>

      <Grid item xs={12}>
          <PublicationForm
            submitText="Guardar" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            schema={CreatePublication}
            initialValues={{curriculumId:parseInt(curriculumId)}}
            onSubmit={async (values) => {
            try {
              await createPublicationMutation(values)
              router.push(
                Routes.EditCurriculumPage({curriculumId})
              )
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
              <Link href={Routes.EditCurriculumPage({curriculumId})}>
                <Button variant="outlined"> Regresar </Button>
              </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

NewPublicationPage.authenticate = true

NewPublicationPage.getLayout = (page) => <Layout title={"Crear nueva Publicación"}>{page}</Layout>

export default NewPublicationPage
