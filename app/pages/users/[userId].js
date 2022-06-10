import { Suspense } from "react"

import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  useMutation,
  Routes,
  Link as LinkBlitz,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import deleteUser from "app/users/mutations/deleteUser"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Gravatar from "react-gravatar"
import { Grid, Typography, Button, Divider, Box } from "@mui/material"
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
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12} md={6}>
          <h1>User {user.name + user.lastName}</h1>
          <Gravatar
            email={user?.email}
            alt={"imagen" + user?.name}
            style={{ borderRadius: "50%" }}
            size={400}
          />
          <LinkBlitz href="https://gravatar.com/">
            <Button variant="contained" color="primary">
              Edita tu gravatar
            </Button>
          </LinkBlitz>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="column"
            spacing={1}
            sx={{ mx: "auto" }}
            style={{ width: "95%" }}
          >
            <LinkBlitz href="/curricula">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis curriculums
              </Button>
            </LinkBlitz>
            <LinkBlitz href="/laboral-experiences">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis Experiencias laborales
              </Button>
            </LinkBlitz>
            <LinkBlitz href="/skills">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis habilidades
              </Button>
            </LinkBlitz>
            <LinkBlitz href="/publications">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis publicaciones
              </Button>
            </LinkBlitz>
            <LinkBlitz href="/references">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis referencias
              </Button>
            </LinkBlitz>
            <LinkBlitz href="/academic-educations">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis experiencias academicas
              </Button>
            </LinkBlitz>
            <LinkBlitz href="/technical-educations">
              <Button size="large" color="primary" variant="outlined" style={{ marginTop: "4px" }}>
                Mis experiencias tecnicas
              </Button>
            </LinkBlitz>
          </Grid>

          <div> 1. Crear un curriculum </div>
          <div> 2. Agregar sus habilidades, experiencias, y demas informacion importante </div>
          <div> 3. Haga click en actualizar curriculum</div>
          <LinkBlitz href="/curricula/new">
            <Button size="large" variant="contained" color="primary" sx={{ my: 2 }}>
              Crear Curriculum
            </Button>
          </LinkBlitz>
        </Grid>
      </Grid>
    </>
  )
}

const ShowUserPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const userId = useParam("userId", "number")
  if (!currentUser || (currentUser.role !== "ADMIN" && currentUser.id !== userId)) {
    router.push(Routes.Home())
    return <></>
  }

  return (
    <div>
      <p></p>

      <Suspense fallback={<CustomSpinner />}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true

ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
