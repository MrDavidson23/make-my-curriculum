import { Link, useRouter, useMutation, Routes } from "blitz"

import Layout from "app/core/layouts/Layout"
import createPhone from "app/phones/mutations/createPhone"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { PhoneForm, FORM_ERROR } from "app/phones/components/PhoneForm"

const NewPhonePage = () => {
  const router = useRouter()
  const [createPhoneMutation] = useMutation(createPhone)

  const currentUser = useCurrentUser()

  if (!currentUser || currentUser.role != "ADMIN") {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <h1>Create New Phone</h1>

        <PhoneForm
          submitText="Create Phone" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreatePhone}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const phone = await createPhoneMutation(values)
              router.push(
                Routes.ShowPhonePage({
                  phoneId: phone.id,
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
          <Link href={Routes.PhonesPage()}>
            <a>Phones</a>
          </Link>
        </p>
      </div>
    )
  }
}

NewPhonePage.authenticate = true

NewPhonePage.getLayout = (page) => <Layout title={"Create New Phone"}>{page}</Layout>

export default NewPhonePage
