import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReference from "app/references/queries/getReference"
import deleteReference from "app/references/mutations/deleteReference"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, button, Paper } from "@mui/material"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

// Custom components
import InformationCard from "app/core/components/InformationCard"
import CustomSpinner from "app/core/components/CustomSpinner"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,

  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  borderRadius: 4,
  border: "1px solid #e0e0e0",
}))

export const Reference = () => {
  const router = useRouter()
  const referenceId = useParam("referenceId", "number")
  const [deleteReferenceMutation] = useMutation(deleteReference)
  const [reference] = useQuery(getReference, {
    id: referenceId,
  })
  return (
    <>
      <Head>
        <title>Reference {reference.id}</title>
      </Head>
      {
        <Grid
          container
          borderRadius={4}
          border={1}
          direction="row"
          spacing={2}
          textAlign={"center"}
          sx={{ mx: "auto", width: "100%" }}
        >
          <Grid item xs={12}>
            <InformationCard
              title={reference.name}
              subtitle={reference.institution}
              firstText={reference.phone}
              secondText={reference.email}
              handleOnEdit={() => {
                router.push(Routes.EditReferencePage({ referenceId: reference.id }))
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteReferenceMutation({
                    id: reference.id,
                  })
                  router.push(Routes.ReferencesPage())
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Link
              href={Routes.EditReferencePage({
                referenceId: reference.id,
              })}
            >
              <a>Edit</a>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <button
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteReferenceMutation({
                    id: reference.id,
                  })
                  router.push(Routes.ReferencesPage())
                }
              }}
              style={{
                marginLeft: "0.5rem",
              }}
            >
              Delete
            </button>
          </Grid>
        </Grid>
      }
    </>
  )
}

const ShowReferencePage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <p>
        <Link href={Routes.ReferencesPage()}>
          <a>References</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <Reference />
      </Suspense>
    </div>
  )
}

ShowReferencePage.authenticate = true

ShowReferencePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowReferencePage
