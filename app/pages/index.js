import { Suspense } from "react"
import { Image, Link, useMutation, Routes, usePaginatedQuery } from "blitz"
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
  const currentUser = useCurrentUser()
  const [{ curricula }] = usePaginatedQuery(getAllCurriculums, {
    orderBy: {
      id: "asc",
    },
  })
  const [{ user }] = usePaginatedQuery(getUsers, {
    orderBy: {
      id: "asc",
    },
  })
  return (
    <div className="container">
      <main>
        <Grid
          container
          direction="column"
          spacing={2}
          textAlign={"center"}
          sx={{ mx: "auto", width: "100%" }}
        >
          <Grid item container direction="row">
            <Grid item>
              <div className="logo" style={{ marginTop: "2rem", width: "300px" }}>
                <Image src={logo} alt="blitzjs" />
              </div>
            </Grid>
            <Grid item>
              <Suspense fallback={<CustomSpinner />}>
                <UserDisplay />
              </Suspense>
            </Grid>
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
                <Suspense fallback={<CustomSpinner />}>
                  <UserList users={user} />
                </Suspense>
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
                <Suspense fallback={<CustomSpinner />}>
                  <CurriculumList curriculumns={curricula} />
                </Suspense>
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </Grid>

          {/* <p>
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </p>
          <div
            className="buttons"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >

          </div>
          <p>
            <strong>
              To add a new model to your app, <br />
              run the following in your terminal:
            </strong>
          </p>
          <pre>
            <code>blitz generate all project name:string</code>
          </pre>
          <div
            style={{
              marginBottom: "1rem",
            }}
          >
            (And select Yes to run prisma migrate)
          </div>
          <div>
            <p>
              Then <strong>restart the server</strong>
            </p>
            <pre>
              <code>Ctrl + c</code>
            </pre>
            <pre>
              <code>blitz dev</code>
            </pre>
            <p>
              and go to{" "}
              <Link href="/projects">
                <a>/projects</a>
              </Link>
            </p>
          </div>
          <div
            className="buttons"
            style={{
              marginTop: "5rem",
            }}
          >
            <a
              className="button"
              href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a
              className="button-outline"
              href="https://github.com/blitz-js/blitz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Repo
            </a>
            <a
              className="button-outline"
              href="https://discord.blitzjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord Community
            </a>
          </div> */}
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
