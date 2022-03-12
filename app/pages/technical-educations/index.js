import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducations from "app/technical-educations/queries/getTechnicalEducations"
const ITEMS_PER_PAGE = 100
export const TechnicalEducationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ technicalEducations, hasMore }] = usePaginatedQuery(getTechnicalEducations, {
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
        {technicalEducations.map((technicalEducation) => (
          <li key={technicalEducation.id}>
            <Link
              href={Routes.ShowTechnicalEducationPage({
                technicalEducationId: technicalEducation.id,
              })}
            >
              <a>{technicalEducation.name}</a>
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

const TechnicalEducationsPage = () => {
  return (
    <>
      <Head>
        <title>TechnicalEducations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTechnicalEducationPage()}>
            <a>Create TechnicalEducation</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TechnicalEducationsList />
        </Suspense>
      </div>
    </>
  )
}

TechnicalEducationsPage.authenticate = true

TechnicalEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TechnicalEducationsPage
