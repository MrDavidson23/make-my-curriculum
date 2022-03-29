import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublication from "app/publications/queries/getPublication"
import updatePublication from "app/publications/mutations/updatePublication"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
import { UpdatePublication } from "app/publications/components/validations"
import { Grid, Button, Typography } from "@mui/material"

export const EditPublication = () => {
  const router = useRouter()
  const publicationId = useParam("publicationId", "number")
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
        <Typography variant="h3" component="div" gutterBottom>
          Editar Publicación {publication.name}
        </Typography>
      </Grid>
        <pre>{JSON.stringify(publication, null, 2)}</pre>

      <Grid item xs={12}>
        <PublicationForm
          submitText="Update Publication" // TODO use a zod schema for form validation
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
              router.push(
                Routes.EditCurriculumPage({curriculumId:publication.curriculumId})
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
      </Grid>
      </div>
    </>
  )
}

const EditPublicationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPublication />
      </Suspense>

      <Grid item xs={12}>
        <p>
          <Link href={Routes.PublicationsPage()}>
            <Button variant="outlined"> Publications </Button>
          </Link>
        </p>
      </Grid>
    </div>
  )
}

EditPublicationPage.authenticate = true

EditPublicationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPublicationPage
