import { Suspense, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurricula from "app/curricula/queries/getCurricula"
import AcademicEducationsPage from "app/pages/academic-educations/index"
import CurriculumList from "app/curricula/components/CurriculumList"
const ITEMS_PER_PAGE = 100
export const CurriculaList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ curricula, hasMore }] = usePaginatedQuery(getCurricula, {
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

  useEffect(() => {
    console.log(curricula)
  }, [curricula])

  return (
    <div>
      <CurriculumList curriculumns={curricula} />
      <ul>
        {curricula.map((curriculum) => (
          <li key={curriculum.id}>
            <Link
              href={Routes.ShowCurriculumPage({
                curriculumId: curriculum.id,
              })}
            >
              <a>{curriculum.name}</a>
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

const CurriculaPage = () => {
  return (
    <>
      <Head>
        <title>Curricula</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCurriculumPage()}>
            <a>Create Curriculum</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CurriculaList />
        </Suspense>
      </div>
    </>
  )
}

CurriculaPage.authenticate = true

CurriculaPage.getLayout = (page) => <Layout>{page}</Layout>

export default CurriculaPage
