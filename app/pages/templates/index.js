import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplates from "app/templates/queries/getTemplates"
import { Preview } from "app/templates/components/Preview"
import { Button, Grid, Typography } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
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
      {templates.map((template) => (
          <Grid item key={template.id}>
          <Typography variant="h5" gutterBottom> {template.name} </Typography>
          <Preview
            percentage={template.design.left.container.width/3}
            leftStyles={template.design.left}
            rightStyles={template.design.right}
          />
          </Grid>
      ))}
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

TemplatesPage.authenticate = true

TemplatesPage.getLayout = (page) => <Layout>{page}</Layout>

export default TemplatesPage
