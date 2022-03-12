import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUserProfile from "app/user-profiles/queries/getUserProfile"
import updateUserProfile from "app/user-profiles/mutations/updateUserProfile"
import { UserProfileForm, FORM_ERROR } from "app/user-profiles/components/UserProfileForm"
export const EditUserProfile = () => {
  const router = useRouter()
  const userProfileId = useParam("userProfileId", "number")
  const [userProfile, { setQueryData }] = useQuery(
    getUserProfile,
    {
      id: userProfileId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserProfileMutation] = useMutation(updateUserProfile)
  return (
    <>
      <Head>
        <title>Edit UserProfile {userProfile.id}</title>
      </Head>

      <div>
        <h1>Edit UserProfile {userProfile.id}</h1>
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>

        <UserProfileForm
          submitText="Update UserProfile" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateUserProfile}
          initialValues={userProfile}
          onSubmit={async (values) => {
            try {
              const updated = await updateUserProfileMutation({
                id: userProfile.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowUserProfilePage({
                  userProfileId: updated.id,
                })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditUserProfilePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUserProfile />
      </Suspense>

      <p>
        <Link href={Routes.UserProfilesPage()}>
          <a>UserProfiles</a>
        </Link>
      </p>
    </div>
  )
}

EditUserProfilePage.authenticate = true

EditUserProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserProfilePage
