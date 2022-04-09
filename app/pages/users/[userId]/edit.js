import { Suspense } from "react"
import { Head, Link, useQuery, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import { UserForm } from "app/users/components/UserForm"
export const EditUser = () => {
  const userId = useParam("userId", "number")

  const [user, { isLoading }] = useQuery(
    getUser,
    {
      id: userId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  console.log(user)

  return (
    <>
      <Head>
        <title>Edit User</title>
      </Head>
      {isLoading ? <p>Loading...</p> : <UserForm submitText="Update User" initialValues={user} />}
    </>
  )
}

const EditUserPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUser />
      </Suspense>
    </>
  )
}

EditUserPage.authenticate = true

EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

EditUserPage.suppressFirstRenderFlicker = true

export default EditUserPage
