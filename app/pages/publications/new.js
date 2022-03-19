import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPublication from "app/publications/mutations/createPublication"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
import { Grid, Button, Typography, Box } from "@mui/material"

const NewPublicationPage = () => {
  const router = useRouter()
  const [createPublicationMutation] = useMutation(createPublication)
  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Grid
          container
          direction="row"
          spacing={0}
          textAlign={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ mx: "auto", width: "100%" }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Crear nueva Publicación
          </Typography>

          <PublicationForm
            submitText="Guardar" // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            // schema={CreatePublication}
            // initialValues={{}}
            onSubmit={async (values) => {
              console.log(values)
              /*
          try {
            const publication = await createPublicationMutation(values)
            router.push(
              Routes.ShowPublicationPage({
                publicationId: publication.id,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }*/
            }}
          />

          <p>
            <Button variant="outlined">
              <Link href={Routes.PublicationsPage()}>
                <a>Regresar</a>
              </Link>
            </Button>
          </p>
        </Grid>
      </Box>
    </div>
  )
}

NewPublicationPage.authenticate = true

NewPublicationPage.getLayout = (page) => <Layout title={"Create New Publication"}>{page}</Layout>

export default NewPublicationPage
