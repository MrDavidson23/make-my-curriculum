import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUserProfile from "app/user-profiles/queries/getUserProfile"
import deleteUserProfile from "app/user-profiles/mutations/deleteUserProfile"
export const UserProfile = () => {
  const router = useRouter()
  const userProfileId = useParam("userProfileId", "number")
  const [deleteUserProfileMutation] = useMutation(deleteUserProfile)
  const [userProfile] = useQuery(getUserProfile, {
    id: userProfileId,
  })
  return (
    <>
      <Head>
        <title>UserProfile {userProfile.id}</title>
      </Head>

      <div>
        <h1>UserProfile {userProfile.id}</h1>
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>

        <Link
          href={Routes.EditUserProfilePage({
            userProfileId: userProfile.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserProfileMutation({
                id: userProfile.id,
              })
              router.push(Routes.UserProfilesPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowUserProfilePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.UserProfilesPage()}>
          <a>UserProfiles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  )
}

ShowUserProfilePage.authenticate = true

ShowUserProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserProfilePage
