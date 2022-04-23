import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReference from "app/references/queries/getReference"

import { ReferenceForm, FORM_ERROR } from "app/references/components/ReferenceForm"
import updateReference from "app/references/mutations/updateReference"
import { UpdateReferenceValidation } from "app/references/components/validaciones"
import { Grid } from "@mui/material"

export const EditReference = () => {
  const router = useRouter()
  const referenceId = useParam("referenceId", "number")
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
        <title>Edit Reference {reference.id}</title>
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
            <h1>Edit Reference {reference.id}</h1>
          </Grid>
          <Grid item xs={12}>
            <ReferenceForm
              submitText="Update Reference" // TODO use a zod schema for form validation
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
                  router.push(Routes.EditCurriculumPage())
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
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditReference />
      </Suspense>

      <p>
        <Link href={Routes.ReferencesPage()}>
          <a>References</a>
        </Link>
      </p>
    </div>
  )
}

EditReferencePage.authenticate = true

EditReferencePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditReferencePage
