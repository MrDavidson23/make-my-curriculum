import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useRouterQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublication from "app/publications/queries/getPublication"
import updatePublication from "app/publications/mutations/updatePublication"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
import { UpdatePublication } from "app/publications/components/validations"
import { Grid, Button, Typography } from "@mui/material"

export const EditPublication = () => {
  const router = useRouter()
  const publicationId = useParam("publicationId", "number")
  const { curriculumId } = useRouterQuery()
  const [publication, { setQueryData }] = useQuery(
    getPublication,
    {
      id: publicationId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePublicationMutation] = useMutation(updatePublication)
  return (
    <>
      <Head>
        <title>Edit Publication {publication.name}</title>
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
              <h1>Editar Publicación {publication.name}</h1>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <PublicationForm
              submitText="Actualizar Publicación" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              schema={UpdatePublication}
              initialValues={publication}
              onSubmit={async (values) => {
                try {
                  const updated = await updatePublicationMutation({
                    id: publication.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  if (curriculumId !== undefined && curriculumId !== "") {
                    router.push(Routes.EditCurriculumPage({curriculumId}))
                  }else{
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
        </Grid>
      </div>
    </>
  )
}

const EditPublicationPage = () => {
  const { curriculumId } = useRouterQuery()
  const returnPage = (
    curriculumId !== '' ?
      Routes.EditCurriculumPage({ curriculumId }) : Routes.PublicationsPage()
  )
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPublication />
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

EditPublicationPage.authenticate = true

EditPublicationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPublicationPage
