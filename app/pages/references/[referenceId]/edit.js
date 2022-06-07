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
import getReference from "app/references/queries/getReference"
import { ReferenceForm, FORM_ERROR } from "app/references/components/ReferenceForm"
import updateReference from "app/references/mutations/updateReference"
import getReferenceOnCurriculum from "app/reference-on-curricula/queries/getReferenceOnCurriculum"
import createReferenceOnCurriculumMutation from "app/reference-on-curricula/mutations/createReferenceOnCurriculum"
import deleteReferenceOnCurriculumMutation from "app/reference-on-curricula/mutations/deleteReferenceOnCurriculum"
import { UpdateReferenceValidation } from "app/references/components/validaciones"
import { Grid, Button, Typography } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const EditReference = () => {
  const router = useRouter()
  const referenceId = useParam("referenceId", "number")
  const { curriculumId } = useRouterQuery()
  const [reference, { setQueryData }] = useQuery(
    getReference,
    {
      id: referenceId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateReferenceMutation] = useMutation(updateReference)

  return (
    <>
      <Head>
        <title>Edit Reference {reference.name}</title>
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
              <h1>Editar Referencia {reference.name}</h1>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ReferenceForm
              submitText="Actualizar Referencia" // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={UpdateReference}
              schema={UpdateReferenceValidation} ///estaba comentado
              initialValues={reference}
              onSubmit={async (values) => {
                try {
                  const updated = await updateReferenceMutation({
                    id: reference.id,
                    ...values,
                  })
                  await setQueryData(updated)
                  if (curriculumId !== undefined && curriculumId !== "") {
                    router.push(Routes.EditCurriculumPage({ curriculumId }))
                  } else {
                    router.push(Routes.ReferencesPage())
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

const EditReferencePage = () => {
  const { curriculumId } = useRouterQuery()
  const referenceId = useParam("referenceId", "number")
  const returnPage =
    curriculumId !== "" ? Routes.EditCurriculumPage({ curriculumId }) : Routes.ReferencesPage()
  const [referenceOnCurriculum] = useQuery(getReferenceOnCurriculum, {
    id: referenceId,
  })
  const [createReferenceOnCurriculum] = useMutation(createReferenceOnCurriculumMutation)
  const [deleteReferenceOnCurriculum] = useMutation(deleteReferenceOnCurriculumMutation)
  const onChange = async (_event, isOnCV, curriculumId) => {
    if (isOnCV) {
      await deleteReferenceOnCurriculum({
        curriculumId: curriculumId,
        referenceId,
      })
    } else {
      await createReferenceOnCurriculum({
        curriculumId: curriculumId,
        referenceId,
      })
    }
  }

  const currentUser = useCurrentUser()
  const router = useRouter()

  const [reference] = useQuery(getReference, {
    id: referenceId,
  })

  if (!currentUser || currentUser.id != reference.userId) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <Suspense fallback={<CustomSpinner />}>
          <EditReference />
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
            curriculumsHighlight={referenceOnCurriculum.map((cv) => {
              return cv.curriculumId
            })}
            onChangeCurriculumHighlight={onChange}
          />
        </Suspense>
      </div>
    )
  }
}

EditReferencePage.authenticate = true

EditReferencePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditReferencePage
