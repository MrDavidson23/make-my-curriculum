import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublications from "app/publications/queries/getPublications"
const ITEMS_PER_PAGE = 100
export const PublicationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ publications, hasMore }] = usePaginatedQuery(getPublications, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>
            <Link
              href={Routes.ShowPublicationPage({
                publicationId: publication.id,
              })}
            >
              <a>{publication.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PublicationsPage = () => {
  return (
    <>
      <Head>
        <title>Publications</title>
      </Head>

      <div>
        <h1>Mis publicaciones</h1>
        <p>
          <Link href={Routes.NewPublicationPage()}>
            <a>Create Publication</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PublicationsList />
        </Suspense>
      </div>
    </>
  )
}

PublicationsPage.authenticate = true

PublicationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PublicationsPage
