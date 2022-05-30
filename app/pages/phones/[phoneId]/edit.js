import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPhone from "app/phones/queries/getPhone"
import updatePhone from "app/phones/mutations/updatePhone"
import { PhoneForm, FORM_ERROR } from "app/phones/components/PhoneForm"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const EditPhone = () => {
  const router = useRouter()
  const phoneId = useParam("phoneId", "number")
  const [phone, { setQueryData }] = useQuery(
    getPhone,
    {
      id: phoneId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePhoneMutation] = useMutation(updatePhone)
  return (
    <>
      <Head>
        <title>Edit Phone {phone.id}</title>
      </Head>

      <div>
        <h1>Edit Phone {phone.id}</h1>
        <pre>{JSON.stringify(phone, null, 2)}</pre>

        <PhoneForm
          submitText="Update Phone" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePhone}
          initialValues={phone}
          onSubmit={async (values) => {
            try {
              const updated = await updatePhoneMutation({
                id: phone.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowPhonePage({
                  phoneId: updated.id,
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

const EditPhonePage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser || currentUser.role != "ADMIN") {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <Suspense fallback={<CustomSpinner />}>
        <EditPhone />
      </Suspense>

      <p>
        <Link href={Routes.PhonesPage()}>
          <a>Phones</a>
        </Link>
      </p>
    </div>
  )
}

EditPhonePage.authenticate = true

EditPhonePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPhonePage
