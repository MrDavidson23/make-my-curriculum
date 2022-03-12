import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReferences from "app/references/queries/getReferences"
const ITEMS_PER_PAGE = 100
export const ReferencesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ references, hasMore }] = usePaginatedQuery(getReferences, {
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
        {references.map((reference) => (
          <li key={reference.id}>
            <Link
              href={Routes.ShowReferencePage({
                referenceId: reference.id,
              })}
            >
              <a>{reference.name}</a>
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

const ReferencesPage = () => {
  return (
    <>
      <Head>
        <title>References</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewReferencePage()}>
            <a>Create Reference</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ReferencesList />
        </Suspense>
      </div>
    </>
  )
}

ReferencesPage.authenticate = true

ReferencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ReferencesPage
