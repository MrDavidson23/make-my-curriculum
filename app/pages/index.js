import { Suspense } from "react"
import {
  Image,
  Link,
  useMutation,
  Routes,
  usePaginatedQuery,
  Link as LinkBlitz,
  Router,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import UserDisplay from "app/users/components/UserDisplay"
import CurriculumList from "app/curricula/components/CurriculumList"
import UserList from "app/users/components/UserList"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getAllCurriculums from "app/curricula/queries/getAllCurriculums"
import getUsers from "app/users/queries/getUsers"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Grid, Typography, Button, Divider, Box } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          size="large"
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <Button
            variant="outlined"
            size="large"
            style={{ marginRight: "1rem", marginTop: "1rem" }}
          >
            <strong>Registrarse</strong>
          </Button>
        </Link>

        <Link href={Routes.LoginPage()}>
          <Button
            variant="outlined"
            size="large"
            style={{ marginRight: "1rem", marginTop: "1rem" }}
          >
            <strong>Login</strong>
          </Button>
        </Link>
      </>
    )
  }
}

const Home = () => {
  let currentUser = useCurrentUser()

  const [curricula] = usePaginatedQuery(
    getAllCurriculums,
    {
      orderBy: {
        id: "asc",
      },
    },
    { enabled: currentUser && currentUser.role === "ADMIN" }
  )

  const [user] = usePaginatedQuery(
    getUsers,
    {
      orderBy: {
        id: "asc",
      },
    },
    { enabled: currentUser && currentUser.role === "ADMIN" }
  )

  if (!currentUser) {
    currentUser = {
      id: "-1",
      role: "guest",
    }
  }

  return (
    <div className="container">
      <main>
        <Grid
          container
          direction="row"
          spacing={2}
          textAlign={"center"}
          justifyContent={"center"}
          sx={{ mx: "auto", width: "100%" }}
        >
          <Grid item container direction="row">
            <Grid item xs={0} md={1}></Grid>
            <Grid item xs={0} md={2}>
              <div className={"image-container"}>
                <Image src={logo} alt="blitzjs" layout="fill" className={"image logo"} />
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Suspense fallback={<CustomSpinner />}>
                <UserDisplay />
              </Suspense>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={12} md={6} paddingTop={5}>
              <div>Cree su curriculum personalizado aqui, siga estos sencillos pasos</div>
              <div> 1. Crear un curriculum </div>
              <div> 2. Agregar sus habilidades, experiencias, y demas informacion importante </div>
              <div> 3. Haga click en actualizar curriculum</div>
              <LinkBlitz href="http://localhost:3000/curricula/new">
                <Button size="large" variant="contained" color="primary" sx={{ my: 2 }}>
                  Crear Curriculum
                </Button>
              </LinkBlitz>
              <p>haga click aqui para crear su curriculum</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <iframe
                width="90%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Grid>
          </Grid>
          <Grid item container direction="row" paddingTop={15}>
            <Grid item xs={12} md={6}>
              <iframe
                width="90%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Grid>
            {currentUser.role !== "guest" && (
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  direction="column"
                  spacing={1}
                  sx={{ mx: "auto" }}
                  style={{ width: "95%" }}
                >
                  <LinkBlitz href="/curricula">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis curriculums
                    </Button>
                  </LinkBlitz>
                  <LinkBlitz href="/laboral-experiences">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis Experiencias laborales
                    </Button>
                  </LinkBlitz>
                  <LinkBlitz href="/skills">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis habilidades
                    </Button>
                  </LinkBlitz>
                  <LinkBlitz href="/publications">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis publicaciones
                    </Button>
                  </LinkBlitz>
                  <LinkBlitz href="/references">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis referencias
                    </Button>
                  </LinkBlitz>
                  <LinkBlitz href="/academic-educations">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis experiencias academicas
                    </Button>
                  </LinkBlitz>
                  <LinkBlitz href="/technical-educations">
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      style={{ marginTop: "4px" }}
                    >
                      Mis experiencias tecnicas
                    </Button>
                  </LinkBlitz>
                </Grid>

                <LinkBlitz href="/curricula/new"> Crear Curriculum </LinkBlitz>
                <LinkBlitz href="/users/new"> Crear Usuario </LinkBlitz>

                <div> 1. Crear un curriculum </div>
                <div>
                  {" "}
                  2. Agregar sus habilidades, experiencias, y demas informacion importante{" "}
                </div>
                <div> 3. Haga click en actualizar curriculum</div>
                <LinkBlitz href="http://localhost:3000/curricula/new">
                  <Button size="large" variant="contained" color="primary" sx={{ my: 2 }}>
                    Crear Curriculum
                  </Button>
                </LinkBlitz>
                <p>haga click aqui para crear su curriculum</p>
              </Grid>
            )}
          </Grid>
          {currentUser.role === "ADMIN" && (
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h4">All Users</Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <UserList users={user} />
              </Grid>
            </Grid>
          )}
          <Divider variant="middle" />
          {currentUser.role === "ADMIN" && (
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h4">All Curriculums</Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CurriculumList curriculumns={curricula} />
              </Grid>
            </Grid>
          )}
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </Grid>
      </main>

      {/*
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Open Sans", sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #45009d;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style> */}
    </div>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
