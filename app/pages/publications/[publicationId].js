import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublication from "app/publications/queries/getPublication"
import deletePublication from "app/publications/mutations/deletePublication"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const Publication = () => {
  const router = useRouter()
  const publicationId = useParam("publicationId", "number")
  const [deletePublicationMutation] = useMutation(deletePublication)
  const [publication] = useQuery(getPublication, {
    id: publicationId,
  })
  return (
    <>
      <Head>
        <title>Publication {publication.id}</title>
      </Head>

      <div>
        <h1>Publication {publication.id}</h1>
        <pre>{JSON.stringify(publication, null, 2)}</pre>

        <Link
          href={Routes.EditPublicationPage({
            publicationId: publication.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePublicationMutation({
                id: publication.id,
              })
              router.push(Routes.PublicationsPage())
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

const ShowPublicationPage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <p>
        <Link href={Routes.PublicationsPage()}>
          <a>Publications</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <Publication />
      </Suspense>
    </div>
  )
}

ShowPublicationPage.authenticate = true

ShowPublicationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPublicationPage
