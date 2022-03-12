import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUserProfiles from "app/user-profiles/queries/getUserProfiles"
const ITEMS_PER_PAGE = 100
export const UserProfilesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ userProfiles, hasMore }] = usePaginatedQuery(getUserProfiles, {
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
        {userProfiles.map((userProfile) => (
          <li key={userProfile.id}>
            <Link
              href={Routes.ShowUserProfilePage({
                userProfileId: userProfile.id,
              })}
            >
              <a>{userProfile.name}</a>
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

const UserProfilesPage = () => {
  return (
    <>
      <Head>
        <title>UserProfiles</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewUserProfilePage()}>
            <a>Create UserProfile</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <UserProfilesList />
        </Suspense>
      </div>
    </>
  )
}

UserProfilesPage.authenticate = true

UserProfilesPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserProfilesPage
