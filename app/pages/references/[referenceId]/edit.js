import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReference from "app/references/queries/getReference"
import updateReference from "app/references/mutations/updateReference"
import { ReferenceForm, FORM_ERROR } from "app/references/components/ReferenceForm"
import { UpdateReference } from "../validaciones"
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
        <h1>Edit Reference {reference.id}</h1>
        <pre>{JSON.stringify(reference, null, 2)}</pre>

        <ReferenceForm
          submitText="Update Reference" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateReference}
          schema={UpdateReference} ///estaba comentado
          initialValues={reference}
          onSubmit={async (values) => {
            try {
              const updated = await updateReferenceMutation({
                id: reference.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowReferencePage({
                  referenceId: updated.id,
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
