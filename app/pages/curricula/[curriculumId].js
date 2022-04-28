import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import { Grid, Button } from "@mui/material"
import Layout from "app/core/layouts/Layout"
import PDFViewPage from "./[curriculumId]/pdf-view"
import CustomSpinner from "app/core/components/CustomSpinner"

const ShowCurriculumPage = () => {
  const curriculumId = useParam("curriculumId", "number")
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={5}
        mb={5}
      >
        <Grid item>
          <Button variant="outlined">
            <Link href={Routes.CurriculaPage()}>Ver Todos los Curriculums</Link>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">
            <Link href={Routes.EditCurriculumPage({ curriculumId: curriculumId })}>
              Editar Curriculum
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteCurriculumMutation({
                  id: curriculum.id,
                })
                router.reload()
              }
            }}
          >
            Eliminar Curriculum
          </Button>
        </Grid>
      </Grid>

      <Suspense fallback={<CustomSpinner />}>
        <PDFViewPage />
      </Suspense>
    </div>
  )
}

ShowCurriculumPage.authenticate = true

ShowCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCurriculumPage
