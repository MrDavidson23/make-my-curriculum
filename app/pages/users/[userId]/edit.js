import { Suspense } from "react"

import { useRouter, Head, Link, useQuery, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import { UserForm } from "app/users/components/UserForm"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const EditUser = () => {
  const userId = useParam("userId", "number")
  const [user, { setQueryData }] = useQuery(
    getUser,
    {
      id: userId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  return (
    <>
      <Head>
        <title>Edit User</title>
      </Head>

      <UserForm submitText="Update User" initialValues={user} />
    </>
  )
}

const EditUserPage = () => {

  const router = useRouter()
  const currentUser = useCurrentUser()
  const userId = useParam("userId", "number")
  if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.id !== userId)) {
    router.push(Routes.Home())
    return (<></>)
  }

  return (
    <>
      <Suspense fallback={<CustomSpinner />}>
        <EditUser />
      </Suspense>
    </>
  )
}

EditUserPage.authenticate = true

EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserPage
