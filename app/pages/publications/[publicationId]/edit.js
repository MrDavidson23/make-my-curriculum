import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublication from "app/publications/queries/getPublication"
import updatePublication from "app/publications/mutations/updatePublication"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"
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
        <title>Edit Publication {publication.id}</title>
      </Head>

      <div>
        <h1>Edit Publication {publication.id}</h1>
        <pre>{JSON.stringify(publication, null, 2)}</pre>

        <PublicationForm
          submitText="Update Publication" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePublication}
          initialValues={publication}
          onSubmit={async (values) => {
            try {
              const updated = await updatePublicationMutation({
                id: publication.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowPublicationPage({
                  publicationId: updated.id,
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

const EditPublicationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPublication />
      </Suspense>

      <p>
        <Link href={Routes.PublicationsPage()}>
          <a>Publications</a>
        </Link>
      </p>
    </div>
  )
}

EditPublicationPage.authenticate = true

EditPublicationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPublicationPage