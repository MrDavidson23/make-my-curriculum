import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducations from "app/academic-educations/queries/getAcademicEducations"
const ITEMS_PER_PAGE = 100
export const AcademicEducationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ academicEducations, hasMore }] = usePaginatedQuery(getAcademicEducations, {
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
        {academicEducations.map((academicEducation) => (
          <li key={academicEducation.id}>
            <Link
              href={Routes.ShowAcademicEducationPage({
                academicEducationId: academicEducation.id,
              })}
            >
              <a>{academicEducation.name}</a>
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

const AcademicEducationsPage = () => {
  return (
    <>
      <Head>
        <title>AcademicEducations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAcademicEducationPage()}>
            <a>Crear Educación Académica</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AcademicEducationsList />
        </Suspense>
      </div>
    </>
  )
}

AcademicEducationsPage.authenticate = true

AcademicEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AcademicEducationsPage
