import { Suspense, useEffect } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurricula from "app/curricula/queries/getCurricula"
import CurriculumList from "app/curricula/components/CurriculumList"
import { Button, Grid } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
const ITEMS_PER_PAGE = 100
export const CurriculaList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [curricula] = usePaginatedQuery(getCurricula, {
    //const [{ curricula, hasMore }] = usePaginatedQuery(getCurricula, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const hasMore = curricula.hasMore

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
    <>
      <CurriculumList
        curriculumns={curricula}
        curriculumsHighlight={props.curriculumsHighlight}
        onChangeCurriculumHighlight={props.onChangeCurriculumHighlight}
      />

      <Grid item xs={12}>
        <Button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </Grid>
    </>
  )
}

const CurriculaPage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <Head>
          <title>Curricula</title>
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
            <Button variant="outlined" onClick={() => Router.push(Routes.NewCurriculumPage())}>
              Crear Nuevo Curriculum
            </Button>
          </Grid>

          <Suspense fallback={<CustomSpinner />}>
            <CurriculaList />
          </Suspense>
        </Grid>
      </>
    )
  }
}

CurriculaPage.authenticate = true

CurriculaPage.getLayout = (page) => <Layout>{page}</Layout>

export default CurriculaPage
