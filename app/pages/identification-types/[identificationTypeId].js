import { Suspense } from "react"

import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIdentificationType from "app/identification-types/queries/getIdentificationType"
import deleteIdentificationType from "app/identification-types/mutations/deleteIdentificationType"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const IdentificationType = () => {
  const router = useRouter()
  const identificationTypeId = useParam("identificationTypeId", "number")
  const [deleteIdentificationTypeMutation] = useMutation(deleteIdentificationType)
  const [identificationType] = useQuery(getIdentificationType, {
    id: identificationTypeId,
  })
  return (
    <>
      <Head>
        <title>IdentificationType {identificationType.id}</title>
      </Head>

      <div>
        <h1>IdentificationType {identificationType.id}</h1>
        <pre>{JSON.stringify(identificationType, null, 2)}</pre>

        <Link
          href={Routes.EditIdentificationTypePage({
            identificationTypeId: identificationType.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteIdentificationTypeMutation({
                id: identificationType.id,
              })
              router.push(Routes.IdentificationTypesPage())
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

const ShowIdentificationTypePage = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <p>
          <Link href={Routes.IdentificationTypesPage()}>
            <a>IdentificationTypes</a>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <IdentificationType />
        </Suspense>
      </div>
    )
  }
}

ShowIdentificationTypePage.authenticate = true

ShowIdentificationTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowIdentificationTypePage
