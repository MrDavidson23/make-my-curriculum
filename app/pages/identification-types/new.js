import { Link, useRouter, useMutation, Routes, Redirect } from "blitz"
import Layout from "app/core/layouts/Layout"
import createIdentificationType from "app/identification-types/mutations/createIdentificationType"
import {
  IdentificationTypeForm,
  FORM_ERROR,
} from "app/identification-types/components/IdentificationTypeForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewIdentificationTypePage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [createIdentificationTypeMutation] = useMutation(createIdentificationType)

  if (!currentUser || currentUser.role != "ADMIN") {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <h1>Create New IdentificationType</h1>

      <IdentificationTypeForm
        submitText="Create IdentificationType" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIdentificationType}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const identificationType = await createIdentificationTypeMutation(values)
            router.push(
              Routes.ShowIdentificationTypePage({
                identificationTypeId: identificationType.id,
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
        <Link href={Routes.IdentificationTypesPage()}>
          <a>IdentificationTypes</a>
        </Link>
      </p>
    </div>
  )
}

NewIdentificationTypePage.authenticate = true

NewIdentificationTypePage.getLayout = (page) => (
  <Layout title={"Create New IdentificationType"}>{page}</Layout>
)

export default NewIdentificationTypePage
