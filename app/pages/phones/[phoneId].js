import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPhone from "app/phones/queries/getPhone"
import deletePhone from "app/phones/mutations/deletePhone"
import CustomSpinner from "app/core/components/CustomSpinner"
export const Phone = () => {
  const router = useRouter()
  const phoneId = useParam("phoneId", "number")
  const [deletePhoneMutation] = useMutation(deletePhone)
  const [phone] = useQuery(getPhone, {
    id: phoneId,
  })
  return (
    <>
      <Head>
        <title>Phone {phone.id}</title>
      </Head>

      <div>
        <h1>Phone {phone.id}</h1>
        <pre>{JSON.stringify(phone, null, 2)}</pre>

        <Link
          href={Routes.EditPhonePage({
            phoneId: phone.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePhoneMutation({
                id: phone.id,
              })
              router.push(Routes.PhonesPage())
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

const ShowPhonePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PhonesPage()}>
          <a>Phones</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <Phone />
      </Suspense>
    </div>
  )
}

ShowPhonePage.authenticate = true

ShowPhonePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPhonePage
