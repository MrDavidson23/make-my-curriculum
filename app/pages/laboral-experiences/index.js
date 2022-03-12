import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperiences from "app/laboral-experiences/queries/getLaboralExperiences"
const ITEMS_PER_PAGE = 100
export const LaboralExperiencesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ laboralExperiences, hasMore }] = usePaginatedQuery(getLaboralExperiences, {
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
        {laboralExperiences.map((laboralExperience) => (
          <li key={laboralExperience.id}>
            <Link
              href={Routes.ShowLaboralExperiencePage({
                laboralExperienceId: laboralExperience.id,
              })}
            >
              <a>{laboralExperience.name}</a>
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

const LaboralExperiencesPage = () => {
  return (
    <>
      <Head>
        <title>LaboralExperiences</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewLaboralExperiencePage()}>
            <a>Create LaboralExperience</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LaboralExperiencesList />
        </Suspense>
      </div>
    </>
  )
}

LaboralExperiencesPage.authenticate = true

LaboralExperiencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default LaboralExperiencesPage
