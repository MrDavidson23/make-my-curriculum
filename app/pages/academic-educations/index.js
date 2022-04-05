import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducations from "app/academic-educations/queries/getAcademicEducations"
import deleteAcademicEducation from "app/academic-educations/mutations/deleteAcademicEducation"
import InformationCard from "app/core/components/InformationCard"
import { Button, Grid, Typography } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const AcademicEducationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteAcademicEducationMutation] = useMutation(deleteAcademicEducation)
  const [{ academicEducations, hasMore }] = usePaginatedQuery(getAcademicEducations, {
    where: {
      curriculumId: parseInt(props.curriculumId),
    },
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
        {academicEducations.map((academicEducation) => (
          <Grid item key={academicEducation.id}>
            <InformationCard
              title={academicEducation.studies}
              subtitle={academicEducation.institution}
              firstText={academicEducation.location}
              secondText={
                academicEducation.startYear.toLocaleDateString() +
                "  -  " +
                academicEducation.finishYear.toLocaleDateString()
              }
              handleOnEdit={() => {
                router.push(
                  Routes.EditAcademicEducationPage({ academicEducationId: academicEducation.id })
                )
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteAcademicEducationMutation({
                    id: academicEducation.id,
                  })
                  //this.forceUpdate()
                  router.push(
                    Routes.EditCurriculumPage({ curriculumId: academicEducation.curriculumId })
                  )
                }
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} justify="center"></Grid>
      </Grid>
    </div>
  )
}

const AcademicEducationsPage = (props) => {
  return (
    <>
      <Head>
        <title>AcademicEducations</title>
      </Head>

      <Typography variant="h6" component="div" gutterBottom>
        Educación Académica
      </Typography>

      <div>
        <p>
          <Link href={Routes.NewAcademicEducationPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Educación Académica</Button>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AcademicEducationsList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

AcademicEducationsPage.authenticate = true

AcademicEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AcademicEducationsPage
