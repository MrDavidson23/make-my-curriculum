import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReference from "app/references/queries/getReference"
import deleteReference from "app/references/mutations/deleteReference"
export const Reference = () => {
  const router = useRouter()
  const referenceId = useParam("referenceId", "number")
  const [deleteReferenceMutation] = useMutation(deleteReference)
  const [reference] = useQuery(getReference, {
    id: referenceId,
  })
  return (
    <>
      <Head>
        <title>Reference {reference.id}</title>
      </Head>

      <div>
        <h1>Reference {reference.id}</h1>
        <pre>{JSON.stringify(reference, null, 2)}</pre>

        <Link
          href={Routes.EditReferencePage({
            referenceId: reference.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteReferenceMutation({
                id: reference.id,
              })
              router.push(Routes.ReferencesPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowReferencePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ReferencesPage()}>
          <a>References</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Reference />
      </Suspense>
    </div>
  )
}

ShowReferencePage.authenticate = true

ShowReferencePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowReferencePage
