import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import deleteUser from "app/users/mutations/deleteUser"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, {
    id: userId,
  })
  return (
    <>
      <Head>
        <title>User {user.id}</title>
      </Head>

      <div>
        <h1>User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Link
          href={Routes.EditUserPage({
            userId: user.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserMutation({
                id: user.id,
              })
              router.push(Routes.UsersPage())
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

const ShowUserPage = () => {
  
  const router = useRouter()
  const currentUser = useCurrentUser()
  const userId = useParam("userId", "number")
  if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.id !== userId)) {
    router.push(Routes.Home())
    return (<></>)
  }

  return (
    <div>
      <p>
        <Link href={Routes.UsersPage()}>
          <a>Users</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true

ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
