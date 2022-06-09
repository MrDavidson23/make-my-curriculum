import { Suspense } from "react"

import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIdentificationType from "app/identification-types/queries/getIdentificationType"
import updateIdentificationType from "app/identification-types/mutations/updateIdentificationType"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import {
  IdentificationTypeForm,
  FORM_ERROR,
} from "app/identification-types/components/IdentificationTypeForm"
import CustomSpinner from "app/core/components/CustomSpinner"
export const EditIdentificationType = () => {
  const router = useRouter()
  const identificationTypeId = useParam("identificationTypeId", "number")
  const [identificationType, { setQueryData }] = useQuery(
    getIdentificationType,
    {
      id: identificationTypeId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateIdentificationTypeMutation] = useMutation(updateIdentificationType)

  return (
    <>
      <Head>
        <title>Edit IdentificationType {identificationType.id}</title>
      </Head>

      <div>
        <h1>Edit IdentificationType {identificationType.id}</h1>
        <pre>{JSON.stringify(identificationType, null, 2)}</pre>

        <IdentificationTypeForm
          submitText="Update IdentificationType" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIdentificationType}
          initialValues={identificationType}
          onSubmit={async (values) => {
            try {
              const updated = await updateIdentificationTypeMutation({
                id: identificationType.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowIdentificationTypePage({
                  identificationTypeId: updated.id,
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

const EditIdentificationTypePage = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  if (!currentUser || currentUser.role != "ADMIN") {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <Suspense fallback={<CustomSpinner />}>
          <EditIdentificationType />
        </Suspense>

        <p>
          <Link href={Routes.IdentificationTypesPage()}>
            <a>IdentificationTypes</a>
          </Link>
        </p>
      </div>
    )
  }
}

EditIdentificationTypePage.authenticate = true

EditIdentificationTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditIdentificationTypePage
