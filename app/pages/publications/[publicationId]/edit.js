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
import Layout from "app/core/layouts/Layout"
import { CurriculaList } from "app/pages/curricula"
import getPublication from "app/publications/queries/getPublication"
import updatePublication from "app/publications/mutations/updatePublication"
import getPublicationOnCurriculum from "app/publication-on-curricula/queries/getPublicationOnCurriculum"
import createPublicationOnCurriculumMutation from "app/publication-on-curricula/mutations/createPublicationOnCurriculum"
import deletePublicationOnCurriculumMutation from "app/publication-on-curricula/mutations/deletePublicationOnCurriculum"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
import { UpdatePublication } from "app/publications/components/validations"
import { Grid, Button, Typography } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const EditPublication = () => {
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
        </Grid>
      </div>
    </>
  )
}

const EditPublicationPage = () => {
  const { curriculumId } = useRouterQuery()
  const publicationId = useParam("publicationId", "number")
  const returnPage =
    curriculumId !== "" ? Routes.EditCurriculumPage({ curriculumId }) : Routes.PublicationsPage()
  const [publicationOnCurriculum] = useQuery(getPublicationOnCurriculum, {
    id: publicationId,
  })
  const [createPublicationOnCurriculum] = useMutation(createPublicationOnCurriculumMutation)
  const [deletePublicationOnCurriculum] = useMutation(deletePublicationOnCurriculumMutation)
  const onChange = async (_event, isOnCV, curriculumId) => {
    if (isOnCV) {
      await deletePublicationOnCurriculum({
        curriculumId: curriculumId,
        publicationId,
      })
    } else {
      await createPublicationOnCurriculum({
        curriculumId: curriculumId,
        publicationId,
      })
    }
  }

  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <Suspense fallback={<CustomSpinner />}>
          <EditPublication />
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
            curriculumsHighlight={publicationOnCurriculum.map((cv) => {
              return cv.curriculumId
            })}
            onChangeCurriculumHighlight={onChange}
          />
        </Suspense>
      </div>
    )
  }
}

EditPublicationPage.authenticate = true

EditPublicationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPublicationPage
