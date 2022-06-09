import { Link, useRouter, useMutation, useRouterQuery, Routes } from "blitz"

import Layout from "app/core/layouts/Layout"
import createPublication from "app/publications/mutations/createPublication"
import createPublicationOnCurriculum from "app/publication-on-curricula/mutations/createPublicationOnCurriculum"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
import { Grid, Button, Typography } from "@mui/material"
import { CreatePublication } from "app/publications/components/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewPublicationPage = () => {
  const router = useRouter()
  const { curriculumId } = useRouterQuery()
  const [createPublicationMutation] = useMutation(createPublication)
  const [createPublicationOnCurriculumMutation] = useMutation(createPublicationOnCurriculum)

  const returnPage =
    curriculumId !== "" ? Routes.EditCurriculumPage({ curriculumId }) : Routes.PublicationsPage()

  const currentUser = useCurrentUser()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
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
            <Typography variant="h6" component="div" gutterBottom>
              <h1>Crear nueva Publicación</h1>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <PublicationForm
              submitText="Guardar" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={CreatePublication}
              initialValues={{ curriculumId: parseInt(curriculumId) }}
              onSubmit={async (values) => {
                try {
                  const pubObject = await createPublicationMutation(values)
                  if (curriculumId !== undefined && curriculumId !== "") {
                    await createPublicationOnCurriculumMutation({
                      curriculumId: parseInt(curriculumId),
                      publicationId: pubObject.id,
                    })
                    router.push(Routes.EditCurriculumPage({ curriculumId }))
                  } else {
                    router.push(Routes.PublicationsPage())
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
          <Grid item xs={12}>
            <p>
              <Link href={returnPage}>
                <Button variant="outlined"> Regresar </Button>
              </Link>
            </p>
          </Grid>
        </Grid>
      </div>
    )
  }
}

NewPublicationPage.authenticate = true

NewPublicationPage.getLayout = (page) => <Layout title={"Crear nueva Publicación"}>{page}</Layout>

export default NewPublicationPage
