import { Suspense } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplates from "app/templates/queries/getTemplates"
import { Button, Grid, Typography } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import TemplateList from "app/templates/components/TemplateList"

const ITEMS_PER_PAGE = 100
export const TemplatesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ templates, hasMore }] = usePaginatedQuery(getTemplates, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <TemplateList />
      </Grid>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TemplatesPage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <Head>
          <title>Templates</title>
        </Head>

        <Grid
          container
          direction="row"
          spacing={2}
          textAlign={"center"}
          justifyContent={"center"}
          sx={{ mx: "auto", width: "100%" }}
        >
          <Grid item xs={12} justify="center" mt={3} mb={3}>
            <Button variant="outlined" onClick={() => Router.push(Routes.NewTemplatePage())}>
              Crear Nueva Plantilla
            </Button>
          </Grid>

          <Suspense fallback={<CustomSpinner />}>
            <TemplatesList />
          </Suspense>
        </Grid>
      </>
    )
  }
}

TemplatesPage.authenticate = true

TemplatesPage.getLayout = (page) => <Layout>{page}</Layout>

export default TemplatesPage
