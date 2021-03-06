import { Suspense } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIdentificationTypes from "app/identification-types/queries/getIdentificationTypes"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
const ITEMS_PER_PAGE = 100
export const IdentificationTypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ identificationTypes, hasMore }] = usePaginatedQuery(getIdentificationTypes, {
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
        {identificationTypes.map((identificationType) => (
          <li key={identificationType.id}>
            <Link
              href={Routes.ShowIdentificationTypePage({
                identificationTypeId: identificationType.id,
              })}
            >
              <a>{identificationType.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const IdentificationTypesPage = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  if (!currentUser || currentUser.role != "ADMIN") {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <Head>
          <title>IdentificationTypes</title>
        </Head>

        <div>
          <p>
            <Link href={Routes.NewIdentificationTypePage()}>
              <a>Create IdentificationType</a>
            </Link>
          </p>

          <Suspense fallback={<CustomSpinner />}>
            <IdentificationTypesList />
          </Suspense>
        </div>
      </>
    )
  }
}

IdentificationTypesPage.authenticate = true

IdentificationTypesPage.getLayout = (page) => <Layout>{page}</Layout>

export default IdentificationTypesPage
