import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLanguages from "app/languages/queries/getLanguages"
const ITEMS_PER_PAGE = 100
export const LanguagesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ languages, hasMore }] = usePaginatedQuery(getLanguages, {
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
        {languages.map((language) => (
          <li key={language.id}>
            <Link
              href={Routes.ShowLanguagePage({
                languageId: language.id,
              })}
            >
              <a>{language.name}</a>
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

const LanguagesPage = () => {
  return (
    <>
      <Head>
        <title>Languages</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewLanguagePage()}>
            <a>Create Language</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LanguagesList />
        </Suspense>
      </div>
    </>
  )
}

LanguagesPage.authenticate = true

LanguagesPage.getLayout = (page) => <Layout>{page}</Layout>

export default LanguagesPage
