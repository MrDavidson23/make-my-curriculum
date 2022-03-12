import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createUserProfile from "app/user-profiles/mutations/createUserProfile"
import { UserProfileForm, FORM_ERROR } from "app/user-profiles/components/UserProfileForm"

const NewUserProfilePage = () => {
  const router = useRouter()
  const [createUserProfileMutation] = useMutation(createUserProfile)
  return (
    <div>
      <h1>Create New UserProfile</h1>

      <UserProfileForm
        submitText="Create UserProfile" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateUserProfile}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const userProfile = await createUserProfileMutation(values)
            router.push(
              Routes.ShowUserProfilePage({
                userProfileId: userProfile.id,
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

      <p>
        <Link href={Routes.UserProfilesPage()}>
          <a>UserProfiles</a>
        </Link>
      </p>
    </div>
  )
}

NewUserProfilePage.authenticate = true

NewUserProfilePage.getLayout = (page) => <Layout title={"Create New UserProfile"}>{page}</Layout>

export default NewUserProfilePage
