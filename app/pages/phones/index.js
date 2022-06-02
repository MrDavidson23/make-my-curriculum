import { Suspense, Redirect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPhones from "app/phones/queries/getPhones"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
const ITEMS_PER_PAGE = 100
export const PhonesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ phones, hasMore }] = usePaginatedQuery(getPhones, {
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
        {phones.map((phone) => (
          <li key={phone.id}>
            <Link
              href={Routes.ShowPhonePage({
                phoneId: phone.id,
              })}
            >
              <a>{phone.name}</a>
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

const PhonesPage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser || currentUser.role != "ADMIN") {
    return <Redirect to={Routes.Home} />
  }
  return (
    <>
      <Head>
        <title>Phones</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPhonePage()}>
            <a>Create Phone</a>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <PhonesList />
        </Suspense>
      </div>
    </>
  )
}

PhonesPage.authenticate = true

PhonesPage.getLayout = (page) => <Layout>{page}</Layout>

export default PhonesPage
